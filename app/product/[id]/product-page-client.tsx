"use client"

import * as React from "react"
import { useProductsStore, Product } from "@/hooks/use-products-store"
import { ProductDetails } from "./product-details"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductPageClientProps {
    productId: string
    initialProduct?: Product | null
}

export function ProductPageClient({ productId, initialProduct }: ProductPageClientProps) {
    const { getProductById, addProduct, isLoaded } = useProductsStore()
    const [product, setProduct] = React.useState<Product | null>(initialProduct || null)
    const [isLoading, setIsLoading] = React.useState(!initialProduct)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        // If we have initial product from server, add to cache
        if (initialProduct) {
            addProduct(initialProduct)
            return
        }

        // Check cache first
        const cached = getProductById(productId)
        if (cached) {
            setProduct(cached)
            setIsLoading(false)
            return
        }

        // Fetch if not in cache
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products/${productId}`)
                if (!res.ok) {
                    if (res.status === 404) {
                        setError(true)
                        setIsLoading(false)
                        return
                    }
                    throw new Error("Failed to fetch")
                }
                const data = await res.json()
                setProduct(data)
                addProduct(data)
            } catch {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProduct()
    }, [productId, initialProduct, getProductById, addProduct])

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex flex-col md:flex-row gap-8 lg:gap-20 pt-10 pb-8 max-w-7xl mx-auto h-auto w-full">
                    <div className="w-full md:w-[40%] flex flex-col gap-6 h-auto">
                        <Skeleton className="w-full aspect-square rounded-2xl min-h-100" />
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Skeleton className="w-20 h-20 rounded-xl" />
                            <Skeleton className="w-20 h-20 rounded-xl" />
                            <Skeleton className="w-20 h-20 rounded-xl" />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-8 h-auto pr-4">
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-10 w-3/4" />
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-8 w-32 rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                </div>
            </MainLayout>
        )
    }

    if (error || !product) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                    <h1 className="text-2xl font-bold">Product not found</h1>
                    <p className="text-muted-foreground">
                        The product you requested could not be found.
                    </p>
                    <Button asChild>
                        <a href="/">Back to Products</a>
                    </Button>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <ProductDetails product={product} />
        </MainLayout>
    )
}
