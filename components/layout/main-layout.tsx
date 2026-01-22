"use client"
import * as React from "react"

import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { PageLayout } from "./page-layout"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useLayoutStore } from "@/hooks/use-layout-store"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { setIsScrolled } = useLayoutStore()
  const [localScrolled, setLocalScrolled] = React.useState(false)
  const footerRef = React.useRef<HTMLDivElement>(null)
  const scrolledRef = React.useRef(false)

  const SCROLL_THRESHOLD = 20

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > SCROLL_THRESHOLD

      if (scrolled !== scrolledRef.current) {
        scrolledRef.current = scrolled
        setLocalScrolled(scrolled)
        setIsScrolled(scrolled)
      }

      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect()
        const visibleHeight = Math.max(0, window.innerHeight - footerRect.top)
        document.documentElement.style.setProperty(
          "--footer-visible-height",
          `${visibleHeight}px`,
        )
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.documentElement.style.removeProperty("--footer-visible-height")
    }
  }, [setIsScrolled])

  return (
    <SidebarProvider className="flex min-h-screen flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 w-full bg-muted/80 border-b backdrop-blur-md transition-[border-color,background-color] duration-200 ease-in-out will-change-[border-color,background-color]">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SiteHeader isScrolled={localScrolled} />
        </div>
      </div>

      <div className="flex flex-1 w-full relative justify-center">
        <PageLayout>{children}</PageLayout>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="w-full border-t bg-muted z-40 relative transition-colors duration-200">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SiteFooter />
        </div>
      </div>
    </SidebarProvider>
  )
}
