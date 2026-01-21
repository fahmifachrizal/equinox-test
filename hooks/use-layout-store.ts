import { create } from "zustand"

interface LayoutState {
  isScrolled: boolean
  setIsScrolled: (isScrolled: boolean) => void
}

export const useLayoutStore = create<LayoutState>()((set) => ({
  isScrolled: false,
  setIsScrolled: (isScrolled) => set({ isScrolled }),
}))
