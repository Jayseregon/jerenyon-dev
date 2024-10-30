import { useTranslations } from "next-intl";
import { headers } from "next/headers";

import { siteConfig } from "../config/site";

export const metadata = {
  title: `${siteConfig.heroTitle} with ${siteConfig.name}`,
};

export default function RootPage() {
  const t = useTranslations("homepage");
  const nonce = headers().get("x-nonce") ?? "";

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-background"
      nonce={nonce}
    >
      {/* Spline Scene iframe */}
      <iframe
        className="relative w-full h-full sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full border-2 border-red-500 bg-transparent"
        nonce={nonce}
        sandbox="allow-scripts allow-same-origin allow-popups"
        src="/spline-scene"
        title="3D Scene"
      />

      {/* Hero Title and Subtitle */}
      <div
        className="absolute bottom-0 w-full flex flex-col items-center justify-center pb-5 z-10"
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
