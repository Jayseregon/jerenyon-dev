import { useTranslations } from "next-intl";
import React, { Suspense } from "react";

import SplineScene from "@/src/components/spline3D/SplineScene";

import Loading from "./loading";

export default function RootPage() {
  const t = useTranslations("homepage");

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background flex items-center justify-center">
      <Suspense fallback={<Loading />}>
        <SplineScene />
      </Suspense>

      {/* Hero Title and Subtitle */}
      <div className="absolute bottom-0 w-full flex flex-col items-center justify-center pb-5 z-10">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground"
          id="hero-title"
        >
          {t("hero.title")}
        </h2>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-secondary text-center">
          {t("hero.subtitle")}
        </p>
      </div>
    </div>
  );
}
