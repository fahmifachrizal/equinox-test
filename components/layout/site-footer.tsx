export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6 border-t mt-auto">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2026 Equinox Inc. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <a
          className="text-xs text-muted-foreground hover:text-accent hover:underline underline-offset-4 transition-colors"
          href="#">
          Terms of Service
        </a>
        <a
          className="text-xs text-muted-foreground hover:text-accent hover:underline underline-offset-4 transition-colors"
          href="#">
          Privacy
        </a>
      </nav>
    </footer>
  )
}
