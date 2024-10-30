import { useTranslations } from "next-intl";
import { headers } from "next/headers";

import IframeWithLoader from "@/components/spline3D/IframeWithLoader";

import { siteConfig } from "../config/site";

export const metadata = {
  title: `${siteConfig.heroTitle} with ${siteConfig.name}`,
};

export default function RootPage() {
  const t = useTranslations("homepage");
  const nonce = headers().get("x-nonce") ?? "";

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-background flex items-center justify-center"
      nonce={nonce}>
      <IframeWithLoader
        nonce={nonce}
        src="/spline-scene"
        title="3D Scene"
      />

      {/* Hero Title and Subtitle */}
      <div
        className="absolute bottom-0 w-full flex flex-col items-center justify-center pb-5 z-10"
        nonce={nonce}>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground"
          id="hero-title"
          nonce={nonce}>
          {t("hero.title")}
        </h2>
        <p
          className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-secondary text-center"
          nonce={nonce}>
          {t("hero.subtitle")}
        </p>
      </div>
    </div>
  );
}
