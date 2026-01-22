"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const languages = [
  { code: "en", label: "English", shortCode: "EN" },
  { code: "id", label: "Indonesia", shortCode: "ID" },
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
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Determine current locale from pathname
  const currentLocale = React.useMemo(() => {
    const segments = pathname.split("/")
    const potentialLocale = segments[1]
    if (potentialLocale === "en" || potentialLocale === "id") {
      return potentialLocale as LanguageCode
    }
    return "en" as LanguageCode
  }, [pathname])

  const currentLanguage = languages.find((l) => l.code === currentLocale)!

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleLocaleChange = (newLocale: LanguageCode) => {
    const segments = pathname.split("/")
    const currentLocaleInPath = segments[1]

    // Check if current path has a locale prefix
    if (currentLocaleInPath === "en" || currentLocaleInPath === "id") {
      // Replace the locale segment
      segments[1] = newLocale
    } else {
      // No locale in path (e.g., home page), add locale prefix
      segments.splice(1, 0, newLocale)
    }

    const newPath = segments.join("/") || "/"
    router.push(newPath)
    setOpen(false)
  }

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
            onClick={() => handleLocaleChange(lang.code)}
            className={cn(
              "flex items-center gap-2 cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground transition-colors",
              currentLocale === lang.code && "bg-accent/10",
            )}>
            <div className="flex w-6 shrink-0 justify-center">
              <LanguageBadge
                code={lang.shortCode}
                active={currentLocale === lang.code}
                className={cn(
                  "scale-90",
                  !(currentLocale === lang.code) &&
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
