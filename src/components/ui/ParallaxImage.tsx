import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ParallaxImage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const calcMovement = (layerDepth: number, axis: "x" | "y") => {
    const movementFactor = axis === "x" ? mousePos.x : mousePos.y;

    return -movementFactor * (layerDepth / 200); // Inverted movement factor
  };

  if (!mounted) {
    return null; // Render nothing on the server
  }

  const darkThemeStyles = {
    backgroundImage: "url(/layers/imageShadowsDark.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    objectFit: "contain",
    objectPosition: "center",
    filter: "blur(0.4px)",
  };

  const lightThemeStyles = {
    backgroundImage: "url(/layers/imageShadowsLight.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    objectFit: "contain",
    objectPosition: "center",
    filter: "blur(0.4px)",
    opacity: 0.5,
  };

  return (
    <div
      className="relative h-screen w-screen scale-90 md:scale-[0.7] z-30"
      onMouseMove={handleMouseMove}
    >
      {theme === "dark" ? (
        <>
          <motion.div
            animate={{ x: calcMovement(6, "x"), y: calcMovement(6, "y") }}
            className="absolute inset-0 z-10"
            style={darkThemeStyles as React.CSSProperties}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(6, "x"), y: calcMovement(6, "y") }}
            className="absolute inset-0 z-20"
            style={
              {
                ...darkThemeStyles,
                backgroundImage: "url(/layers/layer5.png)",
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(7, "x"), y: calcMovement(7, "y") }}
            className="absolute inset-0 z-30"
            style={
              {
                ...darkThemeStyles,
                backgroundImage: "url(/layers/layer3.png)",
                filter: "blur(0.3px)",
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(7, "x"), y: calcMovement(7, "y") }}
            className="absolute inset-0 z-30"
            style={
              {
                ...darkThemeStyles,
                backgroundImage: "url(/layers/layer2.png)",
                filter: "blur(0.2px)",
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(9, "x"), y: calcMovement(9, "y") }}
            className="absolute inset-0 z-40"
            style={
              {
                ...darkThemeStyles,
                backgroundImage: "url(/layers/textShadowsDark.png)",
                filter: "blur(0.2px)",
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(10, "x"), y: calcMovement(10, "y") }}
            className="absolute inset-0 z-50"
            style={
              {
                ...darkThemeStyles,
                backgroundImage: "url(/layers/layer1.png)",
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </>
      ) : (
        <>
          <motion.div
            animate={{ x: calcMovement(6, "x"), y: calcMovement(6, "y") }}
            className="absolute inset-0 z-10"
            style={lightThemeStyles as React.CSSProperties}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(6, "x"), y: calcMovement(6, "y") }}
            className="absolute inset-0 z-20"
            style={
              {
                ...lightThemeStyles,
                backgroundImage: "url(/layers/layer5.png)",
                opacity: 1,
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(7, "x"), y: calcMovement(7, "y") }}
            className="absolute inset-0 z-30"
            style={
              {
                ...lightThemeStyles,
                backgroundImage: "url(/layers/layer3.png)",
                filter: "blur(0.3px)",
                opacity: 1,
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(7, "x"), y: calcMovement(7, "y") }}
            className="absolute inset-0 z-30"
            style={
              {
                ...lightThemeStyles,
                backgroundImage: "url(/layers/layer2.png)",
                filter: "blur(0.2px)",
                opacity: 1,
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(9, "x"), y: calcMovement(9, "y") }}
            className="absolute inset-0 z-40"
            style={
              {
                ...lightThemeStyles,
                backgroundImage: "url(/layers/textShadowsLight.png)",
                filter: "blur(0.2px)",
                opacity: 0.5,
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(10, "x"), y: calcMovement(10, "y") }}
            className="absolute inset-0 z-50"
            style={
              {
                ...lightThemeStyles,
                backgroundImage: "url(/layers/layer1.png)",
                opacity: 1,
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </>
      )}
    </div>
  );
}
