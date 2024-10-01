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
    <div className="relative h-screen w-screen overflow-hidden grid grid-rows-[minmax(0,2fr)_minmax(0,1fr)] sm:grid-rows-[minmax(0,1fr)_minmax(0,auto)] border-2">
      {/* Parallax Image */}
      <div className="row-span-1 max-h-[70vh] mt-16 border-2">
        <ParallaxImage
          height="100%"
          nonce={nonce ?? undefined}
          width="100%"
        />
      </div>

      {/* Hero Title and Subtitle */}
      <div className="flex flex-col items-center justify-start pb-5  overflow-hidden border-2">
        <div className="text-center w-full max-w-full overflow-hidden">
          <div className="grid grid-cols-1 gap-1">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mx-auto border-2"
              id="hero-title1">
              {t("hero.title1")}
            </h2>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mx-auto border-2"
              id="hero-title1">
              {t("hero.title2")}
            </h2>
          </div>
        </div>

        <div className="text-center w-full max-w-full my-2 overflow-hidden">
          <h3 className="text-purple-800 dark:text-purple-300 text-xs sm:text-sm md:text-base border-2">
            {t("hero.subtitle")}
          </h3>
        </div>
      </div>
    </div>
  );
}
