/**
 * Fast content translator: flatten unique strings → concurrent translate → rebuild.
 * node content/translate-all.mjs [--force] [--only=en,ms] [--meta-only]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { languages } from "../i18n/languages.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)));
const packsDir = join(root, "packs");
mkdirSync(packsDir, { recursive: true });

const source = JSON.parse(readFileSync(join(root, "source.zh-CN.json"), "utf8"));
const force = process.argv.includes("--force");
const metaOnly = process.argv.includes("--meta-only");
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg
  ? onlyArg.slice(7).split(",").map((s) => s.trim()).filter(Boolean)
  : null;

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

function collectStrings(value, out, opts = {}) {
  if (Array.isArray(value)) {
    value.forEach((v) => collectStrings(v, out, opts));
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === "href") continue;
      if (k === "body") {
        if (opts.skipBody) continue;
        String(v)
          .split(/(<[^>]+>)/g)
          .forEach((part) => {
            if (part && !part.startsWith("<") && part.trim()) out.add(part);
          });
        continue;
      }
      collectStrings(v, out, opts);
    }
    return;
  }
  if (typeof value === "string" && value.trim()) out.add(value);
}

async function translateOne(text, tl) {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=" +
    encodeURIComponent(tl) +
    "&dt=t&q=" +
    encodeURIComponent(text);
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return (data?.[0] || []).map((row) => row?.[0] || "").join("") || text;
    } catch (err) {
      await sleep(200 * (attempt + 1));
      if (attempt === 4) return text;
    }
  }
  return text;
}

async function buildMap(strings, tl, concurrency = 8) {
  const list = [...strings];
  const map = new Map();
  let cursor = 0;
  let done = 0;
  async function worker() {
    while (cursor < list.length) {
      const idx = cursor++;
      const src = list[idx];
      // chunk oversized
      if (src.length > 1600) {
        const pieces = src.split(/(?<=[。！？.!?\n])/);
        let buf = "";
        const chunks = [];
        for (const p of pieces) {
          if ((buf + p).length > 1500) {
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
      done += 1;
      if (done % 40 === 0) {
        process.stdout.write(`  ${tl} ${done}/${list.length}\n`);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return map;
}

function applyMap(value, map, opts = {}) {
  if (Array.isArray(value)) return value.map((v) => applyMap(v, map, opts));
  if (value && typeof value === "object") {
    const next = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === "href") next[k] = v;
      else if (k === "body") {
        if (opts.skipBody) next[k] = v;
        else {
          next[k] = String(v)
            .split(/(<[^>]+>)/g)
            .map((part) => {
              if (!part || part.startsWith("<") || !part.trim()) return part;
              return map.get(part) || part;
            })
            .join("");
        }
      } else next[k] = applyMap(v, map, opts);
    }
    return next;
  }
  if (typeof value === "string") return map.get(value) || value;
  return value;
}

async function buildLang(code) {
  const outPath = join(packsDir, `${code}.json`);
  if (code === "zh-CN") {
    writeFileSync(outPath, JSON.stringify(source));
    return source;
  }
  if (!force && existsSync(outPath) && !metaOnly) {
    console.log("skip", code);
    return JSON.parse(readFileSync(outPath, "utf8"));
  }

  // meta-only can refresh titles without wiping existing full packs
  let base = source;
  if (metaOnly && existsSync(outPath)) {
    base = JSON.parse(readFileSync(outPath, "utf8"));
  }

  const tl = googleLang[code] || "en";
  const strings = new Set();
  collectStrings(source, strings, { skipBody: metaOnly });
  console.log(`translating ${code} → ${tl} strings=${strings.size}`);
  const map = await buildMap(strings, tl, 10);
  const pack = applyMap(metaOnly && existsSync(outPath) ? base : source, map, {
    skipBody: metaOnly,
  });

  // If meta-only on fresh file, still need bodies: copy zh for now then fill later
  if (metaOnly && !existsSync(outPath)) {
    // bodies remain Chinese until full pass — overwrite bodies from map if we didn't skip
  }

  writeFileSync(outPath, JSON.stringify(pack));
  console.log("saved", code);
  return pack;
}

const targets = languages
  .map((l) => l.code)
  .filter((code) => !only || only.includes(code));

const bundle = {};
for (const { code } of languages) {
  const p = join(packsDir, `${code}.json`);
  if (existsSync(p)) bundle[code] = JSON.parse(readFileSync(p, "utf8"));
}

for (const code of targets) {
  bundle[code] = await buildLang(code);
}

for (const { code } of languages) {
  if (!bundle[code]) bundle[code] = bundle.en || bundle["zh-CN"] || source;
}

writeFileSync(
  join(root, "..", "content-locales.js"),
  `/* Auto-generated content translations */\nwindow.SHOUHAO_CONTENT = ${JSON.stringify(bundle)};\n`
);
console.log(
  "content-locales.js ready:",
  Object.keys(bundle).length,
  "langs ≈",
  Math.round(JSON.stringify(bundle).length / 1024),
  "KB"
);
