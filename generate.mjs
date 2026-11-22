import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { articles } from "./articles-data.mjs";
import { tools, toolsIntro, toolsAvoid } from "./tools-data.mjs";
import { news, newsIntro } from "./news-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = "GuardLine";
const TAGLINE = "Practical WhatsApp anti-theft handbook";
const TOTAL = articles.length;
const NEWS_TOTAL = news.length;
const ASSET_V = String(Date.now());
const v = (file) => `${file}?v=${ASSET_V}`;
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Urbanist:wght@600;700;800&family=Outfit:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap";

function wordmark(extraClass = "") {
  const cls = ["wordmark", extraClass].filter(Boolean).join(" ");
  return `<span class="${cls}" aria-hidden="true"><span class="wordmark__lead">Guard</span><span class="wordmark__accent">Line</span></span>`;
}

function enterLink(targetPath, root = ".") {
  const cleaned = String(targetPath).replace(/^\.\//, "");
  // Use hash so static servers that rewrite .html do not drop the destination.
  return `${root}/loading.html#${encodeURIComponent(cleaned)}`;
}

function navLinks(root) {
  const items = [
    { href: `${root}/home.html`, labelKey: "nav.home", blank: false },
    { href: enterLink("articles.html", root), labelKey: "nav.articles", blank: true },
    { href: enterLink("tools.html", root), labelKey: "nav.tools", blank: true },
    { href: enterLink("news.html", root), labelKey: "nav.news", blank: true },
  ];
  return items
    .map((item) => {
      const blank = item.blank
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";
      return `<a href="${item.href}"${blank} data-i18n="${item.labelKey}"></a>`;
    })
    .join("\n");
}

function shell({
  title,
  description,
  content,
  root = ".",
  titleKey = "",
  descKey = "",
  bodyClass = "",
}) {
  const titleAttr = titleKey ? ` data-i18n="${titleKey}"` : "";
  const descAttr = descKey ? ` data-i18n="${descKey}"` : "";
  const pageTitleAttr = titleKey ? ` data-i18n-page-title="${titleKey}"` : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${description}"${descAttr} />
  <title${titleAttr}>${title}</title>
  <script>
    (function () {
      if (/github\\.io$/i.test(location.hostname)) {
        var b = document.createElement("base");
        b.href = "/guardline/";
        document.head.insertBefore(b, document.head.firstChild);
      }
    })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${FONT_HREF}" rel="stylesheet" />
  <link rel="stylesheet" href="${root}/${v("styles.css")}" />
  <link rel="stylesheet" href="${root}/${v("safari-gate.css")}" />
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}${pageTitleAttr}>
  <a class="skip-link" href="#main" data-i18n="skip">Skip to content</a>
  <header class="site-header" data-header>
    <div class="site-header__inner">
      <a class="brand" href="${root}/home.html" data-i18n="brand.home" data-i18n-attr="aria-label" aria-label="${SITE} home">
        <span class="brand__mark" aria-hidden="true"></span>
        <span class="brand__text">${wordmark("wordmark--nav")}</span>
      </a>
      <nav class="nav" data-i18n="nav.aria" data-i18n-attr="aria-label" aria-label="Page navigation">
        ${navLinks(root)}
      </nav>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-nav-toggle>
        <span class="nav-toggle__bars" aria-hidden="true"></span>
        <span class="visually-hidden" data-i18n="menu.open">Open menu</span>
      </button>
    </div>
    <div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
      ${navLinks(root)}
    </div>
  </header>
  <main id="main">
    ${content}
  </main>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div>
        <p class="brand brand--footer">
          <span class="brand__mark" aria-hidden="true"></span>
          <span class="brand__text">${wordmark("wordmark--nav")}</span>
        </p>
        <p class="site-footer__note" data-i18n="footer.note"></p>
      </div>
      <p class="site-footer__copy" data-i18n="footer.copy" data-i18n-var-year="2026">© <span data-year></span> ${SITE}</p>
    </div>
  </footer>
  <script src="${root}/${v("locales.js")}"></script>
  <script src="${root}/${v("i18n.js")}"></script>
  <script src="${root}/${v("safari-gate.js")}"></script>
  <script src="${root}/${v("script.js")}"></script>
  <script src="${root}/${v("content-locales.js")}" defer></script>
  <script src="${root}/${v("news-meta-locales.js")}" defer></script>
  <script>
    // Apply article/news/tool copy once heavy packs finish (keeps first paint fast).
    (function () {
      function refresh() {
        if (window.ShouhaoI18n && window.SHOUHAO_CONTENT) {
          window.ShouhaoI18n.applyDom();
        }
      }
      document.querySelectorAll('script[src*="content-locales"],script[src*="news-meta"]').forEach(function (s) {
        s.addEventListener("load", refresh);
      });
      window.addEventListener("load", refresh);
    })();
  </script>
</body>
</html>`;
}

const topicCards = articles
  .slice(0, 6)
  .map(
    (a, i) => `
    <a class="topic-card" href="articles/${a.slug}.html">
      <span class="topic-card__num">${String(i + 1).padStart(2, "0")}</span>
      <h3 data-content="articles.${a.slug}.title">${a.title}</h3>
      <p data-content="articles.${a.slug}.excerpt">${a.excerpt}</p>
      <span class="article-card__more" data-i18n="read.more">Read full article</span>
    </a>`
  )
  .join("");

const flashNews = news
  .slice(0, 3)
  .map(
    (n, i) => `
    <a class="flash-item" href="news/${n.slug}.html">
      <span class="flash-item__num">${String(i + 1).padStart(2, "0")}</span>
      <div>
        <h3 data-content="news.${n.slug}.title">${n.title}</h3>
        <p data-content="news.${n.slug}.excerpt">${n.excerpt}</p>
      </div>
      <span class="flash-item__meta" data-content="news.${n.slug}.region">${n.region}</span>
    </a>`
  )
  .join("");

const home = shell({
  title: `${SITE} · ${TAGLINE}`,
  description: `${SITE}整理 ${TOTAL} 篇 WhatsApp 防盗完整长文：验证码、两步验证、关联设备、夺回账号、家庭防护与常见骗术。`,
  titleKey: "home.title",
  descKey: "home.desc",
  root: ".",
  content: `
    <section class="hero" id="top">
      <div class="hero__atmosphere" aria-hidden="true"></div>
      <div class="hero__grid">
        <div class="hero__copy">
          <p class="hero__brand">${wordmark("wordmark--hero-light")}</p>
          <h1 data-i18n="home.h1">Keep WhatsApp in your own hands</h1>
          <p class="hero__lead" data-i18n="home.lead"></p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="${enterLink("articles.html")}" target="_blank" rel="noopener noreferrer" data-i18n="home.cta.articles">Read all 30 articles</a>
            <a class="btn btn--ghost" href="${enterLink("home.html#paths")}" target="_blank" rel="noopener noreferrer" data-i18n="home.cta.paths">Pick a protection path</a>
          </div>
        </div>
        <div class="hero__visual" aria-hidden="true">
          <div class="phone-stage">
            <div class="phone-stage__glow"></div>
            <div class="phone">
              <div class="phone__notch"></div>
              <div class="phone__screen">
                <div class="phone__status"><span data-i18n="phone.status">Security status</span><strong data-i18n="phone.ok">Hardened</strong></div>
                <ul class="phone__checks">
                  <li class="is-on" data-i18n="phone.check1">Two-step verification</li>
                  <li class="is-on" data-i18n="phone.check2">Codes kept private</li>
                  <li class="is-on" data-i18n="phone.check3">Linked devices cleared</li>
                  <li data-i18n="phone.check4">App kept updated</li>
                </ul>
                <div class="phone__meter"><span data-i18n="phone.meter">Protection completeness</span><div class="phone__bar"><i style="--w: 86%"></i></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--pulse" data-reveal>
      <div class="section__inner">
        <div class="pulse-strip">
          <a class="pulse-item" href="news.html">
            <strong class="pulse-item__num" data-count="128">0</strong>
            <p class="pulse-item__label" data-i18n="pulse.sg"></p>
            <p class="pulse-item__note" data-i18n="pulse.sg.note"></p>
          </a>
          <a class="pulse-item" href="news.html">
            <strong class="pulse-item__num" data-count="50" data-suffix="+">0</strong>
            <p class="pulse-item__label" data-i18n="pulse.ch"></p>
            <p class="pulse-item__note" data-i18n="pulse.ch.note"></p>
          </a>
          <a class="pulse-item" href="news.html">
            <strong class="pulse-item__num" data-count="90" data-suffix="%">0</strong>
            <p class="pulse-item__label" data-i18n="pulse.hk"></p>
            <p class="pulse-item__note" data-i18n="pulse.hk.note"></p>
          </a>
        </div>
      </div>
    </section>

    <section class="section section--paths" id="paths" data-reveal>
      <div class="section__inner">
        <header class="section__head">
          <p class="eyebrow" data-i18n="paths.eyebrow"></p>
          <h2 data-i18n="paths.h2"></h2>
          <p data-i18n="paths.lead"></p>
        </header>
        <div class="path-grid">
          <a class="path-card" href="articles/01-verification-code.html">
            <span class="path-card__index">PATH 01</span>
            <h3 data-i18n="path1.title"></h3>
            <p data-i18n="path1.lead"></p>
            <ul class="path-card__links">
              <li data-i18n="path1.a"></li>
              <li data-i18n="path1.b"></li>
              <li data-i18n="path1.c"></li>
            </ul>
          </a>
          <a class="path-card" href="articles/10-recover-account.html">
            <span class="path-card__index">PATH 02</span>
            <h3 data-i18n="path2.title"></h3>
            <p data-i18n="path2.lead"></p>
            <ul class="path-card__links">
              <li data-i18n="path2.a"></li>
              <li data-i18n="path2.b"></li>
              <li data-i18n="path2.c"></li>
            </ul>
          </a>
          <a class="path-card" href="articles/19-family-elders.html">
            <span class="path-card__index">PATH 03</span>
            <h3 data-i18n="path3.title"></h3>
            <p data-i18n="path3.lead"></p>
            <ul class="path-card__links">
              <li data-i18n="path3.a"></li>
              <li data-i18n="path3.b"></li>
              <li data-i18n="path3.c"></li>
            </ul>
          </a>
        </div>
      </div>
    </section>

    <section class="section section--articles" id="topics" data-reveal>
      <div class="section__inner">
        <header class="section__head">
          <p class="eyebrow" data-i18n="topics.eyebrow"></p>
          <h2 data-i18n="topics.h2"></h2>
          <p data-i18n="topics.lead"></p>
        </header>
        <div class="topic-grid">${topicCards}</div>
        <p style="margin-top:1.5rem"><a class="btn btn--primary" href="${enterLink("articles.html")}" target="_blank" rel="noopener noreferrer" data-i18n="view.all.articles"></a></p>
      </div>
    </section>

    <section class="section" id="tricks" data-reveal>
      <div class="section__inner">
        <header class="section__head">
          <p class="eyebrow" data-i18n="threats.eyebrow"></p>
          <h2 data-i18n="threats.h2"></h2>
          <p data-i18n="threats.lead"></p>
        </header>
        <div class="trick-list">
          <article class="trick"><span class="trick__num">01</span><div><h3 data-i18n="threat1.title"></h3><p data-i18n="threat1.lead"></p></div></article>
          <article class="trick"><span class="trick__num">02</span><div><h3 data-i18n="threat2.title"></h3><p data-i18n="threat2.lead"></p></div></article>
          <article class="trick"><span class="trick__num">03</span><div><h3 data-i18n="threat3.title"></h3><p data-i18n="threat3.lead"></p></div></article>
          <article class="trick"><span class="trick__num">04</span><div><h3 data-i18n="threat4.title"></h3><p data-i18n="threat4.lead"></p></div></article>
        </div>
      </div>
    </section>

    <section class="section" id="sos" data-reveal>
      <div class="section__inner">
        <div class="sos-strip">
          <div>
            <p class="eyebrow" data-i18n="sos.eyebrow"></p>
            <h2 data-i18n="sos.h2"></h2>
            <p data-i18n="sos.lead"></p>
            <a class="btn btn--primary" href="articles/10-recover-account.html" data-i18n="sos.cta"></a>
          </div>
          <ol class="sos-steps">
            <li><span>1</span><p data-i18n="sos.1"></p></li>
            <li><span>2</span><p data-i18n="sos.2"></p></li>
            <li><span>3</span><p data-i18n="sos.3"></p></li>
            <li><span>4</span><p data-i18n="sos.4"></p></li>
          </ol>
        </div>
      </div>
    </section>

    <section class="section section--protect" id="protect" data-reveal>
      <div class="section__inner">
        <header class="section__head">
          <p class="eyebrow" data-i18n="lock.eyebrow"></p>
          <h2 data-i18n="lock.h2"></h2>
          <p data-i18n="lock.lead"></p>
        </header>
        <ol class="steps">
          <li class="step"><div class="step__index">1</div><div class="step__body"><h3 data-i18n="lock.1.title"></h3><p data-i18n="lock.1.lead"></p></div></li>
          <li class="step"><div class="step__index">2</div><div class="step__body"><h3 data-i18n="lock.2.title"></h3><p data-i18n="lock.2.lead"></p></div></li>
          <li class="step"><div class="step__index">3</div><div class="step__body"><h3 data-i18n="lock.3.title"></h3><p data-i18n="lock.3.lead"></p></div></li>
          <li class="step"><div class="step__index">4</div><div class="step__body"><h3 data-i18n="lock.4.title"></h3><p data-i18n="lock.4.lead"></p></div></li>
          <li class="step"><div class="step__index">5</div><div class="step__body"><h3 data-i18n="lock.5.title"></h3><p data-i18n="lock.5.lead"></p></div></li>
        </ol>
      </div>
    </section>

    <section class="section section--habits" id="habits" data-reveal>
      <div class="section__inner">
        <header class="section__head">
          <p class="eyebrow" data-i18n="check.eyebrow"></p>
          <h2 data-i18n="check.h2"></h2>
          <p data-i18n="check.lead"></p>
        </header>
        <div class="checklist-panel" data-checklist>
          <div class="checklist-progress" aria-live="polite">
            <div class="checklist-progress__meta">
              <span data-progress-label data-i18n="check.progress" data-i18n-var-done="0" data-i18n-var-total="8">Done 0 / 8</span>
              <strong data-progress-pct>0%</strong>
            </div>
            <div class="checklist-progress__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-progress-bar>
              <span data-progress-fill></span>
            </div>
          </div>
          <ul class="checklist">
            <li><label><input type="checkbox" data-check value="2fa" /><span data-i18n="check.1"></span></label></li>
            <li><label><input type="checkbox" data-check value="no-code" /><span data-i18n="check.2"></span></label></li>
            <li><label><input type="checkbox" data-check value="devices" /><span data-i18n="check.3"></span></label></li>
            <li><label><input type="checkbox" data-check value="official-app" /><span data-i18n="check.4"></span></label></li>
            <li><label><input type="checkbox" data-check value="lock" /><span data-i18n="check.5"></span></label></li>
            <li><label><input type="checkbox" data-check value="links" /><span data-i18n="check.6"></span></label></li>
            <li><label><input type="checkbox" data-check value="backup" /><span data-i18n="check.7"></span></label></li>
            <li><label><input type="checkbox" data-check value="report" /><span data-i18n="check.8"></span></label></li>
          </ul>
          <button class="btn btn--ghost btn--small" type="button" data-reset-checklist data-i18n="check.clear">Clear checks</button>
        </div>
      </div>
    </section>

    <section class="section" id="flash" data-reveal>
      <div class="section__inner">
        <header class="section__head">
          <p class="eyebrow" data-i18n="flash.eyebrow"></p>
          <h2 data-i18n="flash.h2"></h2>
          <p data-i18n="flash.lead"></p>
        </header>
        <div class="flash-news">${flashNews}</div>
        <p style="margin-top:1.25rem"><a class="btn btn--ghost" href="${enterLink("news.html")}" target="_blank" rel="noopener noreferrer" data-i18n="view.all.news"></a></p>
      </div>
    </section>

    <section class="section section--hubs" data-reveal>
      <div class="section__inner">
        <header class="section__head">
          <p class="eyebrow" data-i18n="extend.eyebrow"></p>
          <h2 data-i18n="extend.h2"></h2>
          <p data-i18n="extend.lead"></p>
        </header>
        <div class="hub-grid">
          <a class="hub-card" href="${enterLink("tools.html")}" target="_blank" rel="noopener noreferrer">
            <span class="hub-card__label" data-i18n="extend.tools.label"></span>
            <h3 data-i18n="extend.tools.title"></h3>
            <p data-i18n="extend.tools.lead"></p>
            <span class="article-card__more" data-i18n="extend.tools.cta"></span>
          </a>
          <a class="hub-card" href="${enterLink("news.html")}" target="_blank" rel="noopener noreferrer">
            <span class="hub-card__label" data-i18n="extend.news.label"></span>
            <h3 data-i18n="extend.news.title"></h3>
            <p data-i18n="extend.news.lead"></p>
            <span class="article-card__more" data-i18n="extend.news.cta"></span>
          </a>
        </div>
      </div>
    </section>

    <section class="section section--remind" data-reveal>
      <div class="section__inner narrow">
        <h2 data-i18n="closing.h2"></h2>
        <blockquote><p data-i18n="closing.lead"></p></blockquote>
      </div>
    </section>
  `,
});

const articleCards = articles
  .map(
    (a, i) => `
    <a class="article-card" href="articles/${a.slug}.html">
      <span class="article-card__meta"><span data-content="articles.${a.slug}.category">${a.category}</span> · <span data-content="articles.${a.slug}.read">${a.read}</span></span>
      <h3 data-content="articles.${a.slug}.title">${a.title}</h3>
      <p data-content="articles.${a.slug}.excerpt">${a.excerpt}</p>
      <span class="article-card__more" data-i18n="read.more">Read full article</span>
    </a>`
  )
  .join("");

const articlesPage = shell({
  title: `全部文章 · ${SITE}`,
  description: `${SITE}全部 ${TOTAL} 篇 WhatsApp 防盗完整长文目录。`,
  titleKey: "articles.title",
  root: ".",
  content: `
    <section class="page-hero">
      <div class="page-hero__inner">
        <p class="eyebrow" data-i18n="articles.eyebrow"></p>
        <h1 data-i18n="articles.h1"></h1>
        <p data-i18n="articles.lead"></p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="section__inner">
        <div class="article-grid">${articleCards}</div>
      </div>
    </section>
  `,
});

const toolsHtml = tools
  .map(
    (t) => `
    <article class="tool-card" id="${t.id}">
      <div class="tool-card__top">
        <span class="tool-card__tier" data-content="tools.${t.id}.tier">${t.tier}</span>
        <span class="tool-card__plat" data-content="tools.${t.id}.platforms">${t.platforms}</span>
      </div>
      <h2 data-content="tools.${t.id}.name">${t.name}</h2>
      <p class="tool-card__summary" data-content="tools.${t.id}.summary">${t.summary}</p>
      ${
        t.cover
          ? `<figure class="tool-media">
        <img src="${t.cover}" alt="${t.name}" loading="lazy" width="800" height="600" data-content="tools.${t.id}.name" data-content-attr="alt" />
        <figcaption data-i18n="tools.fig.soft"></figcaption>
      </figure>`
          : ""
      }
      <h3 data-i18n="tools.why"></h3>
      <ul data-content-list="tools.${t.id}.why">${t.why.map((x) => `<li>${x}</li>`).join("")}</ul>
      <h3 data-i18n="tools.how"></h3>
      <div class="steps-board">
        <p class="steps-board__caption" data-content="tools.${t.id}.stepsCaption">${t.stepsCaption || ""}</p>
        <ol class="steps-board__list" data-content-list="tools.${t.id}.steps">
          ${t.steps
            .map(
              (x, i) =>
                `<li><span class="steps-board__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><p>${x}</p></li>`
            )
            .join("")}
        </ol>
      </div>
      <div class="tool-card__links">
        ${t.links
          .map(
            (l, li) =>
              `<a class="btn btn--ghost btn--small" href="${l.href}" target="_blank" rel="noopener noreferrer" data-content-link-label="tools.${t.id}.links.${li}.label">${l.label}</a>`
          )
          .join("")}
      </div>
      <p class="tool-card__caution"><strong data-i18n="tools.caution">Note:</strong> <span data-content="tools.${t.id}.caution">${t.caution}</span></p>
    </article>`
  )
  .join("");

const toolsPage = shell({
  title: `${toolsIntro.title} · ${SITE}`,
  description: toolsIntro.lead,
  titleKey: "tools.title",
  root: ".",
  content: `
    <section class="page-hero">
      <div class="page-hero__inner">
        <p class="eyebrow" data-i18n="tools.eyebrow"></p>
        <h1 data-i18n="tools.h1"></h1>
        <p data-i18n="tools.lead"></p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="section__inner tools-stack">
        ${toolsHtml}
        <aside class="avoid-box">
          <h2 data-i18n="tools.avoid.h2"></h2>
          <ul data-content-list="toolsAvoid">${toolsAvoid.map((x) => `<li>${x}</li>`).join("")}</ul>
          <p data-i18n="tools.avoid.note"></p>
        </aside>
      </div>
    </section>
  `,
});

const newsCards = news
  .map(
    (n, i) => `
    <a class="news-card" href="news/${n.slug}.html">
      <span class="news-card__meta"><span data-content="news.${n.slug}.region">${n.region}</span> · <span data-content="news.${n.slug}.date">${n.date}</span></span>
      <h3 data-content="news.${n.slug}.title">${n.title}</h3>
      <p data-content="news.${n.slug}.excerpt">${n.excerpt}</p>
      <span class="article-card__more" data-i18n="news.read">Read full digest</span>
    </a>`
  )
  .join("");

const newsPage = shell({
  title: `${newsIntro.title} · ${SITE}`,
  description: newsIntro.lead,
  titleKey: "news.title",
  root: ".",
  content: `
    <section class="page-hero">
      <div class="page-hero__inner">
        <p class="eyebrow" data-i18n="news.eyebrow"></p>
        <h1 data-i18n="news.h1"></h1>
        <p data-i18n="news.lead"></p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="section__inner">
        <div class="news-grid">${newsCards}</div>
      </div>
    </section>
  `,
});

mkdirSync(join(__dirname, "articles"), { recursive: true });
mkdirSync(join(__dirname, "news"), { recursive: true });
const enterPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${SITE}入口：${TAGLINE}" />
  <title data-i18n="enter.title">Enter ${SITE}</title>
  <script>
    (function () {
      if (/github\\.io$/i.test(location.hostname)) {
        var b = document.createElement("base");
        b.href = "/guardline/";
        document.head.insertBefore(b, document.head.firstChild);
      }
    })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${FONT_HREF}" rel="stylesheet" />
  <link rel="stylesheet" href="${v("enter.css")}" />
  <link rel="stylesheet" href="${v("safari-gate.css")}" />
</head>
<body class="enter-body" data-i18n-page-title="enter.title">
  <div class="enter-bg" aria-hidden="true"></div>
  <div class="enter-grid" aria-hidden="true"></div>
  <div class="enter-orbs" aria-hidden="true">
    <span></span><span></span><span></span>
  </div>

  <main class="enter-stage" id="enter-stage">
    <p class="enter-kicker" data-i18n="enter.kicker">WHATSAPP ANTI-THEFT HANDBOOK</p>
    <h1 class="enter-brand" aria-label="${SITE}">${wordmark("wordmark--splash")}</h1>
    <p class="enter-brand-tag">Your number stays yours.</p>

    <button class="enter-btn" type="button" id="enter-btn" data-i18n="enter.aria" data-i18n-attr="aria-label" aria-label="Enter ${SITE}">
      <span class="enter-btn__label">ENTER</span>
      <span class="enter-btn__sub" data-i18n="enter.btn.sub"></span>
    </button>
    <p class="enter-hint" data-i18n="enter.hint"></p>

    <p class="enter-lead enter-ad"><span data-i18n="enter.lead">Don't wait until your WhatsApp is stolen. Learn the 4 moves that stop most takeovers: never share the 6-digit code, turn on a two-step PIN today, kick out unknown linked devices weekly, and follow the recovery playbook if you get locked out.</span><br /><span class="enter-ad__meta" data-i18n="enter.lead.meta">Free practical handbook · step-by-step protection · live scam alerts from around the world</span></p>

    <div class="enter-features">
      <div class="enter-feature">
        <strong>30</strong>
        <span data-i18n="enter.feat.articles"></span>
      </div>
      <div class="enter-feature">
        <strong>8</strong>
        <span data-i18n="enter.feat.tools"></span>
      </div>
      <div class="enter-feature">
        <strong>20</strong>
        <span data-i18n="enter.feat.news"></span>
      </div>
    </div>

    <ul class="enter-points">
      <li data-i18n="enter.point1"></li>
      <li data-i18n="enter.point2"></li>
      <li data-i18n="enter.point3"></li>
      <li data-i18n="enter.point4"></li>
    </ul>
  </main>

  <div class="loader" id="loader" hidden aria-live="polite" aria-busy="false">
    <div class="loader__panel">
      <div class="loader__ring" aria-hidden="true"></div>
      <p class="loader__brand">${wordmark("wordmark--loader")}</p>
      <p class="loader__status" id="loader-status" data-i18n="loader.msg0"></p>
      <div class="loader__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="loader-bar">
        <i id="loader-fill"></i>
      </div>
      <p class="loader__pct"><span id="loader-pct">0</span>%</p>
      <ul class="loader__steps" id="loader-steps">
        <li data-i18n="loader.step0"></li>
        <li data-i18n="loader.step1"></li>
        <li data-i18n="loader.step2"></li>
        <li data-i18n="loader.step3"></li>
        <li data-i18n="loader.step4"></li>
      </ul>
    </div>
  </div>

  <script src="${v("locales.js")}"></script>
  <script src="${v("i18n.js")}"></script>
  <script src="${v("safari-gate.js")}"></script>
  <script src="${v("enter.js")}"></script>
</body>
</html>`;

writeFileSync(join(__dirname, "home.html"), home);
writeFileSync(join(__dirname, "index.html"), enterPage);
writeFileSync(join(__dirname, "articles.html"), articlesPage);
writeFileSync(join(__dirname, "tools.html"), toolsPage);
writeFileSync(join(__dirname, "news.html"), newsPage);

articles.forEach((article, index) => {
  const prev = articles[index - 1];
  const next = articles[index + 1];
  const prevLink = prev
    ? `<a class="prev" href="${prev.slug}.html">← <span data-content="articles.${prev.slug}.title">${prev.title}</span></a>`
    : `<span></span>`;
  const nextLink = next
    ? `<a class="next" href="${next.slug}.html"><span data-content="articles.${next.slug}.title">${next.title}</span> →</a>`
    : `<span></span>`;

  const page = shell({
    title: `${article.title} · ${SITE}`,
    description: article.excerpt,
    root: "..",
    content: `
      <article class="article-layout">
        <p class="eyebrow" data-content="articles.${article.slug}.category">${article.category}</p>
        <h1 class="article-title" data-content="articles.${article.slug}.title" data-page-title-content="articles.${article.slug}.title">${article.title}</h1>
        <div class="article-meta">
          <span class="tag" data-i18n="article.of" data-i18n-var-n="${index + 1}" data-i18n-var-total="${TOTAL}">Article ${index + 1} / ${TOTAL}</span>
          <span data-content="articles.${article.slug}.read">${article.read}</span>
        </div>
        <div class="article-body">
          <div data-content="articles.${article.slug}.body" data-content-html>${article.body}</div>
          <div class="article-nav">${prevLink}${nextLink}</div>
        </div>
      </article>
    `,
  }).replace(
    `<meta name="description" content="${article.excerpt}" />`,
    `<meta name="description" content="${article.excerpt}" data-content="articles.${article.slug}.excerpt" />`
  );

  writeFileSync(join(__dirname, "articles", `${article.slug}.html`), page);
});

news.forEach((item, index) => {
  const prev = news[index - 1];
  const next = news[index + 1];
  const prevLink = prev
    ? `<a class="prev" href="${prev.slug}.html">← <span data-content="news.${prev.slug}.title">${prev.title}</span></a>`
    : `<span></span>`;
  const nextLink = next
    ? `<a class="next" href="${next.slug}.html"><span data-content="news.${next.slug}.title">${next.title}</span> →</a>`
    : `<span></span>`;

  const page = shell({
    title: `${item.title} · ${SITE}`,
    description: item.excerpt,
    root: "..",
    content: `
      <article class="article-layout">
        <p class="eyebrow"><span data-content="news.${item.slug}.region">${item.region}</span> · <span data-i18n="news.eyebrow">World news</span></p>
        <h1 class="article-title" data-content="news.${item.slug}.title" data-page-title-content="news.${item.slug}.title">${item.title}</h1>
        <div class="article-meta">
          <span class="tag" data-i18n="news.of" data-i18n-var-n="${index + 1}" data-i18n-var-total="${NEWS_TOTAL}">Digest ${index + 1} / ${NEWS_TOTAL}</span>
          <span data-content="news.${item.slug}.date">${item.date}</span>
          <span><span data-i18n="source.label">Source:</span> <span data-content="news.${item.slug}.source">${item.source}</span></span>
        </div>
        <div class="article-body">
          <div data-content="news.${item.slug}.body" data-content-html>${item.body}</div>
          <p class="news-source"><a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" data-i18n="news.source">View original public source →</a></p>
          <div class="article-nav">${prevLink}${nextLink}</div>
        </div>
      </article>
    `,
  }).replace(
    `<meta name="description" content="${item.excerpt}" />`,
    `<meta name="description" content="${item.excerpt}" data-content="news.${item.slug}.excerpt" />`
  );

  writeFileSync(join(__dirname, "news", `${item.slug}.html`), page);
});

console.log(
  `Generated ${SITE}: enter + home + ${TOTAL} articles + tools + ${NEWS_TOTAL} news`
);
