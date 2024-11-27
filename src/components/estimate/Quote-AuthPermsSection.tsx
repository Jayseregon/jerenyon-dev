"use client";
import React, { memo, useMemo } from "react";
// import { useTranslations } from "next-intl";

import { AuthPermsSectionProps } from "@/interfaces/Quote";

import { CardSection } from "./Quote-CardSection";
import { QuoteSwitch } from "./Quote-Switch";

// AuthPermsSection Component
export const AuthPermsSection = memo(function AuthPermsSection({
  quote,
  authenticationMethods,
  handleAuthenticationChange,
}: AuthPermsSectionProps) {
  // const t = useTranslations("estimate");

  const selectedMethods = useMemo(
    () => new Set(quote.authentication.map((auth) => auth.name)),
    [quote.authentication],
  );

  return (
    <CardSection
      body={
        <>
          {authenticationMethods.map(
            ({ name, price, label, subLabel, sup }) => (
              <QuoteSwitch
                key={name}
                ariaLabel={`${name} Authentication`}
                isOn={selectedMethods.has(name)}
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
                    name,
                    price,
                    !selectedMethods.has(name),
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
