"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const BlueprintSphere = () => {
  return (
    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full">
      {/* Blueprint-style visualization with adjusted viewBox for mobile */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet" // Ensure proper scaling
        viewBox="100 -30 600 670" // Adjusted viewBox to focus on the central area
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Blueprint grid - fine lines, with limited area */}
        <defs>
          <pattern
            height="40"
            id="smallGrid"
            patternUnits="userSpaceOnUse"
            width="40"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(100,181,246,0.15)"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            height="200"
            id="grid"
            patternUnits="userSpaceOnUse"
            width="200"
          >
            <rect fill="url(#smallGrid)" height="200" width="200" />
            <path
              d="M 200 0 L 0 0 0 200"
              fill="none"
              stroke="rgba(100,181,246,0.3)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>

        {/* Expanded grid area to fit larger circle */}
        <rect fill="url(#grid)" height="600" width="600" x="100" y="0" />

        {/* Enhanced circular blueprint elements */}
        <motion.circle
          animate={{ opacity: 1, scale: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0, scale: 0.95 }}
          r="300"
          stroke="rgba(100,181,246,0.5)"
          strokeWidth="1"
          transition={{ duration: 0.6, delay: 1.0 }}
        />
        <motion.circle
          animate={{ opacity: 1, scale: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0, scale: 0.95 }}
          r="240"
          stroke="rgba(100,181,246,0.4)"
          strokeDasharray="5,3"
          strokeWidth="0.8"
          transition={{ duration: 0.6, delay: 1.2 }}
        />
        <motion.circle
          animate={{ opacity: 1, scale: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0, scale: 0.95 }}
          r="210"
          stroke="rgba(100,181,246,0.35)"
          strokeDasharray="2,4"
          strokeWidth="0.8"
          transition={{ duration: 0.6, delay: 1.4 }}
        />
        <motion.circle
          animate={{ opacity: 1, scale: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0, scale: 0.95 }}
          r="120"
          stroke="rgba(100,181,246,0.3)"
          strokeDasharray="3,5"
          strokeWidth="0.8"
          transition={{ duration: 0.6, delay: 1.6 }}
        />

        {/* Technical measurement lines */}
        <line
          stroke="rgba(100,181,246,0.5)"
          strokeDasharray="5,5"
          strokeWidth="0.8"
          x1="400"
          x2="400"
          y1="0"
          y2="600"
        />
        <line
          stroke="rgba(100,181,246,0.5)"
          strokeDasharray="5,5"
          strokeWidth="0.8"
          x1="100"
          x2="700"
          y1="300"
          y2="300"
        />

        {/* Additional measurement details */}
        <motion.path
          animate={{ opacity: 1 }}
          d="M 400 -15 L 405 -5 L 395 -5 Z"
          fill="rgba(100,181,246,0.5)"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 2.2 }}
        />
        <motion.path
          animate={{ opacity: 1 }}
          d="M 400 615 L 405 605 L 395 605 Z"
          fill="rgba(100,181,246,0.5)"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 2.2 }}
        />
        <motion.path
          animate={{ opacity: 1 }}
          d="M 85 300 L 95 305 L 95 295 Z"
          fill="rgba(100,181,246,0.5)"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 2.2 }}
        />
        <motion.path
          animate={{ opacity: 1 }}
          d="M 715 300 L 705 305 L 705 295 Z"
          fill="rgba(100,181,246,0.5)"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 2.2 }}
        />

        {/* Coordinate markings */}
        <motion.g
          animate={{ opacity: 0.8 }}
          className="coordinate-markings"
          initial={{ opacity: 0 }}
          opacity="0.8"
          transition={{ duration: 0.5, delay: 2.3 }}
        >
          <text
            fill="rgba(100,181,246,0.8)"
            fontSize="12"
            textAnchor="middle"
            x="400"
            y="-20"
          >
            N
          </text>
          <text
            fill="rgba(100,181,246,0.8)"
            fontSize="12"
            textAnchor="middle"
            x="400"
            y="630"
          >
            S
          </text>
          <text
            fill="rgba(100,181,246,0.8)"
            fontSize="12"
            textAnchor="middle"
            x="725"
            y="300"
          >
            E
          </text>
          <text
            fill="rgba(100,181,246,0.8)"
            fontSize="12"
            textAnchor="middle"
            x="75"
            y="300"
          >
            W
          </text>
        </motion.g>

        {/* Measurement annotations */}
        <motion.g
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2.4 }}
        >
          <text fill="rgba(100,181,246,0.6)" fontSize="10" x="410" y="120">
            300px
          </text>
          <text fill="rgba(100,181,246,0.6)" fontSize="10" x="410" y="180">
            240px
          </text>
          <text fill="rgba(100,181,246,0.6)" fontSize="10" x="410" y="240">
            210px
          </text>
          <text fill="rgba(100,181,246,0.6)" fontSize="10" x="410" y="280">
            120px
          </text>
        </motion.g>

        {/* W ←→ E label */}
        <motion.text
          animate={{ opacity: 1 }}
          fill="rgba(100,181,246,0.7)"
          fontSize="10"
          initial={{ opacity: 0 }}
          textAnchor="middle"
          transition={{ duration: 0.5, delay: 2.4 }}
          x="400"
          y="320"
        >
          W ←→ E
        </motion.text>
      </svg>

      {/* Center image with better responsive sizing */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-full max-w-[220px] xs:max-w-[240px] sm:max-w-[260px] md:max-w-[300px]">
          <Image
            priority
            alt="AI, Automation and Geospatial Intelligence intersection"
            className="object-contain z-10"
            height={300}
            sizes="(max-width: 479px) 220px, (max-width: 639px) 240px, (max-width: 767px) 260px, 300px"
            src="/assets/earth-globe-night.webp"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
            }}
            width={300}
            onError={(e) => {
              const target = e.target as HTMLImageElement;

              target.style.display = "none";
            }}
          />
        </div>
      </div>
    </div>
  );
};
