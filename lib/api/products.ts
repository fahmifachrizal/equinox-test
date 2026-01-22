import { Product, ProductInput } from "@/hooks/use-products-store"

const FAKESTORE_API = "https://fakestoreapi.com"

export const productsApi = {
  // Fetch all products
  async getAll(limit: number = 100): Promise<Product[]> {
    const res = await fetch(`/api/products?limit=${limit}`)
    const data = await res.json()
    return data.data || []
  },

  // Fetch single product by ID
  async getById(id: string): Promise<Product | null> {
    const res = await fetch(`/api/products/${id}`)
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error("Failed to fetch product")
    }
    return res.json()
  },

  // Create new product (calls FakeStore API for mock effect)
  async create(input: ProductInput): Promise<{ id: number }> {
    const res = await fetch(`${FAKESTORE_API}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: input.title,
        price: input.price,
        description: input.description,
        image: input.image || "https://via.placeholder.com/150",
        category: input.category || "general",
      }),
    })

    if (!res.ok) {
      throw new Error("Failed to create product")
    }

    return res.json()
  },

  // Update product (calls FakeStore API for mock effect)
  async update(id: string, input: Partial<ProductInput>): Promise<Product> {
    const res = await fetch(`${FAKESTORE_API}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })

    if (!res.ok) {
      throw new Error("Failed to update product")
    }

    return res.json()
  },

  // Delete product (calls FakeStore API for mock effect)
  async delete(id: string): Promise<boolean> {
    const res = await fetch(`${FAKESTORE_API}/products/${id}`, {
      method: "DELETE",
    })

    return res.ok
  },
}
