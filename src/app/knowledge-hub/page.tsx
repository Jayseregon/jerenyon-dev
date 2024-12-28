"use client";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/src/config/site";
import PageTitles from "@/src/components/ui/PageTitles";
import MainCategoryCard from "@/src/components/knowledge-hub/MainCategoryCard";
import { PostTypes } from "@/src/interfaces/Hub";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        {siteConfig.hubCategories.map((category, index) => (
          <MainCategoryCard
            key={index}
            articleCategory={category.label as PostTypes}
            buttonText={t(`hubCategories.${category.label}.btnLabel`)}
            footerText={t(`hubCategories.${category.label}.description`)}
            href={`${category.rootRef}/${category.label}`}
            imageAlt={t(`hubCategories.${category.label}.imgAlt`)}
            imageSrc={category.imgBg}
            subtitle="New"
            title={t(`hubCategories.${category.label}.title`)}
          />
        ))}
      </div>
    </div>
  );
}
