"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Search, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProductsStore, Product } from "@/hooks/use-products-store"
import { productsApi } from "@/lib/api/products"

export function Searchbar() {
  const router = useRouter()
  const pathname = usePathname()



  // Use global products store
  const { products: allProducts, hasHydrated, setProducts } = useProductsStore()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [comboboxOpen, setComboboxOpen] = React.useState(false)
  const [currentProduct, setCurrentProduct] = React.useState<Product | null>(null)

  // Auth pages don't need search
  const isAuthPage = pathname?.startsWith("/auth") || pathname?.startsWith("/login") || pathname?.startsWith("/register")

  // Determine if we're on a product detail view
  const isProductDetailPage = pathname?.startsWith("/product/")
  const currentProductId = isProductDetailPage ? pathname.split("/")[2] : null

  // Only fetch if not already loaded (wait for hydration)
  React.useEffect(() => {
    if (!hasHydrated) return
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
  }, [hasHydrated, allProducts.length, setProducts])

  // Sync local state with URL param
  React.useEffect(() => {
    if (currentProductId && allProducts.length > 0) {
      const found = allProducts.find(p => p.id === currentProductId)
      setCurrentProduct(found || null)
    } else {
      setCurrentProduct(null)
    }
  }, [currentProductId, allProducts])

  // Filter strategy: random suggestion on empty, otherwise fuzzy match. Exclude current.
  const filteredProducts = React.useMemo(() => {
    const productsExcludingCurrent = allProducts.filter(p => p.id !== currentProductId)

    if (!searchQuery.trim()) {
      return [...productsExcludingCurrent]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
    }
    return productsExcludingCurrent.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
  }, [allProducts, searchQuery, currentProductId])

  // Calculate remaining count for UX hint
  const remainingProductsCount = React.useMemo(() => {
    const productsExcludingCurrent = allProducts.filter(p => p.id !== currentProductId)
    return Math.max(0, productsExcludingCurrent.length - 5)
  }, [allProducts, currentProductId])

  const handleProductSelect = (selectedProduct: Product) => {
    if (selectedProduct) {
      router.push(`/product/${selectedProduct.id}`)
    }
    setComboboxOpen(false)
    setSearchQuery("")
  }

  // Context-aware placeholder
  const getPlaceholder = () => {
    if (currentProduct) {
      const truncatedTitle = currentProduct.title.length > 25
        ? currentProduct.title.slice(0, 25) + "..."
        : currentProduct.title
      return `Search more ${truncatedTitle}`
    }
    return "Search products..."
  }

  // Early exit for auth routes
  if (isAuthPage) {
    return null
  }

  // Early exit for auth routes
  if (isAuthPage) {
    return null
  }



  // Handle input focus
  const handleInputFocus = () => {
    setComboboxOpen(true)
  }

  return (
    <Popover
      open={comboboxOpen}
      onOpenChange={setComboboxOpen}
    >
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
              onFocus={handleInputFocus}
              placeholder={getPlaceholder()}
              className="h-full w-full"
            />
          </InputGroup>
        </div>
      </PopoverAnchor>
      <PopoverContent
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
        className="bg-popover w-[90vw] sm:w-[28rem] p-0 overflow-hidden"
        align="start"
      >
        <div className="max-h-[300px] overflow-y-auto p-1">
          {/* Show current product context if available */}
          {currentProduct && (
            <div className="p-2 pb-0">
              <div className="text-xs text-muted-foreground px-2 py-1.5 font-medium">
                Currently viewing
              </div>
              <div
                onClick={() => handleProductSelect(currentProduct)}
                className="flex items-center gap-3 cursor-pointer border p-2 bg-muted rounded-sm hover:bg-accent hover:text-accent-foreground"
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="w-10 h-10 object-contain rounded-md bg-secondary/30 p-1"
                />
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-sm font-medium truncate w-full">{currentProduct.title}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="capitalize">{currentProduct.category}</span>
                    <span>•</span>
                    <span className="font-medium text-foreground">${Number(currentProduct.price).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Results or Default Products */}
          {filteredProducts.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No products found
            </div>
          ) : (
            <div className="p-2">
              <div className="text-xs text-muted-foreground px-2 py-1.5 font-medium">
                Discover more
              </div>
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleProductSelect(item)}
                  className="flex items-center gap-3 cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 object-contain rounded-md bg-secondary/30 p-1"
                  />
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <span className="text-sm font-medium truncate w-full">{item.title}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="capitalize">{item.category}</span>
                      <span>•</span>
                      <span className="font-medium text-foreground">${Number(item.price).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Type to search more hint - only show when not searching */}
          {!searchQuery && remainingProductsCount > 0 && (
            <>
              <div className="h-px bg-border mx-2 my-1" />
              <div className="p-2 pt-1 text-center text-xs text-muted-foreground">
                Type to search {remainingProductsCount} more products
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
