import { NextResponse } from "next/server"

// Mapping to our internal format
const STATUSES = ["active", "draft", "archived"] as const

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const limit = parseInt(searchParams.get("limit") ?? "10")
  const search = searchParams.get("search") ?? ""

  try {
    // Fetch from Fake Store API with a timeout or signal if needed, but for now just basic check
    const response = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      console.error(
        `FakeStoreAPI error: ${response.status} ${response.statusText}`,
      )
      return NextResponse.json(
        { error: `External API responded with status ${response.status}` },
        { status: 502 }, // Bad Gateway
      )
    }

    const apiProducts = await response.json()

    if (!Array.isArray(apiProducts)) {
      console.error("FakeStoreAPI returned non-array response:", apiProducts)
      throw new Error("Invalid response format from external API")
    }

    // NOTE: For this demo, we fetch all products and filter/paginate in memory.
    const allProducts = apiProducts.map((p: any) => ({
      id: p.id?.toString() || Math.random().toString(),
      title: p.title || "No Title",
      description: p.description || "",
      price: typeof p.price === "number" ? p.price : 0,
      image: p.image || "",
      category: p.category || "Uncategorized",
      rating: p.rating?.rate || 0,
      reviews: p.rating?.count || 0,
      // Randomize status for demo variety
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    }))

    let filteredProducts = allProducts
    if (search) {
      filteredProducts = allProducts.filter((product: any) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      )
    }

    const total = filteredProducts.length
    const pageCount = Math.max(1, Math.ceil(total / limit))
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
  } catch (error: any) {
    console.error("Error in /api/products GET:", error)
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 },
    )
  }
}
