import "@/styles/globals.css";
import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import clsx from "clsx";
import { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from "next/headers";
import { getLocale, getMessages } from "next-intl/server";
import Head from "next/head";

import { siteConfig } from "@/config/site";
import RootLayoutStyling from "@/components/ui/RootLayoutStyling";
import {
  fontSans,
  fontMono,
  fontSerif,
  fontDisplay,
  fontSansAlt,
} from "@/config/fonts";

import { Providers } from "./providers";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: siteConfig.name,
  // title: {
  //   default: siteConfig.name,
  //   template: `%s - ${siteConfig.name}`,
  // },
  description: siteConfig.heroDescription,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  openGraph: {
    title: siteConfig.heroTitle,
    description:
      "Web Development, Geospatial Expertise & Automation. Providing Python automation and cloud-based geospatial solutions.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon.dark,
        width: 1200,
        height: 630,
        alt: "Web development and geospatial expertise",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.heroTitle,
    description: siteConfig.heroSubtitle,
    images: [
      {
        url: siteConfig.icon.dark,
        width: 1200,
        height: 630,
        alt: "Web development and geospatial expertise",
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
    canonical: siteConfig.siteUrl,
    languages: {
      "en-US": undefined,
      "fr-CA": undefined,
    },
  },
  metadataBase: new URL(siteConfig.siteUrl),
};
const locales = ["en", "fr"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: Props) {
  const nonce = headers().get("x-nonce");
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale} {...(nonce ? { nonce } : {})}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          content="white"
          media="(prefers-color-scheme: light)"
          name="theme-color"
        />
        <meta
          content="black"
          media="(prefers-color-scheme: dark)"
          name="theme-color"
        />
      </Head>
      <body
        className={clsx(
          "bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable,
          fontDisplay.variable,
          fontSansAlt.variable,
        )}
        {...(nonce ? { nonce } : {})}
      >
        <SpeedInsights />
        <Providers
          nonce={nonce || undefined}
          themeProps={{ attribute: "class", defaultTheme: "dark", children }}
        >
          <NextIntlClientProvider messages={messages}>
            <RootLayoutStyling nonce={nonce || ""}>
              {children}
            </RootLayoutStyling>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
