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

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    size: 30,
    header: "ID",
    cell: ({ row }) => <div className="truncate">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    size: 250,
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return (
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div className="truncate cursor-help font-medium pr-4">{title}</div>
          </HoverCardTrigger>
          <HoverCardContent className="max-w-[400px]">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal">{title}</p>
          </HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    accessorKey: "category",
    size: 100,
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize truncate">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "description",
    size: 400,
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div className="truncate cursor-help text-muted-foreground text-sm">
              {description}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-[400px]">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal">
              {description}
            </p>
          </HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    accessorKey: "price",
    size: 100,
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-4 h-8 data-[state=open]:bg-accent">
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "image",
    size: 100,
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string
      return (
        <div className="flex justify-center">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="relative h-80 w-80 overflow-hidden rounded-md bg-white p-2 border">
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
    cell: ({ row }) => {
      const product = row.original

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}>
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View product</DropdownMenuItem>
            <DropdownMenuItem>Edit details</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
