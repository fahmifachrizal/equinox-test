import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Product = {
  id: string
  title: string
  description: string
  price: number
  image: string
  images?: string[]
  category: string
  rating: number
  reviews: number
  colors?: string[]
  sizes?: string[]
  status?: "active" | "draft" | "archived"
}

// For creating new products (without id, rating, reviews)
export type ProductInput = Omit<Product, "id" | "rating" | "reviews">

interface ProductsState {
  products: Product[]
  isLoaded: boolean
  hasHydrated: boolean
  setProducts: (products: Product[]) => void
  getProductById: (id: string) => Product | undefined
  addProduct: (product: Product) => void
  addNewProduct: (input: ProductInput) => Product
  updateProduct: (id: string, updates: Partial<ProductInput>) => boolean
  deleteProduct: (id: string) => boolean
  resetStore: () => void
  setHasHydrated: (state: boolean) => void
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      isLoaded: false,
      hasHydrated: false,

      setProducts: (products) => set({ products, isLoaded: true }),

      setHasHydrated: (state) => set({ hasHydrated: state }),

      getProductById: (id) => {
        return get().products.find((p) => p.id === id)
      },

      // Add single product to cache (e.g., from detail page fetch)
      addProduct: (product) => {
        const existing = get().products.find((p) => p.id === product.id)
        if (!existing) {
          set((state) => ({ products: [...state.products, product] }))
        }
      },

      // Create new product with generated ID
      addNewProduct: (input) => {
        const newProduct: Product = {
          ...input,
          id: `custom-${Date.now()}`,
          rating: 0,
          reviews: 0,
          status: "active",
        }
        set((state) => ({
          products: [newProduct, ...state.products],
          isLoaded: true,
        }))
        return newProduct
      },

      // Update existing product
      updateProduct: (id, updates) => {
        const existing = get().products.find((p) => p.id === id)
        if (!existing) return false

        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p,
          ),
        }))
        return true
      },

      // Delete product
      deleteProduct: (id) => {
        const existing = get().products.find((p) => p.id === id)
        if (!existing) return false

        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
        return true
      },

      resetStore: () => {
        set({ products: [], isLoaded: false })
      },
    }),
    {
      name: "equinox-products-store",
      onRehydrateStorage: () => (state) => {
        // Called after hydration completes
        state?.setHasHydrated(true)
      },
    },
  ),
)
