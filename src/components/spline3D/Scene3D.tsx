import dynamic from "next/dynamic";

import Loading from "./loading";

const SplineScene = dynamic(() => import("./SplineScene"), {
  ssr: false, // Disable server-side rendering
  loading: () => <Loading />,
});

export default function Scene3D() {
  return (
    <div className="relative h-full w-full bg-background">
      <SplineScene />
    </div>
  );
}
