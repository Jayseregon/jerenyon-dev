"use client";

import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { motion } from "motion/react";
import React, { useContext } from "react";

import { NonceContext } from "@/src/app/providers";
import { CustomRadioGroupProps, CustomRadioProps } from "@/src/interfaces/Root";

export function CustomRadioGroup({
  value,
  onValueChange,
  children,
  className,
}: CustomRadioGroupProps) {
  const nonce = useContext(NonceContext);

  return (
    <RadixRadioGroup.Root
      className={`flex w-full ${className}`}
      nonce={nonce}
      value={value}
      onValueChange={onValueChange}
    >
      {children}
    </RadixRadioGroup.Root>
  );
}

export function CustomRadio({ value, label, className }: CustomRadioProps) {
  const nonce = useContext(NonceContext);

  return (
    <RadixRadioGroup.Item
      className={`flex-1 flex items-center justify-center cursor-pointer ${className}`}
      nonce={nonce}
      value={value}
    >
      <motion.div
        className="relative flex items-center justify-center w-full h-full"
        nonce={nonce}
        transition={{ type: "spring", stiffness: 300 }}
        whileTap={{ scale: 0.9 }}
      >
        <RadixRadioGroup.Indicator asChild nonce={nonce}>
          <motion.div
            layout
            className="absolute inset-0 flex items-center justify-center bg-purple-200 dark:bg-purple-950 shadow-sm shadow-purple-300 dark:shadow-[#2a0548] rounded-full"
            nonce={nonce}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {label}
          </motion.div>
        </RadixRadioGroup.Indicator>
        <span className="text-center" nonce={nonce}>
          {label}
        </span>
      </motion.div>
    </RadixRadioGroup.Item>
  );
}
