import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.jerenyon.dev";

  // Static routes with their respective change frequency and priority
  // const staticRoutes: Array<{
  //   path: string;
  //   changeFrequency:
  //     | "weekly"
  //     | "yearly"
  //     | "monthly"
  //     | "always"
  //     | "hourly"
  //     | "daily"
  //     | "never";
  //   priority: number;
  // }> = [
  //   { path: "", changeFrequency: "weekly", priority: 0.8 },
  //   { path: "/about", changeFrequency: "weekly", priority: 0.8 },
  //   { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  //   { path: "/estimate", changeFrequency: "monthly", priority: 0.7 },
  //   { path: "/knowledge-hub", changeFrequency: "weekly", priority: 0.9 },
  // ];

  // set daily for development
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
    { path: "/contact", changeFrequency: "daily", priority: 0.5 },
    { path: "/estimate", changeFrequency: "daily", priority: 0.7 },
    { path: "/knowledge-hub", changeFrequency: "daily", priority: 0.9 },
  ];

  // const sitemap = `
  //   <?xml version="1.0" encoding="UTF-8"?>
  //   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  //     ${staticRoutes
  //       .map(({ path, changeFrequency, priority }) => {
  //         return `
  //           <url>
  //             <loc>${baseUrl}${path}</loc>
  //             <lastmod>${new Date().toISOString()}</lastmod>
  //             <changefreq>${changeFrequency}</changefreq>
  //             <priority>${priority}</priority>
  //           </url>
  //         `;
  //       })
  //       .join("")}
  //   </urlset>
  // `.trim();

  return staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
