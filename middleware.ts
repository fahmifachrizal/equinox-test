import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"

const locales = ["en", "id"] as const

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
})

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for the home page (keep it English only)
  if (pathname === "/") {
    return
  }

  // Redirect /en or /id (bare locale paths) to home
  if (pathname === "/en" || pathname === "/id") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - ... if they start with `/api`, `/_next`, etc.
  // - ... if they contain a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
