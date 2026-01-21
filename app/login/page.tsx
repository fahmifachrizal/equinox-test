"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"



import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { OAuthButtons } from "@/components/oauth-buttons"

import { AuthLayout } from "@/components/auth-layout"

export default function LoginPage() {
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
        router.push("/")
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
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-4xl font-semibold tracking-tight">
          Login to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Please enter your details below to sign in. Access your dashboard, manage your settings, and stay connected with your team.
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={handleLogin}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="usernameMock">
                  Username
                </Label>
                <Input
                  id="usernameMock"
                  placeholder="name@example.com"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                 <Label className="sr-only" htmlFor="passwordMock">
                  Password
                </Label>
                <Input
                  id="passwordMock"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  autoCorrect="off"
                  disabled={isLoading}
                   value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button disabled={isLoading} className="mt-2 w-full text-white">
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
         <div className="relative">
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
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/register"
          className="hover:text-brand underline underline-offset-4"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </p>
    </AuthLayout>
  )
}
