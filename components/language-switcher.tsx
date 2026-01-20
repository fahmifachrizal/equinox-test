"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const [language, setLanguage] = React.useState<"en-US" | "id-ID">("en-US")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <span className="mr-2 text-base">{language === "en-US" ? "🇺🇸" : "🇮🇩"}</span>
          <span className="hidden sm:inline-block">
            {language === "en-US" ? "English" : "Indonesia"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en-US")}>
          <span className="mr-2 text-base">🇺🇸</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("id-ID")}>
          <span className="mr-2 text-base">🇮🇩</span>
          Indonesia
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
