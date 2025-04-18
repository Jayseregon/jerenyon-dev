"use client";

import React, { useContext } from "react";
import { motion } from "motion/react";
import { CircleCheckBig } from "lucide-react";
import { useTranslations } from "next-intl";

import { NonceContext } from "@/src/app/providers";
import { preconfigWebApps } from "@/lib/getQuoteData";
import { PreconfigSectionProps } from "@/interfaces/Quote";
import { Badge } from "@/components/ui/badge";

import { CardSection } from "./Quote-CardSection";

export const PreconfigSection = ({
  selectedPreconfig,
  onPreconfigChange,
}: PreconfigSectionProps) => {
  const nonce = useContext(NonceContext);
  const t = useTranslations("estimate.quotingTool.preconfigs");

  // Define motion variants for the options
  const optionVariants = {
    selected: {
      scale: 1.01,
      transition: { type: "spring", stiffness: 300 },
    },
    unselected: {
      scale: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <CardSection
      titleOutside
      body={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" nonce={nonce}>
          {Object.entries(preconfigWebApps).map(([key, preconfig]) => {
            const isSelected = selectedPreconfig === key;

            return (
              <motion.div
                key={key}
                animate={isSelected ? "selected" : "unselected"}
                className={`p-4 cursor-pointer rounded-lg ${
                  isSelected
                    ? "bg-purple-200 dark:bg-purple-950 shadow-md shadow-purple-300 dark:shadow-[#2a0548]"
                    : "bg-background border border-gray-300 dark:border-gray-700"
                }`}
                nonce={nonce}
                variants={optionVariants}
                onClick={() => onPreconfigChange(key)}
              >
                <div className="flex items-center mb-2" nonce={nonce}>
                  <span
                    className="text-lg font-semibold text-foreground"
                    nonce={nonce}
                  >
                    {t(`${preconfig.label}.label`)}
                  </span>
                  {isSelected && (
                    <CircleCheckBig className="ml-2" color="#22c55e" />
                  )}
                </div>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t(`${preconfig.label}.description`)}
                  </p>
                  <div>
                    {JSON.parse(t(`${preconfig.label}.whoFor`)).map(
                      (keyword: string, idx: number) => (
                        <Badge key={idx} variant="chip">
                          {keyword}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      }
      bodyClassName="pt-4"
      header="Suggested Configuration"
    />
  );
};
