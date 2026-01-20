"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { OAuthButtons } from "@/components/oauth-buttons"

import { AuthLayout } from "@/components/auth-layout"

export default function Register() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-4xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Get started by creating a new account. It only takes a minute to set up your profile and start exploring all the features we have to offer.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                <Label htmlFor="first-nameMock">First name</Label>
                <Input id="first-nameMock" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="last-nameMock">Last name</Label>
                <Input id="last-nameMock" placeholder="Robinson" required />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="emailMock">Email</Label>
                <Input
                id="emailMock"
                type="email"
                placeholder="m@example.com"
                required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="passwordMock">Password</Label>
                <Input id="passwordMock" type="password" />
            </div>

            <Button type="submit" className="w-full mt-2">
                Create an account
            </Button>
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
            <OAuthButtons />
        </div>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Already have an account? Sign In
        </Link>
      </p>
    </AuthLayout>
  )
}
