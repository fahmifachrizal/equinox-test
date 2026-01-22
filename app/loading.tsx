import { Skeleton } from "@/components/ui/skeleton"
import { MainLayout } from "@/components/layout/main-layout"

export default function Loading() {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-4 pt-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    </MainLayout>
  )
}
