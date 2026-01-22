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
import { useRouter, usePathname } from "next/navigation"

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
  const pathname = usePathname()

  // Get current locale
  const currentLocale = React.useMemo(() => {
    const segments = pathname?.split("/") || []
    const potentialLocale = segments[1]
    if (potentialLocale === "en" || potentialLocale === "id") {
      return potentialLocale
    }
    return "en"
  }, [pathname])

  // Get translations
  const getTranslations = () => {
    try {
      const messages = require(`@/messages/${currentLocale}.json`)
      return messages.berries
    } catch {
      return null
    }
  }

  const t = getTranslations()

  const handleDelete = () => {
    deleteBerry(berry.id)
    toast.success(t?.berryDeletedSuccess || `Berry "${berry.name}" deleted`)
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
        <DropdownMenuLabel>{t?.actions || "Actions"}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => router.push(`/${currentLocale}/berries/${berry.id}`)}>
          {t?.viewDetails || "View details"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={handleDelete}>
          {t?.deleteBerry || "Delete berry"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const createColumns = (t: any): ColumnDef<Berry>[] => [
  {
    id: "image",
    header: ({ column }) => (
      <div className="h-8 w-full flex items-center justify-center">
        {t?.columns?.image || "Image"}
      </div>
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
          {t?.columns?.name || "Name"}
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
          {t?.columns?.growth || "Growth Time"}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("growth_time")} {t?.hrs || "hrs"}
      </div>
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
          {t?.maxHarvest || "Max Harvest"}
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
          {t?.firmness || "Firmness"}
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
          {t?.size || "Size"}
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
    header: () => (
      <div className="h-8 w-full flex items-center justify-center">
        {t?.columns?.actions || "Actions"}
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionCell row={row} />
      </div>
    ),
  },
]

// Export default columns for backwards compatibility
export const columns = createColumns({})
