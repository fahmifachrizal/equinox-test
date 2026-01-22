import { BerryPageClient } from "./berry-page-client"
import { Suspense } from "react"

export default function BerriesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BerryPageClient />
    </Suspense>
  )
}
