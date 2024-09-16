import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { NextIntlClientProvider } from "next-intl";
import clsx from "clsx";
import { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from "next/headers";
import { getLocale, getMessages } from "next-intl/server";

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
      <head {...(nonce ? { nonce } : {})} />
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
              className="relative flex flex-col h-screen"
              {...(nonce ? { nonce } : {})}
            >
              <Navbar nonce={nonce || undefined} />

              <main {...(nonce ? { nonce } : {})}>{children}</main>

              <Footer nonce={nonce || undefined} />
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
