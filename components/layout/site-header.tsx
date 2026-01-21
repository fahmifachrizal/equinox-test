import { LanguageSwitcher } from "@/components/language-switcher"
import { AuthPopover } from "@/components/auth-popover"
import { EquinoxHeader } from "@/components/equinox-header"

interface SiteHeaderProps {
  isScrolled?: boolean
}

export function SiteHeader({ isScrolled }: SiteHeaderProps) {
  return (
    <EquinoxHeader className="bg-transparent" isScrolled={isScrolled}>
      <LanguageSwitcher />
      <AuthPopover />
    </EquinoxHeader>
  )
}
