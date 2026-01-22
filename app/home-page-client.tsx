"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useProductsStore } from "@/hooks/use-products-store"
import { productsApi } from "@/lib/api/products"
import { ProductTable } from "@/components/product-table"
import { MainLayout } from "@/components/layout/main-layout"
import { Skeleton } from "@/components/ui/skeleton"

export function HomePageClient() {
    const searchParams = useSearchParams()
    const { products, isLoaded, hasHydrated, setProducts } = useProductsStore()
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
                p =>
                    p.title.toLowerCase().includes(searchLower) ||
                    p.category.toLowerCase().includes(searchLower)
            )
        }

        return result
    }, [products, search])

    // Paginate
    const paginatedProducts = React.useMemo(() => {
        const startIndex = (page - 1) * limit
        return filteredProducts.slice(startIndex, startIndex + limit)
    }, [filteredProducts, page, limit])

    const pageCount = Math.ceil(filteredProducts.length / limit)

    if (isLoading) {
        return (
            <MainLayout>
                <div className="container mx-auto">
                    <div className="w-full">
                        <div className="border-b py-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Skeleton className="w-1 h-6 rounded-full" />
                                <Skeleton className="h-8 w-[250px]" />
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-9 w-[300px]" />
                                    <Skeleton className="h-9 w-[100px]" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md border">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-16 border-b px-4 flex items-center gap-4">
                                    <Skeleton className="h-4 w-[200px]" />
                                    <Skeleton className="h-4 w-[100px]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className="container mx-auto">
                <ProductTable
                    data={paginatedProducts}
                    title="Product Management"
                    pageCount={pageCount}
                />
            </div>
        </MainLayout>
    )
}
