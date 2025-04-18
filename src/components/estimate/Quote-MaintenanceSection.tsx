"use client";
import React, { useMemo, useContext } from "react";
import { Circle, CircleCheck, CircleCheckBig } from "lucide-react";
import { motion } from "motion/react";

import { NonceContext } from "@/src/app/providers";
import { MaintenanceSectionProps } from "@/interfaces/Quote";
import {
  CustomRadioGroup,
  CustomRadio,
} from "@/src/components/root/CustomRadio";

import { CardSection } from "./Quote-CardSection";
import { OptionSlider } from "./Quote-OptionSlider";

export const MaintenanceSection = ({
  quote,
  handleTypeChange,
  handleDurationChange,
  handlePlanOptionChange,
}: MaintenanceSectionProps) => {
  const nonce = useContext(NonceContext);
  const { maintenancePlan } = quote;
  const { type, duration } = maintenancePlan;

  const planDurationLabel = useMemo(() => {
    const unit = type === "Monthly" ? "Month" : "Year";
    const plural = duration > 1 ? `${unit}s` : unit;

    return `${duration} ${plural}`;
  }, [type, duration]);

  const planOptionValue = useMemo(() => {
    return maintenancePlan.featureEnhancement && maintenancePlan.prioritySupport
      ? "advanced"
      : "regular";
  }, [maintenancePlan]);

  const regularPlanOptions = [
    "Regular Updates",
    "Security Updates",
    "Minor Bug Fixes",
  ];

  const advancedPlanOptions = ["Feature Enhancement", "Priority Support"];

  const handlePlanClick = (plan: "regular" | "advanced") => {
    handlePlanOptionChange(plan);
  };

  // Define motion variants for the plans
  const planVariants = {
    selected: {
      scale: 1.03,
      transition: { type: "spring", stiffness: 300 },
    },
    unselected: {
      scale: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <CardSection
      body={
        <>
          {/* Plan Type Selection */}
          <CustomRadioGroup
            className="flex space-x-2"
            value={type}
            onValueChange={handleTypeChange}
          >
            <CustomRadio label="Monthly" value="Monthly" />
            <CustomRadio label="Yearly" value="Yearly" />
            <CustomRadio label="None" value="none" />
          </CustomRadioGroup>

          {type !== "none" && (
            <>
              {/* Duration Slider */}
              <OptionSlider
                id="maintenance-duration-slider"
                label={planDurationLabel}
                settings={{
                  minValue: 1,
                  maxValue: type === "Monthly" ? 12 : 3,
                  step: 1,
                }}
                value={duration}
                onChange={handleDurationChange}
              />

              {/* Plan Options */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                nonce={nonce}
              >
                {/* Regular Plan */}
                <motion.div
                  animate={
                    planOptionValue === "regular" ? "selected" : "unselected"
                  }
                  className={`flex-1 p-4 cursor-pointer rounded-lg max-w-xs ${
                    planOptionValue === "regular"
                      ? "bg-purple-200 dark:bg-purple-950 shadow-md shadow-purple-300 dark:shadow-[#2a0548]"
                      : "bg-background border border-gray-300 dark:border-gray-700"
                  }`}
                  nonce={nonce}
                  variants={planVariants}
                  onClick={() => handlePlanClick("regular")}
                >
                  <div className="flex items-center mb-4" nonce={nonce}>
                    <span
                      className="text-lg font-semibold text-foreground"
                      nonce={nonce}
                    >
                      Regular Plan
                    </span>
                    {planOptionValue === "regular" && (
                      <CircleCheckBig className="ml-2" color="#22c55e" />
                    )}
                  </div>
                  <ul className="space-y-2" nonce={nonce}>
                    {regularPlanOptions.map((label) => (
                      <li
                        key={label}
                        className="flex items-center"
                        nonce={nonce}
                      >
                        {planOptionValue === "regular" ? (
                          <CircleCheck className="mr-2" color="#22c55e" />
                        ) : (
                          <Circle className="mr-2" color="#9ca3af" />
                        )}
                        <span className="text-foreground" nonce={nonce}>
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Advanced Plan */}
                <motion.div
                  animate={
                    planOptionValue === "advanced" ? "selected" : "unselected"
                  }
                  className={`flex-1 p-4 cursor-pointer rounded-lg max-w-xs ${
                    planOptionValue === "advanced"
                      ? "bg-purple-200 dark:bg-purple-950 shadow-md shadow-purple-300 dark:shadow-[#2a0548]"
                      : "bg-background border border-gray-300 dark:border-gray-700"
                  }`}
                  nonce={nonce}
                  variants={planVariants}
                  onClick={() => handlePlanClick("advanced")}
                >
                  <div className="flex items-center mb-4" nonce={nonce}>
                    <span
                      className="text-lg font-semibold text-foreground"
                      nonce={nonce}
                    >
                      Advanced Plan
                    </span>
                    {planOptionValue === "advanced" && (
                      <CircleCheckBig className="ml-2" color="#22c55e" />
                    )}
                  </div>
                  <p className="mb-2 text-foreground break-words" nonce={nonce}>
                    Includes all features from Regular Plan, plus:
                  </p>

                  <ul className="space-y-2" nonce={nonce}>
                    {advancedPlanOptions.map((label) => (
                      <li
                        key={label}
                        className="flex items-center"
                        nonce={nonce}
                      >
                        {planOptionValue === "advanced" ? (
                          <CircleCheck className="mr-2" color="#22c55e" />
                        ) : (
                          <Circle className="mr-2" color="#9ca3af" />
                        )}
                        <span className="text-foreground" nonce={nonce}>
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </>
          )}
        </>
      }
      bodyClassName="space-y-6"
      header="Maintenance Plan"
    />
  );
};
