// ページの種類と関係の種類の定義。
// データを追加するときは、ここに載っている type だけを使う(scripts/validate.mjs が検査する)。
window.ACADEMIA = window.ACADEMIA || {};

ACADEMIA.pageTypes = {
  field:    { label: "分野",     plural: "分野",     desc: "分類ツリーの節点。物理学、言語学、量子力学など。" },
  concept:  { label: "概念",     plural: "概念",     desc: "複数の分野にまたがる考え方や定理。" },
  question: { label: "問い",     plural: "問い",     desc: "未解決問題や大きな問い。好奇心の入口。" },
  person:   { label: "人物",     plural: "人物",     desc: "伝記ではなく「何を考え、何を変えたか」。" },
  route:    { label: "学習ルート", plural: "学習ルート", desc: "ページを順番につないだ道筋。" },
};

// 関係はすべて有向辺 [type, from, to, note?] で持つ。
// symmetric: true の関係は向きを持たない(表示時に両側から同じラベルで見える)。
ACADEMIA.relationTypes = {
  prereq: {
    label: "前提知識",
    forward: "次に学べる",          // from のページから見た to
    backward: "学ぶ前に必要",        // to のページから見た from
    desc: "A は B を学ぶ前に必要。学習ルートの自動生成と「足りない前提」の計算に使う。",
  },
  develops: {
    label: "発展・応用",
    forward: "ここから生まれた",
    backward: "ここから発展した",
    desc: "A から B が生まれた。理論の拡張や一般化、応用分野の誕生。",
  },
  tool: {
    label: "道具として使う",
    forward: "道具として使われる先",
    backward: "道具として使う",
    desc: "A は B で道具として使われる(統計学 → 心理学 など)。",
  },
  conflict: {
    label: "対立・競合",
    forward: "対立・競合する理論",
    backward: "対立・競合する理論",
    symmetric: true,
    desc: "A と B は同じ現象を別の仕方で説明し、互いに競合する。",
  },
  influence: {
    label: "歴史的な影響",
    forward: "影響を与えた",
    backward: "影響を受けた",
    desc: "A は B に歴史的な影響を与えた。人物から概念への辺もここに入る。",
  },
};

// 分類ツリーの最上位。既存体系との対応は各分野ページの classification に持つ。
ACADEMIA.domains = ["formal", "natural", "social", "humanities", "applied"];
