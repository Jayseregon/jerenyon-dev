"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import * as d3 from "d3";

import { useModelStore } from "@/src/store/modelStore";
import embeddingsDataMiniLML6V2 from "@/public/assets/data/embeddings_all-MiniLM-L6-v2.json";
import embeddingsDataMiniLML12V2 from "@/public/assets/data/embeddings_all-MiniLM-L12-v2.json";
import embeddingsDataMpnetBaseV2 from "@/public/assets/data/embeddings_all-mpnet-base-v2.json";
import { EmbeddingData, Keyword } from "@/src/interfaces/Embeddings";
import {
  highlightWords,
  highlightDefinitions,
} from "@/src/components/embeddings/getHighlightsData";

export const EmbeddingMap = () => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const selectedModel = useModelStore((state) => state.selectedModel);
  const hoveredDefinitionVal = useModelStore(
    (state) => state.hoveredDefinition,
  );
  const setHoveredDefinition = useModelStore(
    (state) => state.setHoveredDefinition,
  );
  const setHoveredCoordinates = useModelStore(
    (state) => state.setHoveredCoordinates,
  );

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

  const { width, height } = dimensions;
  const margin = 0; // width < 768 ? 0 : 50; // updated conditional margin
  const xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([margin, width - margin]);
  const yScale = d3
    .scaleLinear()
    .domain([0, 1.1])
    .range([margin, height - margin]);

  // Determine mobile condition (example: under 768px width)
  const isMobile = width < 768;
  // Create filtered keywords: on mobile, reduce dataset by factor of 2 but always keep highlightWords.
  const filteredKeywords = isMobile
    ? currentData.keywords.filter(
        (kw, idx) => highlightWords.has(kw.word) || idx % 2 === 0,
      )
    : currentData.keywords;

  return (
    <div className="relative w-full h-full">
      <svg className="w-full h-full" height={height} width={width}>
        {filteredKeywords.map((d: Keyword, i: number) => {
          const x = xScale(d.x);
          const y = yScale(d.y);
          const isHighlighted = highlightWords.has(d.word);

          return (
            <motion.g
              key={i}
              className="text-purple-800 dark:text-purple-300"
              style={{ translateX: x, translateY: y }}
              whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
              whileTap={
                isMobile
                  ? { scale: 1.3, transition: { duration: 0.2 } }
                  : undefined
              }
              onClick={() => {
                if (isMobile && isHighlighted) {
                  if (hoveredDefinitionVal === highlightDefinitions[d.word]) {
                    setHoveredDefinition(null);
                    setHoveredCoordinates(null);
                  } else {
                    setHoveredDefinition(highlightDefinitions[d.word]);
                    setHoveredCoordinates({ x, y });
                  }
                }
              }}
              onMouseEnter={() => {
                if (isHighlighted) {
                  setHoveredDefinition(highlightDefinitions[d.word]);
                  setHoveredCoordinates({ x, y });
                }
              }}
              onMouseLeave={() => {
                if (isHighlighted) {
                  setHoveredDefinition(null);
                  setHoveredCoordinates(null);
                }
              }}
            >
              <circle
                cx={0}
                cy={0}
                fill={isHighlighted ? "#e11d48" : "currentColor"}
                r={3}
              />
              <text
                alignmentBaseline="middle"
                className="text-xs"
                fill={isHighlighted ? "#e11d48" : "currentColor"}
                opacity={0.8}
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
