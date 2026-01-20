"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

interface EquinoxHeaderProps extends React.ComponentProps<"header"> {
  children?: React.ReactNode
}

export function EquinoxHeader({ className, children, ...props }: EquinoxHeaderProps) {
  return (
    <header className={cn("flex w-full shrink-0 items-center p-10 pb-2 transition-[width,height] ease-linear", className)} {...props}>
      <div className="flex items-center gap-2 px-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Equinox</span>
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
