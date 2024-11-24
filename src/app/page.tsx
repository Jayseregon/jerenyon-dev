import React, { Suspense } from "react";

import SplineScene from "@/components/spline3D/SplineScene";
// import SplineScene_ssr from "@/components/spline3D/SplineScene_ssr";
import { Hero } from "@/components/ui/Hero";

import Loading from "./loading";

export default function RootPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Hero Section for small screens */}
      <div className="sm:hidden">
        <Hero />
      </div>
      {/* SplineScene */}
      <div className="h-full">
        <Suspense fallback={<Loading />}>
          <SplineScene />
        </Suspense>
      </div>
      {/* Hero Section overlay for larger screens */}
      <div className="hidden sm:block absolute inset-0">
        <Hero />
      </div>
    </div>
  );
}
