"use client"

import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useLayoutStore } from "@/hooks/use-layout-store"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { layout } = useLayoutStore()
  const isFixed = layout === "fixed"

  return (
    <SidebarProvider className="flex min-h-screen flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 w-full bg-background border-b backdrop-blur-sm">
        <div className={cn("mx-auto w-full px-10", isFixed ? "max-w-screen-2xl" : "")}>
          <SiteHeader />
        </div>
      </div>

      <div className="flex flex-1 w-full">
        <AppSidebar 
          className="sticky top-[84px] z-10 h-[calc(100vh-84px)] border-r bg-background hidden md:block" 
        />
        
        <SidebarInset className="flex flex-col flex-1 w-full overflow-hidden">
          <div className={cn("flex flex-col flex-1 w-full p-10", isFixed && "mx-auto max-w-screen-2xl")}>
            <main className="flex-1 flex flex-col gap-4">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>

      {/* Footer - Full Width Background, Constrained Content if Fixed */}
      <div className="w-full border-t bg-background">
        <div className={cn("mx-auto w-full px-10", isFixed ? "max-w-screen-2xl" : "")}>
          <SiteFooter />
        </div>
      </div>
    </SidebarProvider>
  )
}
