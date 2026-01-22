import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id

  try {
    // Fetch detailed berry data from PokeAPI
    const res = await fetch(`https://pokeapi.co/api/v2/berry/${id}`)

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: "Berry not found" }, { status: 404 })
      }
      throw new Error("Failed to fetch berry")
    }

    const detail = await res.json()

    // Transform to our Berry type
    const berry = {
      id: detail.id.toString(),
      name: detail.name,
      growth_time: detail.growth_time,
      max_harvest: detail.max_harvest,
      firmness: detail.firmness.name,
      size: detail.size,
      smoothness: detail.smoothness,
      soil_dryness: detail.soil_dryness,
      flavors: detail.flavors,
      natural_gift_power: detail.natural_gift_power,
      natural_gift_type: detail.natural_gift_type.name,
    }

    return NextResponse.json(berry)
  } catch (error) {
    console.error(`Error fetching berry ${id}:`, error)
    return NextResponse.json(
      { error: "Failed to fetch berry" },
      { status: 500 },
    )
  }
}
