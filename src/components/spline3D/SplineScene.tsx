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
    production: "https://jerenyon.dev",
    staging: "https://staging.jerenyon.dev",
    development: "http://localhost:3000",
  };
  const baseDomain = baseDomainMap[environment];

  // Event handler action mapping
  const onSplineMouseDown = (e: SplineMouseEvent) => {
    const actionMap: Record<string, () => void> = {
      "button-estimate": () => {
        console.log("Clicked Quoting Tool button.");
        window.parent.postMessage(
          { action: "navigate", path: "/estimate" },
          baseDomain,
        );
      },
      "button-journey": () => {
        console.log("Clicked Resume button.");
        window.parent.postMessage(
          { action: "navigate", path: "/about" },
          baseDomain,
        );
      },
      "button-hub": () => {
        console.log("Clicked Knowledge-Hub button.");
        window.parent.postMessage(
          { action: "navigate", path: "/knowledge-hub" },
          baseDomain,
        );
      },
      "button-contact": () => {
        console.log("Clicked Contact button.");
        window.parent.postMessage(
          { action: "navigate", path: "/contact" },
          baseDomain,
        );
      },
    };

    const action = actionMap[e.target.name];

    if (action) {
      action();
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
