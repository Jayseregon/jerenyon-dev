"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import CTAButtons from "./CTAButtons";

interface ParallaxImageProps {
  width?: string;
  height?: string;
  marginTopClass?: string;
  nonce?: string;
}

export default function ParallaxImage({
  width = "100%",
  height = "100%",
  marginTopClass = "mt-0",
  nonce,
}: ParallaxImageProps) {
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

  const layers = [
    {
      depth: 5,
      zIndex: 0,
      darkImage: "shadows-neons-dark.webp",
      lightImage: "shadows-neons-light.webp",
      altImage: "shadows neons layer",
    },
    { depth: 5, zIndex: 0, image: "layer-neons.webp", altImage: "neons layer" },
    {
      depth: 7,
      zIndex: 10,
      darkImage: "shadows-base-dark.webp",
      lightImage: "shadows-base-light.webp",
      altImage: "shadows base layer",
    },
    {
      depth: 7,
      zIndex: 10,
      darkImage: "layer-base-dark.webp",
      lightImage: "layer-base-light.webp",
      altImage: "base layer",
    },
    {
      depth: 10,
      zIndex: 30,
      darkImage: "layer-texts-dark.webp",
      lightImage: "layer-texts-light.webp",
      altImage: "texts layer",
    },
  ];

  const renderLayers = (theme: "dark" | "light") => {
    return layers.map((layer, index) => {
      const image =
        theme === "dark"
          ? layer.darkImage || layer.image
          : layer.lightImage || layer.image;

      return (
        <motion.div
          key={index}
          animate={{
            x: calcMovement(layer.depth, "x"),
            y: calcMovement(layer.depth, "y"),
          }}
          className={`absolute inset-0 z-${layer.zIndex}`}
          nonce={nonce}
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <Image
            fill
            alt={layer.altImage}
            fetchPriority={"high"}
            priority={true}
            sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
            src={`/landingPage/${image}`}
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      );
    });
  };

  return (
    <div
      className={`relative z-30 mx-auto ${marginTopClass}`}
      style={{ width, height }}
    >
      {/* Buttons */}
      <div className="absolute inset-0 flex items-center justify-center">
        <CTAButtons />
      </div>

      {theme === "dark" ? renderLayers("dark") : renderLayers("light")}
    </div>
  );
}
