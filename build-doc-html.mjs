import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const imgs = JSON.parse(readFileSync(join(root, "_embed-imgs.json"), "utf8"));
const LIVE = "https://anniewandi26-dev.github.io/guardline/";
const REPO = "https://github.com/anniewandi26-dev/guardline";

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>GuardLine 完整说明文档 · WhatsApp 防盗手册</title>
<style>
:root{
  --ink:#0e231c; --foam:#e8f5ef; --jade:#0b7a53; --teal:#0a6e7c;
  --mint:#7ed0ad; --wa:#25d366; --bg:#071510; --card:rgba(18,52,42,.92);
  --mute:rgba(232,245,239,.78);
  --font:"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0; color:var(--foam); font-family:var(--font); line-height:1.65;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(37,211,102,.18), transparent 45%),
    radial-gradient(ellipse at 90% 20%, rgba(10,110,124,.22), transparent 40%),
    var(--bg);
}
a{color:#9ef0c4}
img{max-width:100%; height:auto; display:block; border-radius:14px}
.wrap{width:min(920px,100% - 2rem); margin:0 auto; padding:2.5rem 0 4rem}
.hero{
  position:relative; overflow:hidden; border-radius:24px; margin-bottom:2rem;
  border:1px solid rgba(126,208,173,.28);
  box-shadow:0 24px 60px rgba(0,0,0,.35);
}
.hero__bg{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(.45) saturate(1.1)}
.hero__content{position:relative; z-index:1; padding:clamp(1.6rem,4vw,2.8rem)}
.kicker{letter-spacing:.16em; font-size:.85rem; font-weight:700; color:rgba(167,230,198,.95); margin:0 0 .6rem}
h1{margin:0; font-size:clamp(1.8rem,5vw,2.6rem); letter-spacing:-.03em; line-height:1.15}
.tag{margin:.7rem 0 0; font-size:1.1rem; color:rgba(220,245,232,.92)}
.lead{margin:1rem 0 0; max-width:38rem; color:var(--mute)}
.cta{
  display:inline-block; margin-top:1.25rem; padding:.9rem 1.4rem; border-radius:999px;
  background:linear-gradient(135deg,#d8f5e6,#7ed0ad 45%,#25d366); color:#062018;
  font-weight:800; text-decoration:none; box-shadow:0 12px 28px rgba(18,140,126,.35);
}
.cta:hover{filter:brightness(1.05)}
.meta{
  display:flex; flex-wrap:wrap; gap:.55rem; margin-top:1.2rem;
}
.pill{
  padding:.35rem .7rem; border-radius:999px; font-size:.78rem; font-weight:600;
  background:rgba(255,255,255,.08); border:1px solid rgba(232,245,239,.16);
}
nav.toc{
  position:sticky; top:0; z-index:20; backdrop-filter:blur(12px);
  background:rgba(7,21,16,.82); border:1px solid rgba(126,208,173,.22);
  border-radius:16px; padding:.85rem 1rem; margin:0 0 1.75rem;
}
nav.toc strong{display:block; margin-bottom:.45rem; font-size:.85rem; color:var(--mint)}
nav.toc div{display:flex; flex-wrap:wrap; gap:.45rem .7rem}
nav.toc a{font-size:.86rem; text-decoration:none; color:rgba(232,245,239,.9)}
nav.toc a:hover{color:#fff}
section{
  margin:0 0 1.5rem; padding:1.35rem 1.25rem 1.4rem; border-radius:20px;
  background:var(--card); border:1px solid rgba(126,208,173,.22);
}
h2{margin:0 0 .75rem; font-size:1.25rem; color:#f2fbf6}
h3{margin:1.1rem 0 .45rem; font-size:1.02rem; color:#c8f0dc}
p,li{color:var(--mute)}
ul{padding-left:1.15rem; margin:.4rem 0}
.grid{display:grid; gap:.85rem; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); margin-top:.9rem}
.card{
  padding:.95rem; border-radius:14px; background:rgba(0,0,0,.22);
  border:1px solid rgba(126,208,173,.18);
}
.card strong{display:block; color:#fff; margin-bottom:.25rem}
.fig{margin:1rem 0 0}
.fig figcaption{margin-top:.45rem; font-size:.82rem; color:rgba(167,230,198,.9)}
.note{
  margin-top:1rem; padding:.85rem 1rem; border-radius:12px;
  background:rgba(37,211,102,.1); border:1px solid rgba(37,211,102,.28);
  color:rgba(200,240,220,.95); font-size:.92rem;
}
.warn{
  margin-top:1rem; padding:.85rem 1rem; border-radius:12px;
  background:rgba(255,180,80,.1); border:1px solid rgba(255,180,80,.28);
  color:#ffe0b0; font-size:.92rem;
}
.code{
  font-family:ui-monospace,Consolas,monospace; font-size:.86rem;
  background:rgba(0,0,0,.35); padding:.15rem .4rem; border-radius:6px; color:#c8f5dc;
}
.footer{margin-top:2rem; text-align:center; color:rgba(232,245,239,.5); font-size:.84rem}
.shot-row{display:grid; gap:.8rem; grid-template-columns:1fr 1fr; margin-top:.9rem}
@media (max-width:640px){.shot-row{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="wrap">

<header class="hero">
  <img class="hero__bg" src="${imgs.enter}" alt="GuardLine 进入页氛围背景" />
  <div class="hero__content">
    <p class="kicker">GUARDLINE · 版本说明文档</p>
    <h1>GuardLine<br />WhatsApp 防盗完整手册</h1>
    <p class="tag">Your number stays yours.</p>
    <p class="lead">本文件为<strong>单文件 HTML</strong>完整说明：可双击用浏览器打开，也可直接发给别人。内含功能说明与内嵌图片，无需 ZIP、无需安装。</p>
    <a class="cta" href="${LIVE}" target="_blank" rel="noopener">打开永久公网网站 →</a>
    <div class="meta">
      <span class="pill">30 篇防盗长文</span>
      <span class="pill">8 款防护工具</span>
      <span class="pill">20 篇国际新闻</span>
      <span class="pill">36 种语言 · 跟 IP</span>
      <span class="pill">Safari 强制引导</span>
    </div>
  </div>
</header>

<nav class="toc" aria-label="目录">
  <strong>目录</strong>
  <div>
    <a href="#overview">1. 产品概述</a>
    <a href="#live">2. 永久链接</a>
    <a href="#features">3. 全部功能</a>
    <a href="#enter">4. 进入页</a>
    <a href="#safari">5. Safari 引导</a>
    <a href="#i18n">6. 多语言</a>
    <a href="#content">7. 内容结构</a>
    <a href="#photos">8. 图片预览</a>
    <a href="#send">9. 如何发送</a>
    <a href="#tech">10. 技术说明</a>
  </div>
</nav>

<section id="overview">
  <h2>1. 产品概述</h2>
  <p><strong>GuardLine</strong> 是一套 WhatsApp 防盗实用手册网站（静态站点）。目标是教用户：验证码纪律、两步验证、关联设备清查、被盗夺回、家庭防护，以及识别全球常见骗局。</p>
  <p>品牌采用自有名称 <span class="code">GuardLine</span>（Guard + Line），避免把 WhatsApp 写进品牌名造成商标风险；正文与副标题可描述 WhatsApp 防护主题。</p>
  <div class="note">本说明文档对应当前已部署版本。完整可交互网站请用下方永久公网链接打开（手机 Safari / 电脑均可）。</div>
</section>

<section id="live">
  <h2>2. 永久公网链接</h2>
  <p>已通过 GitHub Pages 发布，长期可用：</p>
  <ul>
    <li>网站：<a href="${LIVE}" target="_blank" rel="noopener">${LIVE}</a></li>
    <li>仓库：<a href="${REPO}" target="_blank" rel="noopener">${REPO}</a></li>
  </ul>
  <div class="warn">手机请用上面的 <strong>github.io</strong> 链接，不要用 <span class="code">127.0.0.1</span>（那是本机地址，手机打不开电脑网站）。</div>
</section>

<section id="features">
  <h2>3. 全部功能一览</h2>
  <div class="grid">
    <div class="card"><strong>进入页 ENTER</strong>品牌展示 + 防盗广告文案 + 5 秒加载后进入首页</div>
    <div class="card"><strong>30 篇长文</strong>验证码、2FA、关联设备、钓鱼、夺回、家庭、商务、旅行等</div>
    <div class="card"><strong>防护工具页</strong>推荐官方与可信工具，含步骤示意插图</div>
    <div class="card"><strong>国际新闻 20 篇</strong>公开通报整理，帮助识别新骗局</div>
    <div class="card"><strong>36 语 i18n</strong>默认按访问者 IP 地区选语言，可手动切换</div>
    <div class="card"><strong>Safari 门禁</strong>非 Safari 弹出不可关闭引导层，优先引导用 Safari 打开</div>
    <div class="card"><strong>内容随语言换</strong>文章/新闻/工具正文与 UI 一起切换</div>
    <div class="card"><strong>Loading 过渡</strong>站内新开页经 loading 动画再到达目标页</div>
  </div>
</section>

<section id="enter">
  <h2>4. 进入页体验</h2>
  <p>用户打开站点根路径后看到进入页：大品牌 <strong>GuardLine</strong>、口号 <em>Your number stays yours.</em>、中间 ENTER 按钮、下方防盗广告文案（四步守号），以及 30 / 8 / 20 功能要点。</p>
  <p>点击 ENTER（或按键盘 Enter）→ 约 5 秒加载动画 → 进入 <span class="code">home.html</span> 首页。</p>
  <figure class="fig">
    <img src="${imgs.hero}" alt="首页氛围图" />
    <figcaption>站点视觉：深绿 / 翡翠色安全氛围（首页大气图）。</figcaption>
  </figure>
</section>

<section id="safari">
  <h2>5. Safari 强制引导</h2>
  <p>若检测到<strong>不是</strong> Apple Safari（例如微信内置浏览器、Chrome、电脑其他浏览器），会立刻出现全屏引导层：</p>
  <ul>
    <li>讲解 GuardLine 能帮用户做什么（30 长文 / 工具 / 国际警报）</li>
    <li>提示用 Safari 打开观感与操作更好</li>
    <li>注明：Safari 打开后站点正常运行，提示保持隐藏</li>
    <li>按钮「使用 Safari 浏览器打开」；弹窗不可自行关闭</li>
    <li>文案随 IP / 语言切换（36 语）</li>
    <li>背景为 WhatsApp 防护氛围图（见下）</li>
  </ul>
  <figure class="fig">
    <img src="${imgs.safari}" alt="Safari 引导层 WhatsApp 氛围背景" />
    <figcaption>Safari 引导层背景：聊天气泡 / 防护氛围（非官方商标标识）。</figcaption>
  </figure>
  <div class="note">真机 Safari（iPhone / iPad / Mac）检测通过后<strong>不会</strong>弹出该层，可正常使用全站。</div>
</section>

<section id="i18n">
  <h2>6. 多语言（跟 IP）</h2>
  <p>打开网站时自动根据 IP 地区匹配语言（界面不写「跟随 IP」字样，只显示语言选择）。用户也可手动切换；手动选择仅当前会话有效，下次打开仍优先按 IP。</p>
  <p>覆盖约 36 种语言，包括：简体中文、繁体中文、English、Bahasa Melayu、日本語、한국어、Español、Français、العربية 等。</p>
  <p>切换语言时：导航/页脚/进入页广告/Safari 弹窗，以及文章标题、摘要、正文、新闻日期地区等都会跟着变。</p>
</section>

<section id="content">
  <h2>7. 内容结构</h2>
  <h3>文章（30）</h3>
  <ul>
    <li>验证码永不外传、两步验证、关联设备</li>
    <li>假投票/抽奖、连环盗号、投屏骗码、合并通话听码</li>
    <li>SIM 换卡、钓鱼站、夺回账号、未知 PIN、被盗征兆</li>
    <li>熟人借钱核身、隐私设置、只用正版、手机锁</li>
    <li>WhatsApp Web、封锁举报、家庭长辈、加密误区与备份</li>
    <li>应用锁、聊天锁定、商务号、换机、群组骗局</li>
    <li>AI 语音冒充、青少年、出行漫游、30 天总清单</li>
  </ul>
  <h3>工具（8）</h3>
  <p>含官方 WhatsApp 安全能力、系统内置防护、ScamShield、Play Protect、杀毒、密码管理等推荐与步骤插图。</p>
  <h3>新闻（20）</h3>
  <p>整理新加坡、瑞士、香港、英国、马来西亚、印度、加勒比、Meta 等公开通报与报道要点。</p>
</section>

<section id="photos">
  <h2>8. 图片预览（已内嵌本文件）</h2>
  <p>以下图片已编码进本 HTML，发给别人也能看见，不依赖外链。</p>
  <div class="shot-row">
    <figure class="fig">
      <img src="${imgs.wa}" alt="WhatsApp 官方安全工具示意" />
      <figcaption>工具示意：官方 WhatsApp 安全相关</figcaption>
    </figure>
    <figure class="fig">
      <img src="${imgs.builtin}" alt="系统内置安全示意" />
      <figcaption>工具示意：系统内置安全能力</figcaption>
    </figure>
  </div>
  <div class="shot-row">
    <figure class="fig">
      <img src="${imgs.desktop}" alt="桌面端安全示意" />
      <figcaption>工具示意：桌面端关联与安全</figcaption>
    </figure>
    <figure class="fig">
      <img src="${imgs.scamshield}" alt="ScamShield 示意" />
      <figcaption>工具示意：ScamShield 类防诈工具</figcaption>
    </figure>
  </div>
  <div class="warn">本版本站点以图文为主，仓库内<strong>没有单独影片文件</strong>；若需要影片讲解，可后续再补进网站与本说明。</div>
</section>

<section id="send">
  <h2>9. 如何发送给别人</h2>
  <ol>
    <li>把本文件 <span class="code">GuardLine-完整说明.html</span> 用微信 / 邮件 / AirDrop 发出去即可。</li>
    <li>对方双击用浏览器打开（推荐 Safari / Chrome）。</li>
    <li>若要体验完整可点进站功能，请打开永久网站：<a href="${LIVE}" target="_blank" rel="noopener">${LIVE}</a></li>
  </ol>
  <div class="note">本说明是「单文件说明书」；完整 30 篇长文 + 工具 + 新闻交互站在 GitHub Pages 上，体积更大，适合在线访问。</div>
</section>

<section id="tech">
  <h2>10. 技术说明（给维护者）</h2>
  <ul>
    <li>静态 HTML / CSS / JS，可用 <span class="code">npx serve</span> 本地预览</li>
    <li>生成器：<span class="code">generate.mjs</span>；语言包：<span class="code">build-i18n.mjs</span></li>
    <li>Safari 门禁：<span class="code">safari-gate.js</span> + <span class="code">safari-gate.css</span></li>
    <li>部署：GitHub 仓库 <span class="code">anniewandi26-dev/guardline</span> → Pages（main / 根目录）</li>
    <li>进入页已去掉超大 <span class="code">content-locales.js</span> 首屏加载，减轻手机白屏</li>
  </ul>
</section>

<p class="footer">© 2026 GuardLine · 单文件完整说明 · 可直接发送<br />Live: ${LIVE}</p>
</div>
</body>
</html>`;

const out1 = join(root, "GuardLine-完整说明.html");
const out2 = join(process.env.USERPROFILE || root, "Desktop", "GuardLine-完整说明.html");
writeFileSync(out1, html);
try {
  copyFileSync(out1, out2);
  console.log("wrote", out1);
  console.log("wrote", out2);
} catch (e) {
  console.log("wrote", out1);
  console.warn("desktop copy skipped", e.message);
}
console.log("sizeMB", (Buffer.byteLength(html) / 1024 / 1024).toFixed(2));
