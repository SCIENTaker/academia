// 概念ページ。fields はその概念が属する(または主に使われる)分野。先頭が「主な分野」。
ACADEMIA.pages = (ACADEMIA.pages || []).concat([
  // ───────── 数学の基礎 ─────────
  {
    id: "set", type: "concept", title: "集合と写像", en: "Sets and maps", fields: ["foundations", "mathematics"],
    summary: "ものの集まりと、集まりどうしの対応。現代数学の共通言語。",
    body: "集合は「ものの集まり」、写像は「集合の要素を別の集合の要素に対応させる規則」である。ほぼすべての数学的対象は、集合と写像の言葉で定義し直せる。\n\n無限集合にも大きさの違いがあることを [[cantor]] が [[diagonal-argument]] で示し、数学基礎論の議論が始まった。",
  },
  {
    id: "function", type: "concept", title: "関数", en: "Function", fields: ["analysis", "mathematics"],
    summary: "入力を一つ決めると出力が一つ決まる対応。変化を記述する基本単位。",
    body: "関数は数を数に対応させる写像で、グラフとして目で見ることができる。物理量の時間変化、需要と価格の関係など、「ある量が別の量にどう依存するか」は関数で書かれる。\n\n関数を道具に「瞬間の変化」を考えたいとき、[[limit]] が必要になる。",
  },
  {
    id: "limit", type: "concept", title: "極限", en: "Limit", fields: ["analysis"],
    summary: "限りなく近づくとき、どこに近づくか。微積分の土台。",
    body: "「限りなく近づく」を ε-δ 論法で厳密に定義したことで、微積分は直観ではなく論理の上に立つようになった。\n\n無限を有限の言葉で扱う技術であり、[[derivative]] と [[integral]] はどちらも極限として定義される。",
  },
  {
    id: "derivative", type: "concept", title: "微分", en: "Derivative", fields: ["analysis"],
    summary: "瞬間の変化率。速度、限界効用、勾配はすべて微分である。",
    body: "関数のグラフの接線の傾き、つまり入力をわずかに動かしたときの出力の変化の割合を表す。\n\n位置の微分が速度、速度の微分が加速度であり、[[newtons-laws]] はこの言葉で書かれる。経済学の「限界」、機械学習の [[gradient-descent]] も微分の応用である。",
  },
  {
    id: "integral", type: "concept", title: "積分", en: "Integral", fields: ["analysis"],
    summary: "小さな量を足し集めること。面積・総量・確率を計算する。",
    body: "細かく分けて足し合わせ、その分け方を限りなく細かくした [[limit]] として定義される。\n\n微積分の基本定理によって、積分は微分の逆操作であることが分かる。この発見が [[newton]] とライプニッツの微積分の核心である。",
  },
  {
    id: "differential-equation", type: "concept", title: "微分方程式", en: "Differential equation", fields: ["analysis", "physics"],
    summary: "変化の規則から、未来の状態を決める方程式。",
    body: "「今の状態が変化の速さを決める」という形の法則は微分方程式になる。運動方程式、[[maxwell-equations]]、シュレーディンガー方程式、感染症の流行モデル、[[neural-circuit]] のモデルはすべて微分方程式である。\n\n自然法則の多くがこの形をとる理由は、それ自体が興味深い問いである。",
  },
  {
    id: "linear-algebra", type: "concept", title: "線形代数", en: "Linear algebra", fields: ["algebra", "mathematics"],
    summary: "ベクトルと行列の数学。多次元の量をまとめて扱う。",
    body: "足し算とスカラー倍だけが定義された空間(ベクトル空間)と、それを保つ写像(行列)を調べる。\n\n量子力学の状態はベクトル、[[neural-network]] の各層は行列の掛け算、統計の回帰分析は射影である。応用範囲の広さでは数学のなかでも群を抜く。",
  },
  {
    id: "multivariable-calculus", type: "concept", title: "多変数の微積分", en: "Multivariable calculus", fields: ["analysis"],
    summary: "入力が複数ある関数の微分と積分。偏微分、勾配、ベクトル解析。",
    body: "空間の各点に値やベクトルが割り当てられた「場」を扱うための道具である。勾配・発散・回転といったベクトル解析の言葉で [[maxwell-equations]] は書かれ、勾配は [[gradient-descent]] の中心にある。",
  },
  {
    id: "group", type: "concept", title: "群", en: "Group", fields: ["algebra"],
    summary: "対称性を数学にしたもの。",
    body: "「元に戻せる操作の集まり」で、操作を続けて行う規則が与えられたもの。正方形の回転や鏡映、粒子の入れ替え、時空の回転などはすべて群をなす。\n\n物理学では、法則の対称性が群で表され、[[noether]] によって保存則と結びつく。",
  },
  {
    id: "manifold", type: "concept", title: "多様体", en: "Manifold", fields: ["geometry"],
    summary: "小さく見ると平らだが、全体では曲がっていてよい空間。",
    body: "地球の表面は、狭い範囲では平面の地図で表せるが、全体を一枚の平面にはできない。多様体はこうした空間の一般化で、局所的な座標の貼り合わせとして定義される。\n\n[[general-relativity]] の時空は4次元の多様体である。",
  },
  {
    id: "tensor", type: "concept", title: "テンソル", en: "Tensor", fields: ["algebra", "geometry"],
    summary: "座標の取り方によらない量。ベクトルや行列の一般化。",
    body: "座標系を変えても、決まった規則で成分が変換される量をテンソルという。物理法則をテンソルで書けば、どの観測者から見ても同じ形になることが保証される。\n\n[[general-relativity]] の場の方程式はテンソル方程式である。",
  },
  {
    id: "riemannian-geometry", type: "concept", title: "リーマン幾何と曲率", en: "Riemannian geometry", fields: ["geometry"],
    summary: "距離の測り方を各点で与えることで、曲がった空間を扱う幾何学。",
    body: "各点ごとに長さと角度の測り方(計量)を与えると、空間がどれだけ曲がっているか(曲率)を空間の内側から計算できる。\n\n[[riemann]] が1854年に提示したこの枠組みは、約60年後に [[einstein]] が重力理論の言葉として採用した。",
  },

  // ───────── 論理と計算 ─────────
  {
    id: "first-order-logic", type: "concept", title: "一階述語論理", en: "First-order logic", fields: ["logic", "foundations"],
    summary: "「すべての」「ある」を含む推論を記号で扱う論理体系。",
    body: "命題を記号で書き、推論規則を機械的に適用することで証明を構成する。ほとんどの数学はこの論理の上で形式化できる。\n\n「正しい推論とは何か」を厳密にしたことで、証明そのものを数学の対象にする道が開けた([[formal-system]])。",
  },
  {
    id: "formal-system", type: "concept", title: "形式体系と公理", en: "Formal system", fields: ["foundations", "logic"],
    summary: "公理と推論規則だけから定理を機械的に導く仕組み。",
    body: "ヒルベルトは、数学全体を形式体系として書き下し、その無矛盾性を有限的な方法で証明しようとした(ヒルベルト・プログラム)。\n\nこの計画は [[incompleteness]] によって、当初の形では実現できないことが示された。",
  },
  {
    id: "diagonal-argument", type: "concept", title: "対角線論法", en: "Diagonal argument", fields: ["foundations"],
    summary: "「自分自身について語る」構成で、不可能性を示す論法。",
    body: "[[cantor]] は、実数をどう並べても、並びの対角線を一つずつずらした数がリストから漏れることを示し、実数が自然数より「多い」ことを証明した。\n\n同じ構造が [[incompleteness]] と [[halting-problem]] の証明にも現れる。20世紀の不可能性定理の多くはこの論法の変奏である。",
  },
  {
    id: "incompleteness", type: "concept", title: "ゲーデルの不完全性定理", en: "Gödel's incompleteness theorems", fields: ["foundations", "logic"],
    summary: "十分に強い無矛盾な形式体系には、証明も反証もできない命題がある。",
    body: "第一不完全性定理: 自然数の算術を含む無矛盾な [[formal-system]] には、その体系の中では証明も反証もできない命題が存在する。第二不完全性定理: そのような体系は、自分自身の無矛盾性を証明できない。\n\n[[godel]] は、命題を数で符号化(ゲーデル数)し、「この命題は証明できない」と述べる命題を算術の中に構成した。この構成は [[diagonal-argument]] の一種である。\n\nよくある誤解として「人間には分かるが機械には分からないことがある」の証明とされることがあるが、定理自体はそこまで主張していない。",
  },
  {
    id: "turing-machine", type: "concept", title: "チューリングマシン", en: "Turing machine", fields: ["computation-theory", "computer-science"],
    summary: "テープと規則表だけからなる、計算の数学的モデル。",
    body: "[[turing]] は、人間が紙と鉛筆で行う計算を極限まで単純化し、無限のテープを読み書きする機械として定式化した。\n\nどんな計算も、ある一台の「万能チューリングマシン」で模倣できる。これがプログラム内蔵式コンピュータの理論的な原型になった。心を計算として捉える [[functionalism]] の着想源でもある。",
  },
  {
    id: "halting-problem", type: "concept", title: "停止問題と計算可能性", en: "Halting problem", fields: ["computation-theory"],
    summary: "任意のプログラムが止まるかどうかを判定する一般的な方法は存在しない。",
    body: "あるプログラムが入力に対して有限時間で止まるかどうかを、すべての場合について正しく判定するプログラムは作れない。証明は [[diagonal-argument]] による。\n\n「原理的に計算できないこと」が存在することを示し、[[incompleteness]] を計算の言葉で言い直したものとも見なせる。",
  },
  {
    id: "complexity-classes", type: "concept", title: "計算量クラス(P と NP)", en: "Complexity classes", fields: ["computation-theory", "algorithms"],
    summary: "問題を「どれだけ速く解けるか」で分類する枠組み。",
    body: "P は多項式時間で解ける問題、NP は答えが与えられれば多項式時間で検証できる問題のクラスである。\n\n計算できるかどうか([[halting-problem]])から一歩進んで、「現実的な時間で」計算できるかを問う。",
  },
  {
    id: "np-completeness", type: "concept", title: "NP完全性", en: "NP-completeness", fields: ["computation-theory"],
    summary: "NP の中で「最も難しい」問題たち。一つ解ければ全部解ける。",
    body: "充足可能性問題(SAT)、巡回セールスマン問題の判定版、数独の一般化などは NP完全である。どれか一つでも多項式時間で解ければ、NP のすべての問題が多項式時間で解ける。\n\nこれらが効率よく解けないと信じられていることが、[[q-p-vs-np]] の核心である。",
  },
  {
    id: "information", type: "concept", title: "情報量とシャノン・エントロピー", en: "Information entropy", fields: ["information-engineering", "probability-theory"],
    summary: "メッセージがどれだけ「驚き」を含むかを測る量。",
    body: "[[shannon]] は、起こりにくい出来事ほど多くの情報を持つと考え、平均的な情報量を -Σ p log p で定義した。これは通信路でどれだけ圧縮・伝送できるかの限界を与える。\n\n式の形は統計力学の [[entropy]] と同じであり、この一致は偶然ではないと考えられている。",
  },

  // ───────── 確率と統計 ─────────
  {
    id: "probability", type: "concept", title: "確率", en: "Probability", fields: ["probability-theory", "statistics"],
    summary: "不確かな出来事の起こりやすさを 0 から 1 の数で表す。",
    body: "コルモゴロフは確率を [[set]] と測度の言葉で公理化した。確率分布、期待値、条件付き確率がまず押さえるべき道具である。\n\n確率が「頻度」なのか「信念の度合い」なのかという解釈の違いは、[[statistical-inference]] と [[bayes]] の対立につながる。",
  },
  {
    id: "bayes", type: "concept", title: "ベイズ推論", en: "Bayesian inference", fields: ["statistics", "machine-learning"],
    summary: "証拠を得るたびに、信念を確率として更新する推論。",
    body: "事前の信念(事前分布)にデータの尤度を掛けて、事後の信念(事後分布)を得る。ベイズの定理という一行の式が出発点である。\n\n確率を「信念の度合い」と解釈する点で頻度主義の [[statistical-inference]] と対立してきた。認知科学では、脳そのものがベイズ推論をしているという仮説もある。",
  },
  {
    id: "statistical-inference", type: "concept", title: "統計的推測(頻度主義)", en: "Frequentist inference", fields: ["statistics"],
    summary: "仮説検定や信頼区間によって、データから母集団について推論する方法。",
    body: "確率を「同じ実験を何度も繰り返したときの頻度」と解釈し、p値や信頼区間を使って結論を出す。20世紀の実験科学の標準的な方法である。\n\np値の誤用が再現性の危機の一因とされ、[[bayes]] 的な方法との使い分けが改めて議論されている。",
  },

  // ───────── 物理学 ─────────
  {
    id: "newtons-laws", type: "concept", title: "ニュートンの運動法則", en: "Newton's laws of motion", fields: ["classical-mechanics"],
    summary: "力が加速度を決める。天体の運動と地上の運動を同じ法則で説明した。",
    body: "慣性の法則、F = ma、作用反作用の三法則と万有引力の法則によって、リンゴの落下と月の公転が同じ原理で説明された。\n\n時間と空間を観測者によらない絶対的な舞台と見なす点で、[[special-relativity]] と対立する。",
  },
  {
    id: "least-action", type: "concept", title: "最小作用の原理", en: "Principle of least action", fields: ["classical-mechanics", "physics"],
    summary: "自然は「作用」という量が停留する経路を選ぶ。",
    body: "粒子の運動を「各瞬間の力」ではなく「経路全体についての量(作用)」で捉え直す。ラグランジュ形式・ハミルトン形式の解析力学はここから生まれた。\n\nこの書き方は、電磁気学、相対論、量子力学(経路積分)にもそのまま拡張でき、現代物理学の標準的な言語になっている。",
  },
  {
    id: "noether", type: "concept", title: "ネーターの定理", en: "Noether's theorem", fields: ["classical-mechanics", "physics"],
    summary: "連続的な対称性があれば、必ず対応する保存量がある。",
    body: "時間をずらしても法則が変わらない → エネルギーが保存する。空間をずらしても変わらない → 運動量が保存する。回転しても変わらない → 角運動量が保存する。\n\n[[emmy-noether]] が1918年に示したこの定理によって、保存則は「対称性の帰結」として理解されるようになった。素粒子物理学は対称性([[group]])から理論を組み立てる。",
  },
  {
    id: "maxwell-equations", type: "concept", title: "マクスウェル方程式", en: "Maxwell's equations", fields: ["electromagnetism"],
    summary: "電場と磁場を記述する4つの方程式。光が電磁波であることを導いた。",
    body: "電場と磁場が互いを生み出しながら空間を伝わる波の解を持ち、その速さが光速に一致した。こうして電気・磁気・光が一つの理論になった。\n\nこの方程式では光速が観測者によらない定数になってしまい、ニュートン力学と食い違う。この矛盾の解決が [[special-relativity]] である。",
  },
  {
    id: "special-relativity", type: "concept", title: "特殊相対性理論", en: "Special relativity", fields: ["relativity"],
    summary: "光速はどの観測者にとっても同じ。その代わり時間と空間が伸び縮みする。",
    body: "光速不変と相対性原理の二つを公理として、時間の遅れ、長さの収縮、同時性の相対性、E = mc² が導かれる。\n\n時間と空間は「時空」という一つの4次元の舞台にまとめられた。重力を含めるためにさらに [[general-relativity]] へ拡張された。",
  },
  {
    id: "equivalence-principle", type: "concept", title: "等価原理", en: "Equivalence principle", fields: ["relativity"],
    summary: "重力と加速度は、局所的には区別できない。",
    body: "落下するエレベーターの中では重力が消えたように感じる。[[einstein]] はこれを「生涯で最も幸福な考え」と呼び、重力を時空の幾何学として扱う出発点にした。",
  },
  {
    id: "general-relativity", type: "concept", title: "一般相対性理論", en: "General relativity", fields: ["relativity", "cosmology"],
    summary: "重力とは時空の曲がりである。",
    body: "物質とエネルギーが時空を曲げ、曲がった時空が物質の運動を決める。この関係はアインシュタイン方程式という [[tensor]] 方程式で書かれる。\n\n水星の近日点移動、光の曲がり、重力波、ブラックホールを予言・説明した。宇宙全体に適用すると [[big-bang]] 宇宙論が得られる。量子力学との統一はできておらず、[[q-quantum-gravity]] として残っている。",
  },
  {
    id: "big-bang", type: "concept", title: "ビッグバン宇宙論", en: "Big Bang cosmology", fields: ["cosmology"],
    summary: "宇宙は約138億年前の高温高密度の状態から膨張してきた。",
    body: "遠い銀河ほど速く遠ざかっていること、宇宙マイクロ波背景放射、軽元素の存在比が主な証拠である。\n\n宇宙が低い [[entropy]] の状態から始まったことは、[[q-arrow-of-time]] を説明する鍵だと考えられている。",
  },
  {
    id: "entropy", type: "concept", title: "エントロピー", en: "Entropy", fields: ["statistical-mechanics", "chemistry"],
    summary: "ミクロな状態の「数」の対数。孤立系ではほぼ必ず増える。",
    body: "熱力学では熱の移動にともなう量として導入された。[[boltzmann]] は、同じマクロな状態を実現するミクロな配置の数 W を使って S = k log W と書き、エントロピーを確率の言葉で理解した。\n\n熱力学第二法則(孤立系のエントロピーは減らない)は、配置の数が圧倒的に多い状態へ系が移っていく、という統計的な主張になる。\n\n同じ形の量が通信理論にも現れる([[information]])。生命は局所的にエントロピーを下げながら維持されており、[[q-origin-of-life]] や [[q-arrow-of-time]] とも結びつく。",
  },
  {
    id: "boltzmann-distribution", type: "concept", title: "ボルツマン分布", en: "Boltzmann distribution", fields: ["statistical-mechanics"],
    summary: "温度 T で、エネルギー E の状態が実現する確率は exp(-E/kT) に比例する。",
    body: "熱平衡にある系の各状態の確率を与える。化学反応の速さ、気体の速度分布、半導体の性質などがここから導かれる。\n\n機械学習のソフトマックス関数やボルツマンマシンも同じ形をしている。",
  },
  {
    id: "wave-function", type: "concept", title: "波動関数と重ね合わせ", en: "Wave function & superposition", fields: ["quantum-mechanics"],
    summary: "量子状態は、可能な結果の重ね合わせとして表される。",
    body: "粒子の状態は複素数値の波動関数(状態ベクトル)で表され、シュレーディンガー方程式に従って時間発展する。測定すると、振幅の絶対値の2乗に比例した確率で一つの結果が得られる(ボルン則)。\n\n測定のときに何が起きているのか、という問いが [[q-quantum-interpretation]] である。",
  },
  {
    id: "uncertainty", type: "concept", title: "不確定性原理", en: "Uncertainty principle", fields: ["quantum-mechanics"],
    summary: "位置と運動量を同時に正確に定めることはできない。",
    body: "測定技術の限界ではなく、量子状態そのものの性質である。位置がはっきり決まった状態は運動量の重ね合わせであり、その逆も成り立つ。数学的にはフーリエ変換の性質に由来する。",
  },
  {
    id: "entanglement", type: "concept", title: "量子もつれ", en: "Quantum entanglement", fields: ["quantum-mechanics"],
    summary: "複数の粒子が、個別には記述できない一つの状態を共有すること。",
    body: "もつれた粒子は、どれだけ離れていても測定結果に古典的には説明できない相関を示す(ベルの不等式の破れ)。[[einstein]] はこれを「不気味な遠隔作用」と呼んで疑ったが、実験で確かめられた。\n\n量子計算や量子暗号の資源であり、[[q-quantum-interpretation]] の議論でも中心にある。",
  },
  {
    id: "copenhagen", type: "concept", title: "コペンハーゲン解釈", en: "Copenhagen interpretation", fields: ["quantum-mechanics", "philosophy-of-science"],
    summary: "測定によって波動関数は一つの結果に「収縮」する、とする解釈。",
    body: "ボーアやハイゼンベルクらの立場を源流とする。量子論は観測結果を予測するための理論であり、測定前の「本当の状態」を問うことには意味がない、と考える。\n\n「測定とは何か」が定義されていないという批判を受けている。",
  },
  {
    id: "many-worlds", type: "concept", title: "多世界解釈", en: "Many-worlds interpretation", fields: ["quantum-mechanics", "philosophy-of-science"],
    summary: "波動関数は収縮しない。測定のたびに世界が分岐する、とする解釈。",
    body: "エヴェレットが1957年に提案した。シュレーディンガー方程式だけを認め、測定装置や観測者も重ね合わせの一部になると考える。\n\n収縮という余分な過程を必要としない代わりに、確率の意味をどう説明するかが課題になる。",
  },

  // ───────── 生物学 ─────────
  {
    id: "natural-selection", type: "concept", title: "自然選択", en: "Natural selection", fields: ["evolutionary-biology", "biology"],
    summary: "変異・遺伝・生存と繁殖の差の三つがあれば、生物は環境に適応していく。",
    body: "個体には違いがあり、その違いの一部は子に伝わり、違いによって残せる子の数が異なる。この三条件だけで、設計者なしに精巧な適応が生まれる。\n\n[[darwin]] とウォレスが独立に到達した。目的や設計を仮定せずに機能を説明するこの考え方は、生物学の外([[neural-network]] の学習、文化の変化、[[nash-equilibrium]] による進化ゲーム理論)にも広がった。",
  },
  {
    id: "gene", type: "concept", title: "遺伝子と DNA", en: "Gene & DNA", fields: ["molecular-biology", "biology"],
    summary: "遺伝情報の単位。DNA の塩基配列として書かれている。",
    body: "メンデルが「遺伝の粒子」として想定した遺伝子は、20世紀半ばに DNA の二重らせんとして実体が分かった。DNA → RNA → タンパク質という情報の流れ(セントラルドグマ)が細胞の働きの基本である。\n\nダーウィンは遺伝の仕組みを知らなかった。[[natural-selection]] と遺伝学が結びついたのは1930〜40年代である。",
  },
  {
    id: "rna-world", type: "concept", title: "RNAワールド仮説", en: "RNA world hypothesis", fields: ["molecular-biology", "chemistry"],
    summary: "初期の生命は、遺伝情報と触媒の両方を RNA が担っていた、という仮説。",
    body: "現在の生命では DNA が情報を、タンパク質が触媒を担うが、RNA は両方の役割を果たせる。そこで、DNA とタンパク質より先に RNA だけの世界があったと考える。\n\n[[q-origin-of-life]] に対する有力な仮説の一つだが、RNA がどうやって最初に合成されたかは未解決である。",
  },
  {
    id: "neural-circuit", type: "concept", title: "ニューロンと神経回路", en: "Neurons & neural circuits", fields: ["neuroscience"],
    summary: "神経細胞は電気信号で発火し、シナプスでつながって回路をつくる。",
    body: "ニューロンは入力を受けて膜電位を変化させ、閾値を超えると発火する。この過程はホジキン・ハクスリーの [[differential-equation]] で記述される。シナプスの結合強度は経験によって変わり、これが学習と記憶の基盤と考えられている。\n\nこの仕組みを単純化した数理モデルから [[neural-network]] が生まれた。",
  },

  // ───────── 社会科学 ─────────
  {
    id: "utility", type: "concept", title: "効用最大化と合理的選択", en: "Utility maximization", fields: ["economics"],
    summary: "人は自分の効用(満足度)を最大にするように選ぶ、というモデル。",
    body: "選好を数値(効用)で表し、制約のもとで最大化する問題として行動を記述する。[[von-neumann]] とモルゲンシュテルンは、不確実性のもとでの選択を期待効用として公理化した。\n\n単純だが強力なこの仮定は、[[bounded-rationality]] や行動経済学によって批判・修正されてきた。",
  },
  {
    id: "bounded-rationality", type: "concept", title: "限定合理性", en: "Bounded rationality", fields: ["economics", "cognitive-science"],
    summary: "人間の合理性は、情報・時間・計算能力の制約を受ける。",
    body: "サイモンは、人は最適解を探すのではなく「満足できる」解で探索を打ち切ると論じた。カーネマンとトヴェルスキーは、判断が系統的なバイアスを持つことを実験で示した。\n\n完全に合理的な主体を仮定する [[utility]] 最大化モデルと対立する。",
  },
  {
    id: "nash-equilibrium", type: "concept", title: "ゲーム理論とナッシュ均衡", en: "Game theory & Nash equilibrium", fields: ["economics", "mathematics"],
    summary: "互いの戦略を前提にしたとき、誰も一人だけ戦略を変えたくならない状態。",
    body: "自分の最善の行動が相手の行動に依存する状況を、ゲームとして分析する。ナッシュは、有限のゲームには([[probability]] を使う混合戦略まで含めれば)必ず均衡が存在することを示した。\n\n囚人のジレンマは、各自が合理的に行動すると全員にとって悪い結果になることを示す。進化生物学では「進化的に安定な戦略」として使われる。",
  },

  // ───────── 言語学 ─────────
  {
    id: "structuralism", type: "concept", title: "構造主義言語学", en: "Structural linguistics", fields: ["linguistics"],
    summary: "言語の要素は、それ自体ではなく他の要素との違いによって意味を持つ。",
    body: "[[saussure]] は、言語を個々の発話(パロール)ではなく、話者が共有する差異の体系(ラング)として研究すべきだと論じた。記号と意味の結びつきは恣意的である。\n\nこの見方は言語学を近代科学にし、人類学や哲学の「構造主義」にも広がった。",
  },
  {
    id: "universal-grammar", type: "concept", title: "普遍文法", en: "Universal grammar", fields: ["linguistics", "cognitive-science"],
    summary: "人間は言語の基本構造を生まれつき持っている、という仮説。",
    body: "[[chomsky]] は、子どもが限られた入力から短期間で複雑な文法を習得することを「刺激の貧困」と呼び、言語の核となる仕組みは生得的であると主張した。\n\n文法を形式的な生成規則として書く方法は、計算機科学の形式言語理論とも合流した。[[usage-based]] と対立する。",
  },
  {
    id: "usage-based", type: "concept", title: "用法基盤モデル", en: "Usage-based linguistics", fields: ["linguistics", "cognitive-science"],
    summary: "文法は、言語の使用経験から一般的な学習能力によって獲得される、という立場。",
    body: "トマセロらは、子どもは具体的な表現を大量に聞き、そこから徐々にパターンを抽象化していくと考える。言語に特化した生得的な文法を仮定しない。\n\n大量のテキストから言語を学ぶ [[neural-network]] の成功は、この論争に新しい材料を持ち込んだ。",
  },

  // ───────── 科学哲学 ─────────
  {
    id: "falsifiability", type: "concept", title: "反証可能性", en: "Falsifiability", fields: ["philosophy-of-science"],
    summary: "科学的な理論とは、反証される可能性のある理論である。",
    body: "[[popper]] は、どれだけ多くの確証例を集めても理論は証明されないが、一つの反例で反証はされうると考えた。反証される可能性を持たない理論(何が起きても説明できてしまう理論)は科学ではない。\n\n科学と疑似科学の線引きの基準として広く知られている。",
  },
  {
    id: "paradigm", type: "concept", title: "パラダイム", en: "Paradigm", fields: ["philosophy-of-science", "sociology"],
    summary: "科学者共同体が共有する、問題と解き方の枠組み。",
    body: "[[kuhn]] は、科学は反証の積み重ねで連続的に進むのではなく、ある枠組み(パラダイム)の中での「通常科学」と、枠組みそのものが入れ替わる「科学革命」を繰り返すと論じた。\n\n天動説から地動説、ニュートン力学から相対論への移行がその例とされる。[[falsifiability]] にもとづく科学観と対立した。",
  },

  // ───────── 心の哲学 ─────────
  {
    id: "dualism", type: "concept", title: "心身二元論", en: "Mind–body dualism", fields: ["philosophy-of-mind"],
    summary: "心と物質は、根本的に異なる二種類の存在である。",
    body: "デカルトは、考える実体(心)と広がりを持つ実体(物体)を区別した。現代では、物理的な事実をすべて知っても主観的な体験(クオリア)は分からない、という議論が二元論的な直観を支えている。\n\n心と物質がどう相互作用するのかが最大の難点である。",
  },
  {
    id: "functionalism", type: "concept", title: "機能主義", en: "Functionalism", fields: ["philosophy-of-mind", "cognitive-science"],
    summary: "心の状態は、それが何でできているかではなく、何をするか(機能)で決まる。",
    body: "痛みとは、損傷を入力として受け取り、回避行動を出力し、他の心的状態と特定の仕方で結びつく「役割」である、と考える。同じ役割を果たせば、脳でもシリコンでもよい(多重実現可能性)。\n\n[[turing-machine]] の発想と相性がよく、認知科学の哲学的な土台になった。[[dualism]] と対立し、[[q-machine-understanding]] に肯定的な答えを与えやすい立場である。",
  },
  {
    id: "global-workspace", type: "concept", title: "グローバル・ワークスペース理論", en: "Global workspace theory", fields: ["neuroscience", "cognitive-science"],
    summary: "意識とは、情報が脳全体に「放送」されて多くの処理系から使える状態である。",
    body: "バーズが提案し、ドゥアンヌらが神経科学的に発展させた。脳には多数の専門的な処理系があり、そのうち一つの内容が広域のネットワークで共有されたとき、それが意識に上ると考える。\n\n意識を情報の「アクセス可能性」として捉える点で [[functionalism]] と親和的であり、[[iit]] と競合する。",
  },
  {
    id: "iit", type: "concept", title: "統合情報理論", en: "Integrated information theory", fields: ["neuroscience", "philosophy-of-mind"],
    summary: "意識の量は、システムが統合している情報の量 Φ で決まる。",
    body: "トノーニが提案した。意識体験の性質(統合されている、特定的である等)から出発し、それを満たす物理系の条件を数学的に定める。\n\n意識をシステムの因果構造そのものの性質とみなすため、同じ機能を持つ計算機でも意識を持たない場合があると予測する。[[global-workspace]] と対立し、両者を比較する実験が行われている。",
  },

  // ───────── 機械学習 ─────────
  {
    id: "gradient-descent", type: "concept", title: "勾配降下法", en: "Gradient descent", fields: ["machine-learning", "analysis"],
    summary: "関数の勾配の逆向きに少しずつ進んで、最小値を探す方法。",
    body: "山の斜面で、いちばん急な下り方向に一歩ずつ進むイメージである。誤差を表す関数を [[multivariable-calculus]] の勾配で下っていく。\n\n単純だが、数十億のパラメータを持つ [[neural-network]] の学習もほぼこの方法(とその改良)で行われている。",
  },
  {
    id: "neural-network", type: "concept", title: "ニューラルネットワーク", en: "Neural network", fields: ["machine-learning", "cognitive-science"],
    summary: "単純な計算素子を大量に層状につなぎ、データから重みを学習するモデル。",
    body: "[[neural-circuit]] を単純化したモデルとして1940年代に始まり、誤差逆伝播法と [[gradient-descent]] による学習、大量のデータと計算資源によって2010年代に急速に発展した。\n\n各層は [[linear-algebra]] の行列演算と非線形関数の組み合わせである。言語を流暢に扱うモデルの登場は、[[q-machine-understanding]] や [[q-language-innate]] の議論を動かしている。",
  },
]);
