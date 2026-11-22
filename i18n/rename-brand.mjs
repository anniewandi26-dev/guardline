import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const from = "HoldLine";
const to = "GuardLine";

const dirs = [
  join(root, "i18n/packs"),
  join(root, "content/packs"),
];

const files = [
  join(root, "i18n/_keys.mjs"),
  join(root, "i18n/ui-strings.mjs"),
  join(root, "loading.html"),
  join(root, "articles-data.mjs"),
  join(root, "news-data.mjs"),
  join(root, "tools-data.mjs"),
  join(root, "content/source.zh-CN.json"),
  join(root, "content/source.en.json"),
];

for (const dir of dirs) {
  try {
    for (const f of readdirSync(dir)) {
      if (f.endsWith(".mjs") || f.endsWith(".json") || f.endsWith(".js")) {
        files.push(join(dir, f));
      }
    }
  } catch {
    /* skip missing */
  }
}

let total = 0;
for (const file of files) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const count = text.split(from).length - 1;
  if (!count) continue;
  writeFileSync(file, text.split(from).join(to));
  total += count;
  console.log(file.replace(root + "\\", "").replace(root + "/", ""), count);
}
console.log("renamed", total);
