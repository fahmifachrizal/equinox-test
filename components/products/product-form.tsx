"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
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
  const pathname = usePathname()
  const t = useTranslations("products")
  const tc = useTranslations("common")
  const { addNewProduct, updateProduct } = useProductsStore()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Get current locale for navigation
  const currentLocale = React.useMemo(() => {
    const segments = pathname?.split("/") || []
    const potentialLocale = segments[1]
    if (potentialLocale === "en" || potentialLocale === "id") {
      return potentialLocale
    }
    return "en"
  }, [pathname])

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
      toast.warning(t("titleAndPriceRequired"))
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
          ? t("productAddedSuccess")
          : t("productUpdatedSuccess"),
      )
      router.push(`/${currentLocale}/products`)
    } catch (error) {
      console.error(`Failed to ${mode} product:`, error)
      toast.error(mode === "create" ? t("failedToCreate") : t("failedToUpdate"))
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
              <p className="font-medium">{tc("noImagePreview")}</p>
              <p className="text-xs text-muted-foreground/70">
                {tc("enterUrlBelow")}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">{t("form.imageUrl")}</Label>
            <Input
              id="image"
              type="url"
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder={t("form.imageUrlPlaceholder")}
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              {tc("pasteImageUrl")}
            </p>
          </div>
        </div>

        {/* Right Column: Details Form */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="space-y-6">
            <h1 className="border-l-4 border-accent pl-3 text-3xl font-bold">
              {mode === "create" ? t("addNewProduct") : t("editProduct")}
            </h1>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">{t("form.productTitle")} *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder={t("form.productTitlePlaceholder")}
                  className="text-lg font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">{t("form.price")} *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price || ""}
                    onChange={(e) =>
                      handleChange("price", parseFloat(e.target.value) || 0)
                    }
                    placeholder={t("form.pricePlaceholder")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">{t("form.category")}</Label>
                  <Input
                    id="category"
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    placeholder={t("form.categoryPlaceholder")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("form.description")}</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder={t("form.descriptionPlaceholder")}
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
                  ? tc("saving")
                  : mode === "create"
                    ? t("addProduct")
                    : tc("saveChanges")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.back()}>
                {tc("cancel")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
