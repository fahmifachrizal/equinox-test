import React from "react"
import { AppSidebar } from "./app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useLayoutStore } from "@/hooks/use-layout-store"

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { isScrolled } = useLayoutStore()

  return (
    <div className="flex flex-1 w-full max-w-screen-2xl">
      <AppSidebar
        className={cn(
          "sticky self-start border-r bg-transparent hidden md:block transition-[top] duration-200 ease-in-out",
          isScrolled ? "top-[64px]" : "top-[88px]",
        )}
        style={{
          maxHeight: `calc(100vh - ${isScrolled ? 64 : 88}px)`,
        }}
      />

      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-col flex-1 w-full p-10 mx-auto max-w-screen-2xl">
          <main className="flex-1 flex flex-col gap-4 bg-transparent">
            {children}
          </main>
        </div>
      </SidebarInset>
    </div>
  )
}
