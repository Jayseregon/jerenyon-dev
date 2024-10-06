"use client";

import { useTranslations } from "next-intl";

import { Timeline } from "@/src/components/profile/Timeline";
import PageTitles from "@/src/components/ui/PageTitles";

export default function ProfielPage() {
  const t = useTranslations("profile");

  return (
    <div>
      <PageTitles
        heroSubtitle={t("hero.subtitle")}
        heroTitle={t("hero.title")}
        pageTitle={t("title")}
      />

      <div className="py-3" />

      <Timeline />
    </div>
  );
}
