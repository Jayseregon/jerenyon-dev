import Spline from "@splinetool/react-spline/next";
import { Suspense } from "react";

import SplineEventHandler from "./SplineEventHandler";
import Loading from "./loading";

export default function SplineScene() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-full bg-background">
        <Spline scene="/spline/hero-3d-scene.splinecode" />
        <SplineEventHandler />
      </div>
    </Suspense>
  );
}
