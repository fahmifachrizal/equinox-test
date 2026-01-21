import { LanguageSwitcher } from "@/components/language-switcher"
import { AuthPopover } from "@/components/auth-popover"
import { EquinoxHeader } from "@/components/equinox-header"

export function SiteHeader() {
  return (
    <EquinoxHeader className="bg-transparent">
      <LanguageSwitcher />
      <AuthPopover />
    </EquinoxHeader>
  )
}
