"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import * as d3 from "d3";

import { useModelStore } from "@/src/store/modelStore";
import embeddingsDataMiniLML6V2 from "@/public/assets/data/embeddings_all-MiniLM-L6-v2.json";
import embeddingsDataMiniLML12V2 from "@/public/assets/data/embeddings_all-MiniLM-L12-v2.json";
import embeddingsDataMpnetBaseV2 from "@/public/assets/data/embeddings_all-mpnet-base-v2.json";

// Define types for the embedding data
interface Keyword {
  word: string;
  x: number;
  y: number;
}

interface EmbeddingData {
  keywords: Keyword[];
}

export const EmbeddingMap = () => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const selectedModel = useModelStore((state) => state.selectedModel);

  // Mapping model names to datasets
  const models: Record<typeof selectedModel, EmbeddingData> = {
    MiniLML6V2: embeddingsDataMiniLML6V2,
    MiniLML12V2: embeddingsDataMiniLML12V2,
    mpnetBaseV2: embeddingsDataMpnetBaseV2,
  };

  const currentData = models[selectedModel];

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const margin = 50;
  const { width, height } = dimensions;
  const xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([margin, width - margin]);
  const yScale = d3
    .scaleLinear()
    .domain([0, 1.1])
    .range([margin, height - margin]);

  return (
    <div className="relative w-full h-full">
      <svg className="w-full h-full" height={height} width={width}>
        {currentData.keywords.map((d: Keyword, i: number) => {
          const x = xScale(d.x);
          const y = yScale(d.y);

          return (
            <motion.g
              key={i}
              className="text-purple-800 dark:text-purple-300"
              style={{ translateX: x, translateY: y }}
              whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
            >
              <circle className="fill-current" cx={0} cy={0} r={3} />
              <text
                alignmentBaseline="middle"
                className="text-xs"
                fill="currentColor"
                opacity={0.5}
                textAnchor="middle"
                x={0}
                y={8}
              >
                {d.word}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};
