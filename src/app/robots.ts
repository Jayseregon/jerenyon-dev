import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/hobbiton/", "/login/"],
      },
    ],
    sitemap: "https://www.jerenyon.dev/sitemap.xml",
  };
}
