export type VocabItem = {
  word: string
  reading: string
  romaji: string
  meaning: string
  level: string
  options: string[]
}

export type KanjiItem = {
  kanji: string
  onyomi: string
  kunyomi: string
  meaning: string
  level: string
  strokeCount: number
  examples: { word: string; reading: string; meaning: string }[]
}

export type GrammarItem = {
  pattern: string
  meaning: string
  level: string
  example: string
  exampleMeaning: string
  options: string[]
}

export const LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const
export type Level = (typeof LEVELS)[number]

export const vocabBank: VocabItem[] = [
  // N5
  { word: "食べる", reading: "たべる", romaji: "taberu", meaning: "to eat", level: "N5", options: ["to eat", "to drink", "to see", "to go"] },
  { word: "飲む", reading: "のむ", romaji: "nomu", meaning: "to drink", level: "N5", options: ["to drink", "to eat", "to read", "to sleep"] },
  { word: "見る", reading: "みる", romaji: "miru", meaning: "to see", level: "N5", options: ["to see", "to hear", "to say", "to buy"] },
  { word: "聞く", reading: "きく", romaji: "kiku", meaning: "to listen", level: "N5", options: ["to listen", "to write", "to walk", "to speak"] },
  { word: "書く", reading: "かく", romaji: "kaku", meaning: "to write", level: "N5", options: ["to write", "to read", "to draw", "to open"] },
  { word: "読む", reading: "よむ", romaji: "yomu", meaning: "to read", level: "N5", options: ["to read", "to write", "to call", "to learn"] },
  { word: "話す", reading: "はなす", romaji: "hanasu", meaning: "to speak", level: "N5", options: ["to speak", "to listen", "to sing", "to think"] },
  { word: "買う", reading: "かう", romaji: "kau", meaning: "to buy", level: "N5", options: ["to buy", "to sell", "to use", "to make"] },
  { word: "大きい", reading: "おおきい", romaji: "ookii", meaning: "big", level: "N5", options: ["big", "small", "long", "tall"] },
  { word: "小さい", reading: "ちいさい", romaji: "chiisai", meaning: "small", level: "N5", options: ["small", "big", "short", "narrow"] },
  { word: "新しい", reading: "あたらしい", romaji: "atarashii", meaning: "new", level: "N5", options: ["new", "old", "young", "fast"] },
  { word: "古い", reading: "ふるい", romaji: "furui", meaning: "old", level: "N5", options: ["old", "new", "cheap", "slow"] },
  { word: "天気", reading: "てんき", romaji: "tenki", meaning: "weather", level: "N5", options: ["weather", "electricity", "mood", "sky"] },
  { word: "友達", reading: "ともだち", romaji: "tomodachi", meaning: "friend", level: "N5", options: ["friend", "family", "teacher", "student"] },
  { word: "学校", reading: "がっこう", romaji: "gakkou", meaning: "school", level: "N5", options: ["school", "hospital", "station", "library"] },
  // N4
  { word: "届ける", reading: "とどける", romaji: "todokeru", meaning: "to deliver", level: "N4", options: ["to deliver", "to receive", "to send", "to carry"] },
  { word: "片付ける", reading: "かたづける", romaji: "katadzukeru", meaning: "to tidy up", level: "N4", options: ["to tidy up", "to break", "to throw", "to pick up"] },
  { word: "見つける", reading: "みつける", romaji: "mitsukeru", meaning: "to find", level: "N4", options: ["to find", "to lose", "to look for", "to discover"] },
  { word: "準備", reading: "じゅんび", romaji: "junbi", meaning: "preparation", level: "N4", options: ["preparation", "practice", "promise", "plan"] },
  { word: "特別", reading: "とくべつ", romaji: "tokubetsu", meaning: "special", level: "N4", options: ["special", "normal", "strange", "important"] },
  { word: "将来", reading: "しょうらい", romaji: "shourai", meaning: "future", level: "N4", options: ["future", "past", "present", "dream"] },
  // N3
  { word: "経験", reading: "けいけん", romaji: "keiken", meaning: "experience", level: "N3", options: ["experience", "experiment", "expression", "exercise"] },
  { word: "責任", reading: "せきにん", romaji: "sekinin", meaning: "responsibility", level: "N3", options: ["responsibility", "blame", "duty", "obligation"] },
  { word: "成長", reading: "せいちょう", romaji: "seichou", meaning: "growth", level: "N3", options: ["growth", "success", "achievement", "development"] },
  { word: "伝統", reading: "でんとう", romaji: "dentou", meaning: "tradition", level: "N3", options: ["tradition", "legend", "electricity", "communication"] },
  { word: "記念", reading: "きねん", romaji: "kinen", meaning: "commemoration", level: "N3", options: ["commemoration", "memory", "diary", "prayer"] },
  { word: "基本", reading: "きほん", romaji: "kihon", meaning: "foundation", level: "N3", options: ["foundation", "origin", "basis", "textbook"] },
  { word: "規則", reading: "きそく", romaji: "kisoku", meaning: "rule", level: "N3", options: ["rule", "standard", "scale", "measurement"] },
  // N2
  { word: "影響", reading: "えいきょう", romaji: "eikyou", meaning: "influence", level: "N2", options: ["influence", "shadow", "movie", "reflection"] },
  { word: "環境", reading: "かんきょう", romaji: "kankyou", meaning: "environment", level: "N2", options: ["environment", "situation", "surroundings", "condition"] },
  { word: "挑戦", reading: "ちょうせん", romaji: "chousen", meaning: "challenge", level: "N2", options: ["challenge", "invasion", "selection", "adventure"] },
  { word: "貿易", reading: "ぼうえき", romaji: "boueki", meaning: "trade", level: "N2", options: ["trade", "economy", "profit", "exchange"] },
  { word: "政治", reading: "せいじ", romaji: "seiji", meaning: "politics", level: "N2", options: ["politics", "justice", "government", "law"] },
  { word: "対象", reading: "たいしょう", romaji: "taishou", meaning: "target/object", level: "N2", options: ["target/object", "comparison", "opposite", "contrast"] },
  { word: "効果", reading: "こうか", romaji: "kouka", meaning: "effect", level: "N2", options: ["effect", "expensive", "coin", "result"] },
  { word: "意識", reading: "いしき", romaji: "ishiki", meaning: "consciousness", level: "N2", options: ["consciousness", "opinion", "will", "meaning"] },
  // N1
  { word: "概念", reading: "がいねん", romaji: "gainen", meaning: "concept", level: "N1", options: ["concept", "memory", "opinion", "theory"] },
  { word: "把握", reading: "はあく", romaji: "haaku", meaning: "grasp/comprehend", level: "N1", options: ["grasp/comprehend", "release", "squeeze", "push"] },
  { word: "繊細", reading: "せんさい", romaji: "sensai", meaning: "delicate", level: "N1", options: ["delicate", "rough", "bold", "sturdy"] },
  { word: "矛盾", reading: "むじゅん", romaji: "mujun", meaning: "contradiction", level: "N1", options: ["contradiction", "agreement", "harmony", "conflict"] },
]

export const kanjiBank: KanjiItem[] = [
  // N5
  { kanji: "日", onyomi: "ニチ", kunyomi: "ひ", meaning: "day, sun", level: "N5", strokeCount: 4, examples: [{ word: "日曜日", reading: "にちようび", meaning: "Sunday" }, { word: "毎日", reading: "まいにち", meaning: "every day" }] },
  { kanji: "人", onyomi: "ジン", kunyomi: "ひと", meaning: "person", level: "N5", strokeCount: 2, examples: [{ word: "日本人", reading: "にほんじん", meaning: "Japanese person" }, { word: "人々", reading: "ひとびと", meaning: "people" }] },
  { kanji: "大", onyomi: "ダイ", kunyomi: "おお.きい", meaning: "big", level: "N5", strokeCount: 3, examples: [{ word: "大きい", reading: "おおきい", meaning: "big" }, { word: "大学", reading: "だいがく", meaning: "university" }] },
  { kanji: "山", onyomi: "サン", kunyomi: "やま", meaning: "mountain", level: "N5", strokeCount: 3, examples: [{ word: "山", reading: "やま", meaning: "mountain" }, { word: "富士山", reading: "ふじさん", meaning: "Mt. Fuji" }] },
  { kanji: "食", onyomi: "ショク", kunyomi: "た.べる", meaning: "eat", level: "N5", strokeCount: 9, examples: [{ word: "食べる", reading: "たべる", meaning: "to eat" }, { word: "食事", reading: "しょくじ", meaning: "meal" }] },
  { kanji: "見", onyomi: "ケン", kunyomi: "み.る", meaning: "see", level: "N5", strokeCount: 7, examples: [{ word: "見る", reading: "みる", meaning: "to see" }, { word: "意見", reading: "いけん", meaning: "opinion" }] },
  { kanji: "学", onyomi: "ガク", kunyomi: "まな.ぶ", meaning: "study, learn", level: "N5", strokeCount: 8, examples: [{ word: "学ぶ", reading: "まなぶ", meaning: "to learn" }, { word: "学校", reading: "がっこう", meaning: "school" }] },
  { kanji: "水", onyomi: "スイ", kunyomi: "みず", meaning: "water", level: "N5", strokeCount: 4, examples: [{ word: "水", reading: "みず", meaning: "water" }, { word: "水曜日", reading: "すいようび", meaning: "Wednesday" }] },
  // N4
  { kanji: "勉", onyomi: "ベン", kunyomi: "つと.める", meaning: "exertion, endeavor", level: "N4", strokeCount: 10, examples: [{ word: "勉強", reading: "べんきょう", meaning: "study" }, { word: "勤勉", reading: "きんべん", meaning: "diligent" }] },
  { kanji: "強", onyomi: "キョウ", kunyomi: "つよ.い", meaning: "strong", level: "N4", strokeCount: 11, examples: [{ word: "強い", reading: "つよい", meaning: "strong" }, { word: "強調", reading: "きょうちょう", meaning: "emphasis" }] },
  { kanji: "読", onyomi: "ドク", kunyomi: "よ.む", meaning: "read", level: "N4", strokeCount: 14, examples: [{ word: "読む", reading: "よむ", meaning: "to read" }, { word: "読書", reading: "どくしょ", meaning: "reading" }] },
  { kanji: "話", onyomi: "ワ", kunyomi: "はな.す", meaning: "talk", level: "N4", strokeCount: 13, examples: [{ word: "話す", reading: "はなす", meaning: "to speak" }, { word: "電話", reading: "でんわ", meaning: "telephone" }] },
  // N3
  { kanji: "届", onyomi: "トドケ", kunyomi: "とど.ける", meaning: "deliver, reach", level: "N3", strokeCount: 8, examples: [{ word: "届ける", reading: "とどける", meaning: "to deliver" }, { word: "届く", reading: "とどく", meaning: "to reach" }] },
  { kanji: "経", onyomi: "ケイ", kunyomi: "へ.る", meaning: "pass through", level: "N3", strokeCount: 11, examples: [{ word: "経験", reading: "けいけん", meaning: "experience" }, { word: "経済", reading: "けいざい", meaning: "economy" }] },
  // N2
  { kanji: "影", onyomi: "エイ", kunyomi: "かげ", meaning: "shadow, influence", level: "N2", strokeCount: 15, examples: [{ word: "影響", reading: "えいきょう", meaning: "influence" }, { word: "影", reading: "かげ", meaning: "shadow" }] },
  { kanji: "環", onyomi: "カン", kunyomi: "わ", meaning: "ring, circle", level: "N2", strokeCount: 17, examples: [{ word: "環境", reading: "かんきょう", meaning: "environment" }, { word: "循環", reading: "じゅんかん", meaning: "circulation" }] },
  // N1
  { kanji: "矛", onyomi: "ム", kunyomi: "ほこ", meaning: "spear", level: "N1", strokeCount: 5, examples: [{ word: "矛盾", reading: "むじゅん", meaning: "contradiction" }, { word: "矛先", reading: "ほこさき", meaning: "spearhead" }] },
  { kanji: "盾", onyomi: "ジュン", kunyomi: "たて", meaning: "shield", level: "N1", strokeCount: 9, examples: [{ word: "矛盾", reading: "むじゅん", meaning: "contradiction" }, { word: "盾", reading: "たて", meaning: "shield" }] },
]

export const grammarBank: GrammarItem[] = [
  // N5
  { pattern: "〜ます", meaning: "polite verb ending", level: "N5", example: "毎日日本語を勉強します。", exampleMeaning: "I study Japanese every day.", options: ["polite verb ending", "past tense", "negative", "want to"] },
  { pattern: "〜ません", meaning: "polite negative", level: "N5", example: "コーヒーを飲みません。", exampleMeaning: "I don't drink coffee.", options: ["polite negative", "polite past", "polite request", "polite verb ending"] },
  { pattern: "〜たい", meaning: "want to do", level: "N5", example: "日本に行きたいです。", exampleMeaning: "I want to go to Japan.", options: ["want to do", "must do", "can do", "will do"] },
  { pattern: "〜てください", meaning: "please do", level: "N5", example: "ここに名前を書いてください。", exampleMeaning: "Please write your name here.", options: ["please do", "don't do", "let's do", "must do"] },
  { pattern: "〜がある", meaning: "there is (inanimate)", level: "N5", example: "机の上に本があります。", exampleMeaning: "There is a book on the desk.", options: ["there is (inanimate)", "there is (animate)", "to have (ability)", "to do"] },
  { pattern: "〜がいる", meaning: "there is (animate)", level: "N5", example: "公園に猫がいます。", exampleMeaning: "There is a cat in the park.", options: ["there is (animate)", "there is (inanimate)", "to need", "to want"] },
  // N4
  { pattern: "〜てしまう", meaning: "to end up doing / completely", level: "N4", example: "宿題を忘れてしまいました。", exampleMeaning: "I ended up forgetting my homework.", options: ["to end up doing / completely", "to try doing", "to keep doing", "to start doing"] },
  { pattern: "〜ておく", meaning: "to do in advance", level: "N4", example: "明日のためにご飯を作っておきます。", exampleMeaning: "I'll make food in advance for tomorrow.", options: ["to do in advance", "to finish doing", "to try doing", "to keep doing"] },
  { pattern: "〜なければならない", meaning: "must do", level: "N4", example: "薬を飲まなければなりません。", exampleMeaning: "I must take medicine.", options: ["must do", "don't have to", "should not", "want to"] },
  { pattern: "〜そうだ", meaning: "looks like / seems", level: "N4", example: "このケーキはおいしそうです。", exampleMeaning: "This cake looks delicious.", options: ["looks like / seems", "I heard that", "it is said that", "apparently"] },
  // N3
  { pattern: "〜ために", meaning: "in order to / because of", level: "N3", example: "日本語を勉強するために、毎日練習しています。", exampleMeaning: "In order to study Japanese, I practice every day.", options: ["in order to / because of", "instead of", "while doing", "despite"] },
  { pattern: "〜ようにする", meaning: "to try to / make sure to", level: "N3", example: "毎朝早く起きるようにしています。", exampleMeaning: "I try to wake up early every morning.", options: ["to try to / make sure to", "to be able to", "it seems like", "to decide to"] },
  { pattern: "〜ことにする", meaning: "to decide to", level: "N3", example: "来年、日本に行くことにしました。", exampleMeaning: "I decided to go to Japan next year.", options: ["to decide to", "to try to", "it is said that", "to become"] },
  { pattern: "〜ばかり", meaning: "just did / nothing but", level: "N3", example: "日本に来たばかりです。", exampleMeaning: "I just came to Japan.", options: ["just did / nothing but", "about to", "almost", "finally"] },
  // N2
  { pattern: "〜わけではない", meaning: "it doesn't mean that", level: "N2", example: "嫌いなわけではないが、苦手です。", exampleMeaning: "It doesn't mean I dislike it, but I'm not good at it.", options: ["it doesn't mean that", "there is no reason", "it is impossible", "it should not be"] },
  { pattern: "〜に対して", meaning: "toward / in contrast to", level: "N2", example: "先生に対して失礼なことを言った。", exampleMeaning: "I said something rude toward the teacher.", options: ["toward / in contrast to", "about / regarding", "according to", "compared to"] },
  { pattern: "〜とは限らない", meaning: "not necessarily", level: "N2", example: "高いものがいいとは限らない。", exampleMeaning: "Expensive things are not necessarily good.", options: ["not necessarily", "it is certain that", "it is limited to", "without exception"] },
  // N1
  { pattern: "〜ざるを得ない", meaning: "cannot help but / have no choice but to", level: "N1", example: "彼の意見に賛成せざるを得ない。", exampleMeaning: "I have no choice but to agree with his opinion.", options: ["cannot help but / have no choice but to", "must not", "should not", "it is impossible to"] },
  { pattern: "〜にほかならない", meaning: "nothing but / none other than", level: "N1", example: "これは努力の結果にほかならない。", exampleMeaning: "This is nothing but the result of hard work.", options: ["nothing but / none other than", "it is not limited to", "it doesn't mean", "it is impossible"] },
]

export const hiraganaChart = [
  { row: "", chars: [{ kana: "あ", romaji: "a" }, { kana: "い", romaji: "i" }, { kana: "う", romaji: "u" }, { kana: "え", romaji: "e" }, { kana: "お", romaji: "o" }] },
  { row: "K", chars: [{ kana: "か", romaji: "ka" }, { kana: "き", romaji: "ki" }, { kana: "く", romaji: "ku" }, { kana: "け", romaji: "ke" }, { kana: "こ", romaji: "ko" }] },
  { row: "S", chars: [{ kana: "さ", romaji: "sa" }, { kana: "し", romaji: "shi" }, { kana: "す", romaji: "su" }, { kana: "せ", romaji: "se" }, { kana: "そ", romaji: "so" }] },
  { row: "T", chars: [{ kana: "た", romaji: "ta" }, { kana: "ち", romaji: "chi" }, { kana: "つ", romaji: "tsu" }, { kana: "て", romaji: "te" }, { kana: "と", romaji: "to" }] },
  { row: "N", chars: [{ kana: "な", romaji: "na" }, { kana: "に", romaji: "ni" }, { kana: "ぬ", romaji: "nu" }, { kana: "ね", romaji: "ne" }, { kana: "の", romaji: "no" }] },
  { row: "H", chars: [{ kana: "は", romaji: "ha" }, { kana: "ひ", romaji: "hi" }, { kana: "ふ", romaji: "fu" }, { kana: "へ", romaji: "he" }, { kana: "ほ", romaji: "ho" }] },
  { row: "M", chars: [{ kana: "ま", romaji: "ma" }, { kana: "み", romaji: "mi" }, { kana: "む", romaji: "mu" }, { kana: "め", romaji: "me" }, { kana: "も", romaji: "mo" }] },
  { row: "Y", chars: [{ kana: "や", romaji: "ya" }, { kana: "", romaji: "" }, { kana: "ゆ", romaji: "yu" }, { kana: "", romaji: "" }, { kana: "よ", romaji: "yo" }] },
  { row: "R", chars: [{ kana: "ら", romaji: "ra" }, { kana: "り", romaji: "ri" }, { kana: "る", romaji: "ru" }, { kana: "れ", romaji: "re" }, { kana: "ろ", romaji: "ro" }] },
  { row: "W", chars: [{ kana: "わ", romaji: "wa" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "を", romaji: "wo" }] },
  { row: "", chars: [{ kana: "ん", romaji: "n" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }] },
]

export const hiraganaDakuten = [
  { row: "G", chars: [{ kana: "が", romaji: "ga" }, { kana: "ぎ", romaji: "gi" }, { kana: "ぐ", romaji: "gu" }, { kana: "げ", romaji: "ge" }, { kana: "ご", romaji: "go" }] },
  { row: "Z", chars: [{ kana: "ざ", romaji: "za" }, { kana: "じ", romaji: "ji" }, { kana: "ず", romaji: "zu" }, { kana: "ぜ", romaji: "ze" }, { kana: "ぞ", romaji: "zo" }] },
  { row: "D", chars: [{ kana: "だ", romaji: "da" }, { kana: "ぢ", romaji: "ji" }, { kana: "づ", romaji: "zu" }, { kana: "で", romaji: "de" }, { kana: "ど", romaji: "do" }] },
  { row: "B", chars: [{ kana: "ば", romaji: "ba" }, { kana: "び", romaji: "bi" }, { kana: "ぶ", romaji: "bu" }, { kana: "べ", romaji: "be" }, { kana: "ぼ", romaji: "bo" }] },
  { row: "P", chars: [{ kana: "ぱ", romaji: "pa" }, { kana: "ぴ", romaji: "pi" }, { kana: "ぷ", romaji: "pu" }, { kana: "ぺ", romaji: "pe" }, { kana: "ぽ", romaji: "po" }] },
]

export const katakanaChart = [
  { row: "", chars: [{ kana: "ア", romaji: "a" }, { kana: "イ", romaji: "i" }, { kana: "ウ", romaji: "u" }, { kana: "エ", romaji: "e" }, { kana: "オ", romaji: "o" }] },
  { row: "K", chars: [{ kana: "カ", romaji: "ka" }, { kana: "キ", romaji: "ki" }, { kana: "ク", romaji: "ku" }, { kana: "ケ", romaji: "ke" }, { kana: "コ", romaji: "ko" }] },
  { row: "S", chars: [{ kana: "サ", romaji: "sa" }, { kana: "シ", romaji: "shi" }, { kana: "ス", romaji: "su" }, { kana: "セ", romaji: "se" }, { kana: "ソ", romaji: "so" }] },
  { row: "T", chars: [{ kana: "タ", romaji: "ta" }, { kana: "チ", romaji: "chi" }, { kana: "ツ", romaji: "tsu" }, { kana: "テ", romaji: "te" }, { kana: "ト", romaji: "to" }] },
  { row: "N", chars: [{ kana: "ナ", romaji: "na" }, { kana: "ニ", romaji: "ni" }, { kana: "ヌ", romaji: "nu" }, { kana: "ネ", romaji: "ne" }, { kana: "ノ", romaji: "no" }] },
  { row: "H", chars: [{ kana: "ハ", romaji: "ha" }, { kana: "ヒ", romaji: "hi" }, { kana: "フ", romaji: "fu" }, { kana: "ヘ", romaji: "he" }, { kana: "ホ", romaji: "ho" }] },
  { row: "M", chars: [{ kana: "マ", romaji: "ma" }, { kana: "ミ", romaji: "mi" }, { kana: "ム", romaji: "mu" }, { kana: "メ", romaji: "me" }, { kana: "モ", romaji: "mo" }] },
  { row: "Y", chars: [{ kana: "ヤ", romaji: "ya" }, { kana: "", romaji: "" }, { kana: "ユ", romaji: "yu" }, { kana: "", romaji: "" }, { kana: "ヨ", romaji: "yo" }] },
  { row: "R", chars: [{ kana: "ラ", romaji: "ra" }, { kana: "リ", romaji: "ri" }, { kana: "ル", romaji: "ru" }, { kana: "レ", romaji: "re" }, { kana: "ロ", romaji: "ro" }] },
  { row: "W", chars: [{ kana: "ワ", romaji: "wa" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "ヲ", romaji: "wo" }] },
  { row: "", chars: [{ kana: "ン", romaji: "n" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }] },
]

export const katakanaDakuten = [
  { row: "G", chars: [{ kana: "ガ", romaji: "ga" }, { kana: "ギ", romaji: "gi" }, { kana: "グ", romaji: "gu" }, { kana: "ゲ", romaji: "ge" }, { kana: "ゴ", romaji: "go" }] },
  { row: "Z", chars: [{ kana: "ザ", romaji: "za" }, { kana: "ジ", romaji: "ji" }, { kana: "ズ", romaji: "zu" }, { kana: "ゼ", romaji: "ze" }, { kana: "ゾ", romaji: "zo" }] },
  { row: "D", chars: [{ kana: "ダ", romaji: "da" }, { kana: "ヂ", romaji: "ji" }, { kana: "ヅ", romaji: "zu" }, { kana: "デ", romaji: "de" }, { kana: "ド", romaji: "do" }] },
  { row: "B", chars: [{ kana: "バ", romaji: "ba" }, { kana: "ビ", romaji: "bi" }, { kana: "ブ", romaji: "bu" }, { kana: "ベ", romaji: "be" }, { kana: "ボ", romaji: "bo" }] },
  { row: "P", chars: [{ kana: "パ", romaji: "pa" }, { kana: "ピ", romaji: "pi" }, { kana: "プ", romaji: "pu" }, { kana: "ペ", romaji: "pe" }, { kana: "ポ", romaji: "po" }] },
]

export const weeklyStats = [
  { day: "Mon", correct: 18, wrong: 4 },
  { day: "Tue", correct: 22, wrong: 6 },
  { day: "Wed", correct: 15, wrong: 3 },
  { day: "Thu", correct: 28, wrong: 5 },
  { day: "Fri", correct: 20, wrong: 7 },
  { day: "Sat", correct: 35, wrong: 8 },
  { day: "Sun", correct: 12, wrong: 2 },
]

export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
