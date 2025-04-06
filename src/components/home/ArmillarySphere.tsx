"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const ArmillarySphere = () => {
  return (
    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full">
      {/* Armillary Sphere Blueprint Visualization */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background grid pattern */}
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
              stroke="rgba(100,181,246,0.1)"
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
              stroke="rgba(100,181,246,0.2)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>

        {/* Subtle background grid */}
        <rect
          fill="url(#grid)"
          height="600"
          opacity="0.6"
          width="700"
          x="50"
          y="0"
        />

        {/* Outer celestial sphere */}
        <motion.circle
          animate={{ opacity: 1, scale: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0, scale: 0.95 }}
          r="280"
          stroke="rgba(100,181,246,0.5)"
          strokeWidth="1"
          transition={{ duration: 0.8, delay: 1.0 }}
        />

        {/* Ecliptic ring (angled) */}
        <motion.ellipse
          animate={{ opacity: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0 }}
          rx="280"
          ry="140"
          stroke="rgba(100,181,246,0.4)"
          strokeDasharray="5,3"
          strokeWidth="0.8"
          transition={{ duration: 0.8, delay: 1.2 }}
        />

        {/* Celestial equator (horizontal) */}
        <motion.circle
          animate={{ opacity: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0 }}
          r="220"
          stroke="rgba(100,181,246,0.45)"
          strokeWidth="1"
          transition={{ duration: 0.8, delay: 1.4 }}
        />

        {/* Vertical ring 1 - Prime Meridian */}
        <motion.ellipse
          animate={{ opacity: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0 }}
          rx="140"
          ry="280"
          stroke="rgba(100,181,246,0.4)"
          strokeDasharray="3,2"
          strokeWidth="0.8"
          transition={{ duration: 0.8, delay: 1.6 }}
        />

        {/* Diagonal ring 1 - 45° */}
        <motion.ellipse
          animate={{ opacity: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0 }}
          rx="250"
          ry="125"
          stroke="rgba(100,181,246,0.35)"
          strokeDasharray="4,3"
          strokeWidth="0.8"
          transform="rotate(45, 400, 300)"
          transition={{ duration: 0.8, delay: 1.8 }}
        />

        {/* Diagonal ring 2 - 135° */}
        <motion.ellipse
          animate={{ opacity: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0 }}
          rx="250"
          ry="125"
          stroke="rgba(100,181,246,0.35)"
          strokeDasharray="4,3"
          strokeWidth="0.8"
          transform="rotate(135, 400, 300)"
          transition={{ duration: 0.8, delay: 2.0 }}
        />

        {/* Inner rings */}
        <motion.circle
          animate={{ opacity: 1, scale: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0, scale: 0.9 }}
          r="160"
          stroke="rgba(100,181,246,0.3)"
          strokeDasharray="3,5"
          strokeWidth="0.8"
          transition={{ duration: 0.8, delay: 2.2 }}
        />

        <motion.circle
          animate={{ opacity: 1, scale: 1 }}
          cx="400"
          cy="300"
          fill="none"
          initial={{ opacity: 0, scale: 0.9 }}
          r="100"
          stroke="rgba(100,181,246,0.25)"
          strokeWidth="0.6"
          transition={{ duration: 0.8, delay: 2.4 }}
        />

        {/* Polar axis line */}
        <line
          stroke="rgba(100,181,246,0.5)"
          strokeDasharray="5,5"
          strokeWidth="0.8"
          x1="400"
          x2="400"
          y1="20"
          y2="580"
        />

        {/* Equatorial line */}
        <line
          stroke="rgba(100,181,246,0.5)"
          strokeDasharray="5,5"
          strokeWidth="0.8"
          x1="120"
          x2="680"
          y1="300"
          y2="300"
        />

        {/* Cardinal point markers */}
        <motion.g
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        >
          {/* North */}
          <path d="M 400 20 L 405 30 L 395 30 Z" fill="rgba(100,181,246,0.5)" />
          <text
            fill="rgba(100,181,246,0.8)"
            fontSize="12"
            textAnchor="middle"
            x="400"
            y="15"
          >
            N
          </text>

          {/* South */}
          <path
            d="M 400 580 L 405 570 L 395 570 Z"
            fill="rgba(100,181,246,0.5)"
          />
          <text
            fill="rgba(100,181,246,0.8)"
            fontSize="12"
            textAnchor="middle"
            x="400"
            y="595"
          >
            S
          </text>

          {/* East */}
          <path
            d="M 680 300 L 670 305 L 670 295 Z"
            fill="rgba(100,181,246,0.5)"
          />
          <text
            dominantBaseline="middle"
            fill="rgba(100,181,246,0.8)"
            fontSize="12"
            x="695"
            y="300"
          >
            E
          </text>

          {/* West */}
          <path
            d="M 120 300 L 130 305 L 130 295 Z"
            fill="rgba(100,181,246,0.5)"
          />
          <text
            dominantBaseline="middle"
            fill="rgba(100,181,246,0.8)"
            fontSize="12"
            textAnchor="middle"
            x="105"
            y="300"
          >
            W
          </text>
        </motion.g>

        {/* Central point */}
        <motion.circle
          animate={{ opacity: 1, scale: 1 }}
          cx="400"
          cy="300"
          fill="rgba(100,181,246,0.8)"
          initial={{ opacity: 0, scale: 0 }}
          r="4"
          transition={{ duration: 0.5, delay: 1.0 }}
        />
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
