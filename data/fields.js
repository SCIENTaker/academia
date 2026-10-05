// 分野ページ。parent をたどると分類ツリーになる(parent: null は最上位の領域)。
// classification は既存分類体系との対応: ndc = 日本十進分類法, arxiv = arXiv のカテゴリ。
ACADEMIA.pages = (ACADEMIA.pages || []).concat([
  // ───────── 最上位の領域 ─────────
  {
    id: "formal", type: "field", title: "形式科学", en: "Formal sciences", parent: null,
    summary: "記号と規則だけから出発して、何が導けるかを調べる学問。",
    body: "形式科学は観察や実験ではなく、定義と推論によって結論を確かめる。数学、論理学、計算機科学、統計学がここに入る。\n\nここで作られた道具は、ほぼすべての経験科学で使われる。物理学は [[analysis]] と [[algebra]] なしには書けず、心理学や医学は [[statistics]] なしには結論を出せない。",
  },
  {
    id: "natural", type: "field", title: "自然科学", en: "Natural sciences", parent: null,
    summary: "自然界の現象を観察と実験で調べ、法則として記述する学問。",
    body: "物理学、化学、生物学、地球惑星科学などからなる。下の階層の学問ほど少数の基本法則で多くを説明しようとし、上の階層ほど複雑な対象をその対象に固有の言葉で扱う。\n\n[[physics]] → [[chemistry]] → [[biology]] → [[neuroscience]] という還元の連鎖が、どこまで成り立つのかはそれ自体が大きな問いになっている([[q-consciousness]])。",
  },
  {
    id: "social", type: "field", title: "社会科学", en: "Social sciences", parent: null,
    summary: "人間の行動と、人間がつくる集団・制度を調べる学問。",
    body: "経済学、心理学、社会学などからなる。対象である人間が理論を知って振る舞いを変えうる、という点で自然科学と事情が異なる。\n\n数理モデル([[nash-equilibrium]] など)と統計的な実証([[statistics]])の二本柱で進むことが多い。",
  },
  {
    id: "humanities", type: "field", title: "人文学", en: "Humanities", parent: null,
    summary: "言語・思想・歴史など、人間がつくった意味の世界を調べる学問。",
    body: "哲学、言語学、歴史学などからなる。人文学の問いの一部は、科学が進むにつれて経験的に調べられるようになってきた。[[q-language-innate]] や [[q-consciousness]] はその代表例である。",
  },
  {
    id: "applied", type: "field", title: "応用科学", en: "Applied sciences", parent: null,
    summary: "基礎科学の知見を使って、ものや仕組みをつくり、問題を解く学問。",
    body: "工学、医学、情報工学などからなる。応用の現場から新しい基礎的な問いが生まれることも多い。たとえば [[machine-learning]] の成功が [[q-machine-understanding]] という古い問いを再び動かした。",
  },

  // ───────── 形式科学 ─────────
  {
    id: "mathematics", type: "field", title: "数学", en: "Mathematics", parent: "formal",
    classification: { ndc: "410", arxiv: "math" },
    summary: "数・形・構造・変化を、証明によって確かめる学問。",
    body: "数学の結論は実験ではなく証明で確かめられる。一度証明された定理は、物理理論のように覆されることがない。\n\nなぜ人間の頭で作った数学がこれほど自然をうまく記述できるのかは、今も哲学の問いである([[q-math-reality]])。",
  },
  {
    id: "algebra", type: "field", title: "代数学", en: "Algebra", parent: "mathematics",
    classification: { ndc: "411", arxiv: "math.RA" },
    summary: "演算の規則そのものを抽象的に調べる分野。",
    body: "方程式を解く技術から始まり、[[group]] や環、体といった「演算の構造」そのものを調べる分野になった。[[linear-algebra]] は応用範囲が最も広い一角である。",
  },
  {
    id: "analysis", type: "field", title: "解析学", en: "Analysis", parent: "mathematics",
    classification: { ndc: "413", arxiv: "math.CA" },
    summary: "極限の概念を土台に、連続的な変化を扱う分野。",
    body: "[[limit]] を厳密に定義することで、[[derivative]] と [[integral]] を確かな土台に載せた。[[differential-equation]] を通じて、物理学の言葉そのものになっている。",
  },
  {
    id: "geometry", type: "field", title: "幾何学・位相幾何学", en: "Geometry & Topology", parent: "mathematics",
    classification: { ndc: "414", arxiv: "math.DG" },
    summary: "空間とその形を調べる分野。",
    body: "ユークリッドの平面幾何から、曲がった空間を扱う [[riemannian-geometry]]、連続変形で変わらない性質を調べる位相幾何学へ広がった。[[manifold]] は現代幾何の基本的な舞台である。",
  },
  {
    id: "probability-theory", type: "field", title: "確率論", en: "Probability theory", parent: "mathematics",
    classification: { ndc: "417", arxiv: "math.PR" },
    summary: "不確かさを数学的に扱う分野。",
    body: "賭けの計算から始まり、測度論の上に公理化された。[[statistics]]、[[statistical-mechanics]]、[[quantum-mechanics]]、[[machine-learning]] の共通言語である。",
  },
  {
    id: "foundations", type: "field", title: "数学基礎論", en: "Foundations of mathematics", parent: "mathematics",
    classification: { ndc: "410.9", arxiv: "math.LO" },
    summary: "数学そのものを数学の対象として調べる分野。",
    body: "「数学は矛盾しないか」「すべての真な命題は証明できるか」を問う。その答えの一つが [[incompleteness]] であり、そこから [[computer-science]] が生まれた。",
  },
  {
    id: "logic", type: "field", title: "論理学", en: "Logic", parent: "formal",
    classification: { ndc: "116", arxiv: "math.LO" },
    summary: "正しい推論の形式を調べる学問。",
    body: "アリストテレス以来の哲学の一部門だったが、19世紀末に記号化され、数学と計算機科学の基礎になった。中心となる道具は [[first-order-logic]] である。",
  },
  {
    id: "computer-science", type: "field", title: "計算機科学", en: "Computer science", parent: "formal",
    classification: { ndc: "007", arxiv: "cs" },
    summary: "計算とは何か、何がどれだけ速く計算できるかを調べる学問。",
    body: "コンピュータが作られる前に、[[turing-machine]] という紙の上の機械として始まった。計算できるかどうか([[halting-problem]])と、効率よく計算できるかどうか([[complexity-classes]])が二大テーマである。",
  },
  {
    id: "computation-theory", type: "field", title: "計算理論", en: "Theory of computation", parent: "computer-science",
    classification: { arxiv: "cs.CC" },
    summary: "計算可能性と計算量を調べる分野。",
    body: "計算の限界を調べる。最も有名な未解決問題は [[q-p-vs-np]] である。",
  },
  {
    id: "algorithms", type: "field", title: "アルゴリズム", en: "Algorithms", parent: "computer-science",
    classification: { arxiv: "cs.DS" },
    summary: "問題を解く手順を設計し、その効率を分析する分野。",
    body: "整列、探索、グラフ、最適化などの手順を設計し、[[complexity-classes]] の言葉で効率を評価する。",
  },
  {
    id: "statistics", type: "field", title: "統計学", en: "Statistics", parent: "formal",
    classification: { ndc: "417", arxiv: "stat" },
    summary: "限られたデータから、不確かさ込みで結論を引き出す学問。",
    body: "[[probability]] を使って、観測データから世界について推論する。[[statistical-inference]] と [[bayes]] という二つの流儀が長く競合してきた。\n\n心理学、医学、経済学など、実験やデータで結論を出すほぼすべての分野が道具として使う。",
  },

  // ───────── 自然科学 ─────────
  {
    id: "physics", type: "field", title: "物理学", en: "Physics", parent: "natural",
    classification: { ndc: "420", arxiv: "physics" },
    summary: "物質とエネルギー、空間と時間の基本法則を調べる学問。",
    body: "少数の法則から多くの現象を導くことを目指す。[[classical-mechanics]]、[[electromagnetism]]、[[statistical-mechanics]]、[[quantum-mechanics]]、[[relativity]] が柱である。\n\n量子論と一般相対論の統一([[q-quantum-gravity]])が最大の課題として残っている。",
  },
  {
    id: "classical-mechanics", type: "field", title: "古典力学", en: "Classical mechanics", parent: "physics",
    classification: { ndc: "423", arxiv: "physics.class-ph" },
    summary: "物体の運動を、力と運動方程式で記述する分野。",
    body: "[[newtons-laws]] に始まり、[[least-action]] による解析力学として整理された。量子力学も相対論も、この枠組みの書き換えとして生まれている。",
  },
  {
    id: "electromagnetism", type: "field", title: "電磁気学", en: "Electromagnetism", parent: "physics",
    classification: { ndc: "427" },
    summary: "電気と磁気、そして光を一つの場として扱う分野。",
    body: "[[maxwell-equations]] によって電気・磁気・光が統一された。この方程式とニュートン力学の食い違いが [[special-relativity]] を生んだ。",
  },
  {
    id: "statistical-mechanics", type: "field", title: "熱・統計力学", en: "Statistical mechanics", parent: "physics",
    classification: { ndc: "426", arxiv: "cond-mat.stat-mech" },
    summary: "膨大な数の粒子のふるまいから、熱や温度を説明する分野。",
    body: "個々の分子の運動は追わず、[[probability]] を使って全体の性質を導く。中心概念は [[entropy]] と [[boltzmann-distribution]] である。",
  },
  {
    id: "quantum-mechanics", type: "field", title: "量子力学", en: "Quantum mechanics", parent: "physics",
    classification: { ndc: "421.3", arxiv: "quant-ph" },
    summary: "原子以下の世界の法則。状態は確率振幅として重ね合わさる。",
    body: "[[wave-function]] が時間発展し、測定すると確率的に一つの結果が出る。[[uncertainty]] や [[entanglement]] など、古典的な直観に反する性質を持つ。\n\n予測は極めて正確だが、それが何を意味するかについては合意がない([[q-quantum-interpretation]])。",
  },
  {
    id: "relativity", type: "field", title: "相対性理論", en: "Relativity", parent: "physics",
    classification: { ndc: "421.2", arxiv: "gr-qc" },
    summary: "時間と空間が観測者や重力によって変わることを示した理論。",
    body: "[[special-relativity]] は時間と空間を時空として一体化し、[[general-relativity]] は重力を時空の曲がりとして捉え直した。",
  },
  {
    id: "cosmology", type: "field", title: "宇宙論", en: "Cosmology", parent: "physics",
    classification: { ndc: "443.9", arxiv: "astro-ph.CO" },
    summary: "宇宙全体の構造と歴史を調べる分野。",
    body: "[[general-relativity]] を宇宙全体に当てはめることで、膨張する宇宙と [[big-bang]] の描像が得られた。",
  },
  {
    id: "chemistry", type: "field", title: "化学", en: "Chemistry", parent: "natural",
    classification: { ndc: "430", arxiv: "physics.chem-ph" },
    summary: "物質の構造と、物質が別の物質に変わる反応を調べる学問。",
    body: "化学結合は [[quantum-mechanics]] で説明され、反応がどちらに進むかは [[entropy]] と自由エネルギーで決まる。生命の化学的な起源([[q-origin-of-life]])は化学と生物学の境界にある問いである。",
  },
  {
    id: "biology", type: "field", title: "生物学", en: "Biology", parent: "natural",
    classification: { ndc: "460", arxiv: "q-bio" },
    summary: "生命の仕組みと多様性、その歴史を調べる学問。",
    body: "「生物学のすべては進化の光の下でなければ意味をなさない」(ドブジャンスキー)。[[natural-selection]] と [[gene]] が二つの柱である。",
  },
  {
    id: "evolutionary-biology", type: "field", title: "進化生物学", en: "Evolutionary biology", parent: "biology",
    classification: { ndc: "467.5", arxiv: "q-bio.PE" },
    summary: "生物がどのように変化し、多様化してきたかを調べる分野。",
    body: "[[natural-selection]] と遺伝学が融合した「総合説」を土台に、[[nash-equilibrium]] を使った進化ゲーム理論なども取り込んでいる。",
  },
  {
    id: "molecular-biology", type: "field", title: "分子生物学", en: "Molecular biology", parent: "biology",
    classification: { arxiv: "q-bio.BM" },
    summary: "生命現象を DNA やタンパク質などの分子の働きとして説明する分野。",
    body: "[[gene]] の実体が DNA であることが分かって以来、遺伝・発生・代謝が分子の言葉で書けるようになった。",
  },
  {
    id: "neuroscience", type: "field", title: "神経科学", en: "Neuroscience", parent: "biology",
    classification: { arxiv: "q-bio.NC" },
    summary: "神経系がどのように情報を処理し、行動や心を生むかを調べる分野。",
    body: "単一の [[neural-circuit]] から脳全体のネットワークまでを扱う。[[q-consciousness]] に経験的に迫ろうとする分野でもある。",
  },

  // ───────── 社会科学 ─────────
  {
    id: "economics", type: "field", title: "経済学", en: "Economics", parent: "social",
    classification: { ndc: "330", arxiv: "econ" },
    summary: "限られた資源をめぐる人々の選択と、その集まりを調べる学問。",
    body: "[[utility]] を最大化する合理的な主体を仮定して市場や制度を分析してきた。その仮定を問い直す [[bounded-rationality]] や行動経済学が近年の大きな流れである。",
  },
  {
    id: "psychology", type: "field", title: "心理学", en: "Psychology", parent: "social",
    classification: { ndc: "140" },
    summary: "心と行動を、実験と観察によって調べる学問。",
    body: "哲学から実験科学として独立した。結論の多くは [[statistics]] による検定に依存しており、再現性の問題が近年大きく議論された。",
  },
  {
    id: "cognitive-science", type: "field", title: "認知科学", en: "Cognitive science", parent: "psychology",
    classification: { arxiv: "q-bio.NC" },
    summary: "心を情報処理として捉え、心理学・言語学・計算機科学・哲学を横断して調べる分野。",
    body: "[[turing-machine]] の発想と [[functionalism]] を背景に、20世紀半ばに生まれた。[[bayes]] による「ベイズ脳」モデルなど、数理的な理論が多い。",
  },
  {
    id: "sociology", type: "field", title: "社会学", en: "Sociology", parent: "social",
    classification: { ndc: "361" },
    summary: "社会関係、集団、制度がどう成り立ち、どう変わるかを調べる学問。",
    body: "個人の行動の総和に還元できない社会の性質を扱う。科学という営みそのものを社会現象として見る科学社会学は、[[paradigm]] の議論と深く関わる。",
  },

  // ───────── 人文学 ─────────
  {
    id: "philosophy", type: "field", title: "哲学", en: "Philosophy", parent: "humanities",
    classification: { ndc: "100" },
    summary: "当たり前とされている前提そのものを問い直す学問。",
    body: "多くの個別科学は哲学から独立して生まれた。それでも、科学がまだ扱い方を知らない問い([[q-consciousness]]、[[q-math-reality]])は哲学に残っている。",
  },
  {
    id: "philosophy-of-mind", type: "field", title: "心の哲学", en: "Philosophy of mind", parent: "philosophy",
    summary: "心とは何か、心と身体・脳はどう関係するかを問う分野。",
    body: "[[dualism]] と [[functionalism]] の対立を軸に、[[q-consciousness]] や [[q-machine-understanding]] を論じる。",
  },
  {
    id: "philosophy-of-science", type: "field", title: "科学哲学", en: "Philosophy of science", parent: "philosophy",
    classification: { ndc: "401" },
    summary: "科学とは何か、科学的知識はどう正当化されるかを問う分野。",
    body: "[[falsifiability]] と [[paradigm]] の論争が20世紀の科学観を大きく変えた。",
  },
  {
    id: "ethics", type: "field", title: "倫理学", en: "Ethics", parent: "philosophy",
    classification: { ndc: "150" },
    summary: "何をすべきか、何が善いかを問う分野。",
    body: "医療や AI など、技術が新しい選択肢を生むたびに新しい問いを受け取る分野である。",
  },
  {
    id: "linguistics", type: "field", title: "言語学", en: "Linguistics", parent: "humanities",
    classification: { ndc: "801", arxiv: "cs.CL" },
    summary: "人間の言語の構造と、その獲得・使用・変化を調べる学問。",
    body: "[[structuralism]] によって近代言語学が始まり、[[universal-grammar]] と [[usage-based]] の論争が現在まで続いている。",
  },
  {
    id: "history", type: "field", title: "歴史学", en: "History", parent: "humanities",
    classification: { ndc: "200" },
    summary: "過去の出来事を、史料にもとづいて再構成し解釈する学問。",
    body: "科学史は、理論がどのように生まれ、競合し、入れ替わってきたかを記録する。このサイトの「歴史的な影響」の関係は科学史の知見にもとづく。",
  },

  // ───────── 応用科学 ─────────
  {
    id: "information-engineering", type: "field", title: "情報工学", en: "Information engineering", parent: "applied",
    classification: { ndc: "548" },
    summary: "情報を処理・伝送・蓄積するシステムをつくる学問。",
    body: "[[computer-science]] の理論と [[information]] 理論を、実際に動くシステムにする。",
  },
  {
    id: "machine-learning", type: "field", title: "機械学習", en: "Machine learning", parent: "information-engineering",
    classification: { ndc: "007.13", arxiv: "cs.LG" },
    summary: "データから規則性を学習し、予測や判断を行うシステムをつくる分野。",
    body: "[[statistics]]、[[linear-algebra]]、[[gradient-descent]] を組み合わせて発展した。現在の主役は [[neural-network]] である。",
  },
  {
    id: "medicine", type: "field", title: "医学", en: "Medicine", parent: "applied",
    classification: { ndc: "490" },
    summary: "病気を理解し、予防し、治療するための学問。",
    body: "生物学の知見を人間の健康に応用する。治療の効果はランダム化比較試験と [[statistics]] によって確かめられる。",
  },
]);
