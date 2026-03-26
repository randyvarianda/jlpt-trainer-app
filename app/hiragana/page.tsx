"use client"

import { PageLayout } from "@/components/page-layout"
import { KanaChart } from "@/components/kana-chart"
import { hiraganaChart, hiraganaDakuten } from "@/lib/jlpt-data"

export default function HiraganaPage() {
  return (
    <PageLayout>
      <KanaChart
        title="Hiragana (ひらがな)"
        description="The basic Japanese phonetic alphabet used for native words"
        chart={hiraganaChart}
        dakuten={hiraganaDakuten}
      />
    </PageLayout>
  )
}
