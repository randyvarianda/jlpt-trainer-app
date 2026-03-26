"use client"

import {
  BookOpen,
  Brain,
  Flame,
  GraduationCap,
  Trophy,
  Zap,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
import { PageLayout } from "@/components/page-layout"
import { weeklyStats } from "@/lib/jlpt-data"

const weeklyConfig = {
  correct: { label: "Correct", color: "oklch(0.65 0.17 145)" },
  wrong: { label: "Wrong", color: "oklch(0.65 0.2 15)" },
} satisfies ChartConfig

export default function ProgressPage() {
  const totalCorrect = weeklyStats.reduce((s, d) => s + d.correct, 0)
  const totalWrong = weeklyStats.reduce((s, d) => s + d.wrong, 0)
  const totalAnswered = totalCorrect + totalWrong
  const accuracy = Math.round((totalCorrect / totalAnswered) * 100)

  return (
    <PageLayout>
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
              N5
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

        {/* Kanji Progress */}
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

        {/* Achievements */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Milestones you&apos;ve reached</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
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
    </PageLayout>
  )
}
