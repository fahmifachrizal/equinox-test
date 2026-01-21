"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

interface EquinoxHeaderProps extends React.ComponentProps<"header"> {
  children?: React.ReactNode
  isScrolled?: boolean
}

export function EquinoxHeader({
  className,
  children,
  isScrolled,
  ...props
}: EquinoxHeaderProps) {
  return (
    <header
      className={cn(
        "flex w-full shrink-0 items-center transition-[padding] duration-200 ease-in-out px-10 will-change-[padding]",
        isScrolled ? "py-4" : "pt-10 pb-2",
        className,
      )}
      {...props}>
      <div className="flex items-center gap-2 px-0">
        <Link href="/" className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center rounded-lg transition-[width,height] duration-200 ease-in-out",
              isScrolled ? "size-8" : "size-10",
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
                "transition-[width,height] duration-200 ease-in-out text-accent",
                isScrolled ? "size-5" : "size-7",
              )}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span
              className={cn(
                "font-semibold transition-[font-size] duration-200 ease-in-out",
                isScrolled ? "text-base" : "text-xl",
              )}>
              Equinox
            </span>
          </div>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {children}
        <ModeToggle />
      </div>
    </header>
  )
}
