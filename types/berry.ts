export type BerryFlavor = {
  flavor: {
    name: string
    url: string
  }
  potency: number
}

export type Berry = {
  id: string
  name: string
  growth_time: number
  max_harvest: number
  firmness: string
  size: number
  smoothness: number
  soil_dryness: number
  flavors: BerryFlavor[]
  natural_gift_power: number
  natural_gift_type: string
  url?: string
  isModified?: boolean
}

// Minimal subset for table display/forms
export type BerryInput = Omit<Berry, "id" | "flavors"> & {
  flavors?: BerryFlavor[]
}
