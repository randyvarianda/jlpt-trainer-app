"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useTheme } from "next-themes"
import {
  BookOpen,
  Brain,
  CheckCircle,
  Flame,
  Languages,
  Moon,
  RotateCcw,
  Sun,
  Trophy,
  XCircle,
  Zap,
  GraduationCap,
  Eye,
  EyeOff,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- JLPT Data ---

type VocabItem = {
  word: string
  reading: string
  romaji: string
  meaning: string
  level: string
  options: string[]
}

type KanjiItem = {
  kanji: string
  onyomi: string
  kunyomi: string
  meaning: string
  level: string
  strokeCount: number
  examples: { word: string; reading: string; meaning: string }[]
}

type GrammarItem = {
  pattern: string
  meaning: string
  level: string
  example: string
  exampleMeaning: string
  options: string[]
}

const vocabBank: VocabItem[] = [
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

const kanjiBank: KanjiItem[] = [
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

const grammarBank: GrammarItem[] = [
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

// --- Hiragana & Katakana Charts ---

const hiraganaChart = [
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

const hiraganaDakuten = [
  { row: "G", chars: [{ kana: "が", romaji: "ga" }, { kana: "ぎ", romaji: "gi" }, { kana: "ぐ", romaji: "gu" }, { kana: "げ", romaji: "ge" }, { kana: "ご", romaji: "go" }] },
  { row: "Z", chars: [{ kana: "ざ", romaji: "za" }, { kana: "じ", romaji: "ji" }, { kana: "ず", romaji: "zu" }, { kana: "ぜ", romaji: "ze" }, { kana: "ぞ", romaji: "zo" }] },
  { row: "D", chars: [{ kana: "だ", romaji: "da" }, { kana: "ぢ", romaji: "ji" }, { kana: "づ", romaji: "zu" }, { kana: "で", romaji: "de" }, { kana: "ど", romaji: "do" }] },
  { row: "B", chars: [{ kana: "ば", romaji: "ba" }, { kana: "び", romaji: "bi" }, { kana: "ぶ", romaji: "bu" }, { kana: "べ", romaji: "be" }, { kana: "ぼ", romaji: "bo" }] },
  { row: "P", chars: [{ kana: "ぱ", romaji: "pa" }, { kana: "ぴ", romaji: "pi" }, { kana: "ぷ", romaji: "pu" }, { kana: "ぺ", romaji: "pe" }, { kana: "ぽ", romaji: "po" }] },
]

const katakanaChart = [
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

const katakanaDakuten = [
  { row: "G", chars: [{ kana: "ガ", romaji: "ga" }, { kana: "ギ", romaji: "gi" }, { kana: "グ", romaji: "gu" }, { kana: "ゲ", romaji: "ge" }, { kana: "ゴ", romaji: "go" }] },
  { row: "Z", chars: [{ kana: "ザ", romaji: "za" }, { kana: "ジ", romaji: "ji" }, { kana: "ズ", romaji: "zu" }, { kana: "ゼ", romaji: "ze" }, { kana: "ゾ", romaji: "zo" }] },
  { row: "D", chars: [{ kana: "ダ", romaji: "da" }, { kana: "ヂ", romaji: "ji" }, { kana: "ヅ", romaji: "zu" }, { kana: "デ", romaji: "de" }, { kana: "ド", romaji: "do" }] },
  { row: "B", chars: [{ kana: "バ", romaji: "ba" }, { kana: "ビ", romaji: "bi" }, { kana: "ブ", romaji: "bu" }, { kana: "ベ", romaji: "be" }, { kana: "ボ", romaji: "bo" }] },
  { row: "P", chars: [{ kana: "パ", romaji: "pa" }, { kana: "ピ", romaji: "pi" }, { kana: "プ", romaji: "pu" }, { kana: "ペ", romaji: "pe" }, { kana: "ポ", romaji: "po" }] },
]

// --- Kana Chart Component ---

function KanaChart({ title, description, chart, dakuten }: {
  title: string
  description: string
  chart: typeof hiraganaChart
  dakuten: typeof hiraganaDakuten
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-5 gap-1 text-center text-xs font-medium text-muted-foreground">
              <span>a</span><span>i</span><span>u</span><span>e</span><span>o</span>
            </div>
            {chart.map((row, i) => (
              <div key={i} className="grid grid-cols-5 gap-1">
                {row.chars.map((ch, j) => (
                  <div
                    key={j}
                    className={`flex flex-col items-center rounded-lg border p-2 ${ch.kana ? "hover:bg-muted/50" : "border-transparent"}`}
                  >
                    {ch.kana && (
                      <>
                        <span className="text-2xl">{ch.kana}</span>
                        <span className="text-[10px] text-muted-foreground">{ch.romaji}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dakuten & Handakuten</CardTitle>
          <CardDescription>Voiced and semi-voiced sounds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-5 gap-1 text-center text-xs font-medium text-muted-foreground">
              <span>a</span><span>i</span><span>u</span><span>e</span><span>o</span>
            </div>
            {dakuten.map((row, i) => (
              <div key={i} className="grid grid-cols-5 gap-1">
                {row.chars.map((ch, j) => (
                  <div
                    key={j}
                    className="flex flex-col items-center rounded-lg border p-2 hover:bg-muted/50"
                  >
                    <span className="text-2xl">{ch.kana}</span>
                    <span className="text-[10px] text-muted-foreground">{ch.romaji}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// --- Chart Config ---

const weeklyConfig = {
  correct: { label: "Correct", color: "oklch(0.65 0.17 145)" },
  wrong: { label: "Wrong", color: "oklch(0.65 0.2 15)" },
} satisfies ChartConfig

// --- Helper ---

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const
type Level = (typeof LEVELS)[number]

// --- Quiz Component ---

function VocabQuiz({ level, showRomaji }: { level: Level; showRomaji: boolean }) {
  const filtered = useMemo(() => vocabBank.filter((v) => v.level === level), [level])
  const [queue, setQueue] = useState<VocabItem[]>(() => shuffleArray(filtered))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setQueue(shuffleArray(filtered))
    setCurrent(0)
    setSelected(null)
    setShowResult(false)
    setScore({ correct: 0, wrong: 0 })
  }, [filtered])

  const item = queue[current]
  const isFinished = !item || current >= queue.length

  const handleSelect = useCallback(
    (answer: string) => {
      if (selected || !item) return
      setSelected(answer)
      setShowResult(true)
      if (answer === item.meaning) {
        setScore((s) => ({ ...s, correct: s.correct + 1 }))
      } else {
        setScore((s) => ({ ...s, wrong: s.wrong + 1 }))
      }
    },
    [selected, item]
  )

  const handleNext = useCallback(() => {
    setSelected(null)
    setShowResult(false)
    setCurrent((c) => c + 1)
  }, [])

  const handleRestart = useCallback(() => {
    setQueue(shuffleArray(filtered))
    setCurrent(0)
    setSelected(null)
    setShowResult(false)
    setScore({ correct: 0, wrong: 0 })
  }, [filtered])

  if (isFinished) {
    const total = score.correct + score.wrong
    const percent = total > 0 ? Math.round((score.correct / total) * 100) : 0
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy />
            Quiz Complete!
          </CardTitle>
          <CardDescription>You finished all {total} questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{percent}%</div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center rounded-lg border p-3">
                <CheckCircle className="mb-1 text-chart-1" />
                <span className="text-xl font-bold">{score.correct}</span>
                <span className="text-xs text-muted-foreground">Correct</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-3">
                <XCircle className="mb-1 text-destructive" />
                <span className="text-xl font-bold">{score.wrong}</span>
                <span className="text-xs text-muted-foreground">Wrong</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestart} className="w-full">
            <RotateCcw data-icon="inline-start" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const shuffledOptions = useMemo(() => shuffleArray(item.options), [item])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardDescription>
            Question {current + 1} / {queue.length}
          </CardDescription>
          <Badge variant="outline">{item.level}</Badge>
        </div>
        <Progress value={((current + 1) / queue.length) * 100} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-1 py-4">
          <div className="text-5xl font-bold">{item.word}</div>
          <div className="text-lg text-muted-foreground">{item.reading}</div>
          {showRomaji && (
            <div className="text-sm text-muted-foreground/70 italic">{item.romaji}</div>
          )}
        </div>
        <p className="mb-3 text-center text-sm text-muted-foreground">
          What does this word mean?
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {shuffledOptions.map((option) => {
            let variant: "outline" | "default" | "destructive" = "outline"
            if (showResult) {
              if (option === item.meaning) variant = "default"
              else if (option === selected) variant = "destructive"
            }
            return (
              <Button
                key={option}
                variant={variant}
                className="h-auto py-3 text-sm"
                onClick={() => handleSelect(option)}
                disabled={showResult}
              >
                {option}
              </Button>
            )
          })}
        </div>
      </CardContent>
      {showResult && (
        <CardFooter>
          <Button onClick={handleNext} className="w-full">
            {current + 1 < queue.length ? "Next Question" : "See Results"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

// --- Kanji Study Component ---

function KanjiStudy({ level }: { level: Level }) {
  const filtered = useMemo(() => kanjiBank.filter((k) => k.level === level), [level])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [studied, setStudied] = useState<Set<number>>(new Set())

  useEffect(() => {
    setCurrentIndex(0)
    setShowDetails(false)
    setStudied(new Set())
  }, [level])

  const kanji = filtered[currentIndex]

  if (!kanji) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Kanji</CardTitle>
          <CardDescription>No kanji available for {level} yet.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const handleNext = () => {
    setStudied((s) => new Set(s).add(currentIndex))
    setShowDetails(false)
    setCurrentIndex((i) => (i + 1) % filtered.length)
  }

  const handlePrev = () => {
    setShowDetails(false)
    setCurrentIndex((i) => (i - 1 + filtered.length) % filtered.length)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen />
            Kanji Flashcard
          </CardTitle>
          <Badge variant="outline">{kanji.level}</Badge>
        </div>
        <CardDescription>
          {studied.size} / {filtered.length} studied this session
        </CardDescription>
        <Progress value={(studied.size / filtered.length) * 100} />
      </CardHeader>
      <CardContent>
        <div
          className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-6 transition-colors hover:bg-muted/50"
          onClick={() => setShowDetails((s) => !s)}
        >
          <div className="text-7xl">{kanji.kanji}</div>
          {showDetails ? (
            <div className="flex w-full flex-col gap-3 pt-2">
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Meaning</span>
                  <p className="font-medium">{kanji.meaning}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Strokes</span>
                  <p className="font-medium">{kanji.strokeCount}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">On&apos;yomi</span>
                  <p className="font-medium">{kanji.onyomi}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Kun&apos;yomi</span>
                  <p className="font-medium">{kanji.kunyomi}</p>
                </div>
              </div>
              <Separator />
              <div>
                <span className="text-sm text-muted-foreground">Examples</span>
                <div className="mt-1 flex flex-col gap-1">
                  {kanji.examples.map((ex) => (
                    <div key={ex.word} className="flex items-center justify-between text-sm">
                      <span>
                        <span className="font-medium">{ex.word}</span>
                        <span className="ml-1 text-muted-foreground">({ex.reading})</span>
                      </span>
                      <span className="text-muted-foreground">{ex.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Tap to reveal</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Button variant="outline" onClick={handlePrev} className="flex-1">
            Previous
          </Button>
          <Button onClick={handleNext} className="flex-1">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// --- Grammar Quiz Component ---

function GrammarQuiz({ level }: { level: Level }) {
  const filtered = useMemo(() => grammarBank.filter((g) => g.level === level), [level])
  const [queue, setQueue] = useState<GrammarItem[]>(() => shuffleArray(filtered))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, wrong: 0 })

  useEffect(() => {
    setQueue(shuffleArray(filtered))
    setCurrent(0)
    setSelected(null)
    setShowResult(false)
    setScore({ correct: 0, wrong: 0 })
  }, [filtered])

  const item = queue[current]
  const isFinished = !item || current >= queue.length

  const handleSelect = useCallback(
    (answer: string) => {
      if (selected || !item) return
      setSelected(answer)
      setShowResult(true)
      if (answer === item.meaning) {
        setScore((s) => ({ ...s, correct: s.correct + 1 }))
      } else {
        setScore((s) => ({ ...s, wrong: s.wrong + 1 }))
      }
    },
    [selected, item]
  )

  const handleNext = useCallback(() => {
    setSelected(null)
    setShowResult(false)
    setCurrent((c) => c + 1)
  }, [])

  const handleRestart = useCallback(() => {
    setQueue(shuffleArray(filtered))
    setCurrent(0)
    setSelected(null)
    setShowResult(false)
    setScore({ correct: 0, wrong: 0 })
  }, [filtered])

  if (isFinished) {
    const total = score.correct + score.wrong
    const percent = total > 0 ? Math.round((score.correct / total) * 100) : 0
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy />
            Grammar Quiz Complete!
          </CardTitle>
          <CardDescription>You finished all {total} questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{percent}%</div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center rounded-lg border p-3">
                <CheckCircle className="mb-1 text-chart-1" />
                <span className="text-xl font-bold">{score.correct}</span>
                <span className="text-xs text-muted-foreground">Correct</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-3">
                <XCircle className="mb-1 text-destructive" />
                <span className="text-xl font-bold">{score.wrong}</span>
                <span className="text-xs text-muted-foreground">Wrong</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestart} className="w-full">
            <RotateCcw data-icon="inline-start" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const shuffledOptions = useMemo(() => shuffleArray(item.options), [item])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardDescription>
            Question {current + 1} / {queue.length}
          </CardDescription>
          <Badge variant="outline">{item.level}</Badge>
        </div>
        <Progress value={((current + 1) / queue.length) * 100} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-3xl font-bold">{item.pattern}</div>
          <div className="rounded-lg bg-muted p-3 text-center">
            <p className="text-sm">{item.example}</p>
            {showResult && (
              <p className="mt-1 text-xs text-muted-foreground">{item.exampleMeaning}</p>
            )}
          </div>
        </div>
        <p className="mb-3 text-center text-sm text-muted-foreground">
          What does this grammar pattern mean?
        </p>
        <div className="grid grid-cols-1 gap-2">
          {shuffledOptions.map((option) => {
            let variant: "outline" | "default" | "destructive" = "outline"
            if (showResult) {
              if (option === item.meaning) variant = "default"
              else if (option === selected) variant = "destructive"
            }
            return (
              <Button
                key={option}
                variant={variant}
                className="h-auto py-3 text-sm"
                onClick={() => handleSelect(option)}
                disabled={showResult}
              >
                {option}
              </Button>
            )
          })}
        </div>
      </CardContent>
      {showResult && (
        <CardFooter>
          <Button onClick={handleNext} className="w-full">
            {current + 1 < queue.length ? "Next Question" : "See Results"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

// --- Stats Data ---

const weeklyStats = [
  { day: "Mon", correct: 18, wrong: 4 },
  { day: "Tue", correct: 22, wrong: 6 },
  { day: "Wed", correct: 15, wrong: 3 },
  { day: "Thu", correct: 28, wrong: 5 },
  { day: "Fri", correct: 20, wrong: 7 },
  { day: "Sat", correct: 35, wrong: 8 },
  { day: "Sun", correct: 12, wrong: 2 },
]

// --- Main Dashboard ---

export function JlptDashboard() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [level, setLevel] = useState<Level>("N5")
  const [showRomaji, setShowRomaji] = useState(true)
  useEffect(() => setMounted(true), [])

  const totalCorrect = weeklyStats.reduce((s, d) => s + d.correct, 0)
  const totalWrong = weeklyStats.reduce((s, d) => s + d.wrong, 0)
  const totalAnswered = totalCorrect + totalWrong
  const accuracy = Math.round((totalCorrect / totalAnswered) * 100)
  const streak = 7

  const vocabCount = vocabBank.filter((v) => v.level === level).length
  const kanjiCount = kanjiBank.filter((k) => k.level === level).length
  const grammarCount = grammarBank.filter((g) => g.level === level).length

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Languages />
            </div>
            <div>
              <h1 className="text-xl font-semibold">JLPT Trainer</h1>
              <p className="text-sm text-muted-foreground">
                Master Japanese, one question at a time
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRomaji((s) => !s)}
            >
              {showRomaji ? <EyeOff data-icon="inline-start" /> : <Eye data-icon="inline-start" />}
              Romaji
            </Button>
            <Badge variant="secondary">
              <Flame data-icon="inline-start" />
              {streak} day streak
            </Badge>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        {/* Level Selector */}
        <div className="mb-6">
          <Tabs value={level} onValueChange={(v) => setLevel(v as Level)}>
            <TabsList>
              {LEVELS.map((l) => (
                <TabsTrigger key={l} value={l}>
                  {l}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{vocabCount} vocab</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{kanjiCount} kanji</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{grammarCount} grammar</span>
          </div>
        </div>

        {/* Practice Tabs */}
        <Tabs defaultValue="vocab">
          <TabsList>
            <TabsTrigger value="vocab">
              <Languages data-icon="inline-start" />
              Vocabulary
            </TabsTrigger>
            <TabsTrigger value="kanji">
              <BookOpen data-icon="inline-start" />
              Kanji
            </TabsTrigger>
            <TabsTrigger value="grammar">
              <Brain data-icon="inline-start" />
              Grammar
            </TabsTrigger>
            <TabsTrigger value="hiragana">
              Hiragana
            </TabsTrigger>
            <TabsTrigger value="katakana">
              Katakana
            </TabsTrigger>
            <TabsTrigger value="progress">
              <Trophy data-icon="inline-start" />
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Vocabulary Tab */}
          <TabsContent value="vocab" className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <VocabQuiz level={level} showRomaji={showRomaji} />
              <Card>
                <CardHeader>
                  <CardTitle>Vocabulary Tips</CardTitle>
                  <CardDescription>How to study effectively</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {[
                      { title: "Context is key", desc: "Learn words within sentences, not in isolation." },
                      { title: "Spaced repetition", desc: "Review words at increasing intervals for long-term retention." },
                      { title: "Group by theme", desc: "Study related words together (food, travel, business)." },
                      { title: "Use mnemonics", desc: "Create memorable associations for difficult words." },
                    ].map((tip) => (
                      <div key={tip.title} className="rounded-lg border p-3">
                        <p className="text-sm font-medium">{tip.title}</p>
                        <p className="text-xs text-muted-foreground">{tip.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Kanji Tab */}
          <TabsContent value="kanji" className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <KanjiStudy level={level} />
              <Card>
                <CardHeader>
                  <CardTitle>Kanji by Level</CardTitle>
                  <CardDescription>JLPT kanji requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {[
                      { level: "N5", total: 103, learned: 93 },
                      { level: "N4", total: 181, learned: 100 },
                      { level: "N3", total: 361, learned: 101 },
                      { level: "N2", total: 415, learned: 33 },
                      { level: "N1", total: 1232, learned: 0 },
                    ].map((item) => (
                      <div key={item.level} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className={`font-medium ${item.level === level ? "text-primary" : ""}`}>
                            {item.level}
                          </span>
                          <span className="text-muted-foreground">
                            {item.learned} / {item.total}
                          </span>
                        </div>
                        <Progress value={(item.learned / item.total) * 100} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Grammar Tab */}
          <TabsContent value="grammar" className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <GrammarQuiz level={level} />
              <Card>
                <CardHeader>
                  <CardTitle>{level} Grammar Patterns</CardTitle>
                  <CardDescription>Patterns for this level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {grammarBank
                      .filter((g) => g.level === level)
                      .map((g) => (
                        <div
                          key={g.pattern}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div>
                            <p className="font-medium">{g.pattern}</p>
                            <p className="text-xs text-muted-foreground">{g.meaning}</p>
                          </div>
                          <Badge variant="secondary">{g.level}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Hiragana Tab */}
          <TabsContent value="hiragana" className="mt-4">
            <KanaChart
              title="Hiragana (ひらがな)"
              description="The basic Japanese phonetic alphabet used for native words"
              chart={hiraganaChart}
              dakuten={hiraganaDakuten}
            />
          </TabsContent>

          {/* Katakana Tab */}
          <TabsContent value="katakana" className="mt-4">
            <KanaChart
              title="Katakana (カタカナ)"
              description="Used for foreign loanwords, onomatopoeia, and emphasis"
              chart={katakanaChart}
              dakuten={katakanaDakuten}
            />
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="mt-4">
            {/* Stats Cards */}
            <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Card size="sm">
                <CardHeader>
                  <CardDescription>Weekly Questions</CardDescription>
                  <CardTitle className="flex items-center justify-between text-2xl">
                    {totalAnswered}
                    <div className="rounded-lg bg-muted p-2">
                      <Brain />
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card size="sm">
                <CardHeader>
                  <CardDescription>Accuracy</CardDescription>
                  <CardTitle className="flex items-center justify-between text-2xl">
                    {accuracy}%
                    <div className="rounded-lg bg-muted p-2">
                      <Zap />
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card size="sm">
                <CardHeader>
                  <CardDescription>Kanji Learned</CardDescription>
                  <CardTitle className="flex items-center justify-between text-2xl">
                    156
                    <div className="rounded-lg bg-muted p-2">
                      <BookOpen />
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card size="sm">
                <CardHeader>
                  <CardDescription>Current Level</CardDescription>
                  <CardTitle className="flex items-center justify-between text-2xl">
                    {level}
                    <div className="rounded-lg bg-muted p-2">
                      <GraduationCap />
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Weekly Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Questions answered this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={weeklyConfig} className="h-[250px] w-full">
                    <BarChart data={weeklyStats} accessibilityLayer>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="day" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="correct" stackId="a" fill="var(--color-correct)" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="wrong" stackId="a" fill="var(--color-wrong)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-sm" style={{ background: "var(--color-correct)" }} />
                      <span className="text-muted-foreground">Correct</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-sm" style={{ background: "var(--color-wrong)" }} />
                      <span className="text-muted-foreground">Wrong</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Milestones you&apos;ve reached</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Flame, title: "7-Day Streak", desc: "Study 7 days in a row", unlocked: true },
                      { icon: Brain, title: "100 Questions", desc: "Answer 100 questions", unlocked: true },
                      { icon: BookOpen, title: "Kanji Master", desc: "Learn 100 kanji", unlocked: true },
                      { icon: Trophy, title: "Perfect Score", desc: "100% on a quiz", unlocked: true },
                      { icon: Zap, title: "Speed Demon", desc: "Finish quiz under 1 min", unlocked: false },
                      { icon: GraduationCap, title: "N4 Ready", desc: "Complete N5 mastery", unlocked: false },
                    ].map((ach) => (
                      <div
                        key={ach.title}
                        className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center ${
                          ach.unlocked ? "" : "opacity-40"
                        }`}
                      >
                        <div className={`rounded-full p-2 ${ach.unlocked ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                          <ach.icon />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{ach.title}</p>
                          <p className="text-xs text-muted-foreground">{ach.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
