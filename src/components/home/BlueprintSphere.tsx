"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { NonceContext } from "@/src/app/providers";

export const BlueprintSphere = () => {
  const [isVisible, setIsVisible] = useState(false);
  const nonce = useContext(NonceContext);

  // Adjust animation timing to match PageTitles component
  useEffect(() => {
    // Immediately start animations to match titles
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full">
      {/* Blueprint-style visualization with improved mobile responsiveness */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        viewBox="50 -30 700 670" /* Expanded viewBox to show W and E indicators */
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Basic grid - render immediately */}
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

        {/* Grid backdrop - render immediately */}
        <rect fill="url(#grid)" height="600" width="700" x="50" y="0" />

        {/* Core circles without animations initially */}
        <circle
          cx="400"
          cy="300"
          fill="none"
          r="300"
          stroke="rgba(100,181,246,0.5)"
          strokeWidth="1"
        />

        {/* Enhanced elements that only animate after main content loaded */}
        {isVisible && (
          <>
            <motion.circle
              animate={{ opacity: 1 }}
              cx="400"
              cy="300"
              fill="none"
              initial={{ opacity: 0 }}
              r="240"
              stroke="rgba(100,181,246,0.4)"
              strokeDasharray="5,3"
              strokeWidth="0.8"
              transition={{ duration: 0.5 }}
            />
            <motion.circle
              animate={{ opacity: 1 }}
              cx="400"
              cy="300"
              fill="none"
              initial={{ opacity: 0 }}
              r="210"
              stroke="rgba(100,181,246,0.35)"
              strokeDasharray="2,4"
              strokeWidth="0.8"
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            <motion.circle
              animate={{ opacity: 1 }}
              cx="400"
              cy="300"
              fill="none"
              initial={{ opacity: 0 }}
              r="120"
              stroke="rgba(100,181,246,0.3)"
              strokeDasharray="3,5"
              strokeWidth="0.8"
              transition={{ duration: 0.5, delay: 0.2 }}
            />

            {/* Technical measurement lines - defer */}
            <motion.g
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
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
                x1="50" /* Adjusted from 100 to 50 */
                x2="750" /* Adjusted from 700 to 750 */
                y1="300"
                y2="300"
              />
            </motion.g>

            {/* Defer all decorative elements */}
            <motion.g
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Additional measurement details - adjusted positions */}
              <path
                d="M 400 -15 L 405 -5 L 395 -5 Z"
                fill="rgba(100,181,246,0.5)"
              />
              <path
                d="M 400 615 L 405 605 L 395 605 Z"
                fill="rgba(100,181,246,0.5)"
              />
              <path
                d="M 65 300 L 75 305 L 75 295 Z"
                fill="rgba(100,181,246,0.5)"
              />
              <path
                d="M 735 300 L 725 305 L 725 295 Z"
                fill="rgba(100,181,246,0.5)"
              />

              {/* Coordinate markings - adjusted positions */}
              <g className="coordinate-markings" opacity="0.8">
                <text
                  fill="rgba(100,181,246,0.8)"
                  fontSize="13"
                  textAnchor="middle"
                  x="400"
                  y="-20"
                >
                  N
                </text>
                <text
                  fill="rgba(100,181,246,0.8)"
                  fontSize="13"
                  textAnchor="middle"
                  x="400"
                  y="630"
                >
                  S
                </text>
                <text
                  fill="rgba(100,181,246,0.8)"
                  fontSize="13"
                  textAnchor="middle"
                  x="755"
                  y="302"
                >
                  E
                </text>
                <text
                  fill="rgba(100,181,246,0.8)"
                  fontSize="13"
                  textAnchor="middle"
                  x="45"
                  y="302"
                >
                  W
                </text>
              </g>

              {/* Blueprint annotations */}
              <g>
                <text fill="rgba(100,181,246,0.7)" fontSize="11" x="100" y="40">
                  Automation
                </text>
                <text
                  fill="rgba(100,181,246,0.7)"
                  fontSize="11"
                  textAnchor="middle"
                  x="400"
                  y="50"
                >
                  Generative AI
                </text>
                <text
                  fill="rgba(100,181,246,0.7)"
                  fontSize="11"
                  x="600"
                  y="130"
                >
                  <tspan dy="0" x="600">
                    Retrieval
                  </tspan>
                  <tspan dy="14" x="600">
                    Augmented
                  </tspan>
                  <tspan dy="14" x="600">
                    Generation
                  </tspan>
                </text>
                <text
                  fill="rgba(100,181,246,0.7)"
                  fontSize="11"
                  textAnchor="end"
                  x="180"
                  y="200"
                >
                  AI-Agents
                </text>
                <text
                  fill="rgba(100,181,246,0.7)"
                  fontSize="11"
                  textAnchor="middle"
                  x="400"
                  y="550"
                >
                  <tspan dy="0" x="400">
                    Geospatial
                  </tspan>
                  <tspan dy="14" x="400">
                    Intelligence
                  </tspan>
                </text>
                <text
                  fill="rgba(100,181,246,0.7)"
                  fontSize="11"
                  textAnchor="end"
                  x="200"
                  y="450"
                >
                  <tspan dy="0" x="200">
                    Spatial
                  </tspan>
                  <tspan dy="14" x="200">
                    Analysis
                  </tspan>
                </text>
                <text
                  fill="rgba(100,181,246,0.7)"
                  fontSize="11"
                  x="620"
                  y="410"
                >
                  <tspan dy="0" x="620">
                    Model
                  </tspan>
                  <tspan dy="14" x="620">
                    Context
                  </tspan>
                  <tspan dy="14" x="620">
                    Protocol
                  </tspan>
                </text>
              </g>
            </motion.g>
          </>
        )}
      </svg>

      {/* Center image with better performance and coordinated animation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <motion.div
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.95,
          }}
          className="w-full max-w-[300px]"
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: "easeOut",
          }}
        >
          <Image
            priority
            alt="Generative AI, Automation and Geospatial Intelligence intersection"
            className="object-contain z-10"
            fetchPriority="high"
            height={300}
            nonce={nonce}
            sizes="300px"
            src="https://jerenyon-dev-remote-pull.b-cdn.net/assets/earth-globe-night.webp"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              contentVisibility: "auto",
            }}
            width={300}
          />
        </motion.div>
      </div>
    </div>
  );
};
