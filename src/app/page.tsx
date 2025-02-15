"use client";

import React from "react";

import { Hero } from "@/src/components/root/Hero";
import EmbeddingMap from "@/src/components/embeddings/EmbeddingMap";

export default function RootPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* EmbeddingMap over the grid */}
      <EmbeddingMap />
      {/* Hero Section on top */}
      <Hero />
    </div>
  );
}
