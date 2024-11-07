import "@/styles/globals.css";
import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import clsx from "clsx";
import { ReactNode } from "react";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from "next/headers";
import { getLocale, getMessages } from "next-intl/server";
import Head from "next/head";
// import Script from "next/script";

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
  title: `${siteConfig.heroTitle} with ${siteConfig.name}`,
  description: siteConfig.heroDescription,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  openGraph: {
    title: siteConfig.heroTitle,
    description:
      "Web Development, Automation & Geospatial Expertise. Providing Python automation and cloud-based geospatial solutions.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.icon,
        width: 1200,
        height: 630,
        alt: "Web development, automation and geospatial expertise",
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
        alt: "Web development, automation and geospatial expertise",
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
  const nonce = headers().get("x-nonce") || "";
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
        {/* <link
          as="fetch"
          crossOrigin="anonymous"
          href="https://jerenyon-dev-remote-pull.b-cdn.net/spline-scene/hero-3d-scene.splinecode"
          nonce={nonce}
          rel="preload"
        /> */}
        {/* Preconnect to Spline asset domains */}
        {/* <link
          crossOrigin="anonymous"
          href="https://prod.spline.design"
          nonce={nonce}
          rel="preconnect"
        />
        <link href="https://prod.spline.design" rel="dns-prefetch" /> */}
        {/* Preconnect to BunnyCDN for your Spline scene */}
        {/* <link
          crossOrigin="anonymous"
          href="https://jerenyon-dev-remote-pull.b-cdn.net"
          nonce={nonce}
          rel="preconnect"
        />
        <link
          href="https://jerenyon-dev-remote-pull.b-cdn.net"
          rel="dns-prefetch"
        /> */}
        {/* Preconnect and preload for Usercentrics */}
        {/* <link
          href="//privacy-proxy.usercentrics.eu"
          nonce={nonce}
          rel="preconnect"
        />
        <link
          as="script"
          href="//privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js"
          nonce={nonce}
          rel="preload"
        /> */}
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
        nonce={nonce}
      >
        <Providers
          nonce={nonce}
          themeProps={{ attribute: "class", defaultTheme: "dark", children }}
        >
          <NextIntlClientProvider messages={messages}>
            <RootLayoutStyling nonce={nonce}>
              {children}
              {/* <SpeedInsights /> */}
            </RootLayoutStyling>
          </NextIntlClientProvider>
        </Providers>
        {/* <Script
          nonce={nonce}
          src="https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js"
          strategy="afterInteractive"
          type="application/javascript"
        />
        <Script
          data-settings-id="4vZk6dB-s7Fi9_"
          id="usercentrics-cmp"
          nonce={nonce}
          src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
          strategy="afterInteractive"
        /> */}
        {/* <Script
          nonce={nonce}
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SECRET_KEY}`}
          strategy="afterInteractive"
        /> */}
      </body>
    </html>
  );
}
