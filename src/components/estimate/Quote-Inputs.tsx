"use client";

import React, { memo, useContext } from "react";

import { NonceContext } from "@/src/app/providers";
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
}: FieldInputProps) {
  const nonce = useContext(NonceContext);

  return (
    <input
      required
      className={`mt-1 block ${width} ${height} border-b-2 border-purple-800 dark:border-purple-300 bg-background text-foreground py-2 px-3 focus:outline-none focus:ring-primary-400 focus:border-primary-400`}
      id={fieldTarget}
      name={fieldTarget}
      nonce={nonce}
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
}: TextInputProps) {
  const nonce = useContext(NonceContext);

  return (
    <textarea
      required
      className={`mt-1 block ${width} ${height} border-b-2 border-purple-800 dark:border-purple-300 bg-background text-foreground  py-2 px-3 focus:outline-none focus:ring-primary-400 focus:border-primary-400`}
      id={fieldTarget}
      name={fieldTarget}
      nonce={nonce}
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
