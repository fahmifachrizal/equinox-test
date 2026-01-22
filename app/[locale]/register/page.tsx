"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OAuthButtons } from "@/components/oauth-buttons"

import { AuthLayout } from "@/components/auth-layout"

export default function Register() {
  const t = useTranslations("auth.register")
  const pathname = usePathname()

  // Get current locale for navigation
  const currentLocale = React.useMemo(() => {
    const segments = pathname?.split("/") || []
    const potentialLocale = segments[1]
    if (potentialLocale === "en" || potentialLocale === "id") {
      return potentialLocale
    }
    return "en"
  }, [pathname])

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="border-l-4 border-accent pl-2 text-4xl font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
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
            <Label htmlFor="emailMock">{t("email")}</Label>
            <Input
              id="emailMock"
              type="email"
              placeholder={t("emailPlaceholder")}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="passwordMock">{t("password")}</Label>
            <Input
              id="passwordMock"
              type="password"
              placeholder={t("passwordPlaceholder")}
            />
          </div>

          <Button type="submit" className="w-full mt-2 text-white">
            {t("signUp")}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("orContinueWith")}
              </span>
            </div>
          </div>
          <OAuthButtons />
        </div>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href={`/${currentLocale}/login`}
          className="hover:text-brand underline underline-offset-4">
          {t("haveAccount")}
        </Link>
      </p>
    </AuthLayout>
  )
}
