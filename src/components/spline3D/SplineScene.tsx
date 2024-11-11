import Spline from "@splinetool/react-spline/next";
import { Suspense } from "react";
import { headers } from "next/headers";

import SplineEventHandler from "./SplineEventHandler";
import Loading from "./loading";

export default async function SplineScene() {
  const nonce = (await headers()).get("x-nonce") || "";

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-full bg-background">
        <Spline
          nonce={nonce}
          scene="/spline/hero-3d-scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
        <SplineEventHandler />
      </div>
    </Suspense>
  );
}
