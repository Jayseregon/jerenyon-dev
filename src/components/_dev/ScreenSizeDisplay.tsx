"use client";

import React, { useEffect, useState } from "react";

const ScreenSizeDisplay: React.FC = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Set initial screen size
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="text-center w-full max-w-full my-2 overflow-hidden">
      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
        Screen Size: {screenSize.width} x {screenSize.height}
      </p>
    </div>
  );
};

export default ScreenSizeDisplay;
