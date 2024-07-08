import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { ReactNode } from "react";
import { HeartFooterIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import {
  fontSans,
  fontMono,
  fontSerif,
  fontDisplay,
  fontSansAlt,
} from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from "next/headers";

type Props = {
  children: ReactNode;
  //   params: { locale: string };
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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

export default function RootLayout({ children }: Props) {
  const nonce = headers().get("x-nonce");

  return (
    <html
      suppressHydrationWarning
      lang="en"
      nonce={nonce || undefined}>
      <head nonce={nonce || undefined} />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable,
          fontDisplay.variable,
          fontSansAlt.variable
        )}
        nonce={nonce || undefined}>
        <SpeedInsights />
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <p>Nonce value [root]: {nonce || undefined}</p>
          {children}
        </Providers>
      </body>
    </html>
  );
}
