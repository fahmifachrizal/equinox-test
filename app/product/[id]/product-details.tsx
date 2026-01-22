"use client"

import * as React from "react"
import { useProductStore } from "@/hooks/use-product-store"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, Minus, Plus, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

function ProductDetails({ product }: { product: any }) {
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

    // Use the same image for 3 views as requested
    const images = (product.images && product.images.length > 0)
        ? product.images
        : Array(3).fill(product.image)

    const colors = product.colors || ["Standard"]
    const sizes = product.sizes || ["One Size"]

    return (
        <div className="flex flex-col md:flex-row gap-8 lg:gap-20 pt-10 pb-8 max-w-7xl mx-auto h-auto w-full">
            {/* Gallery */}
            <div className="w-full md:w-[40%] flex flex-col gap-6 h-auto">
                <div className="flex-1 w-full overflow-hidden rounded-2xl bg-secondary/20 relative group">
                    <img
                        src={images[activeImage]}
                        alt={product.title}
                        className="absolute inset-0 w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal p-8 transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none justify-center">
                    {images.map((img: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(idx)}
                            className={cn(
                                "relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                                activeImage === idx
                                    ? "border-primary ring-2 ring-primary/20 ring-offset-2"
                                    : "border-transparent hover:border-border"
                            )}
                        >
                            <img src={img} alt={`View ${idx}`} className="h-full w-full object-contain p-2" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col gap-8 h-auto overflow-y-auto pr-4 scrollbar-thin">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-secondary text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                            {product.category}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <h1 className="border-l-4 border-accent pl-3 text-3xl font-extrabold tracking-tight lg:text-4xl lg:leading-[1.1] text-foreground">
                            {product.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                            ${Number(product.price).toFixed(2)}
                        </span>
                        <Separator orientation="vertical" className="h-6 w-px bg-border/50" />
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border bg-background/50 backdrop-blur-sm">
                            <Star className="fill-yellow-500 text-yellow-500 w-4 h-4" />
                            <span className="font-semibold text-sm">{product.rating}</span>
                            <span className="text-muted-foreground text-xs">({product.reviews} reviews)</span>
                        </div>
                    </div>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                    {product.description}
                </p>

                {/* Variant selection */}
                <div className="space-y-6">
                    {/* Color */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                            Select Color
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                            {colors.map((color: string) => (
                                <Button
                                    key={color}
                                    onClick={() => setColor(color)}
                                    variant={selectedColor === color || (!selectedColor && color === colors[0]) ? "default" : "outline"}
                                    size="sm"
                                    className={cn(
                                        "text-xs font-medium px-4 h-8",
                                        selectedColor === color || (!selectedColor && color === colors[0])
                                            ? "shadow-sm"
                                            : "hover:bg-secondary/50 text-foreground"
                                    )}
                                >
                                    {color}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Size */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between max-w-md">
                            <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                                Select Size
                            </label>
                            <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors uppercase tracking-wide">
                                Size Guide
                            </button>
                        </div>
                        <div className="grid grid-cols-5 gap-2.5 max-w-md">
                            {sizes.map((size: string) => (
                                <Button
                                    key={size}
                                    onClick={() => setSize(size)}
                                    variant={selectedSize === size || (!selectedSize && size === sizes[0]) ? "default" : "outline"}
                                    size="sm"
                                    className={cn(
                                        "w-full text-xs font-semibold h-8",
                                        selectedSize === size || (!selectedSize && size === sizes[0])
                                            ? "shadow-sm"
                                            : "hover:bg-secondary/50 text-foreground"
                                    )}
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity & Cart */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-2">
                        <div className="flex items-center rounded-md border bg-background shadow-sm w-fit h-8">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none first:rounded-l-md hover:bg-secondary"
                                onClick={() => setQuantity(quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </Button>
                            <span className="w-10 text-center text-sm font-medium tabular-nums h-full flex items-center justify-center border-x px-2">{quantity}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none last:rounded-r-md hover:bg-secondary"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            className="flex-1 rounded-md text-sm font-medium h-8 shadow-sm"
                            onClick={addToCart}
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart — ${(product.price * quantity).toFixed(2)}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ProductDetails }
