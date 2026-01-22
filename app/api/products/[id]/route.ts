import { NextResponse } from "next/server"

// Mapping to our internal format (consistent with list endpoint)
const STATUSES = ["active", "draft", "archived"] as const

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    // Fetch from Fake Store API
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        )
      }
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    const p = await response.json()

    // Map to our internal format
    // Note: Fake Store API IDs are numbers, so we parse/string conversion carefully
    const product = {
      id: p.id.toString(),
      title: p.title,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category,
      rating: p.rating.rate,
      reviews: p.rating.count,
      // Deterministic status based on ID for consistency
      status: STATUSES[p.id % STATUSES.length],
      // Mock extra fields not in API but needed for UI
      colors: ["Black", "Graphite", "Bone"],
      sizes: ["S", "M", "L", "XL", "2XL"],
      images: [
        p.image,
        p.image,
        p.image,
      ]
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}
