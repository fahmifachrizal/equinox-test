"use client"

import { columns, User } from "./columns"
import { DataTable } from "./data-table"

interface UserTableProps {
  data: User[]
}

export function UserTable({ data }: UserTableProps) {
  return <DataTable columns={columns} data={data} />
}
