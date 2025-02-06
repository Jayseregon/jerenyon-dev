"use client";
import React, { memo } from "react";
import { useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";

import { Button } from "@/components/ui/button";
import { ClientSubmitProps } from "@/interfaces/Quote";
import { FieldInput } from "@/components/contact/FieldInput";
import { TextInput } from "@/components/contact/TextInput";

// Client info and submit quote
export const ClientSubmit = memo(function ClientSubmit({
  quote,
  handleInputChange,
  handleSubmit,
  recaptchaToken,
  setRecaptchaToken,
}: ClientSubmitProps) {
  const t = useTranslations("estimate");

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
        aria-label="Submit Quote"
        disabled={!recaptchaToken}
        variant="form"
        onClick={handleSubmit}
      >
        Submit Quote
      </Button>
    </section>
  );
});
