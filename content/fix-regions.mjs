import { readFileSync, writeFileSync } from "node:fs";

const map = {
  新加坡: "Singapore",
  瑞士: "Switzerland",
  爱尔兰: "Ireland",
  开曼群岛: "Cayman Islands",
  特立尼达和多巴哥: "Trinidad and Tobago",
  中国香港: "Hong Kong",
  英国: "U.K.",
  马来西亚: "Malaysia",
  印度: "India",
  "国际（安全厂商观察）": "International (security vendor)",
  "全球（平台方）": "Global (platform)",
  牙买加: "Jamaica",
  全球: "Worldwide",
};

let t = readFileSync("news-data.mjs", "utf8");
for (const [a, b] of Object.entries(map)) {
  t = t.split(`region: "${a}"`).join(`region: "${b}"`);
}
writeFileSync("news-data.mjs", t);
console.log("regions fixed");
