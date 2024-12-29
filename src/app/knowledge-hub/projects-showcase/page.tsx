"use client";

import { useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { BlogPostRefactor } from "@/src/interfaces/Hub";
import { getPublishedProjects } from "@/actions/prisma/blogPosts/action";
import { BlogPostsBoard } from "@/components/knowledge-hub/BlogPostsBoard";
import PageTitles from "@/components/ui/PageTitles";
import { NonceContext } from "@/src/app/providers";

export default function ProjectsShowcaseBoardPage() {
  const nonce = useContext(NonceContext);
  const t = useTranslations("knowledge-hub");
  const [projects, setProjects] = useState<BlogPostRefactor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublishedProjects();

      if (data && data.length > 0) {
        setProjects(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-8 sm:px-10 md:px-16">
      <PageTitles
        heroSubtitle={t("subDashboards.projects_showcase.hero.subtitle")}
        heroTitle={t("subDashboards.projects_showcase.hero.title")}
        nonce={nonce}
        pageTitle={t("subDashboards.projects_showcase.title")}
      />

      <div className="py-3" nonce={nonce} />

      <BlogPostsBoard data={projects} nonce={nonce} />
    </div>
  );
}
