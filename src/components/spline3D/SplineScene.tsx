"use client";

import React from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Loading from "./loading";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <Loading />,
});

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
    <Spline
      className="w-full h-full"
      scene="/spline/hero-3d-scene.splinecode"
      onSplineMouseDown={handleMouseDown}
    />
  );
};

export default React.memo(SplineScene);
