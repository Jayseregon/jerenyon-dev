import { NextResponse } from "next/server";

// Function to fetch dynamic routes (e.g., from an API or database)
async function fetchDynamicRoutes() {
  // Example: Fetch dynamic routes from an API
  const response = await fetch("https://api.example.com/posts");
  const posts = await response.json();

  return posts.map((post: { slug: string }) => `/posts/${post.slug}`);
}

export async function GET() {
  const staticRoutes = [
    { url: "/", changefreq: "weekly", priority: 0.8 },
    { url: "/about", changefreq: "weekly", priority: 0.8 },
    { url: "/contact", changefreq: "yearly", priority: 0.5 },
    { url: "/estimate", changefreq: "monthly", priority: 0.7 },
    { url: "/knowledge-hub", changefreq: "weekly", priority: 0.9 },
  ];

  // const dynamicRoutes = await fetchDynamicRoutes();

  // const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const allRoutes = [...staticRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map((route) => {
        return `
          <url>
            <loc>${`https://www.jerenyon.dev${route.url}`}</loc>
            <changefreq>${route.changefreq}</changefreq>
            <priority>${route.priority}</priority>
          </url>
        `;
      })
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
