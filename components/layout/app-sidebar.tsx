"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Home, Inbox, ShoppingCart } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Default labels (English)
const defaultLabels = {
  home: "Home",
  products: "Q1: Products (fakestoreapi.com)",
  berries: "Q2: Berries (pokeapi.co)",
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Extract current locale from pathname
  const currentLocale = React.useMemo(() => {
    const segments = pathname.split("/")
    const potentialLocale = segments[1]
    if (potentialLocale === "en" || potentialLocale === "id") {
      return potentialLocale
    }
    return null // No locale prefix (e.g., home page)
  }, [pathname])

  // Build locale-aware URLs
  const getLocalizedUrl = (baseUrl: string) => {
    if (baseUrl === "/") return "/" // Home always stays at root
    if (currentLocale) {
      return `/${currentLocale}${baseUrl}`
    }
    return `/en${baseUrl}` // Default to English for non-locale pages
  }

  // Check if path is active (accounting for locale prefix)
  const isPathActive = (baseUrl: string) => {
    if (baseUrl === "/") {
      return pathname === "/"
    }
    // Check if pathname contains the base URL (with or without locale prefix)
    return pathname.includes(baseUrl)
  }

  const items = [
    {
      title: defaultLabels.home,
      url: "/",
      icon: Home,
    },
    {
      title: defaultLabels.products,
      url: "/products",
      icon: ShoppingCart,
    },
    {
      title: defaultLabels.berries,
      url: "/berries",
      icon: Inbox,
    },
  ]

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = isPathActive(item.url)
                const Icon = item.icon
                const href = getLocalizedUrl(item.url)
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "relative transition-colors",
                        isActive && "text-accent bg-accent/10",
                      )}>
                      <a href={href}>
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-full" />
                        )}
                        <Icon className={cn(isActive && "text-accent")} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
