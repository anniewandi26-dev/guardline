import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "packs");
for (const f of readdirSync(dir).filter((x) => x.endsWith(".mjs"))) {
  const p = join(dir, f);
  let t = readFileSync(p, "utf8");
  const n = t.replace(/",,\n/g, '",\n').replace(/,\s*,\n/g, ",\n");
  if (n !== t) {
    writeFileSync(p, n);
    console.log("fixed", f);
  }
}
