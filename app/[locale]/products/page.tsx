import { Suspense } from "react"
import { ProductListClient } from "@/app/[locale]/product/product-list-client"
import { MainLayout } from "@/components/layout/main-layout"
import { Skeleton } from "@/components/ui/skeleton"

function LoadingFallback() {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-4 pt-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    </MainLayout>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductListClient />
    </Suspense>
  )
}
