"use client";
import React, { memo } from "react";
import { useTranslations } from "next-intl";

import { QuoteSectionProps } from "@/interfaces/Quote";

import { CardSection } from "./Quote-CardSection";
import { FieldInput, TextInput } from "./Quote-Inputs";

// ClientInfoSection Component
export const ClientInfoSection = memo(function ClientInfoSection({
  quote,
  handleInputChange,
}: QuoteSectionProps) {
  const t = useTranslations("estimate");

  return (
    <CardSection
      body={
        <>
          <FieldInput
            aria-label="Client Name"
            fieldTarget="quotingTool.clientName"
            t={t}
            type="text"
            value={quote.clientName}
            variance="underline"
            onChange={(e) => handleInputChange("clientName", e.target.value)}
          />
          <FieldInput
            aria-label="Client Email"
            fieldTarget="quotingTool.clientEmail"
            t={t}
            type="email"
            value={quote.clientEmail}
            variance="underline"
            onChange={(e) => handleInputChange("clientEmail", e.target.value)}
          />
          <TextInput
            aria-label="Comments"
            fieldTarget="quotingTool.clientComments"
            t={t}
            value={quote.comment}
            variance="underline"
            onChange={(e) => handleInputChange("comment", e.target.value)}
          />
        </>
      }
      bodyClassName="space-y-2"
      header="Client Information"
    />
  );
});
