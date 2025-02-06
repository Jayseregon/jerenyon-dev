"use client";

import { useTranslations } from "next-intl";
import { useContext } from "react";

import PageTitles from "@/src/components/root/PageTitles";
import QuotingTool from "@/src/components/estimate/QuotingTool";
import { NonceContext } from "@/src/app/providers";

export default function EstimatePage() {
  const nonce = useContext(NonceContext);
  const t = useTranslations("estimate");

  return (
    <div>
      <PageTitles
        heroSubtitle={t("hero.subtitle")}
        heroTitle={t("hero.title")}
        nonce={nonce}
        pageTitle={t("title")}
      />

      <div className="py-3" nonce={nonce} />

      <QuotingTool />
    </div>
  );
}
