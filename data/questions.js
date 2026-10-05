// 問いページ。status は「未解決」「論争中」など。positions は主な立場(page があればそのページへリンク)。
ACADEMIA.pages = (ACADEMIA.pages || []).concat([
  {
    id: "q-consciousness", type: "question", title: "意識とは何か", en: "What is consciousness?",
    fields: ["philosophy-of-mind", "neuroscience", "cognitive-science"], status: "未解決",
    summary: "脳という物質から、なぜ「何かを感じている」という主観的な体験が生まれるのか。",
    body: "脳がどのように情報を処理し、行動を制御しているかは、原理的には神経科学で説明できそうに見える。しかし、赤を見たときの「赤さ」の感じ(クオリア)がなぜ伴うのかは、それだけでは説明されない。チャーマーズはこれを「意識のハード・プロブレム」と呼んだ。\n\n問いは哲学から始まったが、現在は神経科学の実験で理論どうしを比較する段階に入っている。",
    why: "主観的な体験は外から直接観測できない。何をもって「説明できた」とするか自体に合意がない。",
    positions: [
      { page: "dualism", text: "心は物質に還元できない。" },
      { page: "functionalism", text: "心は機能であり、適切な情報処理があれば意識もある。" },
      { page: "global-workspace", text: "意識とは、情報が脳全体で利用可能になった状態である。" },
      { page: "iit", text: "意識とは、システムが統合している情報そのものである。" },
    ],
  },
  {
    id: "q-p-vs-np", type: "question", title: "P≠NP か", en: "P vs NP",
    fields: ["computation-theory", "computer-science"], status: "未解決(ミレニアム懸賞問題)",
    summary: "答えを検証するのが簡単な問題は、答えを見つけるのも簡単なのか。",
    body: "数独の解答が正しいかどうかはすぐ確かめられるが、解答を見つけるのは難しい。この「確かめるのは易しいが、見つけるのは難しい」という直観が数学的に正しいかを問うのが P vs NP 問題である。\n\nほとんどの研究者は P≠NP だと考えているが、証明はない。もし P=NP なら、現在の暗号の多くが破られ、数学の証明の発見すら自動化できることになる。",
    why: "既知の証明技法(対角線論法、回路の下界など)の多くが、この問題には原理的に通用しないことが示されている。",
    positions: [
      { page: "np-completeness", text: "NP完全問題のどれか一つが効率よく解ければ P=NP。" },
      { text: "多数派の予想: P≠NP。証明には新しい数学が必要だと考えられている。" },
    ],
  },
  {
    id: "q-quantum-interpretation", type: "question", title: "量子力学の観測問題", en: "Measurement problem",
    fields: ["quantum-mechanics", "philosophy-of-science"], status: "論争中",
    summary: "重ね合わせの状態は、測定の瞬間に何が起きて一つの結果になるのか。",
    body: "シュレーディンガー方程式に従う限り、波動関数は重ね合わせのまま連続的に変化する。しかし実際に測定すると、いつも一つの結果だけが得られる。この二つの記述をどうつなぐかが観測問題である。\n\n量子力学の予測そのものはどの解釈でも同じであるため、実験で決着をつけるのが難しい。",
    why: "主要な解釈どうしが、少なくとも現在の実験精度では同じ予測を与える。",
    positions: [
      { page: "copenhagen", text: "測定で波動関数が収縮する。測定前の実在を問わない。" },
      { page: "many-worlds", text: "収縮は起きない。世界が分岐する。" },
      { text: "ボーム力学: 粒子は常に明確な位置を持ち、波動関数がそれを導く。" },
      { text: "客観的収縮理論: 収縮は物理的な過程であり、方程式を修正すべきである。" },
    ],
  },
  {
    id: "q-quantum-gravity", type: "question", title: "量子重力はどう記述されるか", en: "Quantum gravity",
    fields: ["physics", "relativity", "quantum-mechanics"], status: "未解決",
    summary: "量子力学と一般相対性理論を、一つの理論として統一できるか。",
    body: "一般相対論は時空を滑らかな幾何学として扱い、量子力学は時空を固定された舞台として扱う。ブラックホールの中心や宇宙の始まりのように、両方が同時に効く場面では理論が破綻する。\n\n超弦理論、ループ量子重力などの候補があるが、実験で検証できるエネルギーの規模からは遠く離れている。",
    why: "量子重力の効果が現れるエネルギーは、現在の加速器より15桁ほど高い。",
    positions: [
      { text: "超弦理論: 基本的な対象を点ではなく弦と考える。" },
      { text: "ループ量子重力: 時空そのものを量子化し、離散的な構造を持たせる。" },
    ],
  },
  {
    id: "q-origin-of-life", type: "question", title: "生命はどう始まったか", en: "Origin of life",
    fields: ["biology", "chemistry", "molecular-biology"], status: "未解決",
    summary: "化学反応の集まりは、どうやって自己複製し進化する「生命」になったのか。",
    body: "自然選択は、いったん自己複製する存在が現れれば進化を説明できる。しかし最初の自己複製体がどう現れたかは説明しない。\n\n情報(遺伝)、代謝、膜による区画化のどれが先に成立したのかをめぐって、複数のシナリオが競合している。",
    why: "40億年近く前の出来事で、直接の証拠がほとんど残っていない。",
    positions: [
      { page: "rna-world", text: "情報と触媒を担う RNA が先にあった。" },
      { text: "代謝ファースト説: 自己維持する化学反応のネットワークが先にあった。" },
    ],
  },
  {
    id: "q-math-reality", type: "question", title: "数学的対象は実在するか", en: "Are mathematical objects real?",
    fields: ["foundations", "philosophy"], status: "論争中",
    summary: "数や集合は人間が発明したものか、それとも発見されるのを待っているものか。",
    body: "数学者の多くは、定理を「作る」のではなく「見つける」と感じている。一方で、数学的対象は時間も空間も持たず、どうやって私たちがそれについて知ることができるのかは謎である。\n\n不完全性定理は、どの形式体系にも収まらない数学的真理があることを示し、この議論に材料を与えた。",
    why: "数学的対象の存在を確かめる観測や実験が、原理的に存在しない。",
    positions: [
      { text: "プラトン主義: 数学的対象は人間とは独立に実在する。" },
      { page: "formal-system", text: "形式主義: 数学は記号を規則に従って操作するゲームである。" },
      { text: "直観主義: 数学的対象は、心の中で構成されたときにだけ存在する。" },
    ],
  },
  {
    id: "q-language-innate", type: "question", title: "言語能力はどこまで生得的か", en: "Is language innate?",
    fields: ["linguistics", "cognitive-science"], status: "論争中",
    summary: "子どもが言葉を覚えるのは、生まれつきの文法知識があるからか、学習能力が高いからか。",
    body: "子どもは数年で母語の複雑な文法を身につける。この速さと一様さを説明するには生得的な文法が必要だ、という主張と、一般的な学習能力と豊富な入力で十分だ、という主張が対立している。\n\n大量の文章から学習した言語モデルが文法的な文を生成できるようになったことで、論争は新しい局面を迎えている。",
    why: "人間の子どもの学習条件を、実験で統制して変えることができない。",
    positions: [
      { page: "universal-grammar", text: "言語の核となる仕組みは生得的である。" },
      { page: "usage-based", text: "文法は使用経験から一般的な学習で獲得される。" },
    ],
  },
  {
    id: "q-machine-understanding", type: "question", title: "機械は「理解」できるか", en: "Can machines understand?",
    fields: ["philosophy-of-mind", "machine-learning"], status: "論争中",
    summary: "記号やデータを適切に処理するシステムは、意味を理解していると言えるか。",
    body: "チューリングは「機械は考えるか」という問いを、会話で人間と区別できるかというテスト(チューリング・テスト)に置き換えた。サールは「中国語の部屋」の思考実験で、規則に従って記号を操作するだけでは理解は生じないと反論した。\n\n流暢に会話するニューラルネットワークの登場によって、この問いは思考実験から現実の問題になった。",
    why: "「理解」という言葉の基準が、人によって行動・内部構造・主観的体験と異なる。",
    positions: [
      { page: "functionalism", text: "適切な機能を果たすなら、理解していると言ってよい。" },
      { text: "中国語の部屋(サール): 記号操作だけでは意味は生まれない。" },
    ],
  },
  {
    id: "q-arrow-of-time", type: "question", title: "時間の矢はなぜ一方向か", en: "The arrow of time",
    fields: ["statistical-mechanics", "cosmology"], status: "未解決",
    summary: "基本法則は時間を逆にしても成り立つのに、なぜ世界には過去と未来の区別があるのか。",
    body: "ニュートンの法則も量子力学も、時間を反転させても同じ形をしている。それなのに、割れたコップは元に戻らず、私たちは過去を覚えていて未来を覚えていない。\n\nエントロピー増大で説明できそうに見えるが、それは「過去のエントロピーが低かった」ことを前提にしている。ではなぜ宇宙の始まりは低エントロピーだったのか、という問いが残る。",
    why: "説明が最終的に宇宙の初期条件に行き着き、それをさらに説明する理論がない。",
    positions: [
      { page: "entropy", text: "時間の矢はエントロピー増大の方向である。" },
      { page: "big-bang", text: "過去仮説: 宇宙は極めて低エントロピーな状態から始まった。" },
    ],
  },
]);
