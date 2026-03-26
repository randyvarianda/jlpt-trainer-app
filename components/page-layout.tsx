"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Languages,
  Moon,
  Sun,
  Flame,
  Menu,
  BookOpen,
  Trophy,
  Home,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { href: "/", label: "Practice", icon: Home, description: "Vocab, Kanji & Grammar" },
  { href: "/hiragana", label: "Hiragana", icon: BookOpen, description: "ひらがな character chart" },
  { href: "/katakana", label: "Katakana", icon: BookOpen, description: "カタカナ character chart" },
  { href: "/progress", label: "Progress", icon: Trophy, description: "Stats & achievements" },
]

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground hover:bg-muted"
              >
                <Menu />
                <span className="sr-only">Open menu</span>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Languages className="size-4" />
                    </div>
                    JLPT Trainer
                  </SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        <item.icon className="size-4" />
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
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
              7 day streak
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

        {children}
      </div>
    </div>
  )
}
