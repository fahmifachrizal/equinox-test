import { create } from 'zustand'

interface ProductState {
  selectedSize: string
  selectedColor: string
  quantity: number
  setSize: (size: string) => void
  setColor: (color: string) => void
  setQuantity: (quantity: number) => void
  addToCart: () => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  selectedSize: 'M',
  selectedColor: 'Black',
  quantity: 1,
  setSize: (size) => set({ selectedSize: size }),
  setColor: (color) => set({ selectedColor: color }),
  setQuantity: (quantity) => set({ quantity: Math.max(1, quantity) }),
  addToCart: () => {
    const { selectedSize, selectedColor, quantity } = get()
    // In a real app, this would dispatch to a global cart store or API
    console.log('Added to cart:', { selectedSize, selectedColor, quantity })
    alert(`Added ${quantity} item(s) (Size: ${selectedSize}, Color: ${selectedColor}) to cart!`)
  },
}))
