/**
 * 1) Instantly seed every missing lang with English (no more Chinese bleed).
 * 2) Turbo-translate remaining langs from EN in parallel workers.
 * Usage: node content/seed-and-turbo.mjs
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { languages } from "../i18n/languages.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)));
const packsDir = join(root, "packs");
mkdirSync(packsDir, { recursive: true });

const en = JSON.parse(readFileSync(join(packsDir, "en.json"), "utf8"));
const zhCN = JSON.parse(readFileSync(join(packsDir, "zh-CN.json"), "utf8"));

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

function writeBundle() {
  const bundle = {};
  for (const { code } of languages) {
    const p = join(packsDir, `${code}.json`);
    if (existsSync(p)) bundle[code] = JSON.parse(readFileSync(p, "utf8"));
    else bundle[code] = code.startsWith("zh") ? zhCN : en;
  }
  writeFileSync(
    join(root, "..", "content-locales.js"),
    `/* Auto-generated content translations */\nwindow.SHOUHAO_CONTENT = ${JSON.stringify(bundle)};\n`
  );
  console.log(
    "bundled",
    Object.keys(bundle).length,
    "≈",
    Math.round(JSON.stringify(bundle).length / 1024),
    "KB"
  );
}

// Instant seed
for (const { code } of languages) {
  const p = join(packsDir, `${code}.json`);
  if (existsSync(p)) continue;
  writeFileSync(p, JSON.stringify(code.startsWith("zh") ? zhCN : en));
  console.log("seed", code);
}
writeBundle();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function collect(value, out) {
  if (Array.isArray(value)) return value.forEach((v) => collect(v, out));
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === "href") continue;
      if (k === "body") {
        String(v)
          .split(/(<[^>]+>)/g)
          .forEach((part) => {
            if (part && !part.startsWith("<") && part.trim()) out.add(part);
          });
        continue;
      }
      collect(v, out);
    }
    return;
  }
  if (typeof value === "string" && value.trim()) out.add(value);
}

function apply(value, map) {
  if (Array.isArray(value)) return value.map((v) => apply(v, map));
  if (value && typeof value === "object") {
    const next = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === "href") next[k] = v;
      else if (k === "body") {
        next[k] = String(v)
          .split(/(<[^>]+>)/g)
          .map((part) => {
            if (!part || part.startsWith("<") || !part.trim()) return part;
            return map.get(part) || part;
          })
          .join("");
      } else next[k] = apply(v, map);
    }
    return next;
  }
  if (typeof value === "string") return map.get(value) || value;
  return value;
}

async function translateOne(text, tl) {
  // Prefer EN→target for speed/quality on seeded packs
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
      return (data?.[0] || []).map((r) => r?.[0] || "").join("") || text;
    } catch {
      await sleep(120 * (a + 1));
    }
  }
  return text;
}

async function translateLang(code, concurrency = 28) {
  if (code === "en" || code === "zh-CN" || code === "zh-TW") return;
  const marker = join(packsDir, `${code}.done`);
  if (existsSync(marker)) {
    console.log("done-skip", code);
    return;
  }
  const tl = googleLang[code] || "en";
  const strings = new Set();
  collect(en, strings);
  const list = [...strings];
  const map = new Map();
  let i = 0;
  let finished = 0;
  console.log(`turbo ${code} → ${tl} n=${list.length}`);
  async function worker() {
    while (i < list.length) {
      const idx = i++;
      const src = list[idx];
      if (src.length > 1500) {
        const chunks = [];
        let buf = "";
        for (const p of src.split(/(?<=[.!?\n])/)) {
          if ((buf + p).length > 1400) {
            if (buf) chunks.push(buf);
            buf = p;
          } else buf += p;
        }
        if (buf) chunks.push(buf);
        let out = "";
        for (const c of chunks) out += await translateOne(c, tl);
        map.set(src, out);
      } else {
        map.set(src, await translateOne(src, tl));
      }
      finished++;
      if (finished % 80 === 0) console.log(`  ${code} ${finished}/${list.length}`);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  const pack = apply(en, map);
  writeFileSync(join(packsDir, `${code}.json`), JSON.stringify(pack));
  writeFileSync(marker, "1");
  console.log("saved", code);
}

// Priority first, then the rest — 4 langs at a time
const priority = ["ms", "id", "vi", "th", "ja", "ko", "es", "fr", "de", "ar", "hi", "tl"];
const rest = languages
  .map((l) => l.code)
  .filter((c) => !["en", "zh-CN", "zh-TW", ...priority].includes(c));
const queue = [...priority, ...rest];

const PARALLEL = 4;
for (let i = 0; i < queue.length; i += PARALLEL) {
  const batch = queue.slice(i, i + PARALLEL);
  await Promise.all(batch.map((code) => translateLang(code)));
  writeBundle();
}

writeBundle();
console.log("ALL CONTENT LANGS READY");
