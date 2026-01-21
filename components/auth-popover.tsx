"use client"

import * as React from "react"
import { User, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { OAuthButtons } from "@/components/oauth-buttons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function AuthPopover() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        setIsOpen(false)
        router.refresh()
      } else {
        console.error("Login failed")
      }
    } catch (error) {
      console.error("Login error", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <User className="size-4" />
          Login
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-88 p-6" align="end">
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Quick Login</h4>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="usernameMock"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="col-span-2 h-8"
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="passwordMock"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-2 h-8"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <OAuthButtons isLoading={isLoading} />
            <div className="text-center text-xs mt-2">
              Didn&apos;t have account?{" "}
              <Link href="/register" className="underline text-primary">
                register here
              </Link>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
