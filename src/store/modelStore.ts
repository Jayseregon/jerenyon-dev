import { create } from "zustand";

import { HighlightDefinition } from "@/interfaces/Embeddings";

export type ModelType = "MiniLML6V2" | "MiniLML12V2" | "mpnetBaseV2";

interface ModelState {
  selectedModel: ModelType;
  setSelectedModel: (model: ModelType) => void;
  hoveredDefinition: HighlightDefinition | null;
  setHoveredDefinition: (data: HighlightDefinition | null) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  selectedModel: "MiniLML6V2",
  setSelectedModel: (model) => set({ selectedModel: model }),
  hoveredDefinition: null,
  setHoveredDefinition: (data) => set({ hoveredDefinition: data }),
}));
