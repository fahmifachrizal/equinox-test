"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import { useProductsStore } from "@/hooks/use-products-store"
import { ProductForm } from "@/components/products/product-form"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const { getProductById, isLoaded } = useProductsStore()
  const [productData, setProductData] = React.useState<any>(null)

  // Load product data
  React.useEffect(() => {
    const product = getProductById(productId)
    if (product) {
      setProductData({
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    }
  }, [productId, getProductById, isLoaded])

  // Show loading if store not loaded yet or product finding
  if (!isLoaded || (!productData && isLoaded)) {
    if (isLoaded && !productData) {
      // Not found handling
      return (
        <MainLayout>
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="text-muted-foreground">
              The product you're trying to edit doesn't exist.
            </p>
            <Button onClick={() => router.push("/")}>Back to Products</Button>
          </div>
        </MainLayout>
      )
    }

    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto py-10 space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <ProductForm
        mode="update"
        productId={productId}
        initialData={productData}
      />
    </MainLayout>
  )
}
