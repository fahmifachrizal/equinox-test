"use client"

import * as React from "react"
import { useProductStore } from "@/hooks/use-product-store"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, Minus, Plus, ShoppingCart, Heart, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { MainLayout } from "@/components/layout/main-layout"

// Mock Data
const PRODUCT = {
  id: "1",
  title: "Equinox Urban Oversized Hoodie",
  price: 89.00,
  rating: 4.8,
  reviews: 124,
  description: "Crafted from premium heavyweight cotton, the Equinox Urban Hoodie combines streetwear aesthetics with everyday comfort. Features a drop-shoulder design, kangaroo pocket, and double-lined hood.",
  colors: ["Black", "Graphite", "Bone"],
  sizes: ["S", "M", "L", "XL", "2XL"],
  images: [
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1578587017763-9d3237e99f48?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1551488852-6a31c5192135?auto=format&fit=crop&q=80&w=800"
  ]
}

export default function ProductPage() {
  const { 
    selectedSize, 
    selectedColor, 
    quantity, 
    setSize, 
    setColor, 
    setQuantity, 
    addToCart 
  } = useProductStore()

  const [activeImage, setActiveImage] = React.useState(0)

  return (
    <MainLayout>
    <div className="flex flex-col gap-8 md:gap-16 pb-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Gallery Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-secondary/20">
            <img 
              src={PRODUCT.images[activeImage]} 
              alt={PRODUCT.title}
              className="h-full w-full object-cover transition-all hover:scale-105"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {PRODUCT.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg border-2",
                  activeImage === idx ? "border-primary" : "border-transparent"
                )}
              >
                <img src={img} alt={`View ${idx}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">New Arrival</span>
              <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="rounded-full">
                   <Share2 className="w-5 h-5" />
                 </Button>
                 <Button variant="ghost" size="icon" className="rounded-full">
                   <Heart className="w-5 h-5" />
                 </Button>
              </div>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight lg:text-4xl">{PRODUCT.title}</h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-bold">${PRODUCT.price.toFixed(2)}</span>
              <div className="flex items-center gap-1 text-sm text-yellow-500">
                <Star className="fill-current w-4 h-4" />
                <span className="font-medium text-foreground">{PRODUCT.rating}</span>
                <span className="text-muted-foreground">({PRODUCT.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <Separator />

          <p className="text-base text-muted-foreground leading-relaxed">
            {PRODUCT.description}
          </p>

          <div className="space-y-6">
            {/* Color Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Color: <span className="text-muted-foreground">{selectedColor}</span></label>
              <div className="flex flex-wrap gap-3">
                {PRODUCT.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setColor(color)}
                    className={cn(
                      "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                      selectedColor === color 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : "border-input hover:border-primary/50"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Size: <span className="text-muted-foreground">{selectedSize}</span></label>
                <button className="text-xs text-primary underline underline-offset-4">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {PRODUCT.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSize(size)}
                    className={cn(
                      "flex items-center justify-center py-3 rounded-lg border text-sm font-medium transition-all",
                      selectedSize === size 
                        ? "border-primary ring-1 ring-primary" 
                        : "border-input hover:border-primary/50"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center rounded-lg border w-fit">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1 gap-2 text-base h-12" onClick={addToCart}>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - ${(PRODUCT.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  )
}
