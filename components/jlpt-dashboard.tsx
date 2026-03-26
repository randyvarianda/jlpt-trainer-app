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
  { word: "経験", reading: "けいけん", meaning: "experience", level: "N3", options: ["experience", "experiment", "expression", "exercise"] },
  { word: "影響", reading: "えいきょう", meaning: "influence", level: "N2", options: ["influence", "shadow", "movie", "reflection"] },
  { word: "環境", reading: "かんきょう", meaning: "environment", level: "N2", options: ["environment", "situation", "surroundings", "condition"] },
  { word: "挑戦", reading: "ちょうせん", meaning: "challenge", level: "N2", options: ["challenge", "invasion", "selection", "adventure"] },
  { word: "責任", reading: "せきにん", meaning: "responsibility", level: "N3", options: ["responsibility", "blame", "duty", "obligation"] },
  { word: "成長", reading: "せいちょう", meaning: "growth", level: "N3", options: ["growth", "success", "achievement", "development"] },
  { word: "貿易", reading: "ぼうえき", meaning: "trade", level: "N2", options: ["trade", "economy", "profit", "exchange"] },
  { word: "政治", reading: "せいじ", meaning: "politics", level: "N2", options: ["politics", "justice", "government", "law"] },
  { word: "伝統", reading: "でんとう", meaning: "tradition", level: "N3", options: ["tradition", "legend", "electricity", "communication"] },
  { word: "記念", reading: "きねん", meaning: "commemoration", level: "N3", options: ["commemoration", "memory", "diary", "prayer"] },
  { word: "対象", reading: "たいしょう", meaning: "target/object", level: "N2", options: ["target/object", "comparison", "opposite", "contrast"] },
  { word: "効果", reading: "こうか", meaning: "effect", level: "N2", options: ["effect", "expensive", "coin", "result"] },
  { word: "基本", reading: "きほん", meaning: "foundation", level: "N3", options: ["foundation", "origin", "basis", "textbook"] },
  { word: "意識", reading: "いしき", meaning: "consciousness", level: "N2", options: ["consciousness", "opinion", "will", "meaning"] },
  { word: "規則", reading: "きそく", meaning: "rule", level: "N3", options: ["rule", "standard", "scale", "measurement"] },
]

const kanjiBank: KanjiItem[] = [
  { kanji: "勉", onyomi: "ベン", kunyomi: "つと.める", meaning: "exertion, endeavor", level: "N4", strokeCount: 10, examples: [{ word: "勉強", reading: "べんきょう", meaning: "study" }, { word: "勤勉", reading: "きんべん", meaning: "diligent" }] },
  { kanji: "強", onyomi: "キョウ", kunyomi: "つよ.い", meaning: "strong", level: "N4", strokeCount: 11, examples: [{ word: "強い", reading: "つよい", meaning: "strong" }, { word: "強調", reading: "きょうちょう", meaning: "emphasis" }] },
  { kanji: "読", onyomi: "ドク", kunyomi: "よ.む", meaning: "read", level: "N4", strokeCount: 14, examples: [{ word: "読む", reading: "よむ", meaning: "to read" }, { word: "読書", reading: "どくしょ", meaning: "reading" }] },
  { kanji: "書", onyomi: "ショ", kunyomi: "か.く", meaning: "write", level: "N4", strokeCount: 10, examples: [{ word: "書く", reading: "かく", meaning: "to write" }, { word: "辞書", reading: "じしょ", meaning: "dictionary" }] },
  { kanji: "話", onyomi: "ワ", kunyomi: "はな.す", meaning: "talk", level: "N4", strokeCount: 13, examples: [{ word: "話す", reading: "はなす", meaning: "to speak" }, { word: "電話", reading: "でんわ", meaning: "telephone" }] },
  { kanji: "聞", onyomi: "ブン", kunyomi: "き.く", meaning: "hear", level: "N4", strokeCount: 14, examples: [{ word: "聞く", reading: "きく", meaning: "to listen" }, { word: "新聞", reading: "しんぶん", meaning: "newspaper" }] },
  { kanji: "食", onyomi: "ショク", kunyomi: "た.べる", meaning: "eat", level: "N5", strokeCount: 9, examples: [{ word: "食べる", reading: "たべる", meaning: "to eat" }, { word: "食事", reading: "しょくじ", meaning: "meal" }] },
  { kanji: "飲", onyomi: "イン", kunyomi: "の.む", meaning: "drink", level: "N5", strokeCount: 12, examples: [{ word: "飲む", reading: "のむ", meaning: "to drink" }, { word: "飲料", reading: "いんりょう", meaning: "beverage" }] },
  { kanji: "見", onyomi: "ケン", kunyomi: "み.る", meaning: "see", level: "N5", strokeCount: 7, examples: [{ word: "見る", reading: "みる", meaning: "to see" }, { word: "意見", reading: "いけん", meaning: "opinion" }] },
  { kanji: "学", onyomi: "ガク", kunyomi: "まな.ぶ", meaning: "study, learn", level: "N5", strokeCount: 8, examples: [{ word: "学ぶ", reading: "まなぶ", meaning: "to learn" }, { word: "学校", reading: "がっこう", meaning: "school" }] },
]

const grammarBank: GrammarItem[] = [
  { pattern: "〜ために", meaning: "in order to / because of", level: "N3", example: "日本語を勉強するために、毎日練習しています。", exampleMeaning: "In order to study Japanese, I practice every day.", options: ["in order to / because of", "instead of", "while doing", "despite"] },
  { pattern: "〜ようにする", meaning: "to try to / make sure to", level: "N3", example: "毎朝早く起きるようにしています。", exampleMeaning: "I try to wake up early every morning.", options: ["to try to / make sure to", "to be able to", "it seems like", "to decide to"] },
  { pattern: "〜ことにする", meaning: "to decide to", level: "N3", example: "来年、日本に行くことにしました。", exampleMeaning: "I decided to go to Japan next year.", options: ["to decide to", "to try to", "it is said that", "to become"] },
  { pattern: "〜ばかり", meaning: "just did / nothing but", level: "N3", example: "日本に来たばかりです。", exampleMeaning: "I just came to Japan.", options: ["just did / nothing but", "about to", "almost", "finally"] },
  { pattern: "〜わけではない", meaning: "it doesn't mean that", level: "N2", example: "嫌いなわけではないが、苦手です。", exampleMeaning: "It doesn't mean I dislike it, but I'm not good at it.", options: ["it doesn't mean that", "there is no reason", "it is impossible", "it should not be"] },
  { pattern: "〜に対して", meaning: "toward / in contrast to", level: "N2", example: "先生に対して失礼なことを言った。", exampleMeaning: "I said something rude toward the teacher.", options: ["toward / in contrast to", "about / regarding", "according to", "compared to"] },
  { pattern: "〜とは限らない", meaning: "not necessarily", level: "N2", example: "高いものがいいとは限らない。", exampleMeaning: "Expensive things are not necessarily good.", options: ["not necessarily", "it is certain that", "it is limited to", "without exception"] },
  { pattern: "〜てしまう", meaning: "to end up doing / completely", level: "N4", example: "宿題を忘れてしまいました。", exampleMeaning: "I ended up forgetting my homework.", options: ["to end up doing / completely", "to try doing", "to keep doing", "to start doing"] },
]

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

// --- Quiz Component ---

function VocabQuiz() {
  const [queue, setQueue] = useState<VocabItem[]>(() => shuffleArray(vocabBank))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [showResult, setShowResult] = useState(false)

  const item = queue[current]
  const isFinished = current >= queue.length

  const handleSelect = useCallback(
    (answer: string) => {
      if (selected) return
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
    setQueue(shuffleArray(vocabBank))
    setCurrent(0)
    setSelected(null)
    setShowResult(false)
    setScore({ correct: 0, wrong: 0 })
  }, [])

  if (isFinished) {
    const total = score.correct + score.wrong
    const percent = Math.round((score.correct / total) * 100)
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

  const shuffledOptions = useMemo(
    () => shuffleArray(item.options),
    [item]
  )

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

function KanjiStudy() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [studied, setStudied] = useState<Set<number>>(new Set())

  const kanji = kanjiBank[currentIndex]

  const handleNext = useCallback(() => {
    setStudied((s) => new Set(s).add(currentIndex))
    setShowDetails(false)
    setCurrentIndex((i) => (i + 1) % kanjiBank.length)
  }, [currentIndex])

  const handlePrev = useCallback(() => {
    setShowDetails(false)
    setCurrentIndex((i) => (i - 1 + kanjiBank.length) % kanjiBank.length)
  }, [])

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
          {studied.size} / {kanjiBank.length} studied this session
        </CardDescription>
        <Progress value={(studied.size / kanjiBank.length) * 100} />
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

function GrammarQuiz() {
  const [queue, setQueue] = useState<GrammarItem[]>(() => shuffleArray(grammarBank))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, wrong: 0 })

  const item = queue[current]
  const isFinished = current >= queue.length

  const handleSelect = useCallback(
    (answer: string) => {
      if (selected) return
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
    setQueue(shuffleArray(grammarBank))
    setCurrent(0)
    setSelected(null)
    setShowResult(false)
    setScore({ correct: 0, wrong: 0 })
  }, [])

  if (isFinished) {
    const total = score.correct + score.wrong
    const percent = Math.round((score.correct / total) * 100)
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

  const shuffledOptions = useMemo(
    () => shuffleArray(item.options),
    [item]
  )

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

const levelProgress = [
  { level: "N5", vocab: 85, kanji: 90, grammar: 78 },
  { level: "N4", vocab: 62, kanji: 55, grammar: 48 },
  { level: "N3", vocab: 35, kanji: 28, grammar: 22 },
  { level: "N2", vocab: 12, kanji: 8, grammar: 5 },
  { level: "N1", vocab: 0, kanji: 0, grammar: 0 },
]

// --- Main Dashboard ---

export function JlptDashboard() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const totalCorrect = weeklyStats.reduce((s, d) => s + d.correct, 0)
  const totalWrong = weeklyStats.reduce((s, d) => s + d.wrong, 0)
  const totalAnswered = totalCorrect + totalWrong
  const accuracy = Math.round((totalCorrect / totalAnswered) * 100)
  const streak = 7

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

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
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
                N3
                <div className="rounded-lg bg-muted p-2">
                  <GraduationCap />
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Tabs */}
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
            <TabsTrigger value="progress">
              <Trophy data-icon="inline-start" />
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Vocabulary Tab */}
          <TabsContent value="vocab" className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <VocabQuiz />
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
              <KanjiStudy />
              <Card>
                <CardHeader>
                  <CardTitle>Kanji by Level</CardTitle>
                  <CardDescription>JLPT kanji requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {[
                      { level: "N5", total: 103, learned: 93, color: "bg-chart-1" },
                      { level: "N4", total: 181, learned: 100, color: "bg-chart-2" },
                      { level: "N3", total: 361, learned: 101, color: "bg-chart-3" },
                      { level: "N2", total: 415, learned: 33, color: "bg-chart-4" },
                      { level: "N1", total: 1232, learned: 0, color: "bg-chart-5" },
                    ].map((item) => (
                      <div key={item.level} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{item.level}</span>
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
              <GrammarQuiz />
              <Card>
                <CardHeader>
                  <CardTitle>Grammar Patterns</CardTitle>
                  <CardDescription>Recently studied patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {grammarBank.slice(0, 6).map((g) => (
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

          {/* Progress Tab */}
          <TabsContent value="progress" className="mt-4">
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

              {/* Level Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Level Progress</CardTitle>
                  <CardDescription>Mastery across JLPT levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    {levelProgress.map((lp) => (
                      <div key={lp.level} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{lp.level}</span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round((lp.vocab + lp.kanji + lp.grammar) / 3)}% overall
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Vocab</span>
                              <span>{lp.vocab}%</span>
                            </div>
                            <Progress value={lp.vocab} />
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Kanji</span>
                              <span>{lp.kanji}%</span>
                            </div>
                            <Progress value={lp.kanji} />
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Grammar</span>
                              <span>{lp.grammar}%</span>
                            </div>
                            <Progress value={lp.grammar} />
                          </div>
                        </div>
                        {lp.level !== "N1" && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Milestones you&apos;ve reached</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { icon: Flame, title: "7-Day Streak", desc: "Study 7 days in a row", unlocked: true },
                      { icon: Brain, title: "100 Questions", desc: "Answer 100 questions", unlocked: true },
                      { icon: BookOpen, title: "Kanji Master", desc: "Learn 100 kanji", unlocked: true },
                      { icon: Trophy, title: "Perfect Score", desc: "100% on a quiz", unlocked: true },
                      { icon: Zap, title: "Speed Demon", desc: "Finish quiz in under 1 min", unlocked: false },
                      { icon: Languages, title: "Polyglot", desc: "Learn 500 vocab words", unlocked: false },
                      { icon: GraduationCap, title: "N2 Ready", desc: "Complete N3 mastery", unlocked: false },
                      { icon: CheckCircle, title: "Perfectionist", desc: "5 perfect quizzes in a row", unlocked: false },
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
