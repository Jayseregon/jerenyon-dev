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
    <div className="relative h-screen w-screen overflow-hidden grid grid-rows-[minmax(0,1fr)_minmax(0,2fr)] sm:grid-rows-[minmax(0,auto)_minmax(0,1fr)]">
      {/* Hero Title and Subtitle */}
      <div className="flex flex-col items-center justify-center p-2 border-2 border-lime-500 pt-16">
        <div className="text-center w-full max-w-full overflow-hidden border-2">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mx-auto border-2"
            id="hero-title">
            {t("hero.title")}
          </h2>
        </div>

        <div className="text-center w-full mt-2 max-w-full overflow-hidden border-2">
          <h3 className="text-purple-800 dark:text-purple-300 border-2">
            {t("hero.subtitle")}
          </h3>
        </div>
      </div>

      {/* Parallax Image */}
      <div className="row-span-1">
        <ParallaxImage
          height="100%"
          nonce={nonce ?? undefined}
          width="100%"
        />
      </div>
    </div>
  );
}
