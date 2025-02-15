"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import * as d3 from "d3";

import embeddingsData from "@/public/assets/data/embeddings.json";

const EmbeddingMap = () => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

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
    .domain([0, 1])
    .range([margin, height - margin]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <svg height={height} style={{ background: "none" }} width={width}>
        {embeddingsData.keywords.map((d, i) => {
          const x = xScale(d.x);
          const y = yScale(d.y);

          return (
            <motion.g
              key={i}
              style={{ translateX: x, translateY: y }}
              whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
            >
              <circle cx={0} cy={0} fill="#3498db" r={5} />
              <text
                alignmentBaseline="middle"
                fill="#333"
                fontSize="10"
                x={8}
                y={0}
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

export default EmbeddingMap;
