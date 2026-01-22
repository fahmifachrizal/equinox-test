"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { BerryForm } from "@/components/berries/berry-form"
import { MainLayout } from "@/components/layout/main-layout"
import { useBerriesStore } from "@/hooks/use-berries-store"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function EditBerryPage() {
  const params = useParams()
  const router = useRouter()
  const { getBerryById } = useBerriesStore()
  const id = params.id as string

  // Custom fetch logic because store might only have partial data or paged data
  const [berry, setBerry] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  // Check store first (for local edits), then fetch API if not found
  React.useEffect(() => {
    const existing = getBerryById(id)
    if (existing) {
      setBerry(existing)
      setLoading(false)
      return
    }

    // Server fetch
    async function fetchBerry() {
      try {
        const res = await fetch(`/api/berries/${id}`)
        if (!res.ok) {
          if (res.status === 404) {
            toast.error("Berry not found")
            router.push("/berries")
            return
          }
          throw new Error("Failed to fetch")
        }
        const data = await res.json()
        setBerry(data)
      } catch (error) {
        toast.error("Error loading berry")
      } finally {
        setLoading(false)
      }
    }

    fetchBerry()
  }, [id, getBerryById, router])

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto py-10 space-y-8">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-2 gap-8">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!berry) return null

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit {berry.name}</h1>
          <p className="text-muted-foreground">Make changes to berry.</p>
        </div>
        <BerryForm mode="update" berryId={id} initialData={berry} />
      </div>
    </MainLayout>
  )
}
