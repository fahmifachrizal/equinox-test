import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"

const locales = ["en", "id"] as const

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
})

export default function middleware(request: NextRequest) {
  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - ... if they start with `/api`, `/_next`, etc.
  // - ... if they contain a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
