import React from "react";
import { useTranslations } from "next-intl";

import { ModelSwitcher } from "@/src/components/modelSwitcher/ModelSwitcher";
import { useModelStore } from "@/src/store/modelStore";

export const Hero = () => {
  const t = useTranslations("homepage");
  const hoveredDefinition = useModelStore((state) => state.hoveredDefinition);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center px-2 z-50">
        {hoveredDefinition ? (
          <div className="bg-background p-4 rounded-xl border border-purple-800 dark:border-purple-300 transition-opacity duration-300 hover:opacity-0">
            <h2
              className="text-2xl sm:text-3xl font-bold text-center text-foreground"
              id={hoveredDefinition.keyword}
            >
              {hoveredDefinition.keyword}
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-secondary text-start">
              {hoveredDefinition.definition}
            </p>
            <p className="mt-3 text-base sm:text-lg text-secondary text-start">
              <span className="text-purple-800 dark:text-purple-300">
                Why It Matters:
              </span>{" "}
              {hoveredDefinition.why}
            </p>
          </div>
        ) : (
          <div className="bg-background p-4 rounded-full border border-purple-800 dark:border-purple-300 transition-opacity duration-300 hover:opacity-0">
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
        )}
      </div>

      {!hoveredDefinition && (
        <div className="absolute top-[calc(50%+125px)] left-1/2 -translate-x-1/2 z-50">
          <ModelSwitcher />
        </div>
      )}
    </>
  );
};
