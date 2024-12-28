"use client";

import { useTranslations } from "next-intl";

import { Disclaimers } from "@/components/legals/Disclaimers";

export default function DisclaimersPage() {
  const t = useTranslations("policies");

  return (
    // <div>
    <div className="w-full max-w-4xl md:max-w-5xl mx-auto">
      <h1 className="text-purple-800 dark:text-purple-300 mb-3">
        {t(`quote_disclaimer.title`)}
      </h1>
      <h2 className="text-5xl font-bold max-w-xl mx-auto">
        {t(`quote_disclaimer.heroTitle`)}
      </h2>

      <div className="py-3" />

      <Disclaimers />

      <div className="py-3" />
    </div>
  );
}
