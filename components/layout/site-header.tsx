import { LanguageSwitcher } from "@/components/language-switcher"
import { AuthPopover } from "@/components/auth-popover"
import { Titlebar } from "@/components/titlebar"

interface SiteHeaderProps {
  isScrolled?: boolean
}

export function SiteHeader({ isScrolled }: SiteHeaderProps) {
  return (
    <Titlebar isScrolled={isScrolled}>
      <LanguageSwitcher />
      <AuthPopover />
    </Titlebar>
  )
}
