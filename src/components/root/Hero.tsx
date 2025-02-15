import { useTranslations } from "next-intl";
import React from "react";

export const Hero = () => {
  const t = useTranslations("homepage");

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center px-2 z-50">
      <div className="bg-background p-4 rounded-full border border-purple-800 dark:border-purple-300 transition-opacity duration-300 hover:opacity-0">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground"
          id="hero-title">
          {t("hero.title")}
        </h2>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-secondary text-center max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          {t("hero.subtitle")}
        </p>
      </div>
    </div>
  );
};
