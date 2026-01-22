"use client"

import * as React from "react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Searchbar } from "@/components/searchbar"

interface TitlebarProps extends React.ComponentProps<"header"> {
  children?: React.ReactNode
  isScrolled?: boolean
}

export function Titlebar({
  className,
  children,
  isScrolled,
  ...props
}: TitlebarProps) {
  const locale = useLocale()

  return (
    <header
      className={cn(
        "flex w-full shrink-0 items-center transition-[padding] duration-200 ease-in-out px-10 will-change-[padding]",
        isScrolled ? "py-2" : "pt-10 pb-2",
        className,
      )}
      {...props}>
      {/* Logo section - aligned with sidebar width (16rem + padding) */}
      <div className="flex items-center gap-2 px-0 w-64 shrink-0">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center rounded-lg transition-[width,height] duration-200 ease-in-out",
              isScrolled ? "size-10" : "size-12",
            )}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-[width,height] duration-200 ease-in-out text-primary",
                isScrolled ? "size-6" : "size-8",
              )}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span
              className={cn(
                "font-bold transition-[font-size] duration-200 ease-in-out",
                isScrolled ? "text-xl" : "text-3xl",
              )}>
              Equinox
            </span>
          </div>
        </Link>
      </div>

      {/* Content area - Product Quick Search (aligned with main content) */}
      <div className="flex-1 flex items-center">
        <Searchbar />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {children}
        <ModeToggle />
      </div>
    </header>
  )
}
