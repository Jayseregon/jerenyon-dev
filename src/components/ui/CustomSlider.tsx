"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import { motion } from "motion/react";
import React, { useRef, useContext } from "react";

import { NonceContext } from "@/src/app/providers";

interface CustomSliderProps {
  id: string;
  minValue: number;
  maxValue: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export default function CustomSlider({
  id,
  minValue,
  maxValue,
  step,
  value,
  onChange,
  className,
}: CustomSliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const nonce = useContext(NonceContext);

  const handleChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className={`relative w-full ${className}`} id={id} nonce={nonce}>
      <RadixSlider.Root
        ref={ref}
        className="relative flex w-full cursor-grab touch-none select-none items-center py-4 active:cursor-grabbing"
        max={maxValue}
        min={minValue}
        nonce={nonce}
        step={step}
        value={[value]}
        onValueChange={handleChange}
      >
        <RadixSlider.Track
          className="relative isolate h-2 w-full grow overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700"
          nonce={nonce}
        >
          <RadixSlider.Range
            asChild
            className="absolute h-full bg-purple-400 dark:bg-purple-300"
            nonce={nonce}
          >
            <motion.div
              animate={{
                width: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
              }}
              initial={{ width: 0 }}
              nonce={nonce}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </RadixSlider.Range>
        </RadixSlider.Track>
        <RadixSlider.Thumb asChild nonce={nonce}>
          <motion.div
            layout
            className="block size-5  bg-purple-700 border-2 border-background rounded-full"
            nonce={nonce}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </RadixSlider.Thumb>
      </RadixSlider.Root>
    </div>
  );
}
