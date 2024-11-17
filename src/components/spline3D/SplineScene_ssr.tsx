import React from "react";
import Spline from "@splinetool/react-spline/next";

import SplineEventHandler from "./SplineEventHandler";

const SplineScene_ssr = () => {
  return (
    <>
      <Spline
        className="w-full h-full"
        scene="/spline/hero-3d-scene.splinecode"
      />
      <SplineEventHandler />
    </>
  );
};

export default React.memo(SplineScene_ssr);
