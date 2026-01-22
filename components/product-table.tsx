"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { columns } from "@/components/product-columns"
import { DataTable } from "@/components/data-table"
import { useLayoutStore } from "@/hooks/use-layout-store"
import { useProductsStore } from "@/hooks/use-products-store"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface ProductTableProps {
    data: any[]
    title?: string
    pageCount?: number
}

// Client boundary wrapper for DataTable with product columns
export function ProductTable({ data, title, pageCount }: ProductTableProps) {
    const router = useRouter()
    const { isScrolled } = useLayoutStore()
    const { deleteProduct } = useProductsStore()

    // Listen for delete events from column actions
    React.useEffect(() => {
        const handleDelete = (e: CustomEvent) => {
            const productId = e.detail
            deleteProduct(productId)
            toast.success("Product deleted successfully")
            router.refresh()
        }

        window.addEventListener("product:delete", handleDelete as EventListener)
        return () => {
            window.removeEventListener("product:delete", handleDelete as EventListener)
        }
    }, [deleteProduct, router])

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
                        <Button onClick={() => router.push("/product/add")} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Button>
                    </div>
                </div>
            )}
            <DataTable
                columns={columns}
                data={data}
                pageCount={pageCount}
            />
        </div>
    )
}
