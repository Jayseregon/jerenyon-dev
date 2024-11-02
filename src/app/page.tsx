"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import { NonceContext } from "@/src/app/providers";
import IframeWithLoader from "@/components/spline3D/IframeWithLoader";

export default function RootPage() {
  const t = useTranslations("homepage");
  const nonce = useContext(NonceContext);
  const router = useRouter();

  useEffect(() => {
    const allowedOrigins = [
      "https://www.jerenyon.dev",
      "https://staging.jerenyon.dev",
      "http://localhost:3000",
      "https://vercel.live",
    ];

    const handleMessage = (event: MessageEvent) => {
      if (
        allowedOrigins.includes(event.origin) &&
        event.data.action === "navigate" &&
        event.data.path
      ) {
        router.push(event.data.path);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-background flex items-center justify-center"
      nonce={nonce}
    >
      <IframeWithLoader nonce={nonce} src="/spline-scene" title="3D Scene" />

      {/* Hero Title and Subtitle */}
      <div
        className="absolute bottom-0 w-full flex flex-col items-center justify-center pb-5 z-10"
        nonce={nonce}
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground"
          id="hero-title"
          nonce={nonce}
        >
          {t("hero.title")}
        </h2>
        <p
          className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-secondary text-center"
          nonce={nonce}
        >
          {t("hero.subtitle")}
        </p>
      </div>
    </div>
  );
}
