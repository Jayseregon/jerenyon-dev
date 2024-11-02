"use client";

import React, { useContext } from "react";
import Spline from "@splinetool/react-spline";

import { NonceContext } from "@/src/app/providers";

export default function SplineScene() {
  const nonce = useContext(NonceContext);

  interface SplineMouseEvent {
    target: {
      name: string;
    };
  }

  function onSplineMouseDown(e: SplineMouseEvent) {
    if (e.target.name === "button-estimate") {
      console.log("I have been clicked!");
    }
  }

  return (
    <div className="w-full h-full bg-background">
      <Spline
        className="bg-transparent"
        nonce={nonce}
        scene="https://jerenyon-dev-remote-pull.b-cdn.net/spline-scene/landing-codeblock-scene-3.splinecode"
        // onSplineMouseDown={onSplineMouseDown}
      />
    </div>
  );
}

// button-estimate
