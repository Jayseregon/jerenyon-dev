"use client";
import React, { memo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";
import ReCAPTCHA from "react-google-recaptcha";

import { ClientSubmitProps } from "@/interfaces/Quote";

import { FieldInput, TextInput } from "./Quote-Inputs";

// Client info and submit quote
export const ClientSubmit = memo(function ClientSubmit({
  quote,
  handleInputChange,
  handleSubmit,
}: ClientSubmitProps) {
  const t = useTranslations("estimate");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  return (
    <section className="max-w-3xl mx-auto p-4 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10">
        <FieldInput
          aria-label="Client Name"
          fieldTarget="quotingTool.clientName"
          t={t}
          type="text"
          value={quote.clientName}
          onChange={(e) => handleInputChange("clientName", e.target.value)}
        />
        <FieldInput
          aria-label="Client Email"
          fieldTarget="quotingTool.clientEmail"
          t={t}
          type="email"
          value={quote.clientEmail}
          onChange={(e) => handleInputChange("clientEmail", e.target.value)}
        />
      </div>

      <TextInput
        aria-label="Comments"
        fieldTarget="quotingTool.clientComments"
        t={t}
        value={quote.comment}
        onChange={(e) => handleInputChange("comment", e.target.value)}
      />

      <div className="flex justify-center py-4">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
          onChange={setRecaptchaToken}
        />
      </div>

      <Button
        fullWidth
        aria-label="Submit Quote"
        className="bg-background text-foreground py-2 px-4 border border-purple-800 dark:border-purple-300 hover:bg-purple-800 hover:text-background hover:dark:text-purple-300 focus:outline-none"
        disabled={!recaptchaToken}
        radius="full"
        onClick={handleSubmit}
      >
        Submit Quote
      </Button>
    </section>
  );
});
