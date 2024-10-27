"use client";
import React, { memo, useMemo } from "react";
import { useTranslations } from "next-intl";

import { QuoteForm } from "@/interfaces/Quote";

import { CardSection } from "./Quote-CardSection";
import { QuoteSwitch } from "./Quote-Switch"; // Import QuoteSwitch

// AuthPermsSection Component
export const AuthPermsSection = memo(function AuthPermsSection({
  quote,
  authenticationMethods,
  handleAuthenticationChange,
}: {
  quote: QuoteForm;
  authenticationMethods: {
    method: string;
    price: number;
    label: string;
    subLabel?: string;
    sup?: string;
  }[];
  handleAuthenticationChange: (
    method: string,
    price: number,
    checked: boolean,
  ) => void;
}) {
  const t = useTranslations("estimate");

  const selectedMethods = useMemo(
    () => new Set(quote.authentication.map((auth) => auth.method)),
    [quote.authentication],
  );

  return (
    <CardSection
      body={
        <>
          {authenticationMethods.map(
            ({ method, price, label, subLabel, sup }) => (
              <QuoteSwitch
                key={method}
                ariaLabel={`${method} Authentication`}
                isOn={selectedMethods.has(method)}
                label={
                  <span>
                    {label}
                    {sup && <sup>{sup}</sup>}
                    {subLabel && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {" "}
                        {subLabel}
                      </span>
                    )}
                  </span>
                }
                onToggle={() =>
                  handleAuthenticationChange(
                    method,
                    price,
                    !selectedMethods.has(method),
                  )
                }
              />
            ),
          )}
        </>
      }
      header="Authentication & Permissions"
    />
  );
});
