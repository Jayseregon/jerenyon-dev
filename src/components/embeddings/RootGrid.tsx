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
  const verticalTicks = d3.ticks(0, 1, 10);
  const horizontalTicks = d3.ticks(0, 1, 10);

  return (
    <svg
      className="w-full h-full absolute top-0 left-0 pointer-events-none"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      {/* Changed opacity and colors for better visibility */}
      <g className="text-purple-800/50 dark:text-purple-300/50">
        {verticalTicks.map((tick) => (
          <g key={`v-${tick}`}>
            <line
              stroke="currentColor"
              strokeDasharray="4,4"
              strokeWidth={0.5}
              x1={xScale(tick)}
              x2={xScale(tick)}
              y1={margin}
              y2={height - margin}
            />
            <text
              className="fill-current text-xs"
              textAnchor="middle"
              x={xScale(tick)}
              y={height - margin + 20}
            >
              {tick.toFixed(1)}
            </text>
          </g>
        ))}
        {horizontalTicks.map((tick) => (
          <g key={`h-${tick}`}>
            <line
              stroke="currentColor"
              strokeDasharray="4,4"
              strokeWidth={0.5}
              x1={margin}
              x2={width - margin}
              y1={yScale(tick)}
              y2={yScale(tick)}
            />
            <text
              alignmentBaseline="middle"
              className="fill-current text-xs"
              textAnchor="end"
              x={margin - 10}
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
