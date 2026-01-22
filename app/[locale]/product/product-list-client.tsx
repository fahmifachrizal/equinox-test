"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useProductsStore } from "@/hooks/use-products-store"
import { productsApi } from "@/lib/api/products"
import { ProductTable } from "@/components/products/product-table"
import { MainLayout } from "@/components/layout/main-layout"

export function ProductListClient() {
  const t = useTranslations("products")
  const searchParams = useSearchParams()
  const { products, hasHydrated, setProducts } = useProductsStore()
  const [isLoading, setIsLoading] = React.useState(true)

  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search") || ""

  React.useEffect(() => {
    if (!hasHydrated) return

    if (products.length > 0) {
      setIsLoading(false)
      return
    }

    async function fetchProducts() {
      try {
        const data = await productsApi.getAll()
        setProducts(data)
      } catch (error) {
        console.error("Fetch failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [hasHydrated, products.length, setProducts])

  // Filter and paginate from store
  const filteredProducts = React.useMemo(() => {
    let result = products

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      )
    }

    return result
  }, [products, search])

  return (
    <MainLayout>
      <div className="container mx-auto">
        <ProductTable
          data={filteredProducts}
          title={t("title")}
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  )
}
