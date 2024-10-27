"use client";
import React, { memo, useMemo } from "react";

import { IntegrationNoOptionSectionProps } from "@/interfaces/Quote";

import { CardSection } from "./Quote-CardSection";
import { QuoteSwitch } from "./Quote-Switch";

// IntegrationNoOptionSection Component
export const IntegrationNoOptionSection = memo(
  function IntegrationNoOptionSection({
    header,
    items,
    customItems,
    handleIntegrationChange,
  }: IntegrationNoOptionSectionProps) {
    const customItemNames = useMemo(
      () => new Set(customItems.map((item) => item.name)),
      [customItems],
    );

    return (
      <CardSection
        body={
          <>
            {/* Predefined Items */}
            {items.map(({ name, price, label, subLabel, sup }) => (
              <QuoteSwitch
                key={name}
                ariaLabel={`${name} Integration`}
                isOn={customItemNames.has(name)}
                label={
                  <span>
                    {label}
                    {sup && <sup>{sup}</sup>}
                    {subLabel && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {" "}
                        {subLabel}
                      </span>
                    )}
                  </span>
                }
                onToggle={() =>
                  handleIntegrationChange(
                    name,
                    price,
                    !customItemNames.has(name),
                  )
                }
              />
            ))}
          </>
        }
        header={header}
      />
    );
  },
);
