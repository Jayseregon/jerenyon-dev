"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import { motion } from "framer-motion";
import React, { useRef } from "react";

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

  const handleChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <RadixSlider.Root
        ref={ref}
        className="relative flex w-full cursor-grab touch-none select-none items-center py-4 active:cursor-grabbing"
        max={maxValue}
        min={minValue}
        step={step}
        value={[value]}
        onValueChange={handleChange}
      >
        <RadixSlider.Track className="relative isolate h-2 w-full grow overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700">
          <RadixSlider.Range
            asChild
            className="absolute h-full bg-purple-400 dark:bg-purple-300"
          >
            <motion.div
              animate={{
                width: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
              }}
              initial={{ width: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </RadixSlider.Range>
        </RadixSlider.Track>
        <RadixSlider.Thumb asChild>
          <motion.div
            layout
            className="block size-5  bg-purple-700 border-2 border-background rounded-full"
            transition={{ type: "spring", stiffness: 300 }}
          />
        </RadixSlider.Thumb>
      </RadixSlider.Root>
    </div>
  );
}
