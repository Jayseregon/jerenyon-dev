"use client";

import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { motion } from "framer-motion";
import React from "react";

interface CustomRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface CustomRadioProps {
  value: string;
  label: string;
  className?: string;
}

export function CustomRadioGroup({
  value,
  onValueChange,
  children,
  className,
}: CustomRadioGroupProps) {
  return (
    <RadixRadioGroup.Root
      className={`flex w-full ${className}`}
      value={value}
      onValueChange={onValueChange}
    >
      {children}
    </RadixRadioGroup.Root>
  );
}

export function CustomRadio({ value, label, className }: CustomRadioProps) {
  return (
    <RadixRadioGroup.Item
      className={`flex-1 flex items-center justify-center cursor-pointer ${className}`}
      value={value}
    >
      <motion.div
        className="relative flex items-center justify-center w-full h-full"
        transition={{ type: "spring", stiffness: 300 }}
        whileTap={{ scale: 0.9 }}
      >
        <RadixRadioGroup.Indicator asChild>
          <motion.div
            layout
            className="absolute inset-0 flex items-center justify-center bg-purple-200 dark:bg-purple-950 shadow shadow-purple-300 dark:shadow-[#2a0548] rounded-full"
            transition={{ type: "spring", stiffness: 300 }}
          >
            {label}
          </motion.div>
        </RadixRadioGroup.Indicator>
        <span className="text-center">{label}</span>
      </motion.div>
    </RadixRadioGroup.Item>
  );
}
