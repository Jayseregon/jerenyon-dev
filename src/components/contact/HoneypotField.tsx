"use client";

import React, { useContext } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NonceContext } from "@/src/app/providers";
import { HoneypotProps } from "@/interfaces/Contact";

export const HoneypotField = ({ t, value, onChange }: HoneypotProps) => {
  const nonce = useContext(NonceContext);

  return (
    <div className="hidden">
      <Label htmlFor="honeypot">{t("honeypot")}</Label>
      <Input
        className="mt-1"
        id="honeypot"
        name="honeypot"
        nonce={nonce}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
