// データモデルの中核:ページの索引、分類ツリー、関係グラフ、前提知識の計算。
// ブラウザでも scripts/validate.mjs(Node)でも同じコードを使う。
(function (A) {
  "use strict";

  const byId = new Map();
  const out = new Map();      // id → [{type, to, note}]
  const inc = new Map();      // id → [{type, from, note}]
  const children = new Map(); // 分野 id → 子分野 id[]
  const order = new Map();    // id → データ上の順番(並べ替えの安定化用)

  function build() {
    byId.clear(); out.clear(); inc.clear(); children.clear(); order.clear();
    A.pages.forEach((p, i) => {
      byId.set(p.id, p);
      order.set(p.id, i);
      out.set(p.id, []);
      inc.set(p.id, []);
    });
    for (const p of A.pages) {
      if (p.type === "field" && p.parent) {
        if (!children.has(p.parent)) children.set(p.parent, []);
        children.get(p.parent).push(p.id);
      }
    }
    for (const [type, from, to, note] of A.relations) {
      if (!byId.has(from) || !byId.has(to)) continue; // validate.mjs が報告する
      out.get(from).push({ type, to, note });
      inc.get(to).push({ type, from, note });
    }
  }

  const page = (id) => byId.get(id);
  const childFields = (id) => children.get(id) || [];
  const outgoing = (id) => out.get(id) || [];
  const incoming = (id) => inc.get(id) || [];

  // 分類ツリー上の祖先(自分を含まない、上から順)
  function fieldPath(fieldId) {
    const path = [];
    let p = page(fieldId);
    while (p && p.parent) {
      p = page(p.parent);
      if (p) path.unshift(p.id);
    }
    return path;
  }

  // ページが属する最上位の領域
  function domainOf(id) {
    const p = page(id);
    if (!p) return null;
    const f = p.type === "field" ? p.id : (p.fields || [])[0];
    if (!f) return null;
    const path = fieldPath(f);
    return path.length ? path[0] : f;
  }

  // 分野とその下位分野すべて
  function fieldDescendants(fieldId) {
    const res = [fieldId];
    for (let i = 0; i < res.length; i++) res.push(...childFields(res[i]));
    return res;
  }

  // 分野(下位分野を含む)に属する、分野以外のページ
  function pagesInField(fieldId, { direct = false } = {}) {
    const set = new Set(direct ? [fieldId] : fieldDescendants(fieldId));
    return A.pages.filter((p) => p.type !== "field" && p.type !== "route" && (p.fields || []).some((f) => set.has(f)));
  }

  // 関係の向きを考慮した隣接ページ。conflict は向きなしとして両側に出す。
  function neighbors(id, types) {
    const res = [];
    for (const e of outgoing(id)) if (!types || types.includes(e.type)) res.push({ id: e.to, type: e.type, dir: "out", note: e.note });
    for (const e of incoming(id)) if (!types || types.includes(e.type)) res.push({ id: e.from, type: e.type, dir: "in", note: e.note });
    return res;
  }

  const directPrereqs = (id) => incoming(id).filter((e) => e.type === "prereq").map((e) => e.from);
  const directNext = (id) => outgoing(id).filter((e) => e.type === "prereq").map((e) => e.to);

  // 前提知識の推移閉包(自分を含まない)
  function prereqClosure(ids) {
    const seen = new Set();
    const stack = [].concat(ids);
    while (stack.length) {
      const id = stack.pop();
      for (const p of directPrereqs(id)) if (!seen.has(p)) { seen.add(p); stack.push(p); }
    }
    for (const id of [].concat(ids)) seen.delete(id);
    return seen;
  }

  // 集合内での「段階」= 前提をたどる最長の深さ(前提がなければ 0)
  function levels(ids) {
    const set = new Set(ids);
    const memo = new Map();
    const visit = (id, stack) => {
      if (memo.has(id)) return memo.get(id);
      if (stack.has(id)) return 0; // 循環は validate.mjs が報告する
      stack.add(id);
      let d = 0;
      for (const p of directPrereqs(id)) if (set.has(p)) d = Math.max(d, visit(p, stack) + 1);
      stack.delete(id);
      memo.set(id, d);
      return d;
    };
    for (const id of set) visit(id, new Set());
    return memo;
  }

  // 前提知識を守る順番に並べる(段階が浅いもの、データ上で先のものを優先)
  function topoSort(ids) {
    const lv = levels(ids);
    return [...lv.keys()].sort((a, b) => lv.get(a) - lv.get(b) || order.get(a) - order.get(b));
  }

  // target に到達するための学習ルート。known に含まれるページは省く。
  function generateRoute(target, known = new Set()) {
    const need = [...prereqClosure(target)];
    const all = topoSort([...need, target]);
    const lv = levels(all);
    return all.map((id) => ({ id, level: lv.get(id), known: known.has(id), target: id === target }));
  }

  // 分野を学ぶのに必要だが、その分野の外にある前提知識
  function fieldExternalPrereqs(fieldId) {
    const members = pagesInField(fieldId).map((p) => p.id);
    const memberSet = new Set(members);
    const closure = prereqClosure(members);
    return [...closure].filter((id) => !memberSet.has(id));
  }

  // 前提知識グラフの循環を探す(見つかれば id の配列、なければ null)
  function findPrereqCycle() {
    const state = new Map(); // 1 = 訪問中, 2 = 完了
    const path = [];
    const dfs = (id) => {
      state.set(id, 1); path.push(id);
      for (const n of directNext(id)) {
        if (state.get(n) === 1) return path.slice(path.indexOf(n)).concat(n);
        if (!state.get(n)) { const c = dfs(n); if (c) return c; }
      }
      state.set(id, 2); path.pop();
      return null;
    };
    for (const p of A.pages) if (!state.get(p.id)) { const c = dfs(p.id); if (c) return c; }
    return null;
  }

  // 本文中の [[id]] / [[id|表示名]] を取り出す
  const LINK_RE = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;
  function linksIn(text) {
    return [...String(text || "").matchAll(LINK_RE)].map((m) => m[1]);
  }

  A.graph = {
    build, page, childFields, outgoing, incoming, fieldPath, domainOf, fieldDescendants,
    pagesInField, neighbors, directPrereqs, directNext, prereqClosure, levels, topoSort,
    generateRoute, fieldExternalPrereqs, findPrereqCycle, linksIn, LINK_RE,
  };
})(window.ACADEMIA);
