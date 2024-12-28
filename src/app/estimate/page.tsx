"use client";

import { useTranslations } from "next-intl";

import PageTitles from "@/src/components/ui/PageTitles";
import QuotingTool from "@/src/components/estimate/QuotingTool";

export default function EstimatePage() {
  const t = useTranslations("estimate");

  return (
    <div>
      <PageTitles
        heroSubtitle={t("hero.subtitle")}
        heroTitle={t("hero.title")}
        pageTitle={t("title")}
      />

      <div className="py-3" />

      <QuotingTool />
    </div>
  );
}
