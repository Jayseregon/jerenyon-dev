import React, { Suspense } from "react";

import SplineScene from "@/components/spline3D/SplineScene";
// import SplineScene_ssr from "@/components/spline3D/SplineScene_ssr";
import { Hero } from "@/components/ui/Hero";

import Loading from "./loading";

export default function RootPage() {
  return (
    <div className="grid grid-rows-[auto_auto] h-screen w-screen overflow-hidden bg-background">
      {/* SplineScene */}
      <div>
        <Suspense fallback={<Loading />}>
          <SplineScene />
        </Suspense>
      </div>
      {/* Hero Section */}
      <div>
        <Hero />
      </div>
    </div>
  );
}
