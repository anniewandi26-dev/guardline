(() => {
  const STORE_OK = "guardline_safari_ok";

  const ua = () => navigator.userAgent || "";
  const vendor = () => navigator.vendor || "";

  const isIOSFamily = () => {
    const s = ua();
    if (/iPhone|iPad|iPod/i.test(s)) return true;
    // iPadOS desktop UA reports as Macintosh
    return /Macintosh/i.test(s) && Number(navigator.maxTouchPoints || 0) > 1;
  };

  /**
   * Real Apple Safari only (iPhone / iPad / Mac).
   * Must NOT false-negative: a wrong "no" locks Safari users behind the gate
   * and previously also fired x-safari redirects that break the page.
   */
  const isSafariBrowser = () => {
    const s = ua();
    const v = vendor();

    // Hard excludes: other browsers / in-app WebViews
    if (
      /Android|CriOS|FxiOS|EdgiOS|OPiOS|Edg\/|OPR\/|OPT\/|Chromium|Chrome\/|CriOS|SamsungBrowser|UCBrowser|QQBrowser|MicroMessenger|FBAN|FBAV|Instagram|Line\/|Twitter|LinkedInApp|Snapchat|GSA\//i.test(
        s
      )
    ) {
      return false;
    }

    const appleVendor = /Apple/i.test(v);
    const hasSafariToken = /Safari/i.test(s);
    const hasVersionToken = /Version\/\d+/i.test(s);

    // Standard Safari (macOS + iOS): Apple vendor + Safari + Version/x
    if (appleVendor && hasSafariToken && hasVersionToken) return true;

    // Some Safari builds still expose Apple vendor + Safari without Chrome family
    if (appleVendor && hasSafariToken) return true;

    // Real iPhone/iPad Safari UA (no CriOS/FxiOS). Vendor may be empty in rare cases.
    if (
      isIOSFamily() &&
      hasSafariToken &&
      hasVersionToken &&
      !/Chrome|CriOS|FxiOS|EdgiOS|OPiOS|Android/i.test(s)
    ) {
      return true;
    }

    return false;
  };

  const absoluteUrl = () =>
    location.protocol +
    "//" +
    location.host +
    location.pathname +
    location.search +
    location.hash;

  const safariSchemeUrl = () => {
    const proto = location.protocol === "http:" ? "http" : "https";
    const path =
      location.host + location.pathname + location.search + location.hash;
    return `x-safari-${proto}://${path}`;
  };

  const tryOpenSafari = () => {
    const url = absoluteUrl();

    // Always copy so user can paste into Safari if hand-off fails
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).catch(() => {});
      }
    } catch {
      /* ignore */
    }

    // Only attempt Safari scheme on Apple mobile / iPadOS.
    // Never auto-navigate desktop Windows/Linux to a dead protocol (breaks the tab).
    if (!isIOSFamily()) {
      // macOS Chrome/Firefox: try scheme once via hidden link (no forced location.href)
      if (/Macintosh|Mac OS X/i.test(ua()) && !/Android/i.test(ua())) {
        try {
          const a = document.createElement("a");
          a.href = safariSchemeUrl();
          a.rel = "noopener";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          a.remove();
        } catch {
          /* ignore */
        }
      }
      return;
    }

    const scheme = safariSchemeUrl();
    try {
      const a = document.createElement("a");
      a.href = scheme;
      a.rel = "noopener";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      /* ignore */
    }

    // Soft fallback — only on iOS family, and only after a short delay
    setTimeout(() => {
      try {
        // If we somehow became Safari mid-flight, stop
        if (isSafariBrowser()) return;
        location.href = scheme;
      } catch {
        /* ignore */
      }
    }, 180);
  };

  const t = (key) => {
    if (window.ShouhaoI18n && typeof window.ShouhaoI18n.t === "function") {
      return window.ShouhaoI18n.t(key);
    }
    const pack = window.SHOUHAO_I18N?.strings;
    const lang = window.ShouhaoI18n?.getLang?.() || "en";
    return pack?.[lang]?.[key] || pack?.en?.[key] || key;
  };

  const applyText = (root) => {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });
  };

  const buildModal = () => {
    let root = document.getElementById("safari-gate");
    if (root) return root;

    root = document.createElement("div");
    root.id = "safari-gate";
    root.className = "safari-gate";
    root.setAttribute("role", "alertdialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-labelledby", "safari-gate-title");
    root.innerHTML = `
      <div class="safari-gate__bg" aria-hidden="true"></div>
      <div class="safari-gate__panel">
        <div class="safari-gate__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.4 6.8H22l-5.5 4.2 2.1 6.8L12 16.8 5.4 19.8l2.1-6.8L2 8.8h7.6L12 2z"/></svg>
        </div>
        <h2 class="safari-gate__title" id="safari-gate-title" data-i18n="safari.title"></h2>
        <p class="safari-gate__body" data-i18n="safari.body"></p>
        <ul class="safari-gate__points">
          <li data-i18n="safari.point1"></li>
          <li data-i18n="safari.point2"></li>
          <li data-i18n="safari.point3"></li>
        </ul>
        <p class="safari-gate__help" data-i18n="safari.help"></p>
        <p class="safari-gate__note" data-i18n="safari.note"></p>
        <button type="button" class="safari-gate__btn" id="safari-gate-btn" data-i18n="safari.btn"></button>
      </div>
    `;
    document.body.appendChild(root);

    root.querySelector("#safari-gate-btn").addEventListener("click", (e) => {
      e.preventDefault();
      tryOpenSafari();
    });

    root.addEventListener("click", (e) => {
      if (e.target === root) e.stopPropagation();
    });
    document.addEventListener(
      "keydown",
      (e) => {
        if (!root.hidden && (e.key === "Escape" || e.key === "Esc")) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true
    );

    return root;
  };

  const show = () => {
    const root = buildModal();
    applyText(root);
    root.hidden = false;
    document.documentElement.classList.add("safari-gate-lock");
  };

  const hide = () => {
    const root = document.getElementById("safari-gate");
    if (root) root.hidden = true;
    document.documentElement.classList.remove("safari-gate-lock");
  };

  const markSafariOk = () => {
    try {
      localStorage.setItem(STORE_OK, "1");
    } catch {
      /* ignore */
    }
  };

  const boot = () => {
    // Safari users: never redirect, never show gate
    if (isSafariBrowser()) {
      markSafariOk();
      hide();
      return;
    }

    // Non-Safari: show gate only. Do NOT auto-jump to x-safari on load —
    // that previously could break real Safari when detection failed, and
    // breaks desktop tabs that don't understand the protocol.
    show();

    if (window.ShouhaoI18n?.ready) {
      window.ShouhaoI18n.ready.then(() => {
        const root = document.getElementById("safari-gate");
        if (root && !root.hidden) applyText(root);
      });
    }

    document.addEventListener("change", (e) => {
      if (e.target && e.target.matches?.("[data-lang-select]")) {
        setTimeout(() => {
          const root = document.getElementById("safari-gate");
          if (root && !root.hidden) applyText(root);
        }, 0);
      }
    });
  };

  // Run as early as possible so Safari never flashes the gate
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
