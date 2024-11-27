"use client";
import React, { memo, useContext, useMemo } from "react";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { QuoteForm } from "@/interfaces/Quote";
import { NonceContext } from "@/src/app/providers";
import { calculateQuoteSummary } from "@/lib/calculateQuote";

import { CardSection } from "./Quote-CardSection";

// Replace react-icons with lucide-react icons

export const QuoteSummarySection = memo(function QuoteSummarySection({
  quote,
}: {
  quote: QuoteForm;
}) {
  const nonce = useContext(NonceContext);
  const t = useTranslations("estimate.summary");

  const summaryData = useMemo(() => calculateQuoteSummary(quote), [quote]);

  return (
    <CardSection
      titleOutside
      body={
        <div className="space-y-4" nonce={nonce}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{t("timeEstimated")}</h3>
            <span className="text-lg text-nowrap">
              {summaryData.totalHours.toFixed(0)} {t("hours")}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {summaryData.categories.map((category) => {
              if (category.items.length === 0) return null;

              return (
                <div
                  key={category.name}
                  className="bg-purple-200 dark:bg-purple-950 rounded-lg shadow-md p-4 flex flex-col justify-between"
                  nonce={nonce}
                >
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-foreground">
                      {category.name}
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {category.items.map((item, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <CircleCheck className="text-green-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <span className="font-semibold text-foreground">
                      {t("subTotal")}
                    </span>
                    <span className="text-green-600">
                      ${category.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end items-center mt-4">
            <span className="font-bold text-xl text-foreground">
              {t("total")}
            </span>
            <span className="text-2xl text-green-600 ml-2">
              ${summaryData.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      }
      header={t("title")}
    />
  );
});
