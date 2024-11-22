"use client";

import React, { memo, useContext } from "react";
import { Input, Textarea } from "@nextui-org/react";

import { NonceContext } from "@/src/app/providers";
import { EmailErrorIcon, EmailSuccessIcon } from "@/components/icons";
import {
  ErrorDisplayProps,
  FieldInputProps,
  HoneypotProps,
  SuccessDisplayProps,
  TextInputProps,
} from "@/interfaces/Contact";

// FieldInput Component
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
      isRequired
      classNames={{
        inputWrapper:
          "border-purple-800/50 dark:border-purple-300/50 hover:!border-purple-800 hover:dark:!border-purple-300",
      }}
      id={fieldTarget}
      name={fieldTarget}
      nonce={nonce}
      placeholder={t(fieldTarget)}
      type={type}
      value={value}
      variant="underlined"
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
}: TextInputProps) {
  const nonce = useContext(NonceContext);

  return (
    <Textarea
      isRequired
      classNames={{
        inputWrapper:
          "border-purple-800/50 dark:border-purple-300/50 hover:!border-purple-800 hover:dark:!border-purple-300",
      }}
      id={fieldTarget}
      maxRows={4}
      minRows={2}
      name={fieldTarget}
      nonce={nonce}
      placeholder={t(fieldTarget)}
      value={value}
      variant="underlined"
      onChange={onChange}
    />
  );
});

export const HoneypotField = ({ t, value, onChange }: HoneypotProps) => {
  const nonce = useContext(NonceContext);

  return (
    <div className="hidden">
      <label
        className="block text-sm font-medium text-start"
        htmlFor="honeypot"
      >
        {t("honeypot")}
      </label>
      <input
        className="mt-1 block w-full bg-white text-black border border-purple-800 dark:border-purple-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-400 focus:border-primary-400"
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

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ t }) => {
  const nonce = useContext(NonceContext);

  return (
    <div className="max-w-fit mx-auto p-4" nonce={nonce}>
      <EmailErrorIcon size={65} />
      <div
        className="p-4 mb-4 grid grid-cols-1 gap-4 text-danger-700 bg-danger-100 rounded-lg dark:bg-danger-200 dark:text-danger-800"
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

export const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ t }) => {
  const nonce = useContext(NonceContext);

  return (
    <div className="max-w-fit mx-auto p-4" nonce={nonce}>
      <EmailSuccessIcon size={65} />
      <div
        className="p-4 mb-4 grid grid-cols-1 gap-4 text-success-700 bg-success-100 rounded-lg dark:bg-success-200 dark:text-success-800"
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
