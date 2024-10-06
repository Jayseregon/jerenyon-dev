import { Metadata } from "next";

import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: `Behind ${siteConfig.name}: My Profile`,
  description:
    "Discover the developer behind Jerenyon Dev. Learn about expertise in Python automation, backend development, Django, and modern web development with Next.js and TypeScript. Explore roles in digital transformation, geospatial solutions, and technical leadership.",
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
    title: "Profile - Jerenyon Dev",
    description:
      "Explore the profile behind Jerenyon Dev, showcasing expertise in Python automation, backend development, Django, Next.js, TypeScript, and geospatial technologies.",
    url: `${siteConfig.siteUrl}/profile`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon.dark,
        width: 1200,
        height: 630,
        alt: "Profile - Jerenyon Dev",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profile - Jerenyon Dev",
    description:
      "Professional expertise in Python automation, backend development, Django, Next.js, and geospatial solutions.",
    images: [
      {
        url: siteConfig.icon.dark,
        width: 1200,
        height: 630,
        alt: "Profile - Jerenyon Dev",
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
    canonical: `${siteConfig.siteUrl}/profile`,
    languages: {
      "en-US": undefined,
      "fr-CA": undefined,
    },
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="inline-block text-center justify-center w-full pt-10 md:pt-20 pb-5">
        {children}
      </div>
    </div>
  );
}
