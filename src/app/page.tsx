import React, { Suspense } from "react";

import SplineScene from "@/components/spline3D/SplineScene";
// import SplineScene_ssr from "@/components/spline3D/SplineScene_ssr";
// import SplineSceneView from "@/components/spline3D/SplineScene_Viewer";
import { Hero } from "@/components/ui/Hero";

import Loading from "./loading";

export default function RootPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <Suspense fallback={<Loading />}>
        <SplineScene />
      </Suspense>
      {/* Hero Title and Subtitle */}
      <Hero />
    </div>
  );
}
