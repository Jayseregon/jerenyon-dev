// "use client";

import React, { Suspense } from "react";
// import { useReportWebVitals } from "next/web-vitals";

// import SplineScene from "@/components/spline3D/SplineScene";
// keeping these for future reference and usage
import SplineScene_ssr from "@/components/spline3D/SplineScene_ssr";
// import SplineSceneView from "@/components/spline3D/SplineScene_Viewer";
import { Hero } from "@/components/ui/Hero";

import Loading from "./loading";

export default function RootPage() {
  // keeping this for future reference and usage
  // useReportWebVitals((metric) => {
  //   console.log(metric);
  // });
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <Suspense fallback={<Loading />}>
        <SplineScene_ssr />
      </Suspense>
      {/* Hero Title and Subtitle with SSR */}
      <Hero />
    </div>
  );
}
