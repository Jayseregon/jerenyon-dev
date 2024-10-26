"use client";
import React, { memo } from "react";

import {
  FieldInputProps,
  QuoteOptionSliderProps,
  TextInputProps,
} from "@/interfaces/Quote";
import CustomSlider from "@/components/ui/CustomSlider";

// FieldInput Component
export const FieldInput = memo(function FieldInput({
  fieldTarget,
  t,
  type,
  value,
  onChange,
  width = "w-full",
  height = "h-10",
  radius = "rounded-md",
  variance = "border",
}: FieldInputProps) {
  const baseClasses = `mt-1 block ${width} ${height} bg-background text-foreground py-2 px-3 focus:outline-none focus:ring-primary-400 focus:border-primary-400`;
  const borderClasses = `${radius} border border-purple-800 dark:border-purple-300`;
  const noBorderClasses =
    "border-0 border-b-2 border-purple-800 dark:border-purple-300";

  return (
    <input
      required
      className={`${baseClasses} ${variance === "border" ? borderClasses : noBorderClasses}`}
      id={fieldTarget}
      name={fieldTarget}
      placeholder={t(fieldTarget)}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
});

// TextInput Component
export const TextInput = memo(function TextInput({
  fieldTarget,
  t,
  value,
  onChange,
  width = "w-full",
  height = "h-16",
  radius = "rounded-md",
  variance = "border",
}: TextInputProps) {
  const baseClasses = `mt-1 block ${width} ${height} bg-background text-foreground  py-2 px-3 focus:outline-none focus:ring-primary-400 focus:border-primary-400`;
  const borderClasses = `${radius} border border-purple-800 dark:border-purple-300`;
  const noBorderClasses =
    "border-0 border-b-2 border-purple-800 dark:border-purple-300";

  return (
    <textarea
      required
      className={`${baseClasses} ${variance === "border" ? borderClasses : noBorderClasses}`}
      id={fieldTarget}
      name={fieldTarget}
      placeholder={t(fieldTarget)}
      value={value}
      onChange={onChange}
    />
  );
});

// QuoteOptionSlider Component
export const QuoteOptionSlider = memo(function QuoteOptionSlider({
  label,
  id,
  settings,
  value,
  onChange,
}: QuoteOptionSliderProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-start" htmlFor={id}>
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
