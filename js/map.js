// 知識マップ:関係グラフを力学モデルで配置し、SVG で描く。
// 外部ライブラリは使わない。ページ数が数百程度までなら O(n²) の反発計算で十分速い。
(function (A) {
  "use strict";
  const G = () => A.graph;
  const NS = "http://www.w3.org/2000/svg";
  const DIRECTED = ["prereq", "develops", "tool", "influence"];

  function el(name, attrs = {}, parent) {
    const e = document.createElementNS(NS, name);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (parent) parent.appendChild(e);
    return e;
  }

  // 決定的な疑似乱数(毎回同じ配置にするため)
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }
  function hash(str) {
    let h = 2166136261;
    for (const c of str) h = Math.imul(h ^ c.codePointAt(0), 16777619);
    return h >>> 0;
  }

  // 表示するノードと辺を選ぶ
  function selectGraph(opts) {
    const { pageTypes, relTypes, focus, depth = 2, showTree } = opts;
    let ids = A.pages.filter((p) => p.type !== "route" && pageTypes.includes(p.type)).map((p) => p.id);
    if (focus) {
      const allowed = new Set(ids);
      allowed.add(focus);
      const dist = new Map([[focus, 0]]);
      const queue = [focus];
      while (queue.length) {
        const id = queue.shift();
        if (dist.get(id) >= depth) continue;
        for (const n of G().neighbors(id, relTypes)) {
          if (allowed.has(n.id) && !dist.has(n.id)) { dist.set(n.id, dist.get(id) + 1); queue.push(n.id); }
        }
      }
      ids = [...dist.keys()];
    }
    const set = new Set(ids);
    const edges = A.relations
      .filter(([t, f, to]) => relTypes.includes(t) && set.has(f) && set.has(to))
      .map(([type, from, to, note]) => ({ type, from, to, note }));
    if (showTree) {
      for (const id of ids) {
        const p = G().page(id);
        const parent = p.type === "field" ? p.parent : (p.fields || [])[0];
        if (parent && set.has(parent)) edges.push({ type: "tree", from: parent, to: id });
      }
    }
    return { ids, edges };
  }

  // 力学モデルによる配置。領域ごとに円周上のアンカーへ弱く引き寄せ、分野のまとまりが見えるようにする。
  function layout(ids, edges, { focus, width, height }) {
    const R = focus ? 0 : 420;
    const anchors = {};
    A.domains.forEach((d, i) => {
      const a = -Math.PI / 2 + (i / A.domains.length) * Math.PI * 2;
      anchors[d] = { x: Math.cos(a) * R, y: Math.sin(a) * R };
    });
    const nodes = ids.map((id) => {
      const r = rng(hash(id));
      const anc = focus ? { x: 0, y: 0 } : anchors[G().domainOf(id)] || { x: 0, y: 0 };
      const spread = focus ? 300 : R * 0.8;
      return { id, x: anc.x + (r() - 0.5) * spread, y: anc.y + (r() - 0.5) * spread, vx: 0, vy: 0, anc };
    });
    const index = new Map(nodes.map((n, i) => [n.id, i]));
    const links = edges.map((e) => [index.get(e.from), index.get(e.to), e.type]);
    const n = nodes.length;
    const L = focus ? 110 : 85;
    const repulse = focus ? 9000 : 7000;
    const iters = 360;
    for (let it = 0; it < iters; it++) {
      const alpha = 1 - it / iters;
      for (let i = 0; i < n; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < n; j++) {
          const b = nodes[j];
          let dx = a.x - b.x, dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) { dx = (i % 7) - 3 || 1; dy = (j % 5) - 2 || 1; d2 = dx * dx + dy * dy; }
          if (d2 > 250000) continue;
          const f = (repulse * alpha) / d2;
          const d = Math.sqrt(d2);
          a.vx += (dx / d) * f; a.vy += (dy / d) * f;
          b.vx -= (dx / d) * f; b.vy -= (dy / d) * f;
        }
      }
      for (const [s, t, type] of links) {
        const a = nodes[s], b = nodes[t];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const k = (type === "tree" ? 0.02 : 0.05) * alpha;
        const f = (d - L) * k;
        a.vx += (dx / d) * f; a.vy += (dy / d) * f;
        b.vx -= (dx / d) * f; b.vy -= (dy / d) * f;
      }
      for (const nd of nodes) {
        nd.vx += (nd.anc.x - nd.x) * 0.012 * alpha;
        nd.vy += (nd.anc.y - nd.y) * 0.012 * alpha;
        if (nd.id === focus) { nd.x = 0; nd.y = 0; nd.vx = nd.vy = 0; continue; }
        nd.vx *= 0.6; nd.vy *= 0.6;
        nd.x += Math.max(-30, Math.min(30, nd.vx));
        nd.y += Math.max(-30, Math.min(30, nd.vy));
      }
    }
    return { nodes, index, anchors };
  }

  // container に地図を描く。戻り値の destroy() で後片付けする。
  function render(container, opts) {
    container.innerHTML = "";
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const known = opts.known || new Set();
    const { ids, edges } = selectGraph(opts);
    const { nodes, index, anchors } = layout(ids, edges, { focus: opts.focus, width, height });

    const svg = el("svg", { role: "img", "aria-label": "知識マップ" }, container);
    const defs = el("defs", {}, svg);
    for (const t of DIRECTED) {
      const m = el("marker", { id: `arrow-${t}-${opts.uid || "m"}`, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, defs);
      el("path", { d: "M0,0 L10,5 L0,10 z", class: `arrow-${t}` }, m);
    }
    const root = el("g", {}, svg);

    // 視点(パン・ズーム)
    let bbox = nodes.reduce((b, nd) => ({
      x0: Math.min(b.x0, nd.x), y0: Math.min(b.y0, nd.y), x1: Math.max(b.x1, nd.x + 90), y1: Math.max(b.y1, nd.y),
    }), { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity });
    if (!nodes.length) bbox = { x0: -100, y0: -100, x1: 100, y1: 100 };
    const pad = 30;
    const top = Math.min(opts.insetTop || 0, height * 0.4); // 操作パネルに隠れない領域だけを使う
    const fit = Math.min(width / (bbox.x1 - bbox.x0 + pad * 2), (height - top) / (bbox.y1 - bbox.y0 + pad * 2), 1.4);
    let view = { k: fit, x: width / 2 - ((bbox.x0 + bbox.x1) / 2) * fit, y: top + (height - top) / 2 - ((bbox.y0 + bbox.y1) / 2) * fit };
    const apply = () => root.setAttribute("transform", `translate(${view.x},${view.y}) scale(${view.k})`);
    apply();

    if (!opts.focus) {
      const labels = el("g", {}, root);
      for (const d of A.domains) {
        const p = G().page(d);
        const a = anchors[d];
        const t = el("text", { x: a.x * 1.35, y: a.y * 1.35, "text-anchor": "middle", class: "domain-label" }, labels);
        t.textContent = p.title;
      }
    }

    const degree = new Map(ids.map((id) => [id, 0]));
    for (const e of edges) { degree.set(e.from, degree.get(e.from) + 1); degree.set(e.to, degree.get(e.to) + 1); }
    const radius = (id) => {
      const p = G().page(id);
      const base = p.type === "field" ? 7 : p.type === "question" ? 7 : 5;
      return base + Math.min(6, Math.sqrt(degree.get(id)));
    };

    const edgeLayer = el("g", {}, root);
    const edgeEls = edges.map((e) => {
      const a = nodes[index.get(e.from)], b = nodes[index.get(e.to)];
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
      const ra = radius(e.from) + 2, rb = radius(e.to) + 3;
      const line = el("line", {
        x1: a.x + (dx / d) * ra, y1: a.y + (dy / d) * ra, x2: b.x - (dx / d) * rb, y2: b.y - (dy / d) * rb,
        class: `edge ${e.type}`,
      }, edgeLayer);
      if (DIRECTED.includes(e.type)) line.setAttribute("marker-end", `url(#arrow-${e.type}-${opts.uid || "m"})`);
      const title = el("title", {}, line);
      title.textContent = `${G().page(e.from).title} → ${G().page(e.to).title}(${e.type === "tree" ? "分類" : A.relationTypes[e.type].label})${e.note ? ":" + e.note : ""}`;
      return { e, line };
    });

    const nodeLayer = el("g", {}, root);
    const nodeEls = new Map();
    for (const nd of nodes) {
      const p = G().page(nd.id);
      const cls = ["node", p.type];
      if (nd.id === opts.focus) cls.push("focus");
      if (known.has(nd.id)) cls.push("known");
      const g = el("g", { class: cls.join(" "), transform: `translate(${nd.x},${nd.y})`, tabindex: 0, role: "link", "aria-label": p.title }, nodeLayer);
      const r = radius(nd.id);
      el("circle", { r }, g);
      const t = el("text", { x: r + 4, y: 4 }, g);
      t.textContent = p.title;
      nodeEls.set(nd.id, g);
    }

    // ホバーで近傍を強調
    const tip = document.createElement("div");
    tip.className = "map-tip";
    container.appendChild(tip);
    const adj = new Map(ids.map((id) => [id, new Set()]));
    for (const { e } of edgeEls) { adj.get(e.from).add(e.to); adj.get(e.to).add(e.from); }
    function highlight(id, evt) {
      svg.classList.add("hovering");
      nodeEls.get(id).classList.add("hl");
      for (const n of adj.get(id)) nodeEls.get(n).classList.add("hl");
      for (const { e, line } of edgeEls) if (e.from === id || e.to === id) line.classList.add("hl");
      const p = G().page(id);
      tip.innerHTML = "";
      const b = document.createElement("b");
      b.textContent = p.title;
      const s = document.createElement("span");
      s.textContent = p.summary || "";
      tip.append(b, s);
      tip.style.display = "block";
      if (evt) moveTip(evt);
    }
    function moveTip(evt) {
      const rect = container.getBoundingClientRect();
      const x = evt.clientX - rect.left, y = evt.clientY - rect.top;
      tip.style.left = Math.min(x + 14, rect.width - 290) + "px";
      tip.style.top = Math.min(y + 14, rect.height - 100) + "px";
    }
    function unhighlight() {
      svg.classList.remove("hovering");
      svg.querySelectorAll(".hl").forEach((x) => x.classList.remove("hl"));
      tip.style.display = "none";
    }
    for (const [id, g] of nodeEls) {
      g.addEventListener("pointerenter", (evt) => highlight(id, evt));
      g.addEventListener("pointermove", moveTip);
      g.addEventListener("pointerleave", unhighlight);
      g.addEventListener("focus", () => highlight(id));
      g.addEventListener("blur", unhighlight);
      g.addEventListener("click", () => opts.onSelect && opts.onSelect(id));
      g.addEventListener("keydown", (evt) => { if (evt.key === "Enter") opts.onSelect && opts.onSelect(id); });
    }

    // パン(背景のドラッグ)とズーム(ホイール、ボタン)
    let drag = null;
    svg.addEventListener("pointerdown", (evt) => {
      if (evt.target.closest(".node")) return;
      drag = { x: evt.clientX, y: evt.clientY, vx: view.x, vy: view.y };
      svg.setPointerCapture(evt.pointerId);
      svg.classList.add("dragging");
    });
    svg.addEventListener("pointermove", (evt) => {
      if (!drag) return;
      view.x = drag.vx + evt.clientX - drag.x;
      view.y = drag.vy + evt.clientY - drag.y;
      apply();
    });
    const endDrag = () => { drag = null; svg.classList.remove("dragging"); };
    svg.addEventListener("pointerup", endDrag);
    svg.addEventListener("pointercancel", endDrag);
    function zoomAt(factor, cx, cy) {
      const k = Math.max(0.2, Math.min(5, view.k * factor));
      view.x = cx - ((cx - view.x) * k) / view.k;
      view.y = cy - ((cy - view.y) * k) / view.k;
      view.k = k;
      apply();
    }
    if (opts.wheelZoom !== false) {
      svg.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        const rect = svg.getBoundingClientRect();
        zoomAt(Math.exp(-evt.deltaY * 0.0015), evt.clientX - rect.left, evt.clientY - rect.top);
      }, { passive: false });
    }

    return {
      count: { nodes: nodes.length, edges: edges.length },
      zoom: (factor) => zoomAt(factor, width / 2, height / 2),
    };
  }

  A.map = { render, selectGraph };
})(window.ACADEMIA);
