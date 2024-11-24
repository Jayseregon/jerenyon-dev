import React, { Suspense } from "react";

import SplineScene from "@/components/spline3D/SplineScene";
// import SplineScene_ssr from "@/components/spline3D/SplineScene_ssr";
import { Hero } from "@/components/ui/Hero";

import Loading from "./loading";

export default function RootPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen overflow-hidden bg-background">
      <div className="flex-1 h-2/3 sm:h-full">
        <Suspense fallback={<Loading />}>
          <SplineScene className="w-full h-full" />
        </Suspense>
      </div>
      <div className="flex-none h-1/3 sm:h-auto">
        <Hero />
      </div>
    </div>
  );
}
