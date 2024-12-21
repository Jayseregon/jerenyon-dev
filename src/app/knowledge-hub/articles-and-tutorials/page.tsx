"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { BlogPostRefactor } from "@/src/interfaces/Hub";
import { getPublishedArticles } from "@/actions/prisma/blogPosts/action";
import { BlogPostsBoard } from "@/components/knowledge-hub/BlogPostsBoard";
import PageTitles from "@/components/ui/PageTitles";

export default function ArticlesAndTutorialsBoardPage() {
  const t = useTranslations("knowledge-hub");
  const [articles, setArticles] = useState<BlogPostRefactor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublishedArticles();

      if (data && data.length > 0) {
        setArticles(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageTitles
        heroSubtitle={t("subDashboards.articles_and_tutorials.hero.subtitle")}
        heroTitle={t("subDashboards.articles_and_tutorials.hero.title")}
        pageTitle={t("subDashboards.articles_and_tutorials.title")}
      />

      <div className="py-3" />

      <BlogPostsBoard data={articles} />
    </div>
  );
}
