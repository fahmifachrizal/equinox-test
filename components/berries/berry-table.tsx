"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { columns } from "@/components/berries/berry-columns"
import { DataTable } from "@/components/data-table"
import { useLayoutStore } from "@/hooks/use-layout-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface BerryTableProps {
  data: any[]
  title?: string
  pageCount?: number
  manualPagination?: boolean
  isLoading?: boolean
}

export function BerryTable({
  data,
  title,
  pageCount,
  manualPagination,
  isLoading,
}: BerryTableProps) {
  const router = useRouter()
  const { isScrolled } = useLayoutStore()
  // No Add button for now unless requested, or just dummy

  return (
    <div className="w-full">
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
            <Button onClick={() => router.push("/berries/add")} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Berry
            </Button>
          </div>
        </div>
      )}
      <DataTable
        columns={columns}
        data={data}
        pageCount={pageCount}
        filterColumn="name"
        manualPagination={manualPagination}
        isLoading={isLoading}
        onRowClick={(row) => router.push(`/berries/${row.original.id}`)}
      />
    </div>
  )
}
