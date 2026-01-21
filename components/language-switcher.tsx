"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <LanguageBadge code={currentLanguage.shortCode} active />
          <span className="hidden sm:inline-block">
            {currentLanguage.label}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[160px] flex flex-col gap-2.5 p-2">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "gap-3 cursor-pointer focus:bg-accent/10 focus:text-foreground group h-10",
              language === lang.code && "border border-accent",
            )}>
            <LanguageBadge
              code={lang.shortCode}
              active={language === lang.code}
              className={cn(
                !(language === lang.code) && [
                  "group-hover:bg-accent group-hover:text-accent-foreground",
                  "group-focus:bg-accent group-focus:text-accent-foreground",
                ],
              )}
            />
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
