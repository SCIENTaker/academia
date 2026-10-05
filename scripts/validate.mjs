// データの整合性を検査する: node scripts/validate.mjs
// - id の重複、存在しない id への参照(関係・本文リンク・分野・ルート)
// - 未定義のページ種類・関係の種類
// - 前提知識グラフの循環
// - 学習ルート内で前提知識が後ろに来ていないか
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "data/schema.js", "data/fields.js", "data/concepts.js", "data/questions.js",
  "data/people.js", "data/routes.js", "data/relations.js", "js/graph.js",
];
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext("var ACADEMIA = window.ACADEMIA = {};", ctx);
for (const f of files) vm.runInContext(readFileSync(join(root, f), "utf8"), ctx, { filename: f });
const A = ctx.window.ACADEMIA;
A.graph.build();
const G = A.graph;

const errors = [];
const warnings = [];
const ids = new Set();

for (const p of A.pages) {
  const where = `page "${p.id}"`;
  if (ids.has(p.id)) errors.push(`${where}: id が重複しています`);
  ids.add(p.id);
  if (!/^[a-z0-9-]+$/.test(p.id)) errors.push(`${where}: id は英小文字・数字・ハイフンのみ`);
  if (!A.pageTypes[p.type]) errors.push(`${where}: 未定義の type "${p.type}"`);
  if (!p.title) errors.push(`${where}: title がありません`);
  if (!p.summary) warnings.push(`${where}: summary がありません`);
}
const exists = (id) => ids.has(id);
const isField = (id) => G.page(id)?.type === "field";

for (const p of A.pages) {
  const where = `page "${p.id}"`;
  if (p.type === "field") {
    if (p.parent === null) {
      if (!A.domains.includes(p.id)) errors.push(`${where}: parent が null なのに domains にありません`);
    } else if (!isField(p.parent)) errors.push(`${where}: parent "${p.parent}" は分野ページではありません`);
  } else {
    if (!p.fields?.length) errors.push(`${where}: fields がありません`);
    for (const f of p.fields || []) if (!isField(f)) errors.push(`${where}: fields の "${f}" は分野ページではありません`);
  }
  const texts = [p.summary, p.body, p.thought, p.changed, p.why, ...(p.positions || []).map((x) => x.text)];
  for (const t of texts) for (const l of G.linksIn(t)) if (!exists(l)) errors.push(`${where}: 本文のリンク [[${l}]] が存在しません`);
  for (const pos of p.positions || []) if (pos.page && !exists(pos.page)) errors.push(`${where}: positions の "${pos.page}" が存在しません`);
  if (p.type === "route") {
    const seen = new Map();
    p.steps.forEach((s, i) => {
      if (!exists(s.page)) errors.push(`${where}: ステップ ${i + 1} の "${s.page}" が存在しません`);
      if (seen.has(s.page)) errors.push(`${where}: "${s.page}" が重複しています`);
      seen.set(s.page, i);
    });
    p.steps.forEach((s, i) => {
      for (const pre of G.directPrereqs(s.page)) {
        if (seen.has(pre) && seen.get(pre) > i) errors.push(`${where}: "${pre}" は "${s.page}" の前提なのに後ろにあります`);
      }
    });
  }
}

const relKeys = new Set();
for (const r of A.relations) {
  const [type, from, to] = r;
  const where = `relation ${JSON.stringify(r.slice(0, 3))}`;
  if (!A.relationTypes[type]) errors.push(`${where}: 未定義の関係 "${type}"`);
  if (!exists(from)) errors.push(`${where}: from "${from}" が存在しません`);
  if (!exists(to)) errors.push(`${where}: to "${to}" が存在しません`);
  if (from === to) errors.push(`${where}: 自己ループです`);
  if (G.page(from)?.type === "route" || G.page(to)?.type === "route") errors.push(`${where}: 学習ルートは関係の端点にできません`);
  const key = A.relationTypes[type]?.symmetric ? [type, ...[from, to].sort()].join("|") : `${type}|${from}|${to}`;
  if (relKeys.has(key)) errors.push(`${where}: 重複しています`);
  relKeys.add(key);
}

const cycle = G.findPrereqCycle();
if (cycle) errors.push(`前提知識が循環しています: ${cycle.join(" → ")}`);

// どこからもつながっていないページ(分野・ルート以外)
for (const p of A.pages) {
  if (p.type === "field" || p.type === "route") continue;
  if (!G.outgoing(p.id).length && !G.incoming(p.id).length) warnings.push(`page "${p.id}": 関係が一つもありません`);
}

const count = (t) => A.pages.filter((p) => p.type === t).length;
console.log(`ページ ${A.pages.length} 件(分野 ${count("field")} / 概念 ${count("concept")} / 問い ${count("question")} / 人物 ${count("person")} / ルート ${count("route")})、関係 ${A.relations.length} 件`);
for (const w of warnings) console.log(`warn: ${w}`);
for (const e of errors) console.error(`error: ${e}`);
if (errors.length) { console.error(`${errors.length} 件のエラー`); process.exit(1); }
console.log("OK");
