import Link from "next/link"
import dynamic from "next/dynamic"
import { ComponentProps } from "react"

import { cn } from "@/lib/utils"
// Import ModeToggle
import { ModeToggle } from "@/components/mode-toggle"

// Lazy load VantaBackground - only on client side
const VantaBackground = dynamic(
  () => import("@/components/vanta-background").then((mod) => mod.VantaBackground),
  { ssr: false }
)

interface AuthLayoutProps extends ComponentProps<"div"> {
  children: React.ReactNode
}

export function AuthLayout({ children, className, ...props }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0",
        className
      )}
      {...props}
    >
      {/* Theme Toggle in Top Right */}
      <div className="absolute right-4 top-4 z-50 md:right-8 md:top-8">
        <ModeToggle />
      </div>

      <div className="relative hidden h-full flex-col bg-foreground p-10 text-white dark:border-r lg:flex">
        <VantaBackground className="absolute inset-0 h-full w-full" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          Equinox
        </div>
      </div>
      <div className="flex h-full items-center p-8 lg:p-24">
        <div className="mx-0 flex w-full flex-col justify-center space-y-10 sm:w-[550px]">
          {children}
        </div>
      </div>
    </div>
  )
}
