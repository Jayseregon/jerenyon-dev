"use client";

import React, { memo, useContext } from "react";

import { Input } from "@/components/ui/input";
import { NonceContext } from "@/src/app/providers";
import { FieldInputProps } from "@/interfaces/Contact";

export const FieldInput = memo(function FieldInput({
  fieldTarget,
  t,
  type,
  value,
  onChange,
}: FieldInputProps) {
  const nonce = useContext(NonceContext);

  return (
    <Input
      required
      className="border-purple-800/50 dark:border-purple-300/50 hover:border-purple-800 hover:dark:border-purple-300 focus-visible:ring-purple-800 dark:focus-visible:ring-purple-300"
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
