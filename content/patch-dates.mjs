/** Add/translate news.*.date into every content pack, then rebuild content-locales.js */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { news } from "../news-data.mjs";
import { languages } from "../i18n/languages.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)));
const packsDir = join(root, "packs");

const googleLang = {
  en: "en",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  ja: "ja",
  ko: "ko",
  es: "es",
  fr: "fr",
  de: "de",
  "pt-BR": "pt",
  "pt-PT": "pt",
  it: "it",
  ru: "ru",
  ar: "ar",
  hi: "hi",
  id: "id",
  ms: "ms",
  th: "th",
  vi: "vi",
  tr: "tr",
  pl: "pl",
  nl: "nl",
  sv: "sv",
  da: "da",
  fi: "fi",
  no: "no",
  cs: "cs",
  el: "el",
  he: "he",
  uk: "uk",
  ro: "ro",
  hu: "hu",
  bn: "bn",
  tl: "tl",
  sw: "sw",
  fa: "fa",
  ur: "ur",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const cache = new Map();

async function tr(text, tl) {
  if (!text || tl === "zh-CN") return text;
  const key = `${tl}::${text}`;
  if (cache.has(key)) return cache.get(key);
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=" +
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
      await sleep(150 * (a + 1));
    }
  }
  cache.set(key, text);
  return text;
}

const dates = Object.fromEntries(news.map((n) => [n.slug, n.date]));

for (const { code } of languages) {
  const file = join(packsDir, `${code}.json`);
  const pack = JSON.parse(readFileSync(file, "utf8"));
  pack.news = pack.news || {};
  const tl = googleLang[code] || "en";
  for (const [slug, date] of Object.entries(dates)) {
    pack.news[slug] = pack.news[slug] || {};
    pack.news[slug].date = await tr(date, tl);
  }
  writeFileSync(file, JSON.stringify(pack));
  console.log("patched dates", code);
}

const bundle = {};
for (const { code } of languages) {
  bundle[code] = JSON.parse(readFileSync(join(packsDir, `${code}.json`), "utf8"));
}
writeFileSync(
  join(root, "..", "content-locales.js"),
  `/* Auto-generated content translations */\nwindow.SHOUHAO_CONTENT = ${JSON.stringify(bundle)};\n`
);
console.log("content-locales.js updated with dates");
