"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useBerriesStore } from "@/hooks/use-berries-store"
import { toast } from "sonner"
import { Berry } from "@/types/berry"

interface BerryFormProps {
  mode: "create" | "update"
  berryId?: string
  initialData?: any
}

const FIRMNESS_OPTIONS = [
  "very-soft",
  "soft",
  "hard",
  "very-hard",
  "super-hard",
]

export function BerryForm({ mode, berryId, initialData }: BerryFormProps) {
  const router = useRouter()
  const { addNewBerry, updateBerry } = useBerriesStore()

  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    growth_time: initialData?.growth_time || 0,
    max_harvest: initialData?.max_harvest || 0,
    firmness: initialData?.firmness || "",
    size: initialData?.size || 0,
    smoothness: initialData?.smoothness || 0,
    soil_dryness: initialData?.soil_dryness || 0,
    natural_gift_power: initialData?.natural_gift_power || 0,
  })

  // Update state when initialData loads (e.g. edit page fetch)
  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        growth_time: initialData.growth_time || 0,
        max_harvest: initialData.max_harvest || 0,
        firmness: initialData.firmness || "",
        size: initialData.size || 0,
        smoothness: initialData.smoothness || 0,
        soil_dryness: initialData.soil_dryness || 0,
        natural_gift_power: initialData.natural_gift_power || 0,
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, firmness: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || formData.name.length < 2) {
      toast.error("Name must be at least 2 characters")
      return
    }
    if (!formData.firmness) {
      toast.error("Please select firmness")
      return
    }

    if (mode === "create") {
      addNewBerry({
        ...formData,
        natural_gift_type: "normal", // Default
        flavors: [], // Default
      })
      toast.success("Berry created successfully")
    } else {
      if (berryId) {
        updateBerry(berryId, formData)
        toast.success("Berry updated successfully")
      }
    }
    router.push("/berries")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Cheri"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="firmness">Firmness</Label>
          <Select value={formData.firmness} onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select firmness" />
            </SelectTrigger>
            <SelectContent>
              {FIRMNESS_OPTIONS.map((f) => (
                <SelectItem key={f} value={f}>
                  {f.replace("-", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="growth_time">Growth Time (hrs)</Label>
          <Input
            id="growth_time"
            name="growth_time"
            type="number"
            value={formData.growth_time}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max_harvest">Max Harvest</Label>
          <Input
            id="max_harvest"
            name="max_harvest"
            type="number"
            value={formData.max_harvest}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
          <Input
            id="size"
            name="size"
            type="number"
            value={formData.size}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smoothness">Smoothness</Label>
          <Input
            id="smoothness"
            name="smoothness"
            type="number"
            value={formData.smoothness}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="soil_dryness">Soil Dryness</Label>
          <Input
            id="soil_dryness"
            name="soil_dryness"
            type="number"
            value={formData.soil_dryness}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="natural_gift_power">Natural Gift Power</Label>
          <Input
            id="natural_gift_power"
            name="natural_gift_power"
            type="number"
            value={formData.natural_gift_power}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button type="submit">
        {mode === "create" ? "Create Berry" : "Update Berry"}
      </Button>
    </form>
  )
}
