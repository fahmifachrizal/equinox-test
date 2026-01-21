"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLayoutStore } from "@/hooks/use-layout-store"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title?: string
  pageCount?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isScrolled } = useLayoutStore()

  // Search params
  const page = searchParams?.get("page") ? Number(searchParams.get("page")) : 1
  const per_page = searchParams?.get("limit")
    ? Number(searchParams.get("limit"))
    : 10

  // Create pagination state for the table
  const pagination = React.useMemo(
    () => ({
      pageIndex: page - 1,
      pageSize: per_page,
    }),
    [page, per_page],
  )

  // Handle pagination changes
  const [isPending, startTransition] = React.useTransition()

  const onPaginationChange = (updater: any) => {
    const newPagination =
      typeof updater === "function" ? updater(pagination) : updater

    const params = new URLSearchParams(searchParams?.toString())

    // If page size changes, reset to first page
    if (newPagination.pageSize !== pagination.pageSize) {
      params.set("page", "1")
    } else {
      params.set("page", (newPagination.pageIndex + 1).toString())
    }

    params.set("limit", newPagination.pageSize.toString())

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      sorting,
      columnFilters,
      columnVisibility,

      pagination,
    },
    manualPagination: true,
    onPaginationChange: onPaginationChange,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  })

  return (
    <div className="w-full">
      <div
        className={cn(
          "sticky z-20 bg-background transition-[padding,top,border-color] duration-200 ease-in-out border-b py-4 will-change-[padding,top]",
          isScrolled ? "top-[64px]" : "top-[88px] border-transparent",
        )}>
        {/* Title Row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-accent rounded-full" />
          {title && (
            <h1
              className={cn(
                "font-bold transition-[font-size,line-height] duration-200 ease-in-out origin-left",
                isScrolled ? "text-xl" : "text-3xl",
              )}>
              {title}
            </h1>
          )}
        </div>

        {/* Filters (left) and Pagination (right) Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Filters - Left */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter titles..."
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm h-9 focus-visible:ring-accent"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  {table.getState().pagination.pageSize} rows{" "}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {[10, 30, 50].map((pageSize) => (
                  <DropdownMenuCheckboxItem
                    key={pageSize}
                    checked={table.getState().pagination.pageSize === pageSize}
                    onCheckedChange={() => table.setPageSize(pageSize)}>
                    {pageSize} rows
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }>
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Pagination Nav - Right */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
              {(table.getColumn("title")?.getFilterValue() as string) && (
                <span className="text-muted-foreground/60">
                  - Showing{" "}
                  {table.getFilteredRowModel().rows.length > 0
                    ? table.getState().pagination.pageIndex *
                        table.getState().pagination.pageSize +
                      1
                    : 0}{" "}
                  to{" "}
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length,
                  )}{" "}
                  of {table.getFilteredRowModel().rows.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage() || isPending}>
                <ChevronLeft className="h-4 w-4" />
                <ChevronLeft className="h-4 w-4 -ml-3" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage() || isPending}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage() || isPending}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage() || isPending}>
                <ChevronRight className="h-4 w-4" />
                <ChevronRight className="h-4 w-4 -ml-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "rounded-md border",
          isPending && "opacity-50 pointer-events-none",
        )}>
        <Table className="table-fixed bg-background">
          <TableHeader
            className={cn(
              "sticky z-20 bg-background transition-[top] duration-200 ease-in-out shadow-sm will-change-[top]",
              isScrolled ? "top-[168px]" : "top-[224px]",
            )}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width:
                          header.column.columnDef.size === 150
                            ? undefined
                            : header.column.columnDef.size,
                      }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-accent/10 transition-colors"
                  onClick={() =>
                    router.push(`/product/${(row.original as any).id}`)
                  }>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
