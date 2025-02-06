"use client";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/src/config/site";
import PageTitles from "@/src/components/root/PageTitles";
import MainCategoryCard from "@/src/components/knowledge-hub/MainCategoryCard";
import { PostTypes } from "@/src/interfaces/Hub";
import { ReadingsSection } from "@/src/components/knowledge-hub/ReadingsSection";

export default function KnowledgeHubPage() {
  const t = useTranslations("knowledge-hub");

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px w-full">
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
