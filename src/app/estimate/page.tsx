"use client";

import { useTranslations } from "next-intl";

import PageTitles from "@/src/components/ui/PageTitles";
import { ConeStripedIcon } from "@/src/components/icons";
import QuotingTool from "@/src/components/estimate/QuotingTool";

export default function EstimatePage() {
  const t = useTranslations("estimate");
  const displayDevNotice = process.env.NEXT_PUBLIC_DEV_NOTICE === "true";

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

      {displayDevNotice ? DevNotice : <QuotingTool />}
    </div>
  );
}
