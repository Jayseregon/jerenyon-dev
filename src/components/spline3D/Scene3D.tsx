import dynamic from "next/dynamic";

import Loading from "./loading";

const SplineScene = dynamic(() => import("./SplineScene"), {
  ssr: false, // Disable server-side rendering
  loading: () => <Loading />, // Show loading indicator
});

export default function Scene3D() {
  return (
    <div className="relative h-full w-full">
      <SplineScene />
    </div>
  );
}
