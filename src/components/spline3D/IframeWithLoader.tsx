"use client";

import { useState, useRef, useEffect } from "react";

import Loading from "./loading";

interface IframeWithLoaderProps {
  src: string;
  title: string;
  nonce?: string;
}

export default function IframeWithLoader({
  src,
  title,
  nonce,
}: IframeWithLoaderProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // Fallback for browsers that do not support IntersectionObserver
      setShouldLoadIframe(true);

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={iframeRef} className="relative w-full h-full">
      {!iframeLoaded && <Loading />}
      {shouldLoadIframe && (
        <iframe
          className={`relative w-full h-full bg-transparent ${
            iframeLoaded ? "" : "hidden"
          }`}
          nonce={nonce}
          sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
          src={src}
          title={title}
          onLoad={() => setIframeLoaded(true)}
        />
      )}
    </div>
  );
}
