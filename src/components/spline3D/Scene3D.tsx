import React, { Suspense } from "react";

import Loading from "./loading";
// import Spline from "@splinetool/react-spline/next";

const Spline = React.lazy(() => import("@splinetool/react-spline/next"));

export default function Scene3D() {
  //   const cube = useRef();

  //   function onLoad(spline: any) {
  //     const obj = spline.findObjectByName("button-estimate");
  //     cube.current = obj;
  //     console.log(obj);
  //   }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Spline scene="/spline/scene2.splinecode" />
        {/* <Spline scene="/spline/scene2.splinecode" /> */}
      </Suspense>
    </div>
  );
}

// button-estimate
