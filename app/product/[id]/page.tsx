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
    <div className="flex flex-col gap-6 md:gap-10 pb-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start">
        {/* Gallery Section */}
        <div className="w-full md:w-[45%] flex flex-col gap-3 sticky top-4">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-secondary/20">
            <img 
              src={PRODUCT.images[activeImage]} 
              alt={PRODUCT.title}
              className="h-full w-full object-cover transition-all hover:scale-105"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {PRODUCT.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "aspect-square w-16 flex-shrink-0 overflow-hidden rounded-md border-2",
                  activeImage === idx ? "border-primary" : "border-transparent"
                )}
              >
                <img src={img} alt={`View ${idx}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">New Arrival</span>
              <div className="flex items-center gap-1">
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                   <Share2 className="w-4 h-4" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                   <Heart className="w-4 h-4" />
                 </Button>
              </div>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight lg:text-3xl">{PRODUCT.title}</h1>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-xl font-bold">${PRODUCT.price.toFixed(2)}</span>
              <div className="flex items-center gap-1 text-xs text-yellow-500">
                <Star className="fill-current w-3.5 h-3.5" />
                <span className="font-medium text-foreground">{PRODUCT.rating}</span>
                <span className="text-muted-foreground">({PRODUCT.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <Separator />

          <p className="text-sm text-muted-foreground leading-relaxed">
            {PRODUCT.description}
          </p>

          <div className="space-y-4">
            {/* Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide">Color: <span className="text-muted-foreground font-normal capitalize">{selectedColor}</span></label>
              <div className="flex flex-wrap gap-2">
                {PRODUCT.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setColor(color)}
                    className={cn(
                      "px-3 py-1.5 rounded-md border text-xs font-medium transition-all",
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide">Size: <span className="text-muted-foreground font-normal capitalize">{selectedSize}</span></label>
                <button className="text-[10px] text-primary underline underline-offset-4">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {PRODUCT.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSize(size)}
                    className={cn(
                      "flex items-center justify-center py-2 rounded-md border text-xs font-medium transition-all",
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
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="flex items-center rounded-md border w-fit h-10">
                <Button variant="ghost" size="icon" className="h-full w-8 rounded-none" onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-full w-8 rounded-none" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <Button size="default" className="flex-1 gap-2 text-sm h-10" onClick={addToCart}>
                <ShoppingCart className="w-4 h-4" />
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
