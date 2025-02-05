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
