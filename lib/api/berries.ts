import { Berry } from "@/types/berry"

export const berriesApi = {
  getAll: async ({ page = 1, limit = 10 } = {}): Promise<{
    data: Berry[]
    meta: any
  }> => {
    const res = await fetch(`/api/berries?page=${page}&limit=${limit}`)
    if (!res.ok) throw new Error("Failed to fetch berries")
    return res.json()
  },
}
