"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Application } from "@splinetool/runtime";

export default function SplineEventHandler() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = document.querySelector("canvas");

    if (!canvas) return;

    const splineApp = new Application(canvas);

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

    splineApp.addEventListener("mouseDown", handleMouseDown);

    return () => {
      splineApp.removeEventListener("mouseDown", handleMouseDown);
    };
  }, [router]);

  return null;
}
