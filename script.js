(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const year = document.querySelector("[data-year]");

  const yearValue = String(new Date().getFullYear());
  if (year) year.textContent = yearValue;
  document.querySelectorAll('[data-i18n="footer.copy"]').forEach((el) => {
    el.setAttribute("data-i18n-var-year", yearValue);
  });
  if (window.ShouhaoI18n?.ready) {
    window.ShouhaoI18n.ready.then(() => window.ShouhaoI18n.applyDom());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = mobileNav.hasAttribute("hidden");
      if (open) mobileNav.removeAttribute("hidden");
      else mobileNav.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", String(open));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const reveals = document.querySelectorAll("[data-reveal]");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const counters = [...document.querySelectorAll("[data-count]")];
  const animateCount = (el) => {
    if (el.dataset.counted === "1") return;
    el.dataset.counted = "1";
    const target = Number(el.getAttribute("data-count") || 0);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (counters.length) {
    const runCounters = () => counters.forEach(animateCount);
    const pulse = document.querySelector(".pulse-strip");
    if ("IntersectionObserver" in window && pulse) {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            runCounters();
            cio.unobserve(entry.target);
          });
        },
        { threshold: 0.2 }
      );
      cio.observe(pulse);
    } else {
      runCounters();
    }
  }

  const panel = document.querySelector("[data-checklist]");
  if (!panel) return;

  const boxes = [...panel.querySelectorAll("[data-check]")];
  const label = panel.querySelector("[data-progress-label]");
  const pct = panel.querySelector("[data-progress-pct]");
  const bar = panel.querySelector("[data-progress-bar]");
  const fill = panel.querySelector("[data-progress-fill]");
  const reset = panel.querySelector("[data-reset-checklist]");
  const key = "shouhaosuo-checklist-v1";

  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  boxes.forEach((box) => {
    box.checked = Boolean(saved[box.value]);
  });

  const render = () => {
    const done = boxes.filter((b) => b.checked).length;
    const total = boxes.length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    if (label) {
      label.setAttribute("data-i18n-var-done", String(done));
      label.setAttribute("data-i18n-var-total", String(total));
      label.textContent =
        window.ShouhaoI18n?.t?.("check.progress", { done, total }) ||
        `Done ${done} / ${total}`;
    }
    if (pct) pct.textContent = `${percent}%`;
    if (fill) fill.style.width = `${percent}%`;
    if (bar) bar.setAttribute("aria-valuenow", String(percent));
  };

  window.addEventListener("shouhao:lang", render);

  const persist = () => {
    const next = {};
    boxes.forEach((box) => {
      next[box.value] = box.checked;
    });
    localStorage.setItem(key, JSON.stringify(next));
    render();
  };

  boxes.forEach((box) => box.addEventListener("change", persist));
  if (reset) {
    reset.addEventListener("click", () => {
      boxes.forEach((box) => {
        box.checked = false;
      });
      persist();
    });
  }
  render();
})();
