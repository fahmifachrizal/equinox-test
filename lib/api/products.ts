"use client"

import { Product, ProductInput } from "@/hooks/use-products-store"

const FAKESTORE_API = "https://fakestoreapi.com"

const STATUSES = ["active", "draft", "archived"] as const

export const productsApi = {
  // Fetch all products (CLIENT-SIDE)
  async getAll(limit: number = 100): Promise<Product[]> {
    const res = await fetch(`${FAKESTORE_API}/products`)

    if (!res.ok) {
      throw new Error("Failed to fetch products")
    }

    const apiProducts = await res.json()

    if (!Array.isArray(apiProducts)) {
      throw new Error("Invalid FakeStoreAPI response")
    }

    return apiProducts.slice(0, limit).map((p: any) => ({
      id: p.id?.toString(),
      title: p.title || "No title",
      description: p.description || "",
      price: typeof p.price === "number" ? p.price : 0,
      image: p.image || "",
      category: p.category || "Uncategorized",
      rating: p.rating?.rate || 0,
      reviews: p.rating?.count || 0,
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    }))
  },

  // Fetch single product by ID (CLIENT-SIDE)
  async getById(id: string): Promise<Product | null> {
    const res = await fetch(`${FAKESTORE_API}/products/${id}`)

    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error("Failed to fetch product")
    }

    const p = await res.json()

    return {
      id: p.id?.toString(),
      title: p.title || "No title",
      description: p.description || "",
      price: typeof p.price === "number" ? p.price : 0,
      image: p.image || "",
      category: p.category || "Uncategorized",
      rating: p.rating?.rate || 0,
      reviews: p.rating?.count || 0,
      status: "active",
    }
  },

  // Create product (CLIENT-SIDE, FakeStore mock)
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

  // Update product (CLIENT-SIDE, FakeStore mock)
  async update(id: string, input: Partial<ProductInput>): Promise<Product> {
    const res = await fetch(`${FAKESTORE_API}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })

    if (!res.ok) {
      throw new Error("Failed to update product")
    }

    const p = await res.json()

    return {
      id: p.id?.toString(),
      title: p.title,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category,
      rating: p.rating?.rate || 0,
      reviews: p.rating?.count || 0,
      status: "active",
    }
  },

  // Delete product (CLIENT-SIDE, FakeStore mock)
  async delete(id: string): Promise<boolean> {
    const res = await fetch(`${FAKESTORE_API}/products/${id}`, {
      method: "DELETE",
    })

    return res.ok
  },
}
