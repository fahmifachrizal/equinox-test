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
import { cn } from "@/lib/utils"

interface ProductFormProps {
  initialData?: ProductInput
  productId?: string
  mode: "create" | "update"
}

export function ProductForm({
  initialData,
  productId,
  mode,
}: ProductFormProps) {
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
    },
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
          : "Product updated successfully!",
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
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-7xl mx-auto py-10 w-full px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-8 lg:gap-20">
        {/* Left Column: Image & URL */}
        <div className="w-full md:w-[40%] flex flex-col gap-6">
          <div className="aspect-square w-full overflow-hidden rounded-2xl bg-secondary/20 relative group border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
            {form.image ? (
              <img
                src={form.image}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal p-8 transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  e.currentTarget.nextElementSibling?.classList.remove("hidden")
                }}
              />
            ) : null}
            <div
              className={cn(
                "flex flex-col items-center justify-center text-muted-foreground transition-opacity",
                form.image && "hidden",
              )}>
              <p className="font-medium">No Image Preview</p>
              <p className="text-xs text-muted-foreground/70">
                Enter URL below
              </p>
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
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              Paste a direct image URL to see the preview above.
            </p>
          </div>
        </div>

        {/* Right Column: Details Form */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="space-y-6">
            <h1 className="border-l-4 border-accent pl-3 text-3xl font-bold">
              {mode === "create" ? "Add New Product" : "Edit Product"}
            </h1>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. Premium Cotton T-Shirt"
                  className="text-lg font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price || ""}
                    onChange={(e) =>
                      handleChange("price", parseFloat(e.target.value) || 0)
                    }
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your product..."
                  rows={8}
                  className="resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="px-8">
                {isSubmitting
                  ? "Saving..."
                  : mode === "create"
                    ? "Add Product"
                    : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
