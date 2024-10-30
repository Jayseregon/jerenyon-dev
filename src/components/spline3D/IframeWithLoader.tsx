"use client";

import { useState } from "react";

import Loading from "./loading";

interface IframeWithLoaderProps {
  src: string;
  title: string;
  nonce: string;
}

export default function IframeWithLoader({
  src,
  title,
  nonce,
}: IframeWithLoaderProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <>
      {!iframeLoaded && <Loading />}
      <iframe
        className={`relative w-full h-full bg-transparent ${iframeLoaded ? "" : "hidden"}`}
        nonce={nonce}
        sandbox="allow-scripts allow-same-origin allow-popups"
        src={src}
        title={title}
        onLoad={() => setIframeLoaded(true)}
      />
    </>
  );
}
