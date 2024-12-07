"use client";

import React, { useContext } from "react";
import { motion } from "motion/react";

import { NonceContext } from "@/src/app/providers";

export default function SkeletonScene() {
  const nonce = useContext(NonceContext);

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-200 dark:bg-gray-800">
      <div
        className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded"
        nonce={nonce}
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
