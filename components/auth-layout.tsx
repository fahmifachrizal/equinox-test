import Link from "next/link"
import dynamic from "next/dynamic"
import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import { Titlebar } from "@/components/titlebar"

const VantaBackground = dynamic(
  () => import("@/components/vanta-background").then((mod) => mod.VantaBackground),
  { ssr: false }
)

interface AuthLayoutProps extends ComponentProps<"div"> {
  children: React.ReactNode
}

export function AuthLayout({ children, className, ...props }: AuthLayoutProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div
        className={cn(
          "container relative hidden h-full w-full max-w-screen-2xl border-x flex-col items-center justify-center md:grid lg:grid-cols-2 lg:px-0",
          className
        )}
        {...props}
      >
        <div className="absolute top-0 w-full z-50">
          <Titlebar className="text-background" />
        </div>

        <div className="relative hidden h-full flex-col bg-foreground p-10 text-white dark:border-r lg:flex">
          <VantaBackground className="absolute inset-0 h-full w-full" />
        </div>
        <div className="flex h-full items-center p-8 lg:p-24">
          <div className="mx-0 flex w-full flex-col justify-center space-y-10 sm:w-137.5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
