"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { useBerriesStore } from "@/hooks/use-berries-store"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, ImageOff } from "lucide-react"
import { toast } from "sonner"

// Reusing the simple image logic for now, or could extract it if needed.
// For simplicity, duplicating the small logic here with bigger size.
const BerryDetailImage = ({ name }: { name: string }) => {
  const [error, setError] = React.useState(false)

  if (error) {
    return (
      <div className="flex justify-center items-center h-32 w-32 bg-muted rounded-full mx-auto">
        <ImageOff className="h-12 w-12 text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}-berry.png`}
        alt={name}
        className="h-32 w-32 object-contain"
        onError={() => setError(true)}
      />
    </div>
  )
}

export default function BerryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getBerryById } = useBerriesStore()
  const id = params.id as string

  const [berry, setBerry] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const existing = getBerryById(id)
    if (existing) {
      setBerry(existing)
      setLoading(false)
      return
    }

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
        <div className="container mx-auto py-10 space-y-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
      </MainLayout>
    )
  }

  if (!berry) return null

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold capitalize">
              {berry.name} Berry
            </h1>
          </div>
          <Button onClick={() => router.push(`/berries/edit/${id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <BerryDetailImage name={berry.name} />
              <div className="mt-6 text-center space-y-2">
                <p className="font-semibold text-lg capitalize">
                  {berry.firmness.replace("-", " ")}
                </p>
                <p className="text-muted-foreground">Firmness</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Growth Time
                  </p>
                  <p className="text-2xl font-bold">{berry.growth_time} hrs</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Max Harvest
                  </p>
                  <p className="text-2xl font-bold">{berry.max_harvest}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Size
                  </p>
                  <p className="text-2xl font-bold">{berry.size}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Smoothness
                  </p>
                  <p className="text-2xl font-bold">{berry.smoothness}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Soil Dryness
                  </p>
                  <p className="text-2xl font-bold">{berry.soil_dryness}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Natural Gift
                  </p>
                  <p className="text-lg font-bold capitalize">
                    {berry.natural_gift_type} ({berry.natural_gift_power})
                  </p>
                </div>
              </div>

              {berry.flavors && berry.flavors.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Flavors</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {berry.flavors.map((f: any) => (
                      <div
                        key={f.flavor.name}
                        className="flex justify-between items-center border p-2 rounded">
                        <span className="capitalize">{f.flavor.name}</span>
                        <span className="font-bold">{f.potency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
