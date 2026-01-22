"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, ImageOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Berry } from "@/types/berry"
import { useBerriesStore } from "@/hooks/use-berries-store"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const BerryImage = ({ name }: { name: string }) => {
  const [error, setError] = React.useState(false)

  if (error) {
    return (
      <div className="flex justify-center items-center h-8 w-8 bg-muted rounded-full mx-auto">
        <ImageOff className="h-4 w-4 text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}-berry.png`}
        alt={name}
        className="h-8 w-8 object-contain"
        onError={() => setError(true)}
      />
    </div>
  )
}

const ActionCell = ({ row }: { row: any }) => {
  const berry = row.original
  const { deleteBerry } = useBerriesStore()
  const router = useRouter()

  const handleDelete = () => {
    deleteBerry(berry.id)
    toast.success(`Berry "${berry.name}" deleted`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push(`/berries/${berry.id}`)}>
          View details
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={handleDelete}>
          Delete berry
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<Berry>[] = [
  {
    id: "image",
    header: ({ column }) => (
      <div className="h-8 w-full flex items-center justify-center">Image</div>
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return <BerryImage name={name} />
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 w-full justify-center hover:bg-accent/10">
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize font-medium text-center">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "growth_time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 w-full justify-center hover:bg-accent/10">
          Growth Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("growth_time")} hrs</div>
    ),
  },
  {
    accessorKey: "max_harvest",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 w-full justify-center hover:bg-accent/10">
          Max Harvest
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("max_harvest")}</div>
    ),
  },
  {
    accessorKey: "firmness",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 w-full justify-center hover:bg-accent/10">
          Firmness
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize text-center">
        {(row.getValue("firmness") as string).replace("-", " ")}
      </div>
    ),
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 w-full justify-center hover:bg-accent/10">
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("size")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionCell row={row} />
      </div>
    ),
  },
]
