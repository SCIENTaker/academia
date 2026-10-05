// 画面の組み立てとルーティング(#/... のハッシュで切り替える)。
(function (A) {
  "use strict";
  const G = A.graph;
  G.build();

  const $main = document.getElementById("main");
  const TYPES = A.pageTypes;
  const REL = A.relationTypes;

  // ───────── 小さな道具 ─────────
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const href = (id) => `#/page/${encodeURIComponent(id)}`;

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* 保存できなくても表示は続ける */ }
    },
  };

  // 学習済みのページ(この端末のブラウザにだけ保存)
  const known = new Set(store.get("academia.known", []));
  const isKnown = (id) => known.has(id);
  function toggleKnown(id) {
    known.has(id) ? known.delete(id) : known.add(id);
    store.set("academia.known", [...known]);
  }

  function link(id, label) {
    const p = G.page(id);
    if (!p) return esc(label || id);
    return `<a class="pl t-${p.type}${isKnown(id) ? " known" : ""}" href="${href(id)}" title="${esc(p.summary)}">${esc(label || p.title)}</a>`;
  }
  const badge = (type) => `<span class="badge t-${type}"><span class="dot"></span>${esc(TYPES[type].label)}</span>`;

  // 本文: 段落分けと [[id]] リンク
  function rich(text) {
    const s = String(text ?? "");
    let html = "", last = 0;
    for (const m of s.matchAll(G.LINK_RE)) {
      html += esc(s.slice(last, m.index)) + link(m[1], m[2]);
      last = m.index + m[0].length;
    }
    return html + esc(s.slice(last));
  }
  const paragraphs = (text) => (text ? text.split(/\n\n+/).map((p) => `<p>${rich(p)}</p>`).join("") : "");

  function card(p, extra = "") {
    return `<a class="card ${p.type}-card" href="${href(p.id)}">
      ${badge(p.type)}
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>${extra}
    </a>`;
  }

  const byType = (type) => A.pages.filter((p) => p.type === type);

  // ───────── ルーティング ─────────
  const routes = [
    [/^$/, home],
    [/^tree$/, treeView],
    [/^page\/(.+)$/, (id) => pageView(decodeURIComponent(id))],
    [/^map(?:\/(.+))?$/, (id) => mapView(id && decodeURIComponent(id))],
    [/^questions$/, () => listView("question", "問い", "答えがまだ出ていない、または論争が続いている問い。どこから読み始めてもよい入口です。")],
    [/^people$/, () => listView("person", "人物", "伝記ではなく「何を考え、何を変えたか」に絞って紹介します。")],
    [/^routes$/, routesView],
    [/^build(?:\/(.+))?$/, (id) => buildView(id && decodeURIComponent(id))],
    [/^search\/(.*)$/, (q) => searchView(decodeURIComponent(q))],
    [/^about$/, aboutView],
  ];

  function render() {
    const path = location.hash.replace(/^#\/?/, "");
    $main.className = "";
    for (const [re, fn] of routes) {
      const m = path.match(re);
      if (m) {
        fn(...m.slice(1));
        markNav(path);
        if (!path.startsWith("map")) window.scrollTo(0, 0);
        return;
      }
    }
    $main.innerHTML = `<h1>ページが見つかりません</h1><p><a href="#/">トップへ戻る</a></p>`;
  }

  function markNav(path) {
    const section = path.split("/")[0];
    const map = { page: null, build: "routes", search: null };
    const key = section in map ? map[section] : section;
    document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === key));
  }

  function setTitle(t) { document.title = t ? `${t} — 学問の地図` : "学問の地図"; }

  // ───────── ホーム ─────────
  function home() {
    setTitle("");
    const count = (t) => byType(t).length;
    const domains = A.domains.map((d) => {
      const p = G.page(d);
      const kids = G.childFields(d).map((id) => link(id)).join("");
      return `<div class="card domain-card">
        <a href="${href(d)}"><h3>${esc(p.title)}</h3></a>
        <p>${esc(p.summary)}</p>
        <div class="fields">${kids}</div>
      </div>`;
    }).join("");
    const questions = byType("question").map((p) => card(p)).join("");
    const routes = byType("route").map((p) => card(p, `<p class="small" style="margin-top:6px">${p.steps.length} ステップ</p>`)).join("");

    $main.innerHTML = `
      <section class="hero">
        <h1>学問の地図</h1>
        <p class="lead">分野を分類の木として、概念どうしを「前提知識」「発展」「道具」「対立」「影響」の関係として結んだ、学問全体の地図です。問いから入っても、分野から入っても、地図を眺めてもかまいません。</p>
        <div class="stats">
          <span><b>${count("field")}</b>分野</span>
          <span><b>${count("concept")}</b>概念</span>
          <span><b>${count("question")}</b>問い</span>
          <span><b>${count("person")}</b>人物</span>
          <span><b>${count("route")}</b>学習ルート</span>
          <span><b>${A.relations.length}</b>関係</span>
        </div>
        <div class="actions">
          <a class="btn primary" href="#/map">知識マップを見る</a>
          <a class="btn" href="#/build">学びたいものからルートを作る</a>
        </div>
      </section>

      <section class="section">
        <h2>問いから入る <span class="sub">好奇心の入口</span></h2>
        <div class="grid">${questions}</div>
      </section>

      <section class="section">
        <h2>分野から入る <span class="sub">形式科学 / 自然科学 / 社会科学 / 人文学 / 応用科学</span></h2>
        <div class="grid">${domains}</div>
        <p class="small"><a href="#/tree">分類ツリーをすべて開く →</a></p>
      </section>

      <section class="section">
        <h2>学習ルート <span class="sub">ページを順番につないだ道筋</span></h2>
        <div class="grid">${routes}</div>
      </section>`;
  }

  // ───────── 分類ツリー ─────────
  function treeView() {
    setTitle("分類ツリー");
    const node = (id, depth) => {
      const p = G.page(id);
      const kids = G.childFields(id);
      const members = G.pagesInField(id, { direct: true }).filter((m) => m.fields[0] === id);
      const total = G.pagesInField(id).length;
      const cls = p.classification ? Object.entries(p.classification).map(([k, v]) => `${k === "ndc" ? "NDC" : "arXiv"} ${v}`).join(" · ") : "";
      const head = `${link(id)} <span class="count">${total} ページ</span> ${cls ? `<span class="cls">${esc(cls)}</span>` : ""}`;
      const memberHtml = members.length ? `<div class="members">${members.map((m) => `<span>${link(m.id)}</span>`).join("")}</div>` : "";
      if (!kids.length && !members.length) return `<li><div class="leaf">${head}</div></li>`;
      return `<li class="${depth === 0 ? "domain" : ""}"><details ${depth < 1 ? "open" : ""}>
        <summary>${head}</summary>
        ${memberHtml}
        ${kids.length ? `<ul>${kids.map((k) => node(k, depth + 1)).join("")}</ul>` : ""}
      </details></li>`;
    };
    $main.innerHTML = `
      <h1>分類ツリー</h1>
      <p class="lead">形式科学 / 自然科学 / 社会科学 / 人文学 / 応用科学 → 分野 → 下位分野。各分野には、その分野を「主な分野」とする概念・問い・人物を並べています。</p>
      <p class="small muted">分類は日本十進分類法(NDC)と arXiv のカテゴリを参考にしています。対応する記号を併記しています。</p>
      <div class="actions"><button class="btn" id="expand">すべて開く</button><button class="btn" id="collapse">すべて閉じる</button></div>
      <ul class="tree" style="margin-top:16px">${A.domains.map((d) => node(d, 0)).join("")}</ul>`;
    document.getElementById("expand").onclick = () => $main.querySelectorAll(".tree details").forEach((d) => (d.open = true));
    document.getElementById("collapse").onclick = () => $main.querySelectorAll(".tree details").forEach((d) => (d.open = false));
  }

  // ───────── 関係の一覧(個別ページの側面) ─────────
  function relationGroups(id, personMode) {
    const groups = [];
    const add = (key, label, swatch, items) => { if (items.length) groups.push({ key, label, swatch, items }); };
    const nb = G.neighbors(id);
    const pick = (type, dir) => nb.filter((n) => n.type === type && (!dir || n.dir === dir));
    add("prereq-in", REL.prereq.backward, "prereq", pick("prereq", "in"));
    add("prereq-out", REL.prereq.forward, "prereq", pick("prereq", "out"));
    add("develops-in", REL.develops.backward, "develops", pick("develops", "in"));
    add("develops-out", REL.develops.forward, "develops", pick("develops", "out"));
    add("tool-in", REL.tool.backward, "tool", pick("tool", "in"));
    add("tool-out", REL.tool.forward, "tool", pick("tool", "out"));
    add("conflict", REL.conflict.forward, "conflict", pick("conflict"));
    add("influence-in", REL.influence.backward, "influence", pick("influence", "in"));
    add("influence-out", personMode ? "考え出したもの・影響を与えたもの" : REL.influence.forward, "influence", pick("influence", "out"));
    if (!groups.length) return "";
    return `<div class="panel"><h3>関係</h3>${groups.map((g) => `
      <div class="rel-group">
        <h4><span class="rel-swatch rel-${g.swatch}"></span>${esc(g.label)}</h4>
        <ul>${g.items.map((n) => `<li>${link(n.id)}${n.note ? `<span class="note">${esc(n.note)}</span>` : ""}</li>`).join("")}</ul>
      </div>`).join("")}
    </div>`;
  }

  // 足りない前提(推移閉包のうち、まだ学習済みでないもの)
  function missingPanel(id) {
    const closure = G.topoSort([...G.prereqClosure(id)]);
    if (!closure.length) return "";
    const missing = closure.filter((x) => !isKnown(x));
    const direct = new Set(G.directPrereqs(id));
    const pct = Math.round(((closure.length - missing.length) / closure.length) * 100);
    return `<div class="panel">
      <h3>このページの前提として足りないもの</h3>
      <div class="progress" aria-label="前提の達成率"><div style="width:${pct}%"></div></div>
      <p class="small muted" style="margin:0 0 8px">前提 ${closure.length} 件中 ${closure.length - missing.length} 件を学習済み</p>
      ${missing.length ? `<ul>${missing.map((x) => `<li>${link(x)}${direct.has(x) ? `<span class="note">直接の前提</span>` : ""}</li>`).join("")}</ul>` : `<p class="small" style="margin:0">前提はすべて学習済みです。</p>`}
      <div class="actions" style="margin-top:10px"><a class="btn" href="#/build/${encodeURIComponent(id)}">ここまでの学習ルートを作る</a></div>
    </div>`;
  }

  function knownButton(id) {
    return `<button class="btn ${isKnown(id) ? "on" : ""}" data-known="${esc(id)}">${isKnown(id) ? "✓ 学習済み" : "学習済みにする"}</button>`;
  }
  function bindKnownButtons(rerender) {
    $main.querySelectorAll("[data-known]").forEach((b) => {
      b.addEventListener("click", (evt) => {
        evt.preventDefault();
        toggleKnown(b.dataset.known);
        rerender();
      });
    });
  }

  function routesContaining(id) {
    const rs = byType("route").filter((r) => r.steps.some((s) => s.page === id));
    if (!rs.length) return "";
    return `<div class="panel"><h3>このページを含む学習ルート</h3><ul>${rs.map((r) => `<li>${link(r.id)}</li>`).join("")}</ul></div>`;
  }

  function breadcrumb(p) {
    const f = p.type === "field" ? p.id : (p.fields || [])[0];
    if (!f) return "";
    const path = p.type === "field" ? G.fieldPath(f) : [...G.fieldPath(f), f];
    return `<nav class="breadcrumb" aria-label="分類">${path.map((x) => `<a href="${href(x)}">${esc(G.page(x).title)}</a>`).join("<span>›</span>")}</nav>`;
  }

  function miniMap(id) {
    const box = document.getElementById("mini-map");
    if (!box) return;
    const handle = A.map.render(box, {
      focus: id, depth: 1, uid: "mini", wheelZoom: false, known,
      pageTypes: ["field", "concept", "question", "person"], relTypes: Object.keys(REL),
      onSelect: (x) => { location.hash = href(x); },
    });
    if (handle.count.nodes < 2) box.closest(".panel").remove();
  }

  // ───────── 個別ページ ─────────
  function pageView(id) {
    const p = G.page(id);
    if (!p) { $main.innerHTML = `<h1>「${esc(id)}」というページはありません</h1><p><a href="#/">トップへ戻る</a></p>`; return; }
    setTitle(p.title);
    if (p.type === "route") return routeView(p);

    let main = "";
    if (p.type === "person") {
      main += `<div class="person-cols">
        <div class="callout"><h3>何を考えたか</h3><p>${rich(p.thought)}</p></div>
        <div class="callout"><h3>何を変えたか</h3><p>${rich(p.changed)}</p></div>
      </div>`;
    }
    if (p.type === "question" && p.why) {
      main += `<div class="callout"><h3>なぜ難しいのか</h3><p>${rich(p.why)}</p></div>`;
    }
    main += `<div class="prose">${paragraphs(p.body)}</div>`;
    if (p.type === "question" && p.positions) {
      main += `<h2 style="font-size:1.1rem;margin-top:28px">主な立場</h2><ul class="positions">${p.positions.map((x) => `
        <li>${x.page ? `<strong>${link(x.page)}</strong><br>` : ""}${rich(x.text)}</li>`).join("")}</ul>`;
    }
    if (p.type === "field") main += fieldSections(p);

    const side = [];
    if (p.type !== "field") side.push(missingPanel(id));
    side.push(relationGroups(id, p.type === "person"));
    side.push(routesContaining(id));
    side.push(`<div class="panel"><h3>周辺の地図</h3><div class="mini-map" id="mini-map"></div>
      <p class="small" style="margin:8px 0 0"><a href="#/map/${encodeURIComponent(id)}">大きな地図で見る →</a></p></div>`);

    $main.innerHTML = `
      <div class="page-layout">
        <article>
          <header class="page-head">
            ${breadcrumb(p)}
            <div style="margin-top:12px">${badge(p.type)}</div>
            <h1>${esc(p.title)}</h1>
            <div class="en">${esc(p.en || "")}${p.years ? ` · ${esc(p.years)}` : ""}</div>
            ${p.status ? `<span class="status">${esc(p.status)}</span>` : ""}
            <p class="lead">${rich(p.summary)}</p>
            <div class="actions">${p.type === "concept" || p.type === "question" ? knownButton(id) : ""}</div>
          </header>
          ${main}
        </article>
        <aside class="side">${side.join("")}</aside>
      </div>`;
    bindKnownButtons(() => pageView(id));
    miniMap(id);
  }

  // 分野ページ固有の節: 下位分野、所属ページ、分野の外にある前提
  function fieldSections(p) {
    let html = "";
    const kids = G.childFields(p.id);
    if (kids.length) {
      html += `<section class="section"><h2>下位分野</h2><div class="grid">${kids.map((k) => card(G.page(k))).join("")}</div></section>`;
    }
    const members = G.pagesInField(p.id);
    for (const t of ["question", "concept", "person"]) {
      const ms = members.filter((m) => m.type === t);
      if (ms.length) html += `<section class="section"><h2>${esc(TYPES[t].plural)} <span class="sub">${ms.length} 件</span></h2><div class="grid">${ms.map((m) => card(m)).join("")}</div></section>`;
    }
    const ext = G.topoSort(G.fieldExternalPrereqs(p.id));
    if (ext.length) {
      const missing = ext.filter((x) => !isKnown(x));
      html += `<section class="section"><h2>この分野の前提として足りないもの <span class="sub">分野の外にある前提 ${ext.length} 件中、未学習 ${missing.length} 件</span></h2>
        <p class="small muted">この分野に属する概念の前提知識をたどり、分野の外にあるものを集めました。学習済みにしたものは除かれます。</p>
        ${missing.length ? `<ol>${missing.map((x) => `<li>${link(x)} <span class="small muted">${esc(TYPES[G.page(x).type].label)} · ${esc(G.page(G.page(x).fields[0]).title)}</span></li>`).join("")}</ol>` : `<p>すべて学習済みです。</p>`}
      </section>`;
    }
    if (!kids.length && !members.length) html += `<p class="empty">この分野のページはまだありません。</p>`;
    return html;
  }

  // ───────── 学習ルート ─────────
  function routeView(r) {
    const ids = r.steps.map((s) => s.page);
    const inRoute = new Set(ids);
    const done = ids.filter(isKnown).length;
    const steps = r.steps.map((s) => {
      const p = G.page(s.page);
      const outside = G.directPrereqs(s.page).filter((x) => !inRoute.has(x) && !isKnown(x));
      return `<li class="${isKnown(s.page) ? "known" : ""}">
        <div class="step-title">${link(s.page)} ${badge(p.type)}
          <label class="check"><input type="checkbox" data-step="${esc(s.page)}" ${isKnown(s.page) ? "checked" : ""}> 学習済み</label></div>
        <div class="step-body">${s.note ? `<strong>${rich(s.note)}</strong> ` : ""}${esc(p.summary)}</div>
        ${outside.length ? `<div class="warn">ルートの外の前提: ${outside.map((x) => link(x)).join("、")}</div>` : ""}
      </li>`;
    }).join("");
    $main.innerHTML = `
      <div class="page-layout">
        <article>
          <header class="page-head">
            <nav class="breadcrumb"><a href="#/routes">学習ルート</a></nav>
            <div style="margin-top:12px">${badge("route")}</div>
            <h1>${esc(r.title)}</h1>
            <div class="en">${esc(r.en || "")}</div>
            <p class="lead">${rich(r.summary)}</p>
          </header>
          <div class="progress"><div style="width:${Math.round((done / ids.length) * 100)}%"></div></div>
          <p class="small muted">${ids.length} ステップ中 ${done} ステップ学習済み</p>
          <ol class="steps" style="margin-top:20px">${steps}</ol>
        </article>
        <aside class="side">
          <div class="panel"><h3>このルートについて</h3>
            <p class="small" style="margin:0">各ステップは「前提知識」の関係に沿って並んでいます。チェックを入れると、ほかのページの「足りない前提」からも消えます。</p>
            <div class="actions"><a class="btn" href="#/build/${encodeURIComponent(ids[ids.length - 1])}">終点から自動生成したルートと比べる</a></div>
          </div>
        </aside>
      </div>`;
    $main.querySelectorAll("[data-step]").forEach((c) => c.addEventListener("change", () => { toggleKnown(c.dataset.step); routeView(r); }));
  }

  function routesView() {
    setTitle("学習ルート");
    $main.innerHTML = `
      <h1>学習ルート</h1>
      <p class="lead">ページを順番につないだ道筋です。編集されたルートのほかに、学びたいページを選んで前提知識から自動でルートを作ることもできます。</p>
      <div class="actions"><a class="btn primary" href="#/build">ルートを自動生成する</a></div>
      <div class="grid" style="margin-top:24px">${byType("route").map((r) => {
        const done = r.steps.filter((s) => isKnown(s.page)).length;
        return card(r, `<div class="progress"><div style="width:${Math.round((done / r.steps.length) * 100)}%"></div></div><p class="small">${r.steps.length} ステップ · ${done} 学習済み</p>`);
      }).join("")}</div>`;
  }

  // 前提知識グラフから、目標までのルートを自動生成する
  function buildView(target) {
    setTitle("ルートの自動生成");
    const hideKnown = store.get("academia.hideKnown", false);
    const options = ["question", "concept"].map((t) => `<optgroup label="${esc(TYPES[t].plural)}">${
      byType(t).slice().sort((a, b) => a.title.localeCompare(b.title, "ja")).map((p) => `<option value="${esc(p.id)}" ${p.id === target ? "selected" : ""}>${esc(p.title)}</option>`).join("")
    }</optgroup>`).join("");

    let result = "";
    if (target && G.page(target)) {
      const route = G.generateRoute(target, known);
      const shown = hideKnown ? route.filter((s) => !s.known || s.target) : route;
      const stages = [];
      for (const s of shown) {
        if (!stages.length || stages[stages.length - 1].level !== s.level) stages.push({ level: s.level, items: [] });
        stages[stages.length - 1].items.push(s);
      }
      const remaining = route.filter((s) => !s.known).length;
      result = `
        <p>${link(target)} に到達するまでに <strong>${route.length - 1}</strong> 件の前提があり、未学習は <strong>${remaining - (isKnown(target) ? 0 : 1)}</strong> 件です。同じ段階のページはどの順で学んでもかまいません。</p>
        <ol class="steps">${stages.map((st) => `
          <li class="stage-label">段階 ${st.level + 1}</li>
          ${st.items.map((s) => {
            const p = G.page(s.id);
            return `<li class="${s.known ? "known" : ""} ${s.target ? "target" : ""}">
              <div class="step-title">${link(s.id)} ${badge(p.type)}
                <label class="check"><input type="checkbox" data-step="${esc(s.id)}" ${s.known ? "checked" : ""}> 学習済み</label></div>
              <div class="step-body">${esc(p.summary)}</div>
            </li>`;
          }).join("")}`).join("")}
        </ol>`;
    } else if (target) {
      result = `<p class="empty">「${esc(target)}」というページはありません。</p>`;
    }

    $main.innerHTML = `
      <h1>学習ルートを自動生成</h1>
      <p class="lead">学びたい概念や問いを選ぶと、「前提知識」の関係をさかのぼって、必要なページを学ぶ順に並べます。</p>
      <div class="picker" style="margin:16px 0 24px">
        <select id="target" aria-label="目標のページ"><option value="">目標を選ぶ…</option>${options}</select>
        <label class="check"><input type="checkbox" id="hide-known" ${hideKnown ? "checked" : ""}> 学習済みを隠す</label>
      </div>
      ${result}`;
    document.getElementById("target").addEventListener("change", (e) => { location.hash = `#/build/${encodeURIComponent(e.target.value)}`; });
    document.getElementById("hide-known").addEventListener("change", (e) => { store.set("academia.hideKnown", e.target.checked); buildView(target); });
    $main.querySelectorAll("[data-step]").forEach((c) => c.addEventListener("change", () => { toggleKnown(c.dataset.step); buildView(target); }));
  }

  // ───────── 知識マップ ─────────
  const mapState = {
    pageTypes: ["field", "concept", "question", "person"],
    relTypes: ["prereq", "develops", "tool", "conflict", "influence"],
    showTree: false,
    depth: 2,
  };
  function mapView(focus) {
    const fp = focus && G.page(focus);
    setTitle(fp ? `${fp.title} の周辺` : "知識マップ");
    $main.className = "wide";
    const chk = (group, key, label, swatch) => `<label><input type="checkbox" data-${group}="${key}" ${mapState[group === "pt" ? "pageTypes" : "relTypes"].includes(key) ? "checked" : ""}>${swatch}${esc(label)}</label>`;
    $main.innerHTML = `
      <div class="map-shell" id="map-shell">
        <div id="map-canvas" style="position:absolute;inset:0"></div>
        <div class="map-controls">
          <div class="map-panel">
            ${fp ? `<h3>${link(focus)} の周辺 · <a href="#/map">全体を見る</a></h3>` : `<h3>知識マップ</h3>`}
            <div>${Object.keys(TYPES).filter((t) => t !== "route").map((t) => chk("pt", t, TYPES[t].label, `<span class="dot t-${t}"></span>`)).join("")}</div>
            <div>${Object.keys(REL).map((t) => chk("rt", t, REL[t].label, `<span class="rel-swatch rel-${t}"></span>`)).join("")}
              <label><input type="checkbox" id="tree-toggle" ${mapState.showTree ? "checked" : ""}><span class="rel-swatch rel-tree"></span>分類ツリーを重ねる</label></div>
            ${fp ? `<div><label>距離 <select id="depth">${[1, 2, 3].map((d) => `<option ${d === mapState.depth ? "selected" : ""}>${d}</option>`).join("")}</select></label></div>` : ""}
            <div class="muted" id="map-count"></div>
          </div>
        </div>
        <div class="map-zoom">
          <button class="icon-btn" id="zoom-in" aria-label="拡大">+</button>
          <button class="icon-btn" id="zoom-out" aria-label="縮小">−</button>
        </div>
      </div>`;
    const canvas = document.getElementById("map-canvas");
    let handle;
    const draw = () => {
      handle = A.map.render(canvas, {
        ...mapState, focus: fp ? focus : null, known, uid: "full",
        insetTop: document.querySelector(".map-controls").offsetHeight + 12,
        onSelect: (id) => { location.hash = href(id); },
      });
      document.getElementById("map-count").textContent = `${handle.count.nodes} ページ · ${handle.count.edges} 本の関係。ノードをクリックで開く、背景をドラッグで移動、ホイールで拡大縮小。`;
    };
    const toggle = (arr, key, on) => { const i = arr.indexOf(key); if (on && i < 0) arr.push(key); if (!on && i >= 0) arr.splice(i, 1); };
    $main.querySelectorAll("[data-pt]").forEach((c) => c.addEventListener("change", () => { toggle(mapState.pageTypes, c.dataset.pt, c.checked); draw(); }));
    $main.querySelectorAll("[data-rt]").forEach((c) => c.addEventListener("change", () => { toggle(mapState.relTypes, c.dataset.rt, c.checked); draw(); }));
    document.getElementById("tree-toggle").addEventListener("change", (e) => { mapState.showTree = e.target.checked; draw(); });
    const depth = document.getElementById("depth");
    if (depth) depth.addEventListener("change", () => { mapState.depth = Number(depth.value); draw(); });
    document.getElementById("zoom-in").onclick = () => handle.zoom(1.3);
    document.getElementById("zoom-out").onclick = () => handle.zoom(1 / 1.3);
    draw();
  }

  // ───────── 一覧・検索・説明 ─────────
  function listView(type, title, lead) {
    setTitle(title);
    $main.innerHTML = `<h1>${esc(title)}</h1><p class="lead">${esc(lead)}</p>
      <div class="grid" style="margin-top:24px">${byType(type).map((p) => card(p, p.years ? `<p class="small" style="margin-top:6px">${esc(p.years)}</p>` : p.status ? `<p class="small" style="margin-top:6px">${esc(p.status)}</p>` : "")).join("")}</div>`;
  }

  function searchView(q) {
    setTitle(`「${q}」の検索結果`);
    const needle = q.trim().toLowerCase();
    const hit = (p) => [p.title, p.en, p.summary, p.body, p.thought, p.changed].some((s) => s && s.toLowerCase().includes(needle));
    const titleHit = (p) => [p.title, p.en].some((s) => s && s.toLowerCase().includes(needle));
    const results = needle ? A.pages.filter(hit).sort((a, b) => titleHit(b) - titleHit(a)) : [];
    $main.innerHTML = `<h1>「${esc(q)}」の検索結果</h1>
      <p class="muted">${results.length} 件</p>
      <div class="grid">${results.map((p) => card(p)).join("") || `<p class="empty">見つかりませんでした。</p>`}</div>`;
  }

  function aboutView() {
    setTitle("このサイトの仕組み");
    $main.innerHTML = `
      <div class="prose" style="max-width:760px">
        <h1>このサイトの仕組み</h1>
        <p class="lead">学問全体を、<strong>分類(ツリー)</strong>と<strong>関係(グラフ)</strong>の二層構造で表しています。</p>

        <h2>1. ページの種類</h2>
        <table class="legend-table"><tbody>${Object.entries(TYPES).map(([k, t]) => `<tr><td>${badge(k)}</td><td>${esc(t.desc)}</td><td class="muted small">${byType(k).length} 件</td></tr>`).join("")}</tbody></table>

        <h2>2. 分類(ツリー)</h2>
        <p>形式科学 / 自然科学 / 社会科学 / 人文学 / 応用科学 → 分野 → 下位分野。独自分類で迷子にならないよう、日本十進分類法(NDC)と arXiv のカテゴリを参照し、各分野ページに対応する記号を持たせています。概念・問い・人物は、一つ以上の分野に所属します。</p>

        <h2>3. 関係(グラフ)</h2>
        <p>ページ間のリンクには「種類」があります。</p>
        <table class="legend-table"><tbody>${Object.entries(REL).map(([k, r]) => `<tr><td style="white-space:nowrap"><span class="rel-swatch rel-${k}"></span> ${esc(r.label)}</td><td>${esc(r.desc)}</td><td class="muted small">${A.relations.filter((x) => x[0] === k).length} 本</td></tr>`).join("")}</tbody></table>

        <h2>4. 関係データから生まれる機能</h2>
        <p><strong>知識マップ</strong>: すべての関係を力学モデルで配置して描きます。領域ごとにまとまり、種類ごとに線の色と形が変わります。(<a href="#/map">開く</a>)</p>
        <p><strong>学習ルートの自動生成</strong>: 目標のページから「前提知識」の辺をさかのぼり、推移閉包をトポロジカルソートして学ぶ順に並べます。(<a href="#/build">開く</a>)</p>
        <p><strong>足りない前提の提示</strong>: 各ページで、前提の推移閉包のうち未学習のものを表示します。分野ページでは、その分野の概念が必要とする前提のうち、分野の外にあるものを集めます。学習済みの記録はこのブラウザにだけ保存されます。</p>

        <h2>5. データの追加</h2>
        <p>データは <code>data/</code> 以下の JavaScript ファイルにあります。ページを足すときは該当ファイルにオブジェクトを追加し、関係は <code>data/relations.js</code> に一行で書きます。</p>
        <pre>["prereq", "linear-algebra", "wave-function"]   // 線形代数 は 波動関数 の前提
["conflict", "bayes", "statistical-inference", "確率は信念か頻度か"]</pre>
        <p>本文では <code>[[id]]</code> または <code>[[id|表示名]]</code> で他のページにリンクできます。追加したら <code>node scripts/validate.mjs</code> で、存在しない参照、前提知識の循環、ルート内の順序の誤りを検査してください。</p>
      </div>`;
  }

  // ───────── ヘッダー ─────────
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("q").value.trim();
    if (q) location.hash = `#/search/${encodeURIComponent(q)}`;
  });

  const themes = ["auto", "light", "dark"];
  const themeIcon = { auto: "◐", light: "☀", dark: "☾" };
  let theme = store.get("academia.theme", "auto");
  const themeBtn = document.getElementById("theme");
  function applyTheme() {
    if (theme === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", theme);
    themeBtn.textContent = themeIcon[theme];
    themeBtn.title = `表示: ${{ auto: "システムに合わせる", light: "ライト", dark: "ダーク" }[theme]}`;
  }
  themeBtn.addEventListener("click", () => {
    theme = themes[(themes.indexOf(theme) + 1) % themes.length];
    store.set("academia.theme", theme);
    applyTheme();
  });
  applyTheme();

  window.addEventListener("hashchange", render);
  let resizeTimer;
  window.addEventListener("resize", () => {
    if (!location.hash.startsWith("#/map")) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 200);
  });
  render();
})(window.ACADEMIA);
