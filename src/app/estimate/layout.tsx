import { Metadata } from "next";

import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: `Estimate Your Custom Project with ${siteConfig.name}`,
  description: `Create a tailored quote for your project with ${siteConfig.name}'s versatile estimate tool. Customize options for web development, automation, AI solutions, and geospatial intelligence.`,
  keywords: [
    "Custom Project Quote Tool",
    "Estimate Web Development Costs",
    "Affordable Automation Solutions",
    "Geospatial Data Services",
    "AI for Small Businesses",
    "Dynamic Web Design Pricing",
    "Backend Development Services",
    "Python Automation Experts",
    "GIS Software Development",
    "Low-Code Automation Tools",
    "E-commerce Development Pricing",
    "Custom AI Integration",
    "Process Optimization Solutions",
    "GIS Mapping Tools",
    "Custom Software Pricing",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  openGraph: {
    title: "Estimate Your Custom Project - Tailored Solutions",
    description: `Explore ${siteConfig.name}'s dynamic tool to build a custom quote for your project. From dynamic websites to AI-driven automation and geospatial intelligence, configure your needs step-by-step.`,
    url: `${siteConfig.siteUrl}/estimate`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon,
        width: 1200,
        height: 630,
        alt: `Estimate Your Project with ${siteConfig.name}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estimate Your Custom Project - Tailored Solutions",
    description: `Discover ${siteConfig.name}'s flexible quote tool to customize pricing for web development, AI, automation, and geospatial intelligence.`,
    images: [
      {
        url: siteConfig.icon,
        width: 1200,
        height: 630,
        alt: `Estimate Your Project with ${siteConfig.name}`,
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
    canonical: `${siteConfig.siteUrl}/estimate`,
    languages: {
      "en-US": `${siteConfig.siteUrl}/estimate`,
      "fr-CA": `${siteConfig.siteUrl}/estimate`,
    },
  },
};

export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="inline-block text-center justify-center px-8 sm:px-10 md:px-16 py-10 md:py-20">
        {children}
      </div>
    </div>
  );
}
