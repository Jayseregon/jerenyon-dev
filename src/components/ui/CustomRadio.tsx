"use client";

import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { motion } from "motion/react";
import React, { useContext } from "react";

import { NonceContext } from "@/src/app/providers";

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
      className={`flex-1 relative cursor-pointer ${className}`}
      nonce={nonce}
      value={value}
    >
      <div className="w-full h-full">
        <motion.div
          transition={{ type: "spring", stiffness: 300 }}
          whileTap={{ scale: 0.95 }}
        >
          <RadixRadioGroup.Indicator className="absolute inset-0" nonce={nonce}>
            <div
              className="absolute inset-0 bg-purple-200 dark:bg-purple-950 shadow shadow-purple-300 dark:shadow-[#2a0548] rounded-full"
              nonce={nonce}
            />
          </RadixRadioGroup.Indicator>
          <div
            className="relative flex items-center justify-center w-full h-full py-0.5"
            nonce={nonce}
          >
            <span className="text-center" nonce={nonce}>
              {label}
            </span>
          </div>
        </motion.div>
      </div>
    </RadixRadioGroup.Item>
  );
}
