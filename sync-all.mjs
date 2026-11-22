/**
 * Sync public GitHub Pages + local double-click GuardLine.html
 * Usage: node sync-all.mjs
 */
import { spawnSync } from "node:child_process";
import { unlinkSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const run = (cmd, args) => {
  console.log(">", cmd, args.join(" "));
  const r = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: true });
  if (r.status) process.exit(r.status || 1);
};

run("node", ["generate.mjs"]);
run("node", ["build-i18n.mjs"]);
run("node", ["build-standalone.mjs"]);

for (const f of [
  join(root, "GuardLine-完整说明.html"),
  join(process.env.USERPROFILE || "", "Desktop", "GuardLine-完整说明.html"),
]) {
  if (existsSync(f)) {
    try {
      unlinkSync(f);
      console.log("removed old doc", f);
    } catch (_) {}
  }
}

run("git", ["add", "-A"]);
const st = spawnSync("git", ["status", "--porcelain"], {
  cwd: root,
  encoding: "utf8",
  shell: true,
});
if (!st.stdout.trim()) {
  console.log("Nothing new to commit — already synced.");
  process.exit(0);
}

run("git", [
  "-c",
  "user.email=anniewandi26-dev@users.noreply.github.com",
  "-c",
  "user.name=anniewandi26-dev",
  "commit",
  "-m",
  "Sync GuardLine site + standalone HTML",
]);
run("git", ["push", "origin", "main"]);
console.log("Synced:");
console.log("  Live: https://anniewandi26-dev.github.io/guardline/");
console.log("  HTML: Desktop\\\\GuardLine.html");
console.log("  Also: https://anniewandi26-dev.github.io/guardline/GuardLine.html");
