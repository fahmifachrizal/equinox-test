import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Berry, BerryInput } from "@/types/berry"

interface BerriesState {
  berries: Berry[]
  total: number
  isLoaded: boolean
  hasHydrated: boolean
  setBerries: (berries: Berry[], total: number) => void
  addBerry: (berry: Berry) => void
  addNewBerry: (input: BerryInput) => Berry
  deleteBerry: (id: string) => boolean
  updateBerry: (id: string, updates: Partial<BerryInput>) => boolean
  getBerryById: (id: string) => Berry | undefined
  setHasHydrated: (state: boolean) => void
  resetStore: () => void
}

export const useBerriesStore = create<BerriesState>()(
  persist(
    (set, get) => ({
      berries: [],
      total: 0,
      isLoaded: false,
      hasHydrated: false,

      setBerries: (newBerries, total) => {
        const state = get()

        // 1. Separate custom berries
        const customBerries = state.berries.filter((b) =>
          b.id.toString().startsWith("custom-"),
        )

        // 2. Identify modified standard berries
        const modifiedBerries = new Map(
          state.berries
            .filter(
              (b) => !b.id.toString().startsWith("custom-") && b.isModified,
            )
            .map((b) => [b.id, b]),
        )

        // 3. Merge incoming API berries with local modifications
        const mergedBerries = newBerries.map((apiBerry) =>
          modifiedBerries.has(apiBerry.id)
            ? modifiedBerries.get(apiBerry.id)!
            : apiBerry,
        )

        set({
          berries: [...customBerries, ...mergedBerries],
          total: total + customBerries.length,
          isLoaded: true,
        })
      },

      setHasHydrated: (state) => set({ hasHydrated: state }),

      getBerryById: (id) => {
        return get().berries.find((b) => b.id === id)
      },

      addBerry: (berry) => {
        const existing = get().berries.find((b) => b.id === berry.id)
        if (!existing) {
          set((state) => ({
            berries: [...state.berries, berry],
            total: state.total + 1,
          }))
        }
      },

      addNewBerry: (input) => {
        const newBerry: Berry = {
          flavors: [], // Default empty array if not provided
          ...input,
          id: `custom-${Date.now()}`,
        }
        set((state) => ({
          berries: [newBerry, ...state.berries],
          total: state.total + 1,
          isLoaded: true,
        }))
        return newBerry
      },

      updateBerry: (id, updates) => {
        const existing = get().berries.find((b) => b.id === id)
        if (!existing) return false

        set((state) => ({
          berries: state.berries.map((b) =>
            b.id === id ? { ...b, ...updates, isModified: true } : b,
          ),
        }))
        return true
      },

      deleteBerry: (id) => {
        const existing = get().berries.find((b) => b.id === id)
        if (!existing) return false

        set((state) => ({
          berries: state.berries.filter((b) => b.id !== id),
          total: state.total - 1,
        }))
        return true
      },

      resetStore: () => {
        set({ berries: [], isLoaded: false })
      },
    }),
    {
      name: "equinox-berries-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
