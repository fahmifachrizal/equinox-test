import createMiddleware from "next-intl/middleware"
import { NextRequest } from "next/server"

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

  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - ... if they start with `/api`, `/_next`, etc.
  // - ... if they contain a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
