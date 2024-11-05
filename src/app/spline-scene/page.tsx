import React, { Suspense } from "react";

import Scene3D from "@/components/spline3D/Scene3D";

import SplineSceneLoading from "./SplineSceneLoading";

export default function SplineScenePage() {
  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<SplineSceneLoading />}>
        <Scene3D />
      </Suspense>
    </div>
  );
}
