"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { BlogPostRefactor } from "@/src/interfaces/Hub";
import { getPublishedProjects } from "@/actions/prisma/blogPosts/action";
import { BlogPostsBoard } from "@/components/knowledge-hub/BlogPostsBoard";
import PageTitles from "@/components/ui/PageTitles";

export default function ProjectsShowcaseBoardPage() {
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
    <div>
      <PageTitles
        heroSubtitle={t("subDashboards.projects_showcase.hero.subtitle")}
        heroTitle={t("subDashboards.projects_showcase.hero.title")}
        pageTitle={t("subDashboards.projects_showcase.title")}
      />

      <div className="py-3" />

      <BlogPostsBoard data={projects} />
    </div>
  );
}
