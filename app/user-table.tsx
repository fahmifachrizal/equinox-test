"use client"

import { columns, Product } from "./columns"
import { DataTable } from "./data-table"

interface ProductTableProps {
  data: Product[]
  title?: string
  pageCount?: number
}

export function ProductTable({ data, title, pageCount }: ProductTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      title={title}
      pageCount={pageCount}
    />
  )
}
