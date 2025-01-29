// "use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
// import { useReportWebVitals } from "next/web-vitals";

// import SplineScene from "@/components/spline3D/SplineScene";
// keeping these for future reference and usage
// import SplineScene_ssr from "@/components/spline3D/SplineScene_ssr";
// import SplineSceneView from "@/components/spline3D/SplineScene_Viewer";
import { Hero } from "@/src/components/root/Hero";

import Loading from "./loading";

const SplineSceneSSR = dynamic(
  () => import("@/components/spline3D/SplineScene_ssr"),
  {
    ssr: true,
    loading: () => <Loading />,
  },
);

export default function RootPage() {
  // keeping this for future reference and usage
  // useReportWebVitals((metric) => {
  //   console.log(metric);
  // });
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <Suspense fallback={<Loading />}>
        <SplineSceneSSR />
      </Suspense>
      {/* Hero Title and Subtitle with SSR */}
      <Hero />
    </div>
  );
}
