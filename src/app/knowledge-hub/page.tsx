"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { siteConfig } from "@/src/config/site";
import PageTitles from "@/src/components/ui/PageTitles";
import { StarsdIcon } from "@/src/components/icons";
import MainCategoryCard from "@/src/components/knowledge-hub/MainCategoryCard";
import WithBlockedViewOverlay from "@/src/components/_dev/WithBlockedViewOverlay";

export default function KnowledgeHubPage() {
  const t = useTranslations("knowledge-hub");

  const articles = [
    {
      thumbnail: "/assets/thumbnail-placeholder.webp",
      title: "Article 1",
      description: "This is a short description of Article 1.",
    },
    {
      thumbnail: "/assets/thumbnail-placeholder.webp",
      title: "Article 2",
      description: "This is a short description of Article 2.",
    },
    {
      thumbnail: "/assets/thumbnail-placeholder.webp",
      title: "Article 3",
      description: "This is a short description of Article 3.",
    },
  ];

  const DevNotice = (
    <div
      className="bg-yellow-200/90 dark:bg-yellow-900/90 border-4 rounded-xl border-yellow-400 dark:border-yellow-500 p-4 space-y-5"
      role="alert"
    >
      <StarsdIcon size={100} />
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

      <WithBlockedViewOverlay notice={DevNotice}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {siteConfig.hubCategories.map((category, index) => (
            <MainCategoryCard
              key={index}
              articles={articles}
              buttonText={t(`hubCategories.${category.label}.btnLabel`)}
              footerText={t(`hubCategories.${category.label}.description`)}
              imageAlt={t(`hubCategories.${category.label}.imgAlt`)}
              imageSrc={category.imgBg}
              subtitle="New"
              title={t(`hubCategories.${category.label}.title`)}
            />
          ))}
        </div>
        <Link href="/knowledge-hub/posts">Posts</Link>
      </WithBlockedViewOverlay>
    </div>
  );
}
