import { useTranslations } from "next-intl";
import { headers } from "next/headers";

import Scene3D from "@/components/spline3D/Scene3D";

import { siteConfig } from "../config/site";

export const metadata = {
  title: `${siteConfig.heroTitle} with ${siteConfig.name}`,
};

export default function RootPage() {
  const t = useTranslations("homepage");
  const nonce = headers().get("x-nonce") ?? "";

  return (
    <div className="relative h-screen w-screen overflow-hidden" nonce={nonce}>
      {/* Parallax Image */}
      <div className="relative h-full w-full border-2" nonce={nonce}>
        <Scene3D />
      </div>

      {/* Hero Title and Subtitle */}
      <div
        className="absolute bottom-0 w-full flex flex-col items-center justify-center pb-5 border-2"
        nonce={nonce}
      >
        <div
          className="text-center w-full max-w-full overflow-hidden"
          nonce={nonce}
        >
          <div className="grid grid-cols-1 gap-1" nonce={nonce}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mx-auto"
              id="hero-title1"
              nonce={nonce}
            >
              {t("hero.title1")}
            </h2>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mx-auto"
              id="hero-title2"
              nonce={nonce}
            >
              {t("hero.title2")}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
