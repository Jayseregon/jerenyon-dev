import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { ModelSwitcher } from "@/src/components/embeddings/ModelSwitcher";
import { useModelStore } from "@/src/store/modelStore";
import { useUIStore } from "@/src/store/uiStore";

export const Hero = () => {
  const t = useTranslations("homepage");
  const hoveredDefinition = useModelStore((state) => state.hoveredDefinition);
  const hoveredCoordinates = useModelStore((state) => state.hoveredCoordinates);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

  const { setShowCollapsedMenu } = useUIStore();

  // Optimize resize listener with debounce
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial update
    updateDimensions();

    // Debounced resize listener
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Optimize box style calculation
  const boxStyle = React.useMemo(() => {
    if (!hoveredCoordinates) return {};

    const offset = 10;
    const boxHeightEstimate = 100;
    const normalizedX = hoveredCoordinates.x / windowDimensions.width;
    const normalizedY = hoveredCoordinates.y / windowDimensions.height;
    const style: React.CSSProperties = { position: "absolute" };

    if (normalizedX <= 0.5) {
      style.left = hoveredCoordinates.x + offset;
    } else {
      style.right = windowDimensions.width - hoveredCoordinates.x + offset;
    }

    if (normalizedY <= 0.5) {
      style.top = hoveredCoordinates.y + boxHeightEstimate;
    } else {
      style.top = hoveredCoordinates.y - boxHeightEstimate;
    }

    return style;
  }, [hoveredCoordinates, windowDimensions]);

  // Pre-define hero elements with priority rendering hints
  const heroContent = (
    <div className="bg-background p-4 rounded-full border border-purple-800 dark:border-purple-300 transition-opacity duration-300 hover:opacity-0">
      {/* Add priority attribute to improve LCP */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground"
        data-priority="high"
        id="hero-title"
      >
        {t("hero.title")}
      </h2>
      <p className="mt-4 text-lg sm:text-xl md:text-2xl text-secondary text-center max-w-lg sm:max-w-xl md:max-w-3xl">
        {t("hero.subtitle")}
      </p>
    </div>
  );

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
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center px-2 z-20"
          role="button"
          tabIndex={0}
          onClick={() => {
            if (windowDimensions.width < 768) {
              setShowCollapsedMenu(true);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && windowDimensions.width < 768) {
              setShowCollapsedMenu(true);
            }
          }}
        >
          {heroContent}
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
