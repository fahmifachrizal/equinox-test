import { NextResponse } from "next/server"

// Mapping to our internal format
const STATUSES = ["active", "draft", "archived"] as const

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const limit = parseInt(searchParams.get("limit") ?? "10")
  const search = searchParams.get("search") ?? ""

  try {
    // Fetch from Fake Store API
    const response = await fetch("https://fakestoreapi.com/products")
    const apiProducts = await response.json()

    // Map to our internal format
    const allProducts = apiProducts.map((p: any, i: number) => ({
      id: p.id.toString(),
      title: p.title,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category,
      rating: p.rating.rate,
      reviews: p.rating.count,
      status: STATUSES[i % STATUSES.length],
    }))

    let filteredProducts = allProducts
    if (search) {
      filteredProducts = allProducts.filter((product: any) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      )
    }

    const total = filteredProducts.length
    const pageCount = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const end = start + limit
    const data = filteredProducts.slice(start, end)

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        pageCount,
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    )
  }
}
