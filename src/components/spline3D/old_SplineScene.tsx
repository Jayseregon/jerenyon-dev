"use client";

import React, { useContext, Suspense } from "react";
// import Spline from "@splinetool/react-spline";
import dynamic from "next/dynamic";

import { NonceContext } from "@/src/app/providers";

// Dynamically import Spline with SSR disabled
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

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
    vercel: "https://vercel.live",
  };
  const baseDomain = baseDomainMap[environment];

  // Event handler action mapping
  const onSplineMouseDown = (e: SplineMouseEvent) => {
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
    }
  };

  return (
    <div className="w-full h-full bg-background">
      <Suspense fallback={<div>Loading 3D Scene...</div>}>
        <Spline
          className="bg-transparent"
          nonce={nonce}
          scene="https://jerenyon-dev-remote-pull.b-cdn.net/spline-scene/hero-3d-scene.splinecode"
          onSplineMouseDown={onSplineMouseDown}
        />
      </Suspense>
    </div>
  );
}
