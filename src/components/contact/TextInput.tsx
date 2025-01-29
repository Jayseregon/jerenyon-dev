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
      className="border-purple-800/50 dark:border-purple-300/50 hover:border-purple-800 hover:dark:border-purple-300 focus-visible:ring-purple-800 dark:focus-visible:ring-purple-300 min-h-[80px]"
      id={fieldTarget}
      name={fieldTarget}
      nonce={nonce}
      placeholder={t(fieldTarget)}
      value={value}
      onChange={onChange}
    />
  );
});
