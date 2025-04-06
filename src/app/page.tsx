"use client";

import React from "react";

import { HeroSection } from "@/components/home/HeroSection";
import { BlueprintSphere } from "@/components/home/BlueprintSphere";

export default function RootPage() {
  // Options: <BlueprintSphere /> or <ArmillarySphere />
  const VisualComponent = BlueprintSphere;

  return (
    <div className="flex items-center justify-center h-full">
      {/* Hero Section */}
      <HeroSection VisualComponent={VisualComponent} />
    </div>
  );
}
