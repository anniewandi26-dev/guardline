import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const map = {
  en: "Auto",
  "zh-CN": "自动",
  "zh-TW": "自動",
  ja: "自動",
  ko: "자동",
  es: "Automático",
  fr: "Auto",
  de: "Automatisch",
  "pt-BR": "Automático",
  "pt-PT": "Automático",
  it: "Automatico",
  ru: "Авто",
  ar: "تلقائي",
  hi: "स्वचालित",
  id: "Otomatis",
  ms: "Auto",
  th: "อัตโนมัติ",
  vi: "Tự động",
  tr: "Otomatik",
  pl: "Automatycznie",
  nl: "Automatisch",
  sv: "Automatiskt",
  da: "Automatisk",
  fi: "Automaattinen",
  no: "Automatisk",
  cs: "Automaticky",
  el: "Αυτόματα",
  he: "אוטומטי",
  uk: "Авто",
  ro: "Automat",
  hu: "Automatikus",
  bn: "স্বয়ংক্রিয়",
  tl: "Awtomatiko",
  sw: "Otomatiki",
  fa: "خودکار",
  ur: "خودکار",
};

const re = /"lang\.auto":\s*"[^"]*"/;

let keys = readFileSync(join(root, "i18n/_keys.mjs"), "utf8");
keys = keys.replace(re, `"lang.auto": "Auto"`);
writeFileSync(join(root, "i18n/_keys.mjs"), keys);

for (const [code, val] of Object.entries(map)) {
  if (code === "en") continue;
  const file = join(root, "i18n/packs", `${code}.mjs`);
  if (!existsSync(file)) continue;
  let text = readFileSync(file, "utf8");
  text = text.replace(re, `"lang.auto": "${val}"`);
  writeFileSync(file, text);
}

console.log("lang.auto cleaned");
