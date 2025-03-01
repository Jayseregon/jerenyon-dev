import "@/styles/globals.css";
import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import clsx from "clsx";
import { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from "next/headers";
import { getLocale, getMessages } from "next-intl/server";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import RootLayoutStyling from "@/src/components/root/RootLayoutStyling";
import UsercentricsCookieConsent from "@/src/components/legals/UsercentricsCookieConsent";
import { fontSans, fontMono, fontSerif, fontSansAlt } from "@/config/fonts";

import { Providers } from "./providers";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: `${siteConfig.heroTitle} with ${siteConfig.name}`,
  description: siteConfig.heroDescription,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  openGraph: {
    title: siteConfig.heroTitle,
    description: siteConfig.heroDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon,
        width: 1200,
        height: 630,
        alt: siteConfig.heroSubtitle,
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
        url: siteConfig.icon,
        width: 1200,
        height: 630,
        alt: siteConfig.heroSubtitle,
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
    canonical: siteConfig.siteUrl,
    languages: {
      "en-US": siteConfig.siteUrl,
      "fr-CA": siteConfig.siteUrl,
    },
  },
  metadataBase: new URL(siteConfig.siteUrl),
};

const locales = ["en", "fr"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: Props) {
  const nonce = (await headers()).get("x-nonce") || "";
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      suppressHydrationWarning
      className="bg-background"
      lang={locale}
      {...(nonce ? { nonce } : {})}
    >
      <Head>
        <meta
          content="width=device-width, initial-scale=1"
          name="viewport"
          nonce={nonce}
        />
        <meta
          content="white"
          media="(prefers-color-scheme: light)"
          name="theme-color"
          nonce={nonce}
        />
        <meta
          content="black"
          media="(prefers-color-scheme: dark)"
          name="theme-color"
          nonce={nonce}
        />
        <Link
          href="//privacy-proxy.usercentrics.eu"
          nonce={nonce}
          rel="preconnect"
        />
        <Link href="//app.usercentrics.eu" nonce={nonce} rel="preconnect" />
        <Link href="//analytics.jerenyon.dev" nonce={nonce} rel="preconnect" />
        <Link
          as="document"
          href="/knowledge-hub"
          nonce={nonce}
          rel="prefetch"
        />
        <Link href="/manifest.json" nonce={nonce} rel="manifest" />
      </Head>
      <body
        className={clsx(
          "bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable,
          fontSansAlt.variable,
        )}
        nonce={nonce}
      >
        <Providers
          nonce={nonce}
          themeProps={{ attribute: "class", defaultTheme: "dark", children }}
        >
          <NextIntlClientProvider messages={messages}>
            <RootLayoutStyling nonce={nonce}>
              {children}
              <SpeedInsights />
            </RootLayoutStyling>
          </NextIntlClientProvider>
        </Providers>
        <Script
          async
          data-website-id="27802530-4c86-4b3f-98c8-7df974a6e0e2"
          src="https://analytics.jerenyon.dev/script.js"
          strategy="afterInteractive"
        />

        {/* Optimized cookie consent component */}
        <UsercentricsCookieConsent
          nonce={nonce}
          settingsId="4vZk6dB-s7Fi9_"
          translationsUrl="https://termageddon.ams3.cdn.digitaloceanspaces.com/translations/"
        />
      </body>
    </html>
  );
}
