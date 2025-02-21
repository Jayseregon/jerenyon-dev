"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useModelStore } from "@/src/store/modelStore";

export const ModelSwitcher = () => {
  const selectedModel = useModelStore((state) => state.selectedModel);
  const setSelectedModel = useModelStore((state) => state.setSelectedModel);

  return (
    <Select
      value={selectedModel}
      onValueChange={(value: "MiniLML6V2" | "MiniLML12V2" | "mpnetBaseV2") =>
        setSelectedModel(value)
      }
    >
      <SelectTrigger
        className="w-[120px] sm:w-[140px] bg-white dark:bg-black text-black dark:text-white text-xs sm:text-sm"
        size="sm"
      >
        <SelectValue placeholder="Select model" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className="text-xs sm:text-sm whitespace-normal"
          value="MiniLML6V2"
        >
          all-MiniLM-L6-v2
        </SelectItem>
        <SelectItem
          className="text-xs sm:text-sm whitespace-normal"
          value="MiniLML12V2"
        >
          all-MiniLM-L12-v2
        </SelectItem>
        <SelectItem
          className="text-xs sm:text-sm whitespace-normal"
          value="mpnetBaseV2"
        >
          all-mpnet-base-v2
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
