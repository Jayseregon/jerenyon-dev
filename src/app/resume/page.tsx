import { useTranslations } from "next-intl";
import { Metadata } from "next";

import { Timeline } from "@/src/components/resume/Timeline";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "My Resume",
  description:
    "Discover Jeremie's professional journey, with expertise in Python automation, backend development, Django, and modern web development with Next.js and TypeScript. Explore his roles in digital transformation, geospatial solutions, and technical leadership.",
  keywords: [
    "Python",
    "Next.js",
    "TypeScript",
    "Automation",
    "Backend Development",
    "Django",
    "Geospatial Solutions",
    "GIS",
    "Full Stack Developer",
    "Machine Learning",
    "Digital Transformation",
    "Technical Leadership",
  ],
  authors: [{ name: "Jeremie Bitsch", url: siteConfig.siteUrl }],
  openGraph: {
    title: "Resume - Jeremie Bitsch",
    description:
      "Explore Jeremie's resume, showcasing his expertise in Python automation, backend development, Django, Next.js, TypeScript, and geospatial technologies.",
    url: `${siteConfig.siteUrl}/resume`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon.dark,
        width: 1200,
        height: 630,
        alt: "Jeremie Bitsch - Resume",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume - Jeremie Bitsch",
    description:
      "Professional experience in Python, automation, backend development, Django, Next.js, and geospatial technologies.",
    images: [
      {
        url: siteConfig.icon.dark,
        width: 1200,
        height: 630,
        alt: "Jeremie Bitsch - Resume",
      },
    ],
  },
  icons: {
    icon: siteConfig.icon.dark,
    shortcut: siteConfig.icon.dark,
    apple: siteConfig.icon.dark,
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/resume`,
    languages: {
      "en-US": undefined,
      "fr-CA": undefined,
    },
  },
};

export default function ResumePage() {
  const t = useTranslations("resume");

  return (
    <div>
      <h1 className="text-purple-800 dark:text-purple-300 mb-3">
        {t("title")}
      </h1>
      <h2 className="text-5xl font-bold">{t("hero.title")}</h2>
      <h3 className="text-xl mt-2 text-purple-800/70 dark:text-purple-300/70 max-w-2xl mx-auto p-5">
        {t("hero.subtitle")}
      </h3>

      <div className="py-3" />

      <div className="py-3" />

      <Timeline />
    </div>
  );
}
