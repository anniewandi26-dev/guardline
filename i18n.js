(() => {
  // Manual choice lasts for this browser session only.
  // Every new open defaults to IP → language coordination.
  const STORE_MODE = "shouhao_lang_mode"; // auto | manual
  const STORE_LANG = "shouhao_lang";
  const store = window.sessionStorage;
  const bundle = window.SHOUHAO_I18N;
  if (!bundle || !bundle.strings) return;

  const languages = bundle.languages || [];
  const countryToLang = bundle.countryToLang || {};
  const strings = bundle.strings;
  const DEFAULT_LANG = bundle.defaultLang || "en";
  const codeSet = new Set(languages.map((l) => l.code));

  const isValid = (code) => codeSet.has(code);

  const getMeta = (code) =>
    languages.find((l) => l.code === code) || languages[0] || { code: DEFAULT_LANG, dir: "ltr" };

  const t = (key, vars = {}, lang = currentLang) => {
    const table = strings[lang] || strings[DEFAULT_LANG] || {};
    const fallback = strings[DEFAULT_LANG] || {};
    let text = table[key] ?? fallback[key] ?? key;
    Object.entries(vars).forEach(([k, v]) => {
      text = String(text).split(`{${k}}`).join(String(v));
    });
    return text;
  };

  let currentLang = DEFAULT_LANG;
  let currentMode = "auto";
  let readyResolve;
  const ready = new Promise((resolve) => {
    readyResolve = resolve;
  });

  const contentAt = (lang, path) => {
    // Prefer tiny news meta overlay for date/region/source (always localized).
    if (path && path.startsWith("news.") && window.SHOUHAO_NEWS_META) {
      const parts = path.split(".");
      // news.{slug}.{field}
      if (parts.length === 3) {
        const [, slug, field] = parts;
        const meta =
          window.SHOUHAO_NEWS_META[lang]?.[slug] ||
          window.SHOUHAO_NEWS_META.en?.[slug];
        if (meta && meta[field] != null) return meta[field];
      }
    }
    const pack =
      window.SHOUHAO_CONTENT?.[lang] ||
      window.SHOUHAO_CONTENT?.en ||
      window.SHOUHAO_CONTENT?.["zh-CN"];
    if (!pack || !path) return null;
    return path.split(".").reduce((acc, key) => {
      if (acc == null) return null;
      return acc[key];
    }, pack);
  };

  const applyContent = (lang) => {
    if (!window.SHOUHAO_CONTENT) return;

    document.querySelectorAll("[data-content]").forEach((el) => {
      const path = el.getAttribute("data-content");
      const value = contentAt(lang, path);
      if (value == null) return;
      const attr = el.getAttribute("data-content-attr");
      if (attr) {
        el.setAttribute(attr, String(value));
        return;
      }
      if (el.hasAttribute("data-content-html")) {
        el.innerHTML = String(value);
      } else {
        el.textContent = String(value);
      }
    });

    document.querySelectorAll("[data-content-list]").forEach((list) => {
      const path = list.getAttribute("data-content-list");
      const items = contentAt(lang, path);
      if (!Array.isArray(items)) return;
      const nodes = [...list.children];
      nodes.forEach((li, i) => {
        if (items[i] != null) li.textContent = String(items[i]);
      });
    });

    document.querySelectorAll("[data-content-link-label]").forEach((a) => {
      const path = a.getAttribute("data-content-link-label");
      const value = contentAt(lang, path);
      if (value != null) a.textContent = String(value);
    });
  };

  const applyDom = (lang) => {
    const meta = getMeta(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir || "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const vars = {};
      [...el.attributes].forEach((attr) => {
        if (attr.name.startsWith("data-i18n-var-")) {
          vars[attr.name.slice("data-i18n-var-".length)] = attr.value;
        }
      });
      const value = t(key, vars, lang);
      const attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, value);
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (!key) return;
      el.innerHTML = t(key, {}, lang);
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (key) el.setAttribute("title", t(key, {}, lang));
    });

    applyContent(lang);

    const titleEl = document.querySelector("title[data-i18n]");
    if (titleEl) {
      document.title = t(titleEl.getAttribute("data-i18n"), {}, lang);
    } else {
      const pageTitleKey = document.body?.getAttribute("data-i18n-page-title");
      if (pageTitleKey) document.title = t(pageTitleKey, {}, lang);
      const contentTitle = document.querySelector("[data-page-title-content]");
      if (contentTitle) {
        const path = contentTitle.getAttribute("data-page-title-content");
        const value = contentAt(lang, path);
        if (value) document.title = `${value} · GuardLine`;
      }
    }

    const desc = document.querySelector('meta[name="description"][data-i18n]');
    if (desc) {
      desc.setAttribute("content", t(desc.getAttribute("data-i18n"), {}, lang));
    }
    const contentDesc = document.querySelector('meta[name="description"][data-content]');
    if (contentDesc) {
      const value = contentAt(lang, contentDesc.getAttribute("data-content"));
      if (value) contentDesc.setAttribute("content", String(value));
    }

    document.querySelectorAll("[data-lang-select]").forEach((sel) => {
      if (sel.tagName === "SELECT") {
        sel.value = lang;
        sel.setAttribute("aria-label", t("lang.label", {}, lang));
      }
    });

    document.querySelectorAll("[data-lang-current]").forEach((el) => {
      el.textContent = meta.native;
    });

    // Keep custom float switcher label in sync
    try {
      syncSwitcherLabel();
    } catch (_) {
      /* switcher may not exist yet during first boot */
    }

    window.dispatchEvent(
      new CustomEvent("shouhao:lang", { detail: { lang, mode: currentMode, t } })
    );
  };

  const setLang = (lang, mode) => {
    if (!isValid(lang)) lang = DEFAULT_LANG;
    currentLang = lang;
    currentMode = mode === "manual" ? "manual" : "auto";
    try {
      store.setItem(STORE_MODE, currentMode);
      store.setItem(STORE_LANG, currentLang);
    } catch (_) {
      /* ignore */
    }
    applyDom(currentLang);
  };

  const detectCountry = async () => {
    const controllers = [];
    const fetchJson = async (url, pick) => {
      const ctrl = new AbortController();
      controllers.push(ctrl);
      const timer = setTimeout(() => ctrl.abort(), 4500);
      try {
        const res = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
        if (!res.ok) throw new Error("bad status");
        const data = await res.json();
        const code = pick(data);
        if (code && typeof code === "string") return code.toUpperCase();
        throw new Error("no country");
      } finally {
        clearTimeout(timer);
      }
    };

    const attempts = [
      () =>
        fetchJson("https://api.ip.sb/geoip", (d) => d.country_code || d.countryCode),
      () =>
        fetchJson("https://ipwho.is/", (d) => (d.success === false ? null : d.country_code)),
      () =>
        fetchJson("https://ipapi.co/json/", (d) => d.country_code || d.country),
      () =>
        fetchJson("https://get.geojs.io/v1/ip/country.json", (d) => d.country || d.country_code),
    ];

    for (const attempt of attempts) {
      try {
        const code = await attempt();
        if (code) {
          controllers.forEach((c) => c.abort());
          return code;
        }
      } catch (_) {
        /* try next */
      }
    }
    return null;
  };

  const langFromCountry = (country) => {
    if (!country) return DEFAULT_LANG;
    const mapped = countryToLang[country.toUpperCase()];
    return isValid(mapped) ? mapped : DEFAULT_LANG;
  };

  const resolveInitial = async () => {
    let mode = "auto";
    let saved = null;
    try {
      mode = store.getItem(STORE_MODE) || "auto";
      saved = store.getItem(STORE_LANG);
    } catch (_) {
      /* ignore */
    }

    // Same-tab session manual override only; new visits re-follow IP.
    if (mode === "manual" && isValid(saved)) {
      setLang(saved, "manual");
      return;
    }

    document.documentElement.classList.add("i18n-detecting");
    const country = await detectCountry();
    document.documentElement.classList.remove("i18n-detecting");

    // User may have picked a language while IP was still detecting — never overwrite.
    if (currentMode === "manual") return;

    try {
      if (store.getItem(STORE_MODE) === "manual") {
        const picked = store.getItem(STORE_LANG);
        if (isValid(picked)) {
          setLang(picked, "manual");
          return;
        }
      }
    } catch (_) {
      /* ignore */
    }

    const lang = langFromCountry(country);
    setLang(lang, "auto");
  };

  const QUICK_LANGS = ["zh-CN", "en", "ms", "zh-TW"];

  const syncSwitcherLabel = () => {
    const select = document.querySelector("[data-lang-select]");
    if (select && select.value !== currentLang) select.value = currentLang;
    const label = document.querySelector("[data-lang-label]");
    if (label) label.textContent = t("lang.label", {}, currentLang);
    document.querySelectorAll("[data-lang-quick]").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-lang-quick") === currentLang);
    });
  };

  const buildSwitcher = () => {
    // Drop old float / sheet UIs if any leftover in SPA / cached DOM
    document
      .querySelectorAll(
        ".lang-switcher--float, .lang-switcher__sheet, [data-lang-menu], [data-lang-btn]"
      )
      .forEach((el) => el.remove());

    let wrap = document.querySelector("[data-lang-switcher]");
    if (wrap) {
      syncSwitcherLabel();
      return wrap;
    }

    wrap = document.createElement("div");
    wrap.className = "lang-switcher lang-switcher--header";
    wrap.setAttribute("data-lang-switcher", "");

    const label = document.createElement("label");
    label.className = "lang-switcher__label";
    label.setAttribute("for", "guardline-lang-select");
    label.setAttribute("data-lang-label", "");
    label.textContent = t("lang.label", {}, currentLang);

    const select = document.createElement("select");
    select.id = "guardline-lang-select";
    select.className = "lang-switcher__select";
    select.setAttribute("data-lang-select", "");
    select.setAttribute("aria-label", t("lang.label", {}, currentLang));
    languages.forEach((lang) => {
      const opt = document.createElement("option");
      opt.value = lang.code;
      opt.textContent = lang.native;
      if (lang.code === currentLang) opt.selected = true;
      select.appendChild(opt);
    });
    // Native select — uses OS picker on iOS/Android (most reliable tap target)
    select.addEventListener("change", () => {
      setLang(select.value, "manual");
      syncSwitcherLabel();
    });

    wrap.appendChild(label);
    wrap.appendChild(select);

    const headerInner = document.querySelector(".site-header__inner");
    if (headerInner) {
      const toggle = headerInner.querySelector("[data-nav-toggle]");
      if (toggle) headerInner.insertBefore(wrap, toggle);
      else headerInner.appendChild(wrap);
    } else {
      // Enter splash: big dock at bottom, not overlapping ENTER
      wrap.className = "lang-switcher lang-switcher--dock";
      document.body.appendChild(wrap);
    }

    // One-tap chips under header (or above dock) — easiest path for main languages
    if (!document.querySelector("[data-lang-quick-bar]")) {
      const bar = document.createElement("div");
      bar.className = "lang-quick";
      bar.setAttribute("data-lang-quick-bar", "");
      QUICK_LANGS.forEach((code) => {
        const meta = getMeta(code);
        const b = document.createElement("button");
        b.type = "button";
        b.className = "lang-quick__btn";
        b.setAttribute("data-lang-quick", code);
        b.textContent = meta.native || code;
        if (code === currentLang) b.classList.add("is-active");
        b.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          setLang(code, "manual");
          syncSwitcherLabel();
        });
        bar.appendChild(b);
      });
      const header = document.querySelector(".site-header");
      if (header && header.parentNode) {
        header.insertAdjacentElement("afterend", bar);
      } else {
        wrap.appendChild(bar);
      }
    }

    syncSwitcherLabel();
    return wrap;
  };

  window.ShouhaoI18n = {
    t: (key, vars) => t(key, vars, currentLang),
    getLang: () => currentLang,
    getMode: () => currentMode,
    setLang,
    ready,
    applyDom: () => applyDom(currentLang),
  };

  const boot = async () => {
    buildSwitcher();
    await resolveInitial();
    applyDom(currentLang);
    readyResolve({ lang: currentLang, mode: currentMode });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
