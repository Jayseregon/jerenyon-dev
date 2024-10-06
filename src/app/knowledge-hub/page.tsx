"use client";

import { useTranslations } from "next-intl";

import PageTitles from "@/src/components/ui/PageTitles";

export default function KnowledgeHubPage() {
  const t = useTranslations("knowledge-hub");

  return (
    <div>
      <PageTitles
        heroSubtitle={t("hero.subtitle")}
        heroTitle={t("hero.title")}
        pageTitle={t("title")}
      />

      <div className="py-3" />
    </div>
  );
}
