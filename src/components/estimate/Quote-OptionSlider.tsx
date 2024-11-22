"use client";

import React, { memo, useContext } from "react";

import { NonceContext } from "@/src/app/providers";
import { OptionSliderProps } from "@/interfaces/Quote";
import CustomSlider from "@/components/ui/CustomSlider";

export const OptionSlider = memo(function OptionSlider({
  label,
  id,
  settings,
  value,
  onChange,
}: OptionSliderProps) {
  const nonce = useContext(NonceContext);

  return (
    <div className="space-y-1">
      <label
        className="block font-medium text-start"
        htmlFor={id}
        nonce={nonce}
      >
        {label}
      </label>
      <CustomSlider
        aria-label={id}
        id={id}
        maxValue={settings.maxValue}
        minValue={settings.minValue}
        step={settings.step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
});
