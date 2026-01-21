import { Product } from "./columns"
import { ProductTable } from "./user-table"
import { MainLayout } from "@/components/layout/main-layout"

async function getData(
  page: number = 1,
  limit: number = 10,
  search: string = "",
): Promise<{
  data: Product[]
  meta: { total: number; page: number; limit: number; pageCount: number }
}> {
  // Use absolute URL for server-side fetch in Next.js
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"

  const res = await fetch(
    `${baseUrl}/api/products?page=${page}&limit=${limit}&search=${search}`,
    {
      cache: "no-store",
    },
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = typeof params.page === "string" ? parseInt(params.page) : 1
  const limit = typeof params.limit === "string" ? parseInt(params.limit) : 10
  const search = typeof params.search === "string" ? params.search : ""

  const { data, meta } = await getData(page, limit, search)

  return (
    <MainLayout>
      <div className="container mx-auto">
        <ProductTable
          data={data}
          title="Product Management"
          pageCount={meta.pageCount}
        />
      </div>
    </MainLayout>
  )
}
