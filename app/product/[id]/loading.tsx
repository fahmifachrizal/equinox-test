import { Skeleton } from "@/components/ui/skeleton"
import { MainLayout } from "@/components/layout/main-layout"

export default function Loading() {
    return (
        <MainLayout>
            <div className="flex flex-col md:flex-row gap-8 lg:gap-20 pt-10 pb-8 max-w-7xl mx-auto h-auto w-full">
                {/* Gallery skeleton */}
                <div className="w-full md:w-[40%] flex flex-col gap-6 h-auto">
                    <Skeleton className="w-full aspect-square rounded-2xl min-h-100" />
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Skeleton className="w-20 h-20 rounded-xl" />
                        <Skeleton className="w-20 h-20 rounded-xl" />
                        <Skeleton className="w-20 h-20 rounded-xl" />
                    </div>
                </div>

                {/* Details skeleton */}
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

                    {/* Color/Size selectors skeleton */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-24" />
                            <div className="flex gap-2.5">
                                <Skeleton className="h-8 w-16 rounded-md" />
                                <Skeleton className="h-8 w-16 rounded-md" />
                                <Skeleton className="h-8 w-16 rounded-md" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-24" />
                            <div className="flex gap-2.5">
                                <Skeleton className="h-8 w-12 rounded-md" />
                                <Skeleton className="h-8 w-12 rounded-md" />
                                <Skeleton className="h-8 w-12 rounded-md" />
                                <Skeleton className="h-8 w-12 rounded-md" />
                                <Skeleton className="h-8 w-12 rounded-md" />
                            </div>
                        </div>
                    </div>

                    {/* Add to cart skeleton */}
                    <div className="flex gap-4 pt-4">
                        <Skeleton className="h-8 w-28 rounded-md" />
                        <Skeleton className="h-8 flex-1 rounded-md" />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
