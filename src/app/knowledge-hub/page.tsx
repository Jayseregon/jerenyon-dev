"use client";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/src/config/site";
import PageTitles from "@/src/components/root/PageTitles";
import MainCategoryCard from "@/src/components/knowledge-hub/MainCategoryCard";
import { ReadingsSection } from "@/src/components/knowledge-hub/ReadingsSection";

export default function KnowledgeHubPage() {
  const t = useTranslations("knowledge-hub");

  // Get the articles category from siteConfig
  const articlesCategory = siteConfig.knowledgeHub[0];
  const articleHref = `${articlesCategory.rootRef}/${articlesCategory.label}`;

  return (
    <div className="px-8 sm:px-10 md:px-16">
      <PageTitles
        heroSubtitle={t("hero.subtitle")}
        heroTitle={t("hero.title")}
        pageTitle={t("title")}
      />

      <h3 className="text-xl my-10 text-justify max-w-5xl mx-auto p-5">
        <p className="mb-3 indent-8">{t("intro.p1")}</p>
        <p className="mb-3">{t("intro.p2")}</p>
      </h3>
      <h3 className="text-xl mt-6 mb-20 text-purple-800/70 dark:text-purple-300/70 max-w-3xl mx-auto">
        {t("intro.p3")}
      </h3>

      <div className="flex flex-col space-y-20 max-w-3xl mx-auto">
        <MainCategoryCard
          buttonText={t(`hubCategories.${articlesCategory.label}.btnLabel`)}
          footerText={t(`hubCategories.${articlesCategory.label}.description`)}
          href={articleHref}
          subtitle="New"
          title={t(`hubCategories.${articlesCategory.label}.title`)}
        />
      </div>

      <div className="py-3" />

      <h3 className="text-xl my-10 text-justify max-w-5xl mx-auto p-5">
        <p className="mb-3 indent-8">{t("bookshelf.intro")}</p>
      </h3>

      <h3 className="text-xl mt-6 mb-20 text-purple-800/70 dark:text-purple-300/70 max-w-3xl mx-auto">
        <blockquote className="italic">
          “Learning never exhausts the mind.” — Leonardo da Vinci
        </blockquote>
        <blockquote className="italic mt-4">
          “Books are a uniquely portable magic.” — Stephen King
        </blockquote>
      </h3>

      <ReadingsSection />
    </div>
  );
}
