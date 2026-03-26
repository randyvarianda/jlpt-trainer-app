"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type KanaRow = {
  row: string
  chars: { kana: string; romaji: string }[]
}

export function KanaChart({ title, description, chart, dakuten }: {
  title: string
  description: string
  chart: KanaRow[]
  dakuten: KanaRow[]
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
