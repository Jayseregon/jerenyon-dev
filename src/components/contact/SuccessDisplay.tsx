"use client";

import React, { useContext } from "react";

import { NonceContext } from "@/src/app/providers";
import { EmailSuccessIcon } from "@/components/icons";
import { SuccessDisplayProps } from "@/interfaces/Contact";

export const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ t }) => {
  const nonce = useContext(NonceContext);

  return (
    <div className="max-w-fit mx-auto p-4" nonce={nonce}>
      <EmailSuccessIcon size={65} />
      <div
        className="p-4 mb-4 grid grid-cols-1 gap-4 rounded-lg bg-emerald-200 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-200"
        nonce={nonce}
        role="alert"
      >
        <p className="font-medium" nonce={nonce}>
          {t("success")}
        </p>
      </div>
    </div>
  );
};
