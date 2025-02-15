"use client";

import React from "react";

import EmbeddingMap from "@/src/components/embeddings/EmbeddingMap";
import { RootGrid } from "src/components/embeddings/RootGrid";
import { Hero } from "@/src/components/root/Hero";

export default function RootPage() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <RootGrid />
      <EmbeddingMap />
      <Hero />
    </div>
  );
}
