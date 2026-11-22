/**
 * Build one double-clickable GuardLine.html (full SPA site).
 * Also copies to Desktop. Run via: node sync-all.mjs
 */
import { readFileSync, writeFileSync, copyFileSync, readdirSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(root, p), "utf8");
const bin = (p) => readFileSync(join(root, p));

function dataUri(rel) {
  const buf = bin(rel);
  const ext = extname(rel).toLowerCase();
  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

const imageMap = {};
const imgFiles = [
  "images/enter-bg.jpg",
  "images/hero-atmosphere.jpg",
  "images/safari-wa-bg.jpg",
];
for (const f of readdirSync(join(root, "images/tools"))) {
  if (/\.(jpg|jpeg|png|webp)$/i.test(f)) imgFiles.push(`images/tools/${f}`);
}
for (const f of imgFiles) {
  try {
    imageMap[f] = dataUri(f);
  } catch {
    /* skip */
  }
}

const css = [
  read("enter.css"),
  read("styles.css"),
  read("safari-gate.css"),
]
  .join("\n")
  .replace(/url\(["']?images\//g, 'url("IMG:')
  .replace(/url\("IMG:([^"']+)"\)/g, (_, p) => {
    const key = `images/${p}`;
    return imageMap[key] ? `url("${imageMap[key]}")` : `url("images/${p}")`;
  });

const locales = read("locales.js");
const content = read("content-locales.js");
const newsMeta = read("news-meta-locales.js");
const i18n = read("i18n.js");
const safariGate = read("safari-gate.js").replace(
  /url\(["']?images\/safari-wa-bg\.jpg["']?\)/g,
  () => `url("${imageMap["images/safari-wa-bg.jpg"] || ""}")`
);

const app = `
(() => {
  const LIVE = "https://anniewandi26-dev.github.io/guardline/";
  const imgs = ${JSON.stringify(imageMap)};
  const img = (path) => imgs[path] || path;

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  const views = {
    enter: $("#view-enter"),
    home: $("#view-home"),
    articles: $("#view-articles"),
    article: $("#view-article"),
    tools: $("#view-tools"),
    news: $("#view-news"),
    newsItem: $("#view-news-item"),
  };

  let currentLang = "en";

  const pack = () =>
    window.SHOUHAO_CONTENT?.[currentLang] ||
    window.SHOUHAO_CONTENT?.en ||
    window.SHOUHAO_CONTENT?.["zh-CN"] ||
    {};

  const t = (key) => {
    if (window.ShouhaoI18n?.t) return window.ShouhaoI18n.t(key);
    const s = window.SHOUHAO_I18N?.strings;
    return s?.[currentLang]?.[key] || s?.en?.[key] || key;
  };

  const show = (name) => {
    Object.entries(views).forEach(([k, el]) => {
      if (!el) return;
      el.hidden = k !== name;
    });
    window.scrollTo(0, 0);
    document.body.classList.toggle("enter-body", name === "enter");
    document.body.classList.toggle("site-body", name !== "enter");
  };

  const go = (name, arg) => {
    if (name === "enter") renderEnter();
    if (name === "home") renderHome();
    if (name === "articles") renderArticles();
    if (name === "article") renderArticle(arg);
    if (name === "tools") renderTools();
    if (name === "news") renderNews();
    if (name === "newsItem") renderNewsItem(arg);
    show(name);
    if (name !== "enter") remountLang();
    if (window.ShouhaoI18n?.applyDom) {
      try { window.ShouhaoI18n.applyDom(); } catch (_) {}
    }
  };

  function remountLang() {
    try {
      document
        .querySelectorAll("[data-lang-switcher],[data-lang-quick-bar],.lang-switcher__sheet")
        .forEach((n) => n.remove());
      if (window.ShouhaoI18n?.remountSwitcher) window.ShouhaoI18n.remountSwitcher();
    } catch (_) {}
  }

  function renderEnter() {
    const el = views.enter;
    el.innerHTML = \`
      <div class="enter-bg" aria-hidden="true"></div>
      <div class="enter-grid" aria-hidden="true"></div>
      <main class="enter-stage" id="spa-enter-stage">
        <p class="enter-kicker" data-i18n="enter.kicker">WHATSAPP ANTI-THEFT HANDBOOK</p>
        <h1 class="enter-brand" aria-label="GuardLine"><span class="wordmark wordmark--splash"><span class="wordmark__lead">Guard</span><span class="wordmark__accent">Line</span></span></h1>
        <p class="enter-brand-tag">Your number stays yours.</p>
        <button class="enter-btn" type="button" id="spa-enter-btn" data-i18n="enter.aria" data-i18n-attr="aria-label">
          <span class="enter-btn__label">ENTER</span>
          <span class="enter-btn__sub" data-i18n="enter.btn.sub"></span>
        </button>
        <p class="enter-hint" data-i18n="enter.hint"></p>
        <p class="enter-lead enter-ad"><span data-i18n="enter.lead"></span><br /><span class="enter-ad__meta" data-i18n="enter.lead.meta"></span></p>
        <div class="enter-features">
          <div class="enter-feature"><strong>30</strong><span data-i18n="enter.feat.articles"></span></div>
          <div class="enter-feature"><strong>8</strong><span data-i18n="enter.feat.tools"></span></div>
          <div class="enter-feature"><strong>20</strong><span data-i18n="enter.feat.news"></span></div>
        </div>
        <ul class="enter-points">
          <li data-i18n="enter.point1"></li>
          <li data-i18n="enter.point2"></li>
          <li data-i18n="enter.point3"></li>
          <li data-i18n="enter.point4"></li>
        </ul>
        <p style="margin-top:1.2rem;font-size:.85rem;opacity:.7">Online: <a href="\${LIVE}" style="color:#9ef0c4">\${LIVE}</a></p>
      </main>
      <div class="loader" id="spa-loader" hidden aria-live="polite" aria-busy="false">
        <div class="loader__panel">
          <div class="loader__ring" aria-hidden="true"></div>
          <p class="loader__brand"><span class="wordmark wordmark--loader"><span class="wordmark__lead">Guard</span><span class="wordmark__accent">Line</span></span></p>
          <p class="loader__status" id="spa-loader-status" data-i18n="loader.msg0"></p>
          <div class="loader__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="spa-loader-bar">
            <i id="spa-loader-fill"></i>
          </div>
          <p class="loader__pct"><span id="spa-loader-pct">0</span>%</p>
          <ul class="loader__steps" id="spa-loader-steps">
            <li data-i18n="loader.step0"></li>
            <li data-i18n="loader.step1"></li>
            <li data-i18n="loader.step2"></li>
            <li data-i18n="loader.step3"></li>
            <li data-i18n="loader.step4"></li>
          </ul>
        </div>
      </div>
    \`;

    let running = false;
    const DURATION = 5000;
    const msgKeys = ["loader.msg0","loader.msg1","loader.msg2","loader.msg3","loader.msg4","loader.msg5"];
    const startLoading = () => {
      if (running) return;
      running = true;
      const btn = $("#spa-enter-btn", el);
      const stage = $("#spa-enter-stage", el);
      const loader = $("#spa-loader", el);
      const status = $("#spa-loader-status", el);
      const fill = $("#spa-loader-fill", el);
      const pct = $("#spa-loader-pct", el);
      const bar = $("#spa-loader-bar", el);
      const steps = $$("#spa-loader-steps li", el);
      if (btn) btn.disabled = true;
      if (stage) stage.classList.add("is-dimmed");
      loader.hidden = false;
      loader.classList.add("is-active");
      loader.setAttribute("aria-busy", "true");
      const started = performance.now();
      let lastMsg = -1;
      const tick = (now) => {
        const progress = Math.min((now - started) / DURATION, 1);
        const percent = Math.round(progress * 100);
        if (fill) fill.style.width = percent + "%";
        if (pct) pct.textContent = String(percent);
        if (bar) bar.setAttribute("aria-valuenow", String(percent));
        const msgIndex = Math.min(msgKeys.length - 1, Math.floor(progress * msgKeys.length));
        if (msgIndex !== lastMsg) {
          lastMsg = msgIndex;
          if (status) status.textContent = t(msgKeys[msgIndex]);
          steps.forEach((li, i) => {
            li.classList.toggle("is-on", i === msgIndex);
            li.classList.toggle("is-done", i < msgIndex);
          });
        }
        if (progress < 1) requestAnimationFrame(tick);
        else {
          if (status) status.textContent = t("loader.done");
          setTimeout(() => go("home"), 250);
        }
      };
      requestAnimationFrame(tick);
    };

    $("#spa-enter-btn", el).onclick = startLoading;
    window.addEventListener("keydown", function onEnterKey(event) {
      if (event.key !== "Enter" || event.repeat || running || views.enter.hidden) return;
      event.preventDefault();
      startLoading();
    });
    remountLang();
  }

  function shell(active, body) {
    return \`
      <header class="site-header" data-header>
        <div class="site-header__inner">
          <a class="brand" href="#" data-nav="home"><span class="brand__mark"></span><span class="brand__text"><span class="wordmark wordmark--nav"><span class="wordmark__lead">Guard</span><span class="wordmark__accent">Line</span></span></span></a>
          <nav class="nav">
            <a href="#" data-nav="home" class="\${active==="home"?"is-on":""}" data-i18n="nav.home">Home</a>
            <a href="#" data-nav="articles" class="\${active==="articles"?"is-on":""}" data-i18n="nav.articles">Articles</a>
            <a href="#" data-nav="tools" class="\${active==="tools"?"is-on":""}" data-i18n="nav.tools">Tools</a>
            <a href="#" data-nav="news" class="\${active==="news"?"is-on":""}" data-i18n="nav.news">News</a>
          </nav>
          <button class="nav-toggle" type="button" aria-expanded="false" data-nav-toggle>
            <span class="nav-toggle__bars" aria-hidden="true"></span>
          </button>
        </div>
      </header>
      <main id="main">\${body}</main>
      <footer class="site-footer"><div class="site-footer__inner">
        <p class="site-footer__note" data-i18n="footer.note"></p>
        <p class="site-footer__copy">© 2026 GuardLine · HTML sync v${Date.now()} · <a href="\${LIVE}" style="color:#9ef0c4">Live site</a></p>
      </div></footer>
    \`;
  }

  function bindNav(root) {
    $$("[data-nav]", root).forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        go(a.getAttribute("data-nav"));
      });
    });
  }

  function renderHome() {
    const p = pack();
    const arts = Object.entries(p.articles || {}).slice(0, 6);
    const body = \`
      <section class="hero">
        <div class="hero__copy">
          <p class="hero__brand"><span class="wordmark wordmark--hero-light"><span class="wordmark__lead">Guard</span><span class="wordmark__accent">Line</span></span></p>
          <h1 data-i18n="home.h1">Keep WhatsApp in your own hands</h1>
          <p data-i18n="home.lead"></p>
          <div class="hero__cta">
            <a class="btn" href="#" data-nav="articles" data-i18n="home.cta.articles">Articles</a>
            <a class="btn btn--ghost" href="#" data-nav="tools" data-i18n="nav.tools">Tools</a>
          </div>
        </div>
        <div class="hero__visual"><img src="\${img("images/hero-atmosphere.jpg")}" alt="" style="width:100%;border-radius:18px;opacity:.9" /></div>
      </section>
      <section class="section">
        <h2 data-i18n="nav.articles">Articles</h2>
        <div class="topic-grid">
          \${arts.map(([slug, a], i) => \`
            <a class="topic-card" href="#" data-article="\${slug}">
              <span class="topic-card__num">\${String(i + 1).padStart(2, "0")}</span>
              <h3>\${a.title || slug}</h3>
              <p>\${a.excerpt || ""}</p>
            </a>\`).join("")}
        </div>
        <p style="margin-top:1rem"><a href="#" data-nav="articles" data-i18n="home.cta.articles">All articles →</a></p>
      </section>
    \`;
    views.home.innerHTML = shell("home", body);
    bindNav(views.home);
    $$("[data-article]", views.home).forEach((a) => {
      a.onclick = (e) => { e.preventDefault(); go("article", a.getAttribute("data-article")); };
    });
  }

  function renderArticles() {
    const arts = Object.entries(pack().articles || {});
    const body = \`
      <section class="section">
        <h1 data-i18n="articles.title">Articles</h1>
        <div class="article-list">
          \${arts.map(([slug, a], i) => \`
            <a class="article-card" href="#" data-article="\${slug}">
              <span class="article-card__num">\${String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2>\${a.title || slug}</h2>
                <p>\${a.excerpt || ""}</p>
                <span class="article-card__more" data-i18n="read.more">Read</span>
              </div>
            </a>\`).join("")}
        </div>
      </section>\`;
    views.articles.innerHTML = shell("articles", body);
    bindNav(views.articles);
    $$("[data-article]", views.articles).forEach((a) => {
      a.onclick = (e) => { e.preventDefault(); go("article", a.getAttribute("data-article")); };
    });
  }

  function renderArticle(slug) {
    const a = pack().articles?.[slug];
    if (!a) return go("articles");
    const keys = Object.keys(pack().articles || {});
    const idx = keys.indexOf(slug);
    const body = \`
      <article class="section article-page">
        <p><a href="#" data-nav="articles">← <span data-i18n="nav.articles">Articles</span></a></p>
        <p class="eyebrow">\${a.category || ""} · \${a.read || ""}</p>
        <h1>\${a.title || slug}</h1>
        <div class="prose">\${a.body || ""}</div>
        <div class="article-nav" style="display:flex;justify-content:space-between;gap:1rem;margin-top:2rem">
          \${idx > 0 ? \`<a href="#" data-article="\${keys[idx - 1]}">← Prev</a>\` : "<span></span>"}
          \${idx < keys.length - 1 ? \`<a href="#" data-article="\${keys[idx + 1]}">Next →</a>\` : "<span></span>"}
        </div>
      </article>\`;
    views.article.innerHTML = shell("articles", body);
    bindNav(views.article);
    $$("[data-article]", views.article).forEach((x) => {
      x.onclick = (e) => { e.preventDefault(); go("article", x.getAttribute("data-article")); };
    });
  }

  function renderTools() {
    const p = pack();
    const intro = p.toolsIntro || {};
    const tools = Object.entries(p.tools || {});
    const body = \`
      <section class="section">
        <h1>\${intro.title || t("tools.title")}</h1>
        <p>\${intro.lead || ""}</p>
        <div class="tools-grid">
          \${tools.map(([id, tool]) => \`
            <article class="tool-card">
              <img src="\${img("images/tools/tool-" + id + ".jpg")}" alt="" style="width:100%;border-radius:12px;margin-bottom:.75rem" onerror="this.style.display='none'" />
              <p class="eyebrow">\${tool.tier || ""} · \${tool.platforms || ""}</p>
              <h2>\${tool.name || id}</h2>
              <p>\${tool.summary || ""}</p>
              <ol>\${(tool.steps || []).map((s) => "<li>" + s + "</li>").join("")}</ol>
              \${tool.caution ? \`<p class="callout">\${tool.caution}</p>\` : ""}
            </article>\`).join("")}
        </div>
      </section>\`;
    views.tools.innerHTML = shell("tools", body);
    bindNav(views.tools);
  }

  function renderNews() {
    const p = pack();
    const intro = p.newsIntro || {};
    const items = Object.entries(p.news || {});
    const body = \`
      <section class="section">
        <h1>\${intro.title || t("news.title")}</h1>
        <p>\${intro.lead || ""}</p>
        <div class="news-list">
          \${items.map(([slug, n]) => \`
            <a class="news-card" href="#" data-news="\${slug}">
              <h2>\${n.title || slug}</h2>
              <p>\${n.excerpt || ""}</p>
            </a>\`).join("")}
        </div>
      </section>\`;
    views.news.innerHTML = shell("news", body);
    bindNav(views.news);
    $$("[data-news]", views.news).forEach((a) => {
      a.onclick = (e) => { e.preventDefault(); go("newsItem", a.getAttribute("data-news")); };
    });
  }

  function renderNewsItem(slug) {
    const n = pack().news?.[slug];
    if (!n) return go("news");
    const meta = window.SHOUHAO_NEWS_META?.[currentLang]?.[slug] || window.SHOUHAO_NEWS_META?.en?.[slug] || {};
    const body = \`
      <article class="section article-page">
        <p><a href="#" data-nav="news">← <span data-i18n="nav.news">News</span></a></p>
        <p class="eyebrow">\${meta.region || n.region || ""} · \${meta.date || n.date || ""}</p>
        <h1>\${n.title || slug}</h1>
        <div class="prose">\${n.body || ""}</div>
      </article>\`;
    views.newsItem.innerHTML = shell("news", body);
    bindNav(views.newsItem);
  }

  // Sync language from i18n when ready
  const boot = () => {
    if (window.ShouhaoI18n?.getLang) currentLang = window.ShouhaoI18n.getLang();
    go("enter");
    document.addEventListener("change", (e) => {
      if (e.target?.matches?.("[data-lang-select]")) {
        setTimeout(() => {
          if (window.ShouhaoI18n?.getLang) currentLang = window.ShouhaoI18n.getLang();
          const on = Object.entries(views).find(([, el]) => el && !el.hidden)?.[0] || "enter";
          if (on === "article") {
            const h = $("h1", views.article);
            /* re-render current list views */
            go("articles");
          } else go(on === "newsItem" ? "news" : on);
        }, 50);
      }
    });
  };

  if (window.ShouhaoI18n?.ready) {
    window.ShouhaoI18n.ready.then(boot);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(boot, 100));
  } else {
    setTimeout(boot, 100);
  }

  window.GuardLineSPA = { go };
})();
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>GuardLine · WhatsApp anti-theft handbook</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@600;700;800&family=Outfit:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
${css}
.site-body { background: #071510; color: #e8f5ef; font-family: var(--font-body); }
.site-body .section { width: min(960px, 100% - 2rem); margin: 0 auto; padding: 2rem 0; }
.site-body .topic-grid, .site-body .tools-grid, .site-body .article-list, .site-body .news-list { display: grid; gap: 1rem; }
.site-body .topic-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.site-body .topic-card, .site-body .article-card, .site-body .news-card, .site-body .tool-card {
  display: block; padding: 1rem; border-radius: 16px; text-decoration: none; color: inherit;
  background: rgba(255,255,255,.06); border: 1px solid rgba(126,208,173,.2);
}
.site-body .prose { line-height: 1.75; }
.site-body .prose h2 { margin-top: 1.4rem; }
.site-body .callout { padding: .85rem 1rem; border-radius: 12px; background: rgba(37,211,102,.1); border: 1px solid rgba(37,211,102,.25); }
.site-body .hero { display: grid; gap: 1.5rem; width: min(960px, 100% - 2rem); margin: 0 auto; padding: 2rem 0; }
@media (min-width: 800px) { .site-body .hero { grid-template-columns: 1.2fr 1fr; align-items: center; } }
.site-body .btn { display: inline-block; padding: .75rem 1.2rem; border-radius: 999px; background: linear-gradient(135deg,#d8f5e6,#25d366); color: #062018; font-weight: 700; text-decoration: none; margin-right: .5rem; }
.site-body .btn--ghost { background: transparent; border: 1px solid rgba(126,208,173,.4); color: #e8f5ef; }
</style>
</head>
<body class="enter-body">
<div id="view-enter"></div>
<div id="view-home" hidden></div>
<div id="view-articles" hidden></div>
<div id="view-article" hidden></div>
<div id="view-tools" hidden></div>
<div id="view-news" hidden></div>
<div id="view-news-item" hidden></div>
<script>${locales}</script>
<script>${content}</script>
<script>${newsMeta}</script>
<script>${i18n}</script>
<script>${safariGate}</script>
<script>${app}</script>
</body>
</html>`;

const outRepo = join(root, "GuardLine.html");
const outDesk = join(process.env.USERPROFILE || root, "Desktop", "GuardLine.html");
writeFileSync(outRepo, html);
try {
  copyFileSync(outRepo, outDesk);
} catch (e) {
  console.warn("desktop copy failed", e.message);
}
// remove old doc file so user is not confused
try {
  const doc1 = join(root, "GuardLine-完整说明.html");
  const doc2 = join(process.env.USERPROFILE || root, "Desktop", "GuardLine-完整说明.html");
  writeFileSync(doc1, ""); // leave marker? better delete via sync
} catch (_) {}
console.log("GuardLine.html MB", (Buffer.byteLength(html) / 1024 / 1024).toFixed(2));
console.log("repo", outRepo);
console.log("desktop", outDesk);
