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

  // Short button labels — easy to scan on a small pill
  const SHORT_LABEL = {
    en: "EN",
    "zh-CN": "中文",
    "zh-TW": "繁中",
    ja: "日本語",
    ko: "한국어",
    ms: "BM",
    id: "ID",
    es: "ES",
    fr: "FR",
    de: "DE",
    "pt-BR": "PT",
    "pt-PT": "PT",
    ar: "ع",
    th: "ไทย",
    vi: "VI",
    hi: "हि",
    ru: "RU",
  };

  const POPULAR = ["zh-CN", "zh-TW", "en", "ms", "id", "ja", "ko", "es"];

  const syncSwitcherLabel = () => {
    const btn = document.querySelector("[data-lang-btn]");
    const title = document.querySelector("[data-lang-sheet-title]");
    if (!btn) return;
    const meta = getMeta(currentLang);
    const short = SHORT_LABEL[currentLang] || (meta.native || currentLang).slice(0, 4);
    const labelEl = btn.querySelector("[data-lang-btn-text]");
    if (labelEl) labelEl.textContent = short;
    else btn.textContent = short;
    btn.setAttribute(
      "aria-label",
      `${t("lang.label", {}, currentLang)}: ${meta.native || currentLang}`
    );
    if (title) title.textContent = t("lang.label", {}, currentLang);
    document.querySelectorAll("[data-lang-option]").forEach((b) => {
      const on = b.getAttribute("data-lang-option") === currentLang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
  };

  const closeSheet = (wrap, btn, sheet) => {
    wrap.classList.remove("is-open");
    if (sheet) {
      sheet.classList.remove("is-open");
      sheet.setAttribute("aria-hidden", "true");
    }
    if (btn) btn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("lang-sheet-open");
  };

  const openSheet = (wrap, btn, sheet) => {
    wrap.classList.add("is-open");
    sheet.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    sheet.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("lang-sheet-open");
    const active = sheet.querySelector(".lang-switcher__option.is-active");
    if (active) {
      try {
        active.scrollIntoView({ block: "nearest" });
      } catch (_) {}
    }
  };

  const buildOption = (lang, onPick) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "lang-switcher__option";
    item.setAttribute("data-lang-option", lang.code);
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", lang.code === currentLang ? "true" : "false");
    if (lang.code === currentLang) item.classList.add("is-active");

    const native = document.createElement("span");
    native.className = "lang-switcher__option-native";
    native.textContent = lang.native;

    const en = document.createElement("span");
    en.className = "lang-switcher__option-en";
    en.textContent = lang.name;

    item.appendChild(native);
    item.appendChild(en);
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      onPick(lang.code);
    });
    return item;
  };

  const buildSwitcher = () => {
    const existing = document.querySelector("[data-lang-switcher]");
    if (existing) {
      syncSwitcherLabel();
      return existing;
    }

    const wrap = document.createElement("div");
    wrap.className = "lang-switcher lang-switcher--float";
    wrap.setAttribute("data-lang-switcher", "");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-switcher__btn";
    btn.setAttribute("data-lang-btn", "");
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "lang-sheet");
    btn.innerHTML =
      '<span class="lang-switcher__globe" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" stroke="currentColor" stroke-width="1.8"/></svg></span><span data-lang-btn-text></span>';

    const sheet = document.createElement("div");
    sheet.className = "lang-switcher__sheet";
    sheet.id = "lang-sheet";
    sheet.setAttribute("data-lang-menu", "");
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-modal", "true");
    sheet.setAttribute("aria-hidden", "true");
    sheet.setAttribute("aria-labelledby", "lang-sheet-title");

    const backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "lang-switcher__backdrop";
    backdrop.setAttribute("aria-label", "Close");
    backdrop.tabIndex = -1;

    const panel = document.createElement("div");
    panel.className = "lang-switcher__panel";

    const head = document.createElement("div");
    head.className = "lang-switcher__head";

    const title = document.createElement("h2");
    title.className = "lang-switcher__title";
    title.id = "lang-sheet-title";
    title.setAttribute("data-lang-sheet-title", "");
    title.textContent = t("lang.label", {}, currentLang);

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "lang-switcher__close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.textContent = "×";

    head.appendChild(title);
    head.appendChild(closeBtn);

    const list = document.createElement("div");
    list.className = "lang-switcher__list";
    list.setAttribute("role", "listbox");

    const pick = (code) => {
      setLang(code, "manual");
      syncSwitcherLabel();
      closeSheet(wrap, btn, sheet);
    };

    const byCode = new Map(languages.map((l) => [l.code, l]));
    const popularWrap = document.createElement("div");
    popularWrap.className = "lang-switcher__group";
    POPULAR.forEach((code) => {
      const lang = byCode.get(code);
      if (lang) popularWrap.appendChild(buildOption(lang, pick));
    });

    const restWrap = document.createElement("div");
    restWrap.className = "lang-switcher__group lang-switcher__group--rest";
    languages
      .filter((l) => !POPULAR.includes(l.code))
      .forEach((lang) => restWrap.appendChild(buildOption(lang, pick)));

    list.appendChild(popularWrap);
    list.appendChild(restWrap);
    panel.appendChild(head);
    panel.appendChild(list);
    sheet.appendChild(backdrop);
    sheet.appendChild(panel);

    const toggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (wrap.classList.contains("is-open")) closeSheet(wrap, btn, sheet);
      else openSheet(wrap, btn, sheet);
    };

    btn.addEventListener("click", toggle);
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeSheet(wrap, btn, sheet);
    });
    backdrop.addEventListener("click", (e) => {
      e.preventDefault();
      closeSheet(wrap, btn, sheet);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && wrap.classList.contains("is-open")) {
        closeSheet(wrap, btn, sheet);
      }
    });

    wrap.appendChild(btn);
    // Sheet must be direct on body — not inside the float button —
    // so fixed inset covers the full viewport above page content.
    document.body.appendChild(wrap);
    document.body.appendChild(sheet);
    wrap._langSheet = sheet;
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
