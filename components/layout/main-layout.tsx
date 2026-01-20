"use client"

import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider className="flex h-screen flex-col overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col border-x transition-all duration-300 ease-in-out">
        <SiteHeader />
        <div className="relative flex flex-1 overflow-hidden">
          <AppSidebar className="!absolute left-0 top-0 h-full border-r" />
          <SidebarInset className="size-full overflow-y-auto">
            <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
