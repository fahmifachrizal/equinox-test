"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useBerriesStore } from "@/hooks/use-berries-store"
import { berriesApi } from "@/lib/api/berries"
import { BerryTable } from "@/components/berries/berry-table"
import { MainLayout } from "@/components/layout/main-layout"
import { Skeleton } from "@/components/ui/skeleton"

export function BerryPageClient() {
  const t = useTranslations("berries")
  const searchParams = useSearchParams()
  const { berries, total, isLoaded, hasHydrated, setBerries } =
    useBerriesStore()
  const [isLoading, setIsLoading] = React.useState(true)

  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search") || ""

  // Fetch on mount or param change
  React.useEffect(() => {
    if (!hasHydrated) return

    async function fetchBerries() {
      setIsLoading(true)
      try {
        const { data, meta } = await berriesApi.getAll({ page, limit })
        setBerries(data, meta.total)
      } catch (error) {
        console.error("Failed to fetch berries:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBerries()
  }, [hasHydrated, page, limit, setBerries, berries.length])

  // Client-side filtering for search (if API doesn't support search)
  // Note: For true server-side pagination, search should also be server-side.
  // But PokeAPI doesn't support search by name substring easily without fetching all.
  // For this step, we'll just display what we have, or filtered if present.
  const displayedBerries = React.useMemo(() => {
    if (!search) return berries
    return berries.filter(
      (b) =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.firmness.toLowerCase().includes(search.toLowerCase()),
    )
  }, [berries, search])

  const pageCount = Math.ceil(total / limit)

  if (!hasHydrated) {
    return (
      <MainLayout>
        <div className="container mx-auto">
          <div className="border-b py-4">
            <Skeleton className="w-[200px] h-8" />
          </div>
          <div className="mt-8 space-y-4">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto pb-40">
        <BerryTable
          data={displayedBerries}
          title={t("title")}
          pageCount={pageCount}
          manualPagination={true}
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  )
}
