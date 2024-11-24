"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";

import Loading from "./loading";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const SplineScene = () => {
  const router = useRouter();
  const routeMap: Record<string, string> = {
    "button-hub": "/knowledge-hub",
    "button-estimate": "/estimate",
    "button-journey": "/about",
    "button-contact": "/contact",
  };

  const handleMouseDown = (e: any) => {
    const route = routeMap[e.target.name];

    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="border border-4 border-teal-500">
      <Suspense fallback={<Loading />}>
        <Spline
          className="w-full h-full border border-4 border-amber-500"
          scene="/spline/hero-3d-scene.splinecode"
          onSplineMouseDown={handleMouseDown}
        />
      </Suspense>
    </div>
  );
};

export default React.memo(SplineScene);
