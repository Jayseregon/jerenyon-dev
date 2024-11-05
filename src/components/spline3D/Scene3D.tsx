import React, { Suspense } from "react";

import Loading from "./loading";

// Remove direct dynamic import if using React.lazy
const LazySplineScene = React.lazy(() => import("./SplineScene"));

export default function Scene3D() {
  return (
    <div className="relative h-full w-full bg-background">
      <Suspense fallback={<Loading />}>
        <LazySplineScene />
      </Suspense>
    </div>
  );
}
