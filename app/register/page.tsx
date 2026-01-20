"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
            </div>
            <Alert className="bg-muted text-muted-foreground border-none">
                 <AlertDescription>This is mock login/register for demonstration purpose only</AlertDescription>
            </Alert>
            <Button type="submit" className="w-fit mt-2">
                Create an account
            </Button>
            <Button variant="outline" className="w-fit">
                Sign up with GitHub
            </Button>
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
