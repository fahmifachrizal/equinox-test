import { NextResponse } from "next/server"

const TITLES = [
  "Equinox Urban Oversized Hoodie",
  "Essential Crewneck Sweatshirt",
  "Tech Fleece Joggers",
  "Signature Logo Tee",
  "Heavyweight Cotton Shorts",
  "Utility Cargo Pants",
  "Performance Windbreaker",
  "Classic Oxford Shirt",
  "Slim Fit Chinos",
  "Merino Wool Sweater",
  "Puffer Jacket",
  "Denim Trucker Jacket",
  "Graphic Print T-Shirt",
  "Relaxed Fit Jeans",
  "Bomber Jacket",
]

const STATUSES = ["active", "draft", "archived"] as const

function generateProducts(count: number) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${i + 1}`,
    title:
      TITLES[i % TITLES.length] +
      (i >= TITLES.length ? ` ${Math.floor(i / TITLES.length) + 1}` : ""),
    price: Math.floor(Math.random() * 100) + 20 + 0.99,
    rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
    reviews: Math.floor(Math.random() * 500),
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
  }))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const limit = parseInt(searchParams.get("limit") ?? "10")
  const search = searchParams.get("search") ?? ""

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const allProducts = generateProducts(100)

  let filteredProducts = allProducts
  if (search) {
    filteredProducts = allProducts.filter((product) =>
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
}
