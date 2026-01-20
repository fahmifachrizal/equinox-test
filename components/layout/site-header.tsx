"use client"

import { Globe } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { LanguageSwitcher } from "@/components/language-switcher"
import { AuthPopover } from "@/components/auth-popover"

export function SiteHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
         <div className="bg-muted flex aspect-square size-8 items-center justify-center rounded-lg">
            <Globe className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Placeholder</span>
            <span className="">Subtitle</span>
          </div>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <LanguageSwitcher />
        <AuthPopover />
      </div>
    </header>
  )
}
