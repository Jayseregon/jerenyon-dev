"use client";

import { useTranslations } from "next-intl";

import { PricingBoard } from "@/src/components/pricing/PricingBoard";
import { Addons } from "@/src/components/pricing/Addons";
import { Maintenance } from "@/src/components/pricing/Maintenance";
import PageTitles from "@/src/components/ui/PageTitles";
import { ConeStripedIcon } from "@/src/components/icons";

export default function EstimatePage() {
  const t = useTranslations("estimate");
  const displayDevNotice = process.env.NODE_ENV === "production";

  const PricingContent = (
    <>
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
    </>
  );

  const DevNotice = (
    <div
      className="bg-yellow-200 dark:bg-yellow-900 border-4 rounded-xl border-yellow-400 dark:border-yellow-500 p-4 space-y-5"
      role="alert"
    >
      <ConeStripedIcon size={100} />
      <p className="font-bold text-3xl">{t("devNotice.title")}</p>
      <p className="flex flex-col">
        <span>{t("devNotice.line1")}</span>
        <span>{t("devNotice.line2")}</span>
      </p>
      <p className="text-xl">{t("devNotice.line3")}</p>
    </div>
  );

  return (
    <div>
      <PageTitles
        heroSubtitle={t("hero.subtitle")}
        heroTitle={t("hero.title")}
        pageTitle={t("title")}
      />

      <div className="py-3" />

      {displayDevNotice ? DevNotice : PricingContent}
    </div>
  );
}
