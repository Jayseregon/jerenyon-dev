import { Metadata } from "next";

import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: `About and Behind ${siteConfig.name}`,
  description:
    "Learn about the developer behind Jerenyon Dev. Explore expertise in Python automation, backend development, Django, and modern web technologies like Next.js and TypeScript, along with geospatial solutions and digital transformation.",
  keywords: [
    "Python",
    "Next.js",
    "TypeScript",
    "Automation",
    "Backend Development",
    "Django",
    "Geospatial Solutions",
    "GIS",
    "QGIS",
    "Full Stack Developer",
    "Machine Learning",
    "Python Automation",
    "Web Development",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  openGraph: {
    title: "About - Jerenyon Dev",
    description:
      "Discover the story behind Jerenyon Dev, showcasing expertise in Python automation, backend development, Django, Next.js, TypeScript, and geospatial technologies.",
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
      "Professional expertise in Python automation, backend development, Django, Next.js, and geospatial solutions.",
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
