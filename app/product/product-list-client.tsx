"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useProductsStore } from "@/hooks/use-products-store"
import { productsApi } from "@/lib/api/products"
import { ProductTable } from "@/components/products/product-table"
import { MainLayout } from "@/components/layout/main-layout"

export function ProductListClient() {
  const searchParams = useSearchParams()
  const { products, hasHydrated, setProducts } = useProductsStore()
  const [isLoading, setIsLoading] = React.useState(true)

  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search") || ""

  // Wait for hydration, then fetch only if store is empty
  React.useEffect(() => {
    // Wait until persist has hydrated from localStorage
    if (!hasHydrated) return

    // If we have products (from localStorage), use them
    if (products.length > 0) {
      setIsLoading(false)
      return
    }

    // Only fetch if store is truly empty after hydration
    async function fetchProducts() {
      try {
        const data = await productsApi.getAll()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
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
          title="Product Management"
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  )
}
