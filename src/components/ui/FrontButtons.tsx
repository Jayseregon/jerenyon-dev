"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function FrontButtons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];
  const { theme } = useTheme();
  const [paths, setPaths] = useState<string[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [deviceTilt, setDeviceTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
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

  useEffect(() => {
    const updatePaths = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      const isLandscape = containerRect.width > containerRect.height;

      const newPaths = buttonRefs.map((ref, index) => {
        if (!ref.current) return "";

        const buttonRect = ref.current.getBoundingClientRect();
        const buttonX =
          buttonRect.left + buttonRect.width / 2 - containerRect.left;
        const buttonY =
          buttonRect.top + buttonRect.height / 2 - containerRect.top;

        // Define unique points for each button's path
        const screenWidth = window.innerWidth;
        let points;

        switch (index) {
          // resume button
          case 0:
            if (screenWidth < 640) {
              if (isLandscape) {
                // xs landscape
                points = [
                  { x: buttonX, y: buttonY },
                  { x: buttonX, y: buttonY + centerY - 20 },
                  { x: centerX, y: centerY },
                ];
              } else {
                // xs portrait
                points = [
                  { x: buttonX, y: buttonY },
                  { x: buttonX - 15, y: buttonY },
                  { x: buttonX - 15, y: buttonY + centerY - 40 },
                  { x: centerX, y: centerY },
                ];
              }
            } else if (screenWidth < 768) {
              // sm
              points = [
                { x: buttonX, y: buttonY },
                { x: buttonX - 40, y: buttonY },
                { x: buttonX - 40, y: buttonY + centerY - 30 },
                { x: centerX, y: centerY + 100 },
              ];
            } else {
              // md
              points = [
                { x: buttonX, y: buttonY },
                { x: buttonX, y: buttonY + centerY - 10 },
                { x: centerX / 2 - 20, y: centerY + 50 },
                { x: centerX, y: centerY },
              ];
            }
            break;
          // contact button
          case 1:
            if (screenWidth < 640) {
              if (isLandscape) {
                // xs landscape
                points = [
                  { x: buttonX, y: buttonY },
                  { x: buttonX, y: buttonY + centerY - 15 },
                  { x: centerX, y: centerY + 15 },
                ];
              } else {
                // xs portrait
                points = [
                  { x: buttonX + 40, y: buttonY },
                  { x: buttonX + 40, y: buttonY + centerY - 30 },
                  { x: centerX, y: centerY + 30 },
                ];
              }
            } else if (screenWidth < 768) {
              // sm
              points = [
                { x: buttonX + 40, y: buttonY },
                { x: buttonX + 40, y: buttonY + centerY - 30 },
                { x: centerX, y: centerY + 30 },
              ];
            } else {
              // md
              points = [
                { x: buttonX + 20, y: buttonY },
                { x: buttonX + 20, y: buttonY + centerY - 30 },
                { x: centerX, y: centerY + 50 },
              ];
            }
            break;
          // pricing button
          case 2:
            if (screenWidth < 640) {
              if (isLandscape) {
                // xs landscape
                points = [
                  { x: buttonX, y: buttonY },
                  { x: (buttonX + centerX) / 2 - 30, y: buttonY },
                  {
                    x: (buttonX + centerX) / 2 - 30,
                    y: (buttonY + centerY) / 2 - 15,
                  },
                  { x: centerX, y: centerY },
                ];
              } else {
                // xs portrait
                points = [
                  { x: buttonX, y: buttonY },
                  { x: buttonX, y: (buttonY + centerY) / 2 + 30 },
                  {
                    x: (buttonX + centerX) / 2 + 30,
                    y: (buttonY + centerY) / 2 + 30,
                  },
                  {
                    x: (buttonX + centerX) / 2 + 30,
                    y: (buttonY + centerY) / 2 - 40,
                  },
                ];
              }
            } else if (screenWidth < 768) {
              // sm
              points = [
                { x: buttonX, y: buttonY },
                { x: buttonX, y: (buttonY + centerY) / 2 + 80 },
                {
                  x: (buttonX + centerX) / 2 + 30,
                  y: (buttonY + centerY) / 2 + 80,
                },
                {
                  x: (buttonX + centerX) / 2 + 30,
                  y: (buttonY + centerY) / 2 - 40,
                },
              ];
            } else {
              // md
              points = [
                { x: buttonX, y: buttonY },
                { x: buttonX, y: (buttonY + centerY) / 2 + 80 },
                {
                  x: (buttonX + centerX) / 3 - 30,
                  y: (buttonY + centerY) / 2 + 80,
                },
                {
                  x: (buttonX + centerX) / 3 - 30,
                  y: (buttonY + centerY) / 2 - 10,
                },
                { x: centerX, y: centerY },
              ];
            }
            break;
          // demo button
          case 3:
            if (screenWidth < 640) {
              if (isLandscape) {
                // xs landscape
                points = [
                  { x: buttonX, y: buttonY },
                  { x: (buttonX + centerX) / 2 - 30, y: buttonY },
                  {
                    x: (buttonX + centerX) / 2 - 30,
                    y: (buttonY + centerY) / 2 - 15,
                  },
                  { x: centerX, y: centerY },
                ];
              } else {
                // xs portrait
                points = [
                  { x: buttonX, y: buttonY },
                  { x: (buttonX + centerX) / 2 - 50, y: buttonY },
                  {
                    x: (buttonX + centerX) / 2 - 50,
                    y: (buttonY + centerY) / 2 - 30,
                  },
                  { x: centerX, y: centerY },
                ];
              }
            } else if (screenWidth < 768) {
              // sm
              points = [
                { x: buttonX, y: buttonY },
                { x: (buttonX + centerX) / 2, y: buttonY },
                {
                  x: (buttonX + centerX) / 2,
                  y: (buttonY + centerY) / 2 - 30,
                },
                { x: centerX, y: centerY },
              ];
            } else {
              // md
              points = [
                { x: buttonX, y: buttonY },
                { x: (buttonX + centerX) / 2 - 10, y: buttonY },
                {
                  x: (buttonX + centerX) / 2 - 10,
                  y: (buttonY + centerY) / 2 + 20,
                },
                { x: centerX, y: centerY + 50 },
              ];
            }
            break;

          default:
            points = [
              { x: buttonX, y: buttonY },
              { x: centerX, y: centerY },
            ];
        }

        // Generate the path string
        const path = points
          .map((point, i) =>
            i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
          )
          .join(" ");

        return path;
      });

      setPaths(newPaths);
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);

    return () => {
      window.removeEventListener("resize", updatePaths);
    };
  }, [mousePos.x, mousePos.y, deviceTilt.x, deviceTilt.y]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full max-w-lg sm:max-w-xl md:max-w-4xl">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="neon-blur">
            <feGaussianBlur
              result="blur"
              stdDeviation="2"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shadow">
            <feDropShadow
              dx="4"
              dy="4"
              floodColor={theme === "dark" ? "#000039" : "#967b93"}
              stdDeviation="3"
            />
          </filter>
        </defs>
        {paths.map((d, index) => (
          <React.Fragment key={index}>
            {/* Background path with shadow */}
            <motion.path
              animate={{
                pathLength: 1,
                x: calcMovement(5, "x"),
                y: calcMovement(5, "y"),
              }}
              d={d}
              fill="none"
              initial={{ pathLength: 0 }}
              stroke="#eec198"
              strokeWidth="3"
              style={{
                filter: "url(#shadow)",
              }}
              transition={{ duration: 2 }}
            />
            {/* Foreground path with lighter blur */}
            <motion.path
              animate={{
                pathLength: 1,
                x: calcMovement(5, "x"),
                y: calcMovement(5, "y"),
              }}
              d={d}
              fill="none"
              initial={{ pathLength: 0 }}
              stroke="#fbf8b7"
              strokeWidth="1"
              style={{
                filter: "url(#neon-blur)",
              }}
              transition={{ duration: 2 }}
            />
          </React.Fragment>
        ))}
      </svg>

      <Button
        ref={buttonRefs[0]}
        showAnchorIcon
        as={Link}
        className="absolute top-5 left-5 bg-blue-500 text-white p-2 rounded-xl z-50"
        href="/resume"
        variant="solid">
        Resume
      </Button>

      <Button
        ref={buttonRefs[1]}
        showAnchorIcon
        as={Link}
        className="absolute top-5 right-5 bg-green-500 text-white p-2 rounded-xl z-50"
        href="/contact"
        variant="solid">
        Contact
      </Button>

      <Button
        ref={buttonRefs[2]}
        showAnchorIcon
        as={Link}
        className="absolute bottom-5 left-5 bg-red-500 text-white p-2 rounded-xl z-50"
        href="/pricing"
        variant="solid">
        Pricing
      </Button>

      <Button
        ref={buttonRefs[3]}
        showAnchorIcon
        as={Link}
        className="absolute bottom-5 right-5 bg-yellow-500 text-white p-2 rounded-xl z-50"
        href="#"
        variant="solid">
        Demo
      </Button>
    </div>
  );
}
