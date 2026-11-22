/** Tiny news date/region overlays for all 36 langs. */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { news } from "../news-data.mjs";
import { languages } from "../i18n/languages.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)));
const googleLang = {
  en: "en", "zh-CN": "zh-CN", "zh-TW": "zh-TW", ja: "ja", ko: "ko", es: "es",
  fr: "fr", de: "de", "pt-BR": "pt", "pt-PT": "pt", it: "it", ru: "ru", ar: "ar",
  hi: "hi", id: "id", ms: "ms", th: "th", vi: "vi", tr: "tr", pl: "pl", nl: "nl",
  sv: "sv", da: "da", fi: "fi", no: "no", cs: "cs", el: "el", he: "he", uk: "uk",
  ro: "ro", hu: "hu", bn: "bn", tl: "tl", sw: "sw", fa: "fa", ur: "ur",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const cache = new Map();

async function tr(text, tl) {
  if (!text || tl === "en") return text;
  const zhMap = {
    "2026 (Week 21)": "2026（第21周）",
    "2023-03-27 (method still used)": "2023-03-27（手法仍被沿用）",
    "Recent advisories": "近年通报",
    "Recent technical reports": "近年技术报道",
    "Public security blog": "公开安全博客",
    Ongoing: "持续更新",
    "Public alert": "公开警报",
    "H1 2025 disclosures": "2025 上半年相关披露",
    Singapore: "新加坡",
    Switzerland: "瑞士",
    Ireland: "爱尔兰",
    "Cayman Islands": "开曼群岛",
    "Trinidad and Tobago": "特立尼达和多巴哥",
    "Hong Kong": "香港",
    "U.K.": "英国",
    Malaysia: "马来西亚",
    India: "印度",
    Jamaica: "牙买加",
    Worldwide: "全球",
    "Global (platform)": "全球（平台方）",
    "International (security vendor)": "国际（安全厂商观察）",
  };
  if (tl === "zh-CN") return zhMap[text] || text;
  if (tl === "zh-TW") {
    const tw = {
      ...zhMap,
      近年通报: "近年通報",
      近年技术报道: "近年技術報導",
      公开安全博客: "公開安全部落格",
      持续更新: "持續更新",
      公开警报: "公開警報",
      "2025 上半年相关披露": "2025 上半年相關披露",
      新加坡: "新加坡",
      瑞士: "瑞士",
      香港: "香港",
      英国: "英國",
      马来西亚: "馬來西亞",
      印度: "印度",
      全球: "全球",
    };
    const base = zhMap[text] || text;
    return tw[base] || base;
  }
  const key = `${tl}::${text}`;
  if (cache.has(key)) return cache.get(key);
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
    encodeURIComponent(tl) +
    "&dt=t&q=" +
    encodeURIComponent(text);
  for (let a = 0; a < 4; a++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const out = (data?.[0] || []).map((r) => r?.[0] || "").join("") || text;
      cache.set(key, out);
      return out;
    } catch {
      await sleep(80 * (a + 1));
    }
  }
  return text;
}

const items = news.map((n) => ({ slug: n.slug, date: n.date, region: n.region }));
const unique = [...new Set(items.flatMap((i) => [i.date, i.region]))];
const out = {};

for (const { code } of languages) {
  const tl = googleLang[code] || "en";
  const map = {};
  await Promise.all(unique.map(async (s) => { map[s] = await tr(s, tl); }));
  out[code] = {};
  for (const item of items) {
    out[code][item.slug] = { date: map[item.date], region: map[item.region] };
  }
  console.log("ok", code);
}

writeFileSync(
  join(root, "..", "news-meta-locales.js"),
  `window.SHOUHAO_NEWS_META = ${JSON.stringify(out)};\n`
);
console.log("wrote news-meta-locales.js");
