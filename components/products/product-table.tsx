"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { createColumns } from "@/components/products/product-columns"
import { DataTable } from "@/components/data-table"
import { useLayoutStore } from "@/hooks/use-layout-store"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface ProductTableProps {
  data: any[]
  title?: string
  pageCount?: number
  isLoading?: boolean
}

// Client boundary wrapper for DataTable with product columns
export function ProductTable({
  data,
  title,
  pageCount,
  isLoading,
}: ProductTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isScrolled } = useLayoutStore()
  const t = useTranslations("products")

  const columns = React.useMemo(() => createColumns(t), [t])

  // Get current locale
  const currentLocale = React.useMemo(() => {
    const segments = pathname?.split("/") || []
    const potentialLocale = segments[1]
    if (potentialLocale === "en" || potentialLocale === "id") {
      return potentialLocale
    }
    return "en"
  }, [pathname])

  return (
    <div className="w-full">
      {/* Sticky page title with Add button */}
      {title && (
        <div
          className={cn(
            "sticky z-30 bg-background transition-[top,padding] duration-200 ease-in-out will-change-[top,padding]",
            isScrolled ? "top-14 pt-4" : "top-22 pt-16",
          )}>
          <div className="flex items-center justify-between gap-3 pb-4">
            <h1
              className={cn(
                "border-l-4 border-accent pl-3 font-bold transition-[font-size,line-height] duration-200 ease-in-out origin-left",
                isScrolled ? "text-xl" : "text-3xl",
              )}>
              {title}
            </h1>
            <Button
              onClick={() => router.push(`/${currentLocale}/product/add`)}
              size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {t("addProduct")}
            </Button>
          </div>
        </div>
      )}
      <DataTable
        columns={columns}
        data={data}
        pageCount={pageCount}
        isLoading={isLoading}
        onRowClick={(row) =>
          router.push(`/${currentLocale}/product/${row.original.id}`)
        }
      />
    </div>
  )
}
