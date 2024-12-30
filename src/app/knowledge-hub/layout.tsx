import { Metadata } from "next";

import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: `Knowledge Hub | Articles, Tutorials & Projects by ${siteConfig.name}`,
  description: `Your go-to resource for in-depth articles, step-by-step tutorials, and project showcases in Python automation, geospatial intelligence, and AI-powered solutions. Explore, learn, and innovate with ${siteConfig.name}.`,
  keywords: [
    "Python",
    "Next.js",
    "TypeScript",
    "Automation",
    "Backend Development",
    "Geospatial Solutions",
    "QGIS Tutorials",
    "Full Stack Development",
    "Machine Learning",
    "Python Automation",
    "Web Development",
    "Tools and Tutorials",
    "Python automation tutorials",
    "AI and geospatial projects",
    "Next.js development guides",
    "Machine Learning integration",
    "GIS for data analysis",
    "Cloud-based geospatial workflows",
    "Interactive mapping tools",
    "Web development with AI",
    "Geospatial intelligence for businesses",
    "Custom backend development solutions",
    "AI-powered geospatial tools",
    "Python for automation and data processing",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  openGraph: {
    title: `Explore the Knowledge Hub by ${siteConfig.name}`,
    description: `Uncover practical insights and innovative solutions with articles, tutorials, and projects in Python, geospatial intelligence, and AI. Learn, create, and grow with ${siteConfig.name}.`,
    url: `${siteConfig.siteUrl}/knowledge-hub`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon,
        width: 1200,
        height: 630,
        alt: `Discover Tutorials and Projects | ${siteConfig.name}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Knowledge Hub - ${siteConfig.name}`,
    description: `Practical guides, step-by-step tutorials, and project insights on automation, geospatial intelligence, and AI by ${siteConfig.name}. Dive in and explore!`,
    images: [
      {
        url: siteConfig.icon,
        width: 1200,
        height: 630,
        alt: `Knowledge Hub - ${siteConfig.name}`,
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
    canonical: `${siteConfig.siteUrl}/knowledge-hub`,
    languages: {
      "en-US": `${siteConfig.siteUrl}/knowledge-hub`,
      "fr-CA": `${siteConfig.siteUrl}/knowledge-hub`,
    },
  },
};

export default function KnowledgeHubLayout({
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
