import { Metadata } from "next";

import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: `Estimate Your Project with ${siteConfig.name}`,
  description: `Build a custom quote for your project with ${siteConfig.name}'s tailored services. Explore pricing for web development, automation, geospatial solutions, and advanced features with our dynamic estimate tool.`,
  keywords: [
    "Custom Project Quote",
    "Web Development Pricing",
    "Automation Pricing",
    "Geospatial Solutions",
    "Python Automation",
    "Backend Development",
    "Process Automation",
    "Web Development Services",
    "Custom Software Solutions",
    "Dynamic Quote",
    "E-commerce Development",
    "Advanced Features",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  openGraph: {
    title: "Estimate Your Project - Custom Quote",
    description: `Use the dynamic estimate tool to build a custom project quote for web development, automation, geospatial solutions, and more with ${siteConfig.name}.`,
    url: `${siteConfig.siteUrl}/estimate`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon.light,
        width: 1200,
        height: 630,
        alt: `Estimate Your Project - ${siteConfig.name}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estimate Your Project - Custom Quote",
    description: `Explore flexible pricing and build a custom quote for your web development, automation, and geospatial projects with ${siteConfig.name}.`,
    images: [
      {
        url: siteConfig.icon.light,
        width: 1200,
        height: 630,
        alt: `Estimate Your Project - ${siteConfig.name}`,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
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
      "en-US": undefined,
      "fr-CA": undefined,
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
      <div className="inline-block text-center justify-center px-16 sm:px-20 md:px-32 py-10 md:py-20">
        {children}
      </div>
    </div>
  );
}
