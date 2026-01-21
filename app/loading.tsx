import { Skeleton } from "@/components/ui/skeleton"
import { MainLayout } from "@/components/layout/main-layout"

export default function Loading() {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="w-full">
          {/* Header Block */}
          <div className="border-b py-4">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-1 h-6 rounded-full" />
              <Skeleton className="h-8 w-[250px]" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-[300px]" />
                <Skeleton className="h-9 w-[100px]" />
                <Skeleton className="h-9 w-[100px]" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-[200px]" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="h-12 border-b px-4 flex items-center gap-4">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 border-b px-4 flex items-center gap-4">
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
