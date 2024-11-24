"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";

import Loading from "./loading";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

type SplineSceneProps = {
  className?: string;
};

const SplineScene = ({ className }: SplineSceneProps) => {
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
    <>
      <Suspense fallback={<Loading />}>
        <Spline
          className={`w-full h-full ${className}`}
          scene="/spline/hero-3d-scene.splinecode"
          onSplineMouseDown={handleMouseDown}
        />
      </Suspense>
    </>
  );
};

export default React.memo(SplineScene);
