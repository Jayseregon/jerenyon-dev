import { create } from "zustand";

interface UIState {
  showCollapsedMenu: boolean;
  setShowCollapsedMenu: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  showCollapsedMenu: false,
  setShowCollapsedMenu: (value) => set({ showCollapsedMenu: value }),
}));
