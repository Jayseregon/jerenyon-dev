import { Metadata } from "next";

import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: `About and Behind ${siteConfig.name}`,
  description:
    "Discover the journey behind Jerenyon Dev, where Generative AI, automation, and geospatial intelligence intersect with full-stack development and digital transformation.",
  keywords: [
    "Generative AI",
    "AI Automation",
    "Machine Learning",
    "LLMs",
    "Retrieval-Augmented Generation",
    "LangChain",
    "Python",
    "Next.js",
    "TypeScript",
    "Automation",
    "Backend Development",
    "Django",
    "Geospatial Solutions",
    "GIS",
    "QGIS",
    "PostGIS",
    "AI Agents",
    "Vector Databases",
    "Full Stack Developer",
    "Web Development",
    "Hugging Face",
    "Azure",
    "Cloud Infrastructure",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  openGraph: {
    title: "About - Jerenyon Dev",
    description:
      "Explore the story of Jerenyon Dev, bridging Generative AI, automation, and geospatial intelligence with full-stack web development.",
    url: `${siteConfig.siteUrl}/about`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon,
        width: 1200,
        height: 630,
        alt: "About - Jerenyon Dev",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Jerenyon Dev",
    description:
      "Bridging Generative AI, automation, and geospatial intelligence with full-stack web development.",
    images: [
      {
        url: siteConfig.icon,
        width: 1200,
        height: 630,
        alt: "About - Jerenyon Dev",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`,
    languages: {
      "en-US": `${siteConfig.siteUrl}/about`,
      "fr-CA": `${siteConfig.siteUrl}/about`,
    },
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="inline-block text-center justify-center w-full py-10 md:py-20">
        {children}
      </div>
    </div>
  );
}
