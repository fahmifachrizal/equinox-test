import { ProductPageClient } from "./product-page-client"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Pass the ID to client component which handles cache lookup
  return <ProductPageClient productId={id} />
}
