import { Metadata } from "next";

import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: `Connect with ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name}. Whether you have a project in mind, need support, or have questions, we're here to help you move forward.`,
  keywords: [
    "Contact",
    `${siteConfig.name}`,
    "Web Development",
    "Geospatial Solutions",
    "Python Automation",
    "Backend Development",
    "GIS",
    "Full Stack Developer",
    "Next.js",
    "Technical Support",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: `Reach out to ${siteConfig.name} for inquiries, project discussions, or support. We're here to help you with automation, geospatial solutions, and full stack development.`,
    url: `${siteConfig.siteUrl}/contact`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon.light,
        width: 1200,
        height: 630,
        alt: `Contact ${siteConfig.name}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${siteConfig.name}`,
    description: `Have a project or need support? Contact ${siteConfig.name} for expert assistance in web development, automation, and geospatial solutions.`,
    images: [
      {
        url: siteConfig.icon.light,
        width: 1200,
        height: 630,
        alt: `Contact ${siteConfig.name}`,
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
    canonical: `${siteConfig.siteUrl}/contact`,
    languages: {
      "en-US": undefined,
      "fr-CA": undefined,
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="inline-block text-center justify-center px-10 py-10 md:py-20">
        {children}
      </div>
    </section>
  );
}
