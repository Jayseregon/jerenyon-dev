"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { Application } from "@/lib/spline/runtime";

export default function SplineScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    let app: any;

    const loadSplineScene = async () => {
      if (typeof window === "undefined" || !canvasRef.current) return;

      try {
        if (Application) {
          app = new Application(canvasRef.current);
          await app.load("/spline/hero-3d-scene.splinecode").then(() => {
            app.addEventListener("mouseDown", (e: any) => {
              const routeMap: Record<string, string> = {
                "button-hub": "/knowledge-hub",
                "button-estimate": "/estimate",
                "button-journey": "/about",
                "button-contact": "/contact",
              };

              const route = routeMap[e.target.name];

              if (route) {
                router.push(route);
              }
            });
          });
        } else {
          console.error("Spline Application not found.");
        }
      } catch (error) {
        console.error("Failed to load Spline scene:", error);
      }
    };

    loadSplineScene();

    return () => {
      if (app) {
        app.dispose();
      }
    };
  }, []);

  return (
    <div className="w-full h-full bg-background">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
