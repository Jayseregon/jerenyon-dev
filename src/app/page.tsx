"use client";

import { useTranslations } from "next-intl";
import React, { useContext, Suspense } from "react";
import dynamic from "next/dynamic";

import { NonceContext } from "@/src/app/providers";

import Loading from "./loading";

// // Dynamically import CustomSplineScene with SSR disabled
// const SplineScene = dynamic(() => import("@/components/spline3D/SplineScene"), {
//   ssr: false,
// });

export default function RootPage() {
  const t = useTranslations("homepage");
  const nonce = useContext(NonceContext);

  return (
    <>
      <div
        className="relative h-screen w-screen overflow-hidden bg-background flex items-center justify-center"
        nonce={nonce}>
        {/* <Suspense fallback={<Loading />}>
          <SplineScene />
        </Suspense> */}

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
    </>
  );
}
