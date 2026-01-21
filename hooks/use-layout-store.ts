import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LayoutType = 'fixed' | 'full'

interface LayoutState {
  layout: LayoutType
  setLayout: (layout: LayoutType) => void
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layout: 'fixed',
      setLayout: (layout) => set({ layout }),
    }),
    {
      name: 'layout-storage', 
    }
  )
)
