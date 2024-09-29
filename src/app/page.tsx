import { useTranslations } from "next-intl";
import { headers } from "next/headers";

import ParallaxImage from "@/components/ui/ParallaxImage";

import { siteConfig } from "../config/site";

export const metadata = {
  title: `${siteConfig.heroTitle} - ${siteConfig.name}`,
};

export default function RootPage() {
  const t = useTranslations("homepage");
  const nonce = headers().get("x-nonce");

  return (
    <div className="relative h-screen w-screen overflow-hidden grid grid-rows-[1fr_auto]">
      {/* Parallax Image */}
      <div className="row-span-1">
        <ParallaxImage height="100%" nonce={nonce ?? undefined} width="100%" />
      </div>

      {/* Hero Title and Subtitle */}
      <div className="flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center w-full">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mx-auto"
            id="hero-title"
          >
            {t("hero.title")}
          </h2>
        </div>

        <div className="text-center w-full mt-2">
          <h3
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mx-auto py-3"
            id="hero-subtitle"
          >
            {t("hero.subtitle")}
          </h3>
        </div>
      </div>
    </div>
  );
}
