"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import {
  BookOpen,
  Brain,
  CheckCircle,
  Eye,
  EyeOff,
  Languages,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react"

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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageLayout } from "@/components/page-layout"
import {
  type Level,
  type VocabItem,
  type GrammarItem,
  LEVELS,
  vocabBank,
  kanjiBank,
  grammarBank,
  shuffleArray,
} from "@/lib/jlpt-data"

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
            <div className="text-sm italic text-muted-foreground/70">{item.romaji}</div>
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

// --- Main Dashboard ---

export function JlptDashboard() {
  const [level, setLevel] = useState<Level>("N5")
  const [showRomaji, setShowRomaji] = useState(true)

  const vocabCount = vocabBank.filter((v) => v.level === level).length
  const kanjiCount = kanjiBank.filter((k) => k.level === level).length
  const grammarCount = grammarBank.filter((g) => g.level === level).length

  return (
    <PageLayout>
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
        <div className="flex items-center justify-between">
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
          </TabsList>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRomaji((s) => !s)}
          >
            {showRomaji ? <EyeOff data-icon="inline-start" /> : <Eye data-icon="inline-start" />}
            Romaji
          </Button>
        </div>

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
      </Tabs>
    </PageLayout>
  )
}
