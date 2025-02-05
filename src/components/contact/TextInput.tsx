"use client";

import React, { memo, useContext } from "react";

import { Textarea } from "@/components/ui/textarea";
import { NonceContext } from "@/src/app/providers";
import { TextInputProps } from "@/interfaces/Contact";

export const TextInput = memo(function TextInput({
  fieldTarget,
  t,
  value,
  onChange,
}: TextInputProps) {
  const nonce = useContext(NonceContext);

  return (
    <Textarea
      required
      className="min-h-[80px]"
      id={fieldTarget}
      name={fieldTarget}
      nonce={nonce}
      placeholder={t(fieldTarget)}
      value={value}
      onChange={onChange}
    />
  );
});
