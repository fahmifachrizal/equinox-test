import React from "react"
import { AppSidebar } from "./app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useLayoutStore } from "@/hooks/use-layout-store"

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { isScrolled } = useLayoutStore()

  return (
    <div className="flex w-full max-w-screen-2xl">
      <AppSidebar
        className={cn(
          "sticky self-start border-r bg-transparent hidden md:block transition-[top] duration-200 ease-in-out h-full",
          isScrolled ? "top-14" : "top-22",
        )}
        style={{
          maxHeight: `calc(100vh - ${isScrolled ? 56 : 88}px)`,
        }}
      />

      <SidebarInset className="flex flex-col min-w-0 h-auto">
        <div className="flex flex-col w-full pt-0 pb-6 px-10 mx-auto max-w-screen-2xl">
          <main className="flex flex-col gap-4 bg-transparent">
            {children}
          </main>
        </div>
      </SidebarInset>
    </div>
  )
}
