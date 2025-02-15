import { useTranslations } from "next-intl";
import React from "react";

export const Hero = () => {
  const t = useTranslations("homepage");

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center px-2 z-50">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground"
        id="hero-title"
      >
        {t("hero.title")}
      </h2>
      <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-secondary text-center max-w-lg sm:max-w-xl md:max-w-3xl">
        {t("hero.subtitle")}
      </p>
    </div>
  );
};
