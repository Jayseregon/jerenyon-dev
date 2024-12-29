import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/", "/login/", "/signin/", "/hobbiton/"],
      },
    ],
    sitemap: "https://www.jerenyon.dev/sitemap.xml",
  };
}
