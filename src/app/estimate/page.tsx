"use client";

import { useTranslations } from "next-intl";

import { PricingBoard } from "@/src/components/pricing/PricingBoard";
import { Addons } from "@/src/components/pricing/Addons";
import { Maintenance } from "@/src/components/pricing/Maintenance";
import PageTitles from "@/src/components/ui/PageTitles";

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

      <PricingBoard />

      <div className="py-3" />

      <h3 className="text-3xl font-bold">{t("addons")}</h3>
      <Addons />
      <Maintenance />

      <p className="text-center text-sm text-purple-800/70 dark:text-purple-300/70 mt-5">
        <span className="align-super text-sm">*</span>
        {t("disclaimer.line1")}
        <br />
        {t("disclaimer.line2")}
        <br />
        {t("disclaimer.line3")}
      </p>
    </div>
  );
}
