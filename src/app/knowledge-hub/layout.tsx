import { Metadata } from "next";

import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: `Knowledge Hub by ${siteConfig.name}`,
  description: `Explore a collection of articles, tutorials, and projects showcasing ${siteConfig.name}'s expertise in Python automation, geospatial solutions, backend development, and modern web technologies. Learn about cutting-edge tools and techniques to boost your own projects.`,
  keywords: [
    "Python",
    "Next.js",
    "TypeScript",
    "Automation",
    "Backend Development",
    "Django",
    "Geospatial Solutions",
    "GIS",
    "QGIS Tutorials",
    "Projects",
    "Full Stack Development",
    "Machine Learning",
    "Python Automation",
    "Web Development",
    "Tools and Tutorials",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  openGraph: {
    title: "Knowledge Hub - Insights and Tutorials",
    description: `Discover articles, tutorials, and project insights in Python automation, geospatial solutions, web development, and more from ${siteConfig.name}.`,
    url: `${siteConfig.siteUrl}/knowledge-hub`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon.light,
        width: 1200,
        height: 630,
        alt: `Knowledge Hub - ${siteConfig.name}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Knowledge Hub - ${siteConfig.name}`,
    description: `Explore in-depth tutorials, projects, and articles in Python automation, geospatial solutions, and web development by ${siteConfig.name}.`,
    images: [
      {
        url: siteConfig.icon.light,
        width: 1200,
        height: 630,
        alt: `Knowledge Hub - ${siteConfig.name}`,
      },
    ],
  },
  icons: {
    icon: siteConfig.icon.light,
    shortcut: siteConfig.icon.light,
    apple: siteConfig.icon.light,
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
      "en-US": undefined,
      "fr-CA": undefined,
    },
  },
};

export default function KnowledgeHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="inline-block text-center justify-center px-16 sm:px-20 md:px-32 py-10 md:py-20">
        {children}
      </div>
    </div>
  );
}
