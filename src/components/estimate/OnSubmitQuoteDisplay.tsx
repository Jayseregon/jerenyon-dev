"use client";

import React, { useContext } from "react";

import { NonceContext } from "@/src/app/providers";
import { CloudslashIcon, ClipboardCheckedIcon } from "@/components/icons";
import { ErrorDisplayProps, SuccessDisplayProps } from "@/interfaces/Contact";

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ t }) => {
  const nonce = useContext(NonceContext);

  return (
    <div className="max-w-fit mx-auto p-4" nonce={nonce}>
      <CloudslashIcon size={65} />
      <div
        className="p-4 mb-4 grid grid-cols-1 gap-4 rounded-lg bg-rose-200 dark:bg-rose-800 text-rose-950 dark:text-rose-200"
        nonce={nonce}
        role="alert"
      >
        <p className="font-medium grid grid-cols-1 gap-1" nonce={nonce}>
          <span className="text-2xl" nonce={nonce}>
            {t("onSubmit.error.title")}
          </span>
          <span>{t("onSubmit.error.line1")}</span>
          <span>{t("onSubmit.error.line2")}</span>
        </p>
      </div>
    </div>
  );
};

export const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ t }) => {
  const nonce = useContext(NonceContext);

  return (
    <div className="max-w-fit mx-auto p-4" nonce={nonce}>
      <ClipboardCheckedIcon size={65} />
      <div
        className="p-4 mb-4 grid grid-cols-1 gap-4 rounded-lg bg-emerald-200 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-200"
        nonce={nonce}
        role="alert"
      >
        <p className="font-medium grid grid-cols-1 gap-1" nonce={nonce}>
          <span className="text-2xl" nonce={nonce}>
            {t("onSubmit.success.title")}
          </span>
          <span>{t("onSubmit.success.line1")}</span>
          <span>{t("onSubmit.success.line2")}</span>
        </p>
      </div>
    </div>
  );
};
