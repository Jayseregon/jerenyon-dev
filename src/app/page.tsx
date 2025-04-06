"use client";

import React, { useEffect } from "react";

import { HeroSection } from "@/components/home/HeroSection";
import { BlueprintSphere } from "@/components/home/BlueprintSphere";

export default function RootPage() {
  // Options: <BlueprintSphere /> or <ArmillarySphere />
  const VisualComponent = BlueprintSphere;

  // Add preconnect only - will rely on Next.js built-in priority mechanisms
  useEffect(() => {
    // Add preconnect to speed up CDN connection
    const preconnectLink = document.createElement("link");

    preconnectLink.rel = "preconnect";
    preconnectLink.href = "https://jerenyon-dev-remote-pull.b-cdn.net";
    preconnectLink.crossOrigin = "anonymous";
    document.head.appendChild(preconnectLink);

    return () => {
      document.head.removeChild(preconnectLink);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      {/* Hero Section */}
      <HeroSection VisualComponent={VisualComponent} />
    </div>
  );
}
