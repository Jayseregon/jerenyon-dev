"use client";

import React, { useContext } from "react";

import { NonceContext } from "@/src/app/providers";
import { EmailErrorIcon } from "@/components/icons";
import { ErrorDisplayProps } from "@/interfaces/Contact";

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ t }) => {
  const nonce = useContext(NonceContext);

  return (
    <div className="max-w-fit mx-auto p-4" nonce={nonce}>
      <EmailErrorIcon size={65} />
      <div
        className="p-4 mb-4 grid grid-cols-1 gap-4 rounded-lg bg-rose-200 dark:bg-rose-800 text-rose-950 dark:text-rose-200"
        nonce={nonce}
        role="alert"
      >
        <p className="font-medium grid grid-cols-1 gap-1" nonce={nonce}>
          <span className="text-2xl" nonce={nonce}>
            {t("error1")}
          </span>
          <span>{t("error2")}</span>
          <span>{t("error3")}</span>
        </p>
      </div>
    </div>
  );
};
