"use client";

import { useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { BlogPostRefactor } from "@/src/interfaces/Hub";
import { getPublishedArticles } from "@/actions/prisma/blogPosts/action";
import { BlogPostsBoard } from "@/components/knowledge-hub/BlogPostsBoard";
import PageTitles from "@/src/components/root/PageTitles";
import { NonceContext } from "@/src/app/providers";

export default function ArticlesBoardPage() {
  const nonce = useContext(NonceContext);
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
    <div className="px-8 sm:px-10 md:px-16">
      <PageTitles
        heroSubtitle={t("subDashboards.articles.hero.subtitle")}
        heroTitle={t("subDashboards.articles.hero.title")}
        nonce={nonce}
        pageTitle={t("subDashboards.articles.title")}
      />

      <div className="py-3" nonce={nonce} />

      <BlogPostsBoard data={articles} nonce={nonce} />
    </div>
  );
}
