import { Product } from "./columns"
import { ProductTable } from "./user-table"
import { MainLayout } from "@/components/layout/main-layout"

async function getData(
  page: number = 1,
  limit: number = 10,
): Promise<{
  data: Product[]
  meta: { total: number; page: number; limit: number; pageCount: number }
}> {
  const res = await fetch(
    `http://localhost:3000/api/products?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
      next: { tags: ["products"] },
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

  const { data, meta } = await getData(page, limit)

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
