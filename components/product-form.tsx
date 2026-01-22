"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useProductsStore, ProductInput } from "@/hooks/use-products-store"
import { productsApi } from "@/lib/api/products"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProductFormProps {
    initialData?: ProductInput
    productId?: string
    mode: "create" | "update"
}

export function ProductForm({ initialData, productId, mode }: ProductFormProps) {
    const router = useRouter()
    const { addNewProduct, updateProduct } = useProductsStore()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const [form, setForm] = React.useState<ProductInput>(
        initialData || {
            title: "",
            description: "",
            price: 0,
            image: "",
            category: "",
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.title || !form.price) {
            toast.warning("Title and Price are required")
            return
        }

        setIsSubmitting(true)

        try {
            if (mode === "create") {
                // Create mode
                await productsApi.create(form)
                addNewProduct({
                    ...form,
                    image: form.image || "https://via.placeholder.com/150",
                })
            } else {
                // Update mode
                if (!productId) throw new Error("Product ID required for update")
                await productsApi.update(productId, form)
                const success = updateProduct(productId, form)
                if (!success) throw new Error("Failed to update store")
            }

            toast.success(
                mode === "create"
                    ? "Product added successfully!"
                    : "Product updated successfully!"
            )
            router.push("/")
        } catch (error) {
            console.error(`Failed to ${mode} product:`, error)
            toast.error(`Failed to ${mode} product. Please try again.`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (field: keyof ProductInput, value: string | number) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="border-l-4 border-accent pl-3 text-3xl font-bold mb-8">
                {mode === "create" ? "Add New Product" : "Edit Product"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                        id="title"
                        value={form.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Product title"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Product description"
                        rows={4}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.price || ""}
                            onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            value={form.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                            placeholder="e.g. Electronics"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                        id="image"
                        type="url"
                        value={form.image}
                        onChange={(e) => handleChange("image", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : mode === "create" ? "Add Product" : "Save Changes"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}
