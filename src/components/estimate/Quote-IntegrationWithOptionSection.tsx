"use client";
import React, { memo, useMemo } from "react";
import { useTranslations } from "next-intl";
import { SquarePlus } from "lucide-react";
import { Button } from "@nextui-org/react";

import { IntegrationWithOptionSectionProps } from "@/interfaces/Quote";

import { CardSection } from "./Quote-CardSection";
import { FieldInput } from "./Quote-Inputs";
import { QuoteSwitch } from "./Quote-Switch"; // Import QuoteSwitch

// IntegrationWithOptionSection Component
export const IntegrationWithOptionSection = memo(
  function IntegrationWithOptionSection({
    header,
    items,
    customItems,
    customField,
    customValue,
    handleIntegrationChange,
    handleCustomIntegrationChange,
    handleRemoveCustomIntegration,
    handleCustomValueChange,
  }: IntegrationWithOptionSectionProps) {
    const t = useTranslations("estimate");

    const predefinedItems = useMemo(() => {
      const customItemNames = new Set(customItems.map((item) => item.name));

      return items.map(({ name, price, label, subLabel, sup }) => ({
        name,
        price,
        label,
        isChecked: customItemNames.has(name),
        subLabel,
        sup,
      }));
    }, [items, customItems]);

    const customOnlyItems = useMemo(() => {
      const predefinedNames = new Set(items.map((item) => item.name));

      return customItems.filter((item) => !predefinedNames.has(item.name));
    }, [items, customItems]);

    return (
      <CardSection
        body={
          <>
            {/* Predefined Items */}
            {predefinedItems.map(
              ({ name, price, label, isChecked, subLabel, sup }) => (
                <QuoteSwitch
                  key={name}
                  ariaLabel={`${name} Integration`}
                  isOn={isChecked}
                  label={
                    <span className="inline-flex items-center gap-1">
                      {label}
                      {sup && <sup>{sup}</sup>}

                      {subLabel && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {subLabel}
                        </span>
                      )}
                    </span>
                  }
                  onToggle={() =>
                    handleIntegrationChange(name, price, !isChecked)
                  }
                />
              ),
            )}
            {/* Custom Items */}
            {customOnlyItems.map(({ name }) => (
              <QuoteSwitch
                key={name}
                ariaLabel={`${name} Custom Integration`}
                isOn={true} // Always on by default
                label={name}
                onToggle={() => handleRemoveCustomIntegration(name)}
              />
            ))}
            {/* Input Custom Item */}
            <div className="flex flex-row gap-2">
              <FieldInput
                aria-label={`Custom ${header} Name`}
                fieldTarget={customField}
                t={t}
                type="text"
                value={customValue}
                variance="underline"
                onChange={(e) => handleCustomValueChange(e.target.value)}
              />
              <div className="h-full content-end">
                <Button
                  isIconOnly
                  aria-label={`Add Custom ${header}`}
                  color="primary"
                  radius="sm"
                  variant="light"
                  onClick={handleCustomIntegrationChange}
                >
                  <SquarePlus />
                </Button>
              </div>
            </div>
          </>
        }
        header={header}
      />
    );
  },
);
