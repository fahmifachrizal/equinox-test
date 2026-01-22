import { NextResponse } from "next/server"

// Mapping to our internal format (consistent with list endpoint)
const STATUSES = ["active", "draft", "archived"] as const

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  try {
    // Fetch from Fake Store API
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        )
      }
      return NextResponse.json(
        { error: `External API responded with status ${response.status}` },
        { status: 502 },
      )
    }

    const p = await response.json()

    // Map to our internal format robustly
    const product = {
      id: p.id?.toString() || id,
      title: p.title || "No Title",
      description: p.description || "",
      price: typeof p.price === "number" ? p.price : 0,
      image: p.image || "",
      category: p.category || "Uncategorized",
      rating: p.rating?.rate || 0,
      reviews: p.rating?.count || 0,
      // Deterministic status based on ID for consistency
      status: STATUSES[(p.id || 0) % STATUSES.length],
      // Mock extra fields not in API but needed for UI
      colors: ["Black", "Graphite", "Bone"],
      sizes: ["S", "M", "L", "XL", "2XL"],
      images: [p.image || "", p.image || "", p.image || ""],
    }

    return NextResponse.json(product)
  } catch (error: any) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { error: "Failed to fetch product", details: error.message },
      { status: 500 },
    )
  }
}
