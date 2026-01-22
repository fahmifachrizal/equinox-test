"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProductsStore, Product } from "@/hooks/use-products-store"
import { productsApi } from "@/lib/api/products"
import { useBerriesStore } from "@/hooks/use-berries-store"
import { berriesApi } from "@/lib/api/berries"

export function Searchbar() {
  const router = useRouter()
  const pathname = usePathname()

  // Use global products and berries stores
  const {
    products: allProducts,
    hasHydrated: productsHydrated,
    setProducts,
  } = useProductsStore()
  const {
    berries: allBerries,
    hasHydrated: berriesHydrated,
    setBerries,
  } = useBerriesStore()

  const [searchQuery, setSearchQuery] = React.useState("")
  const [comboboxOpen, setComboboxOpen] = React.useState(false)

  // Auth pages don't need search
  const isAuthPage =
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register")

  // Fetch logic for Products
  React.useEffect(() => {
    if (!productsHydrated) return
    if (allProducts.length > 0) return

    async function fetchProducts() {
      try {
        const data = await productsApi.getAll()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }
    fetchProducts()
  }, [productsHydrated, allProducts.length, setProducts])

  // Fetch logic for Berries
  React.useEffect(() => {
    if (!berriesHydrated) return
    if (allBerries.length > 0) return

    async function fetchBerries() {
      try {
        const { data, meta } = await berriesApi.getAll({ limit: 60 })
        setBerries(data, meta.total)
      } catch (error) {
        console.error("Failed to fetch berries:", error)
      }
    }
    fetchBerries()
  }, [berriesHydrated, allBerries.length, setBerries])

  // Unified Search Result Type
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

    // Check for product
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

    // Check for berry
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
    // 1. Normalize Products
    const productItems: SearchResult[] = allProducts.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.category,
      image: p.image,
      type: "product",
      price: p.price,
      original: p,
    }))

    // 2. Normalize Berries
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

    // Exclude current item
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

  const remainingCount = React.useMemo(() => {
    const totalCount = allProducts.length + allBerries.length
    return Math.max(0, totalCount - 5)
  }, [allProducts.length, allBerries.length])

  // Extract current locale from pathname
  const currentLocale = React.useMemo(() => {
    const segments = pathname?.split("/") || []
    const potentialLocale = segments[1]
    if (potentialLocale === "en" || potentialLocale === "id") {
      return potentialLocale
    }
    return "en" // Default
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
        ? "Search other products..."
        : "Search other berries..."
    }
    return "Search products or berries..."
  }

  // Early exit for auth routes
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
        className="bg-popover w-[90vw] sm:w-[28rem] p-0 overflow-hidden"
        align="start">
        <div className="h-fit max-h-[60vh] overflow-y-auto p-1">
          {currentItem && !searchQuery && (
            <div className="mb-2 border-b pb-2">
              <div className="text-xs text-muted-foreground px-4 py-1.5 font-medium">
                Currently viewing
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
                    ;(e.target as HTMLImageElement).style.display = "none"
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
                      {currentItem.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="p-2">
              <div className="text-xs text-muted-foreground px-2 py-1.5 font-medium">
                {searchQuery ? "Results" : "Suggestions"}
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
                    } // Fallback logic simpler here
                    alt={item.title}
                    className="w-10 h-10 object-contain rounded-md bg-secondary/30 p-1"
                    onError={(e) => {
                      // Simple fallback if image fails, though BerryImage usage would be cleaner but this is generic
                      ;(e.target as HTMLImageElement).style.display = "none"
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
                        {item.type}
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
