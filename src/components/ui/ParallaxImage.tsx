import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ParallaxImage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [deviceTilt, setDeviceTilt] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      const tiltX = e.gamma || 0; // Left to right tilt (gamma)
      const tiltY = e.beta || 0; // Front to back tilt (beta)

      setDeviceTilt({ x: tiltX, y: tiltY });
    };

    // Add mouse event listener for desktops
    window.addEventListener("mousemove", handleMouseMove);

    // Add device motion event listener for mobile
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    // Clean up event listeners
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  const calcMovement = (layerDepth: number, axis: "x" | "y") => {
    const movementFactor = axis === "x" ? mousePos.x : mousePos.y;
    const tiltFactor = axis === "x" ? deviceTilt.x : deviceTilt.y;

    return (
      -movementFactor * (layerDepth / 200) + // Mouse-based movement
      tiltFactor * (layerDepth / 5) // Device tilt-based movement
    );
  };

  if (!mounted) {
    return null; // Render nothing on the server
  }

  const darkThemeStyles = {
    backgroundImage: "url(/landingPage/shadows-neons-dark.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    objectFit: "contain",
    objectPosition: "center",
    filter: "blur(0.4px)",
  };

  const lightThemeStyles = {
    backgroundImage: "url(/landingPage/shadows-neons-light.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    objectFit: "contain",
    objectPosition: "center",
    filter: "blur(0.4px)",
    opacity: 0.5,
  };

  return (
    <div className="relative h-screen w-screen md:scale-[0.7] z-30">
      {theme === "dark" ? (
        <motion.div>
          <motion.div
            animate={{ x: calcMovement(5, "x"), y: calcMovement(6, "y") }}
            className="absolute inset-0 z-0"
            style={darkThemeStyles as React.CSSProperties}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(5, "x"), y: calcMovement(6, "y") }}
            className="absolute inset-0 z-0"
            style={
              {
                ...darkThemeStyles,
                backgroundImage: "url(/landingPage/layer-neons.png)",
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(7, "x"), y: calcMovement(7, "y") }}
            className="absolute inset-0 z-10"
            style={
              {
                ...darkThemeStyles,
                backgroundImage: "url(/landingPage/shadows-base-dark.png)",
                filter: "blur(0.3px)",
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(7, "x"), y: calcMovement(7, "y") }}
            className="absolute inset-0 z-10"
            style={
              {
                ...darkThemeStyles,
                backgroundImage: "url(/landingPage/layer-base-dark.png)",
                filter: "blur(0.2px)",
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(10, "x"), y: calcMovement(9, "y") }}
            className="absolute inset-0 z-20"
            style={
              {
                ...darkThemeStyles,
                backgroundImage: "url(/landingPage/shadows-texts-dark.png)",
                filter: "blur(0.2px)",
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(10, "x"), y: calcMovement(10, "y") }}
            className="absolute inset-0 z-30"
            style={
              {
                ...darkThemeStyles,
                backgroundImage: "url(/landingPage/layer-texts.png)",
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </motion.div>
      ) : (
        <>
          <motion.div
            animate={{ x: calcMovement(5, "x"), y: calcMovement(6, "y") }}
            className="absolute inset-0 z-0"
            style={lightThemeStyles as React.CSSProperties}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(5, "x"), y: calcMovement(6, "y") }}
            className="absolute inset-0 z-0"
            style={
              {
                ...lightThemeStyles,
                backgroundImage: "url(/landingPage/layer-neons.png)",
                opacity: 1,
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(7, "x"), y: calcMovement(7, "y") }}
            className="absolute inset-0 z-10"
            style={
              {
                ...lightThemeStyles,
                backgroundImage: "url(/landingPage/shadows-base-light.png)",
                filter: "blur(0.3px)",
                opacity: 1,
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(7, "x"), y: calcMovement(7, "y") }}
            className="absolute inset-0 z-10"
            style={
              {
                ...lightThemeStyles,
                backgroundImage: "url(/landingPage/layer-base-light.png)",
                filter: "blur(0.2px)",
                opacity: 1,
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(10, "x"), y: calcMovement(9, "y") }}
            className="absolute inset-0 z-20"
            style={
              {
                ...lightThemeStyles,
                backgroundImage: "url(/landingPage/shadows-texts-light.png)",
                filter: "blur(0.2px)",
                opacity: 0.5,
              } as React.CSSProperties
            }
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          <motion.div
            animate={{ x: calcMovement(10, "x"), y: calcMovement(10, "y") }}
            className="absolute inset-0 z-30"
            style={
              {
                ...lightThemeStyles,
                backgroundImage: "url(/landingPage/layer-texts.png)",
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
