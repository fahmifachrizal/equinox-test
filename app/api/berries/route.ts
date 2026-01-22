import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const limit = parseInt(searchParams.get("limit") ?? "10")
  const offset = (page - 1) * limit

  try {
    // Fetch berries list with pagination
    const listResponse = await fetch(
      `https://pokeapi.co/api/v2/berry?offset=${offset}&limit=${limit}`,
    )
    const listData = await listResponse.json()

    // Fetch details for each berry to get interesting stats
    const berries = await Promise.all(
      listData.results.map(async (item: any) => {
        const detailRes = await fetch(item.url)
        const detail = await detailRes.json()

        return {
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
          url: item.url,
        }
      }),
    )

    return NextResponse.json({
      data: berries,
      meta: {
        total: listData.count,
        page,
        limit,
        pageCount: Math.ceil(listData.count / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching berries:", error)
    return NextResponse.json(
      { error: "Failed to fetch berries" },
      { status: 500 },
    )
  }
}
