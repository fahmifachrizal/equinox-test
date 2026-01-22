"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const languages = [
  { code: "en-US", label: "English", shortCode: "EN" },
  { code: "id-ID", label: "Indonesia", shortCode: "ID" },
] as const

type LanguageCode = (typeof languages)[number]["code"]

function LanguageBadge({
  code,
  active,
  className,
}: {
  code: string
  active?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded",
        active
          ? "bg-accent text-accent-foreground"
          : "bg-muted text-muted-foreground",
        className,
      )}>
      {code}
    </span>
  )
}

export function LanguageSwitcher() {
  const [language, setLanguage] = React.useState<LanguageCode>("en-US")

  const currentLanguage = languages.find((l) => l.code === language)!

  const [mounted, setMounted] = React.useState(false)
  // Control popover open state manually
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="gap-2">
        <LanguageBadge code={currentLanguage.shortCode} active />
        <span className="hidden sm:inline-block">{currentLanguage.label}</span>
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 sm:w-32 justify-start px-3">
          <LanguageBadge code={currentLanguage.shortCode} active />
          <span className="hidden sm:inline-block">
            {currentLanguage.label}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[140px] sm:w-32 flex flex-col p-1">
        {languages.map((lang) => (
          <div
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code)
              setOpen(false)
            }}
            className={cn(
              "flex items-center gap-2 cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground transition-colors",
              language === lang.code && "bg-accent/10",
            )}>
            <div className="flex w-6 shrink-0 justify-center">
              <LanguageBadge
                code={lang.shortCode}
                active={language === lang.code}
                className={cn(
                  "scale-90",
                  !(language === lang.code) &&
                    "group-hover:bg-accent group-hover:text-accent-foreground",
                )}
              />
            </div>
            <span>{lang.label}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
