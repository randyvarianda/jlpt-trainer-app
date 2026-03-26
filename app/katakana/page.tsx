"use client"

import { PageLayout } from "@/components/page-layout"
import { KanaChart } from "@/components/kana-chart"
import { katakanaChart, katakanaDakuten } from "@/lib/jlpt-data"

export default function KatakanaPage() {
  return (
    <PageLayout>
      <KanaChart
        title="Katakana (カタカナ)"
        description="Used for foreign loanwords, onomatopoeia, and emphasis"
        chart={katakanaChart}
        dakuten={katakanaDakuten}
      />
    </PageLayout>
  )
}
