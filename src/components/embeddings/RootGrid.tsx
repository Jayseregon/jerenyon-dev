"use client";

import React, { useEffect, useState } from "react";
import * as d3 from "d3";

export const RootGrid = () => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { width, height } = dimensions;
  const navbarHeight = 45; // constant navbar height
  const adjustedHeight = height - navbarHeight;
  const margin = 20; // no margin in any screen size
  const xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([margin, width - margin]);
  const yScale = d3
    .scaleLinear()
    .domain([0, 1.1])
    .range([margin, adjustedHeight - margin]);
  const verticalTicks = d3.ticks(0, 1, 10);
  const horizontalTicks = d3.ticks(0, 1, 10);

  return (
    <svg
      className="w-full h-full absolute top-0 left-0 pointer-events-none"
      height={adjustedHeight}
      viewBox={`0 0 ${width} ${adjustedHeight}`}
      width={width}
    >
      {/* Changed opacity and colors for better visibility */}
      <g className="text-neutral-800 dark:text-neutral-300">
        {verticalTicks.map((tick) => (
          <g key={`v-${tick}`}>
            <line
              opacity={0.5}
              stroke="currentColor"
              strokeDasharray="2,5"
              strokeWidth={0.8}
              x1={xScale(tick)}
              x2={xScale(tick)}
              y1={margin}
              y2={adjustedHeight - margin}
            />
            <text
              className="fill-current text-xs"
              textAnchor="middle"
              x={xScale(tick)}
              y={adjustedHeight - 5}
            >
              {tick.toFixed(1)}
            </text>
          </g>
        ))}
        {horizontalTicks.map((tick) => (
          <g key={`h-${tick}`}>
            <line
              opacity={0.5}
              stroke="currentColor"
              strokeDasharray="2,5"
              strokeWidth={0.8}
              // Updated to extend lines into the margins:
              x1={0}
              x2={width}
              y1={yScale(tick)}
              y2={yScale(tick)}
            />
            <text
              alignmentBaseline="middle"
              className="fill-current text-xs"
              textAnchor="end"
              x={20}
              y={yScale(tick)}
            >
              {tick.toFixed(1)}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};
