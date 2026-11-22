import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { articles } from "../articles-data.mjs";
import { news, newsIntro } from "../news-data.mjs";
import { tools, toolsIntro, toolsAvoid } from "../tools-data.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)));
mkdirSync(root, { recursive: true });

const source = {
  articles: Object.fromEntries(
    articles.map((a) => [
      a.slug,
      {
        category: a.category,
        title: a.title,
        excerpt: a.excerpt,
        read: a.read,
        body: a.body.trim(),
      },
    ])
  ),
  news: Object.fromEntries(
    news.map((n) => [
      n.slug,
      {
        region: n.region,
        date: n.date,
        source: n.source,
        title: n.title,
        excerpt: n.excerpt,
        body: n.body.trim(),
      },
    ])
  ),
  newsIntro: { title: newsIntro.title, lead: newsIntro.lead },
  toolsIntro: { title: toolsIntro.title, lead: toolsIntro.lead },
  tools: Object.fromEntries(
    tools.map((t) => [
      t.id,
      {
        tier: t.tier,
        name: t.name,
        platforms: t.platforms,
        summary: t.summary,
        why: t.why,
        steps: t.steps,
        stepsCaption: t.stepsCaption || "",
        caution: t.caution,
        links: t.links.map((l) => ({ label: l.label, href: l.href })),
      },
    ])
  ),
  toolsAvoid,
};

writeFileSync(join(root, "source.zh-CN.json"), JSON.stringify(source, null, 2));
console.log(
  `extracted articles=${articles.length} news=${news.length} tools=${tools.length}`
);
