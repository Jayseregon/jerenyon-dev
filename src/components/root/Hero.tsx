import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { ModelSwitcher } from "@/src/components/embeddings/ModelSwitcher";
import { useModelStore } from "@/src/store/modelStore";

export const Hero = () => {
  const t = useTranslations("homepage");
  const hoveredDefinition = useModelStore((state) => state.hoveredDefinition);
  const hoveredCoordinates = useModelStore((state) => state.hoveredCoordinates);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 800,
    height: 600,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  let boxStyle = {};

  if (hoveredCoordinates) {
    const offset = 10; // margin offset
    const boxHeightEstimate = 100; // estimated box height
    const normalizedX = hoveredCoordinates.x / windowDimensions.width;
    const normalizedY = hoveredCoordinates.y / windowDimensions.height;
    const style: React.CSSProperties = { position: "absolute" };

    // Horizontal binding with margin:
    if (normalizedX <= 0.5) {
      // Bind left side with offset
      style.left = hoveredCoordinates.x + offset;
    } else {
      // Bind right side with offset
      style.right = windowDimensions.width - hoveredCoordinates.x + offset;
    }

    // Vertical binding with margin:
    if (normalizedY <= 0.5) {
      // Bind top edge with offset
      style.top = hoveredCoordinates.y + boxHeightEstimate;
    } else {
      // Bind bottom edge with offset
      style.top = hoveredCoordinates.y - boxHeightEstimate;
    }

    boxStyle = style;
  }

  return (
    <>
      {hoveredDefinition && hoveredCoordinates ? (
        <div
          className="bg-background p-4 rounded-xl border border-purple-800 dark:border-purple-300 transition-opacity duration-300 md:max-w-xl"
          style={boxStyle}
        >
          <h2
            className="text-xl sm:text-2xl font-bold text-center text-foreground"
            id={hoveredDefinition.keyword}
          >
            {hoveredDefinition.keyword}
          </h2>
          <p className="mt-3 text-lg md:text-xl text-purple-800 dark:text-purple-300 text-start">
            {hoveredDefinition.why}
          </p>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center px-2 z-20">
          <div className="bg-background p-4 rounded-full border border-purple-800 dark:border-purple-300 transition-opacity duration-300 hover:opacity-0">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground"
              id="hero-title"
            >
              {t("hero.title")}
            </h2>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-secondary text-center max-w-lg sm:max-w-xl md:max-w-3xl">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      )}

      {!hoveredDefinition && (
        <div className="absolute top-[calc(50%+125px)] left-1/2 -translate-x-1/2 z-20">
          <ModelSwitcher />
        </div>
      )}
    </>
  );
};
