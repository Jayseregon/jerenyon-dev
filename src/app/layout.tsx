import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { NextIntlClientProvider } from "next-intl";
import clsx from "clsx";
import { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from "next/headers";
import { getLocale, getMessages } from "next-intl/server";
import Head from "next/head";

import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";
import {
  fontSans,
  fontMono,
  fontSerif,
  fontDisplay,
  fontSansAlt,
} from "@/config/fonts";
import { Footer } from "@/components/footer";

import { Providers } from "./providers";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.heroDescription,
  icons: {
    icon: siteConfig.icon,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1,
  // userScalable: false,
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
        <link href="//privacy-proxy.usercentrics.eu" rel="preconnect" />
        <link
          as="script"
          href="//privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js"
          rel="preload"
        />
        <script
          async
          nonce={nonce || undefined}
          src="https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js"
          type="application/javascript"
        />
        <script
          async
          data-settings-id="4vZk6dB-s7Fi9_"
          id="usercentrics-cmp"
          nonce={nonce || undefined}
          src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
        />
        <script async nonce={nonce || undefined}>
          {`uc.setCustomTranslations('https://termageddon.ams3.cdn.digitaloceanspaces.com/translations/');`}
        </script>
      </Head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
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
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <NextIntlClientProvider messages={messages}>
            <div
              className="relative flex flex-col min-h-screen"
              {...(nonce ? { nonce } : {})}
            >
              <Navbar nonce={nonce || undefined} />
              <main className="flex-grow" {...(nonce ? { nonce } : {})}>
                {children}
              </main>
              <Footer nonce={nonce || undefined} />
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
