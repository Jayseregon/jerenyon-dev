"use client";
import React, { memo, useMemo } from "react";
// import { useTranslations } from "next-intl";

import { QuoteSectionProps } from "@/interfaces/Quote";

import { CardSection } from "./Quote-CardSection";
import { OptionSlider } from "./Quote-OptionSlider";

// BaseStructureSection Component
export const BaseStructureSection = memo(function BaseStructureSection({
  quote,
  handleInputChange,
}: QuoteSectionProps) {
  // const t = useTranslations("estimate");

  const staticPagesSettings = useMemo(
    () => ({ minValue: 0, maxValue: 20, step: 1 }),
    [],
  );
  const dynamicPagesSettings = useMemo(
    () => ({ minValue: 0, maxValue: 20, step: 1 }),
    [],
  );

  const staticPagesLabel = useMemo(
    () => `${quote.staticPages.selectedPages} Static Pages`,
    [quote.staticPages.selectedPages],
  );
  const dynamicPagesLabel = useMemo(
    () => `${quote.dynamicPages.selectedPages} Dynamic Pages`,
    [quote.dynamicPages.selectedPages],
  );

  return (
    <CardSection
      body={
        <div className="grid grid-cols-2 gap-5">
          <OptionSlider
            id="static-pages-slider"
            label={staticPagesLabel}
            settings={staticPagesSettings}
            value={quote.staticPages.selectedPages}
            onChange={(value) =>
              handleInputChange("staticPages", {
                ...quote.staticPages,
                selectedPages: value as number,
              })
            }
          />
          <OptionSlider
            id="dynamic-pages-slider"
            label={dynamicPagesLabel}
            settings={dynamicPagesSettings}
            value={quote.dynamicPages.selectedPages}
            onChange={(value) =>
              handleInputChange("dynamicPages", {
                ...quote.dynamicPages,
                selectedPages: value as number,
              })
            }
          />
        </div>
      }
      header="Base Structure"
    />
  );
});
