"use client";

import React, { useContext } from "react";
import Spline from "@splinetool/react-spline";

import { NonceContext } from "@/src/app/providers";

export default function SplineScene() {
  const nonce = useContext(NonceContext);
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "development";

  interface SplineMouseEvent {
    target: {
      name: string;
    };
  }

  // Map environments to base domains
  const baseDomainMap: Record<string, string> = {
    production: "https://www.jerenyon.dev",
    staging: "https://staging.jerenyon.dev",
    development: "http://localhost:3000",
    vercel: "https://vercel.live", // Added Vercel domain
  };
  const baseDomain = baseDomainMap[environment];

  console.log(`Current Environment: ${environment}`);
  console.log(`Base Domain: ${baseDomain}`);

  // Event handler action mapping
  const onSplineMouseDown = (e: SplineMouseEvent) => {
    console.log(`Button Clicked: ${e.target.name}`);
    const actionMap: Record<string, () => void> = {
      "button-estimate": () => {
        window.parent.postMessage(
          { action: "navigate", path: "/estimate" },
          baseDomain,
        );
      },
      "button-journey": () => {
        window.parent.postMessage(
          { action: "navigate", path: "/about" },
          baseDomain,
        );
      },
      "button-hub": () => {
        window.parent.postMessage(
          { action: "navigate", path: "/knowledge-hub" },
          baseDomain,
        );
      },
      "button-contact": () => {
        window.parent.postMessage(
          { action: "navigate", path: "/contact" },
          baseDomain,
        );
      },
    };

    const action = actionMap[e.target.name];

    if (action) {
      action();
    } else {
      console.warn(`No action mapped for button: ${e.target.name}`);
    }
  };

  return (
    <div className="w-full h-full bg-background">
      <Spline
        className="bg-transparent"
        nonce={nonce}
        scene="https://jerenyon-dev-remote-pull.b-cdn.net/spline-scene/hero-3d-scene.splinecode"
        onSplineMouseDown={onSplineMouseDown}
      />
    </div>
  );
}

// button-estimate
