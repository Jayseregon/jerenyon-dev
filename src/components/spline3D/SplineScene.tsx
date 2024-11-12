"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const SplineScene = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let runtime: any;
    let mouseDownHandler: ((e: any) => void) | null = null;
    let animationFrameId: number;
    let isDisposed = false;

    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    // Only import runtime, we'll use its THREE instance
    import("@splinetool/runtime").then(({ Application }) => {
      if (isDisposed) return;

      runtime = new Application(canvas);

      // Set initial canvas size
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      const routeMap: Record<string, string> = {
        "button-hub": "/knowledge-hub",
        "button-estimate": "/estimate",
        "button-journey": "/about",
        "button-contact": "/contact",
      };

      mouseDownHandler = (e: any) => {
        const route = routeMap[e.target.name];
        if (route) {
          router.push(route);
        }
      };

      runtime.addEventListener("mouseDown", mouseDownHandler);

      runtime.load("/spline/hero-3d-scene.splinecode").then(() => {
        if (isDisposed) return;

        const animate = () => {
          if (isDisposed) return;
          animationFrameId = requestAnimationFrame(animate);
          if (runtime.currentScene) {
            runtime.currentScene.updateMatrixWorld();
          }
        };
        animate();
      });
    });

    const handleResize = () => {
      if (!runtime || isDisposed) return;

      // Update canvas size
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Update renderer size and camera aspect ratio if available
      if (runtime.renderer) {
        runtime.renderer.setSize(container.clientWidth, container.clientHeight);
      }
      if (runtime.camera) {
        runtime.camera.aspect = container.clientWidth / container.clientHeight;
        runtime.camera.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (runtime) {
        if (mouseDownHandler) {
          runtime.removeEventListener("mouseDown", mouseDownHandler);
        }
        runtime.dispose();
      }
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    };
  }, [router]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default dynamic(() => Promise.resolve(SplineScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      Loading...
    </div>
  ),
});
