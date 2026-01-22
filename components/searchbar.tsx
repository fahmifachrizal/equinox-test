"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProductsStore } from "@/hooks/use-products-store"
import { useBerriesStore } from "@/hooks/use-berries-store"

export function Searchbar() {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations("search")

  const { products: allProducts } = useProductsStore()
  const { berries: allBerries } = useBerriesStore()

  const [searchQuery, setSearchQuery] = React.useState("")
  const [comboboxOpen, setComboboxOpen] = React.useState(false)

  const isAuthPage =
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register")

  interface SearchResult {
    id: string
    title: string
    subtitle: string
    image: string
    type: "product" | "berry"
    price?: number
    original: any
  }

  const currentItem = React.useMemo<SearchResult | null>(() => {
    if (!pathname) return null

    const productMatch = pathname.match(/^\/product\/([^/]+)$/)
    if (productMatch) {
      const id = productMatch[1]
      const product = allProducts.find((p) => p.id === id)
      if (product) {
        return {
          id: product.id,
          title: product.title,
          subtitle: product.category,
          image: product.image,
          type: "product",
          price: product.price,
          original: product,
        }
      }
    }

    const berryMatch = pathname.match(/^\/berries\/([^/]+)$/)
    if (berryMatch) {
      const id = berryMatch[1]
      const berry = allBerries.find((b) => b.id.toString() === id)
      if (berry) {
        return {
          id: berry.id.toString(),
          title: `${berry.name} Berry`,
          subtitle: berry.firmness.replace("-", " "),
          image: berry.url
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berry.name}-berry.png`
            : "",
          type: "berry",
          original: berry,
        }
      }
    }
    return null
  }, [pathname, allProducts, allBerries])

  const filteredItems = React.useMemo(() => {
    const productItems: SearchResult[] = allProducts.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.category,
      image: p.image,
      type: "product",
      price: p.price,
      original: p,
    }))

    const berryItems: SearchResult[] = allBerries.map((b) => ({
      id: b.id.toString(),
      title: `${b.name} Berry`,
      subtitle: b.firmness.replace("-", " "),
      image: b.url
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${b.name}-berry.png`
        : "",
      type: "berry",
      original: b,
    }))

    let allItems = [...productItems, ...berryItems]

    if (currentItem) {
      allItems = allItems.filter(
        (item) =>
          !(item.id === currentItem.id && item.type === currentItem.type),
      )
    }

    if (!searchQuery.trim()) {
      return allItems.sort(() => 0.5 - Math.random()).slice(0, 5)
    }

    const query = searchQuery.toLowerCase()
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query),
      )
      .slice(0, 5)
  }, [allProducts, allBerries, searchQuery, currentItem])

  const currentLocale = React.useMemo(() => {
    const segments = pathname?.split("/") || []
    const potentialLocale = segments[1]
    if (potentialLocale === "en" || potentialLocale === "id") {
      return potentialLocale
    }
    return "en"
  }, [pathname])

  const handleSelect = (item: SearchResult) => {
    const localePrefix = currentLocale ? `/${currentLocale}` : ""
    if (item.type === "product") {
      router.push(`${localePrefix}/product/${item.id}`)
    } else {
      router.push(`${localePrefix}/berries/${item.id}`)
    }
    setComboboxOpen(false)
    setSearchQuery("")
  }

  const getPlaceholder = () => {
    if (currentItem) {
      return currentItem.type === "product"
        ? t("placeholderProducts")
        : t("placeholderBerries")
    }
    return t("placeholder")
  }

  if (isAuthPage) {
    return null
  }

  return (
    <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
      <PopoverAnchor asChild>
        <div className="w-full max-w-md">
          <InputGroup className="h-9 w-full shadow-none bg-popover">
            <InputGroupAddon>
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            </InputGroupAddon>
            <InputGroupInput
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setComboboxOpen(true)
              }}
              onFocus={() => setComboboxOpen(true)}
              placeholder={getPlaceholder()}
              className="h-full w-full"
            />
          </InputGroup>
        </div>
      </PopoverAnchor>
      <PopoverContent
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
        className="bg-popover w-[90vw] sm:w-md p-0 overflow-hidden"
        align="start">
        <div className="h-fit max-h-[60vh] overflow-y-auto p-1">
          {currentItem && !searchQuery && (
            <div className="mb-2 border-b pb-2">
              <div className="text-xs text-muted-foreground px-4 py-1.5 font-medium">
                {t("currentlyViewing")}
              </div>
              <div className="flex items-center gap-3 rounded-sm px-4 py-1.5 text-sm select-none opacity-70">
                <img
                  src={
                    currentItem.image ||
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png"
                  }
                  alt={currentItem.title}
                  className="w-10 h-10 object-contain rounded-md bg-secondary/30 p-1"
                  onError={(e) => {
                    ; (e.target as HTMLImageElement).style.display = "none"
                  }}
                />
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-sm font-medium truncate w-full capitalize">
                    {currentItem.title}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="capitalize">{currentItem.subtitle}</span>
                    <span>•</span>
                    <span className="font-medium text-foreground capitalize">
                      {t(`types.${currentItem.type}`)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {t("noResults")}
            </div>
          ) : (
            <div className="p-2">
              <div className="text-xs text-muted-foreground px-2 py-1.5 font-medium">
                {searchQuery ? t("results") : t("suggestions")}
              </div>
              {filteredItems.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground">
                  <img
                    src={
                      item.image ||
                      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png"
                    }
                    alt={item.title}
                    className="w-10 h-10 object-contain rounded-md bg-secondary/30 p-1"
                    onError={(e) => {
                      ; (e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <span className="text-sm font-medium truncate w-full capitalize">
                      {item.title}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="capitalize">{item.subtitle}</span>
                      <span>•</span>
                      <span className="font-medium text-foreground capitalize">
                        {t(`types.${item.type}`)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
