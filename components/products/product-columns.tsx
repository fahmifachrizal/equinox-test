"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ExternalLink, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useProductsStore } from "@/hooks/use-products-store"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export type Product = {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  status: "active" | "draft" | "archived"
}

const ActionCell = ({ row }: { row: any }) => {
  const router = useRouter()
  const pathname = usePathname()
  const product = row.original
  const { deleteProduct } = useProductsStore()
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

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
      return messages.products
    } catch {
      return null
    }
  }

  const t = getTranslations()

  const handleDelete = () => {
    deleteProduct(product.id)
    toast.success(t?.productDeletedSuccess || "Product deleted successfully")
    setShowDeleteDialog(false)
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
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
            onClick={() => {
              navigator.clipboard.writeText(product.id)
              toast.success(t?.idCopied || "Product ID copied to clipboard")
            }}>
            {t?.copyId || "Copy product ID"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${currentLocale}/product/${product.id}`)
            }>
            {t?.viewProduct || "View product"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${currentLocale}/product/edit/${product.id}`)
            }>
            {t?.editDetails || "Edit details"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:bg-red-500 focus:text-white group"
            onSelect={(e) => {
              e.preventDefault()
              setShowDeleteDialog(true)
            }}>
            {t?.deleteProduct || "Delete product"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t?.deleteConfirmTitle || "Are you absolutely sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t?.deleteConfirmDesc ||
                "This action cannot be undone. This will permanently delete the product and remove it from our servers."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t?.cancel || "Cancel"}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {t?.delete || "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export const createColumns = (t: any): ColumnDef<Product>[] => [
  {
    accessorKey: "id",
    size: 100,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 w-full hover:bg-accent/10">
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row, column }) => (
      <div className="truncate text-center">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "title",
    size: 300,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 w-full hover:bg-accent/10">
          {t?.columns?.title || "Title"}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row, column }) => {
      const title = row.getValue("title") as string
      return (
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div
              className="truncate cursor-help font-medium pr-4"
              style={{ width: column.columnDef.size }}>
              {title}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="max-w-100">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal">
              {title}
            </p>
          </HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    accessorKey: "category",
    size: 150,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 w-full hover:bg-accent/10">
          {t?.columns?.category || "Category"}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row, column }) => (
      <div
        className="capitalize truncate"
        style={{ width: column.columnDef.size }}>
        {row.getValue("category")}
      </div>
    ),
  },
  {
    accessorKey: "price",
    size: 120,
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 w-full hover:bg-accent/10">
            {t?.columns?.price || "Price"}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row, column }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)

      return (
        <div
          className="text-center font-medium"
          style={{ width: column.columnDef.size }}>
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    size: 400,
    header: () => (
      <div className="flex w-full h-8 justify-center items-center">
        {t?.columns?.description || "Description"}
      </div>
    ),
    cell: ({ row, column }) => {
      const description = row.getValue("description") as string
      return (
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div
              className="truncate cursor-help text-muted-foreground text-sm"
              style={{ width: column.columnDef.size }}>
              {description}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-100">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal ">
              {description}
            </p>
          </HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    accessorKey: "image",
    size: 100,
    header: () => (
      <div className="flex w-full h-8 justify-center items-center">
        {t?.columns?.image || "Image"}
      </div>
    ),
    cell: ({ row, column }) => {
      const imageUrl = row.getValue("image") as string
      return (
        <div
          className="flex justify-center"
          style={{ width: column.columnDef.size }}>
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="relative h-80 w-80 overflow-hidden rounded-md p-2">
                <img
                  src={imageUrl}
                  alt="Product"
                  className="h-full w-full object-contain"
                />
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )
    },
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => <ActionCell row={row} />,
  },
]

// Export default columns for backwards compatibility
export const columns = createColumns({})
