"use client";

import React, { useContext } from "react";
import Spline from "@splinetool/react-spline";

import { NonceContext } from "@/src/app/providers";

export default function SplineScene() {
  const nonce = useContext(NonceContext);

  return (
    <div className="w-full h-full bg-background">
      <Spline
        className="bg-transparent"
        nonce={nonce}
        scene="https://jerenyon-dev-remote-pull.b-cdn.net/spline-scene/landing-codeblock-scene.splinecode"
      />
    </div>
  );
}
