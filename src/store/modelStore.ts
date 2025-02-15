import { create } from "zustand";

export type ModelType = "MiniLML6V2" | "MiniLML12V2" | "mpnetBaseV2";

interface ModelState {
  selectedModel: ModelType;
  setSelectedModel: (model: ModelType) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  selectedModel: "MiniLML6V2",
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
