import { MetadataRoute } from "next";

import { getSitemapPosts } from "@/actions/prisma/blogPosts/action";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.jerenyon.dev";

  // Static routes
  const staticRoutes: Array<{
    path: string;
    changeFrequency:
      | "weekly"
      | "yearly"
      | "monthly"
      | "always"
      | "hourly"
      | "daily"
      | "never";
    priority: number;
  }> = [
    { path: "", changeFrequency: "daily", priority: 0.8 },
    { path: "/about", changeFrequency: "daily", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
    { path: "/estimate", changeFrequency: "weekly", priority: 0.7 },
    { path: "/knowledge-hub", changeFrequency: "daily", priority: 0.9 },
    {
      path: "/knowledge-hub/articles-and-tutorials",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      path: "/knowledge-hub/projects-showcase",
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Policy routes
  const policyRoutes = [
    {
      path: "/policies/privacy",
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      path: "/policies/cookies",
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      path: "/policies/terms",
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      path: "/policies/disclaimers",
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  // Fetch optimized blog posts for sitemap
  const { articles, projects } = await getSitemapPosts();

  // Blog post routes
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/knowledge-hub/articles-and-tutorials/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/knowledge-hub/projects-showcase/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  // Combine all routes
  return [
    // Static routes
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    // Policy routes
    ...policyRoutes.map(({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    // Dynamic blog post routes
    ...articleRoutes,
    ...projectRoutes,
  ];
}
