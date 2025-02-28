"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface UsercentricsCookieConsentProps {
  nonce?: string;
  settingsId: string;
  translationsUrl?: string;
}

export default function UsercentricsCookieConsent({
  nonce,
  settingsId,
  translationsUrl,
}: UsercentricsCookieConsentProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMainContentLoaded, setIsMainContentLoaded] = useState(false);

  // Only execute on client-side and after hydration
  useEffect(() => {
    setIsClient(true);

    // Give priority to main content rendering
    const timer = setTimeout(() => {
      setIsMainContentLoaded(true);
    }, 1000); // Delay loading Usercentrics for 1 second

    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* Essential Usercentrics blocking script - load with higher priority */}
      <Script
        id="uc-block-bundle"
        nonce={nonce}
        src="https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js"
        strategy="afterInteractive"
      />

      {/* Only load the heavier components after main content is displayed */}
      {isMainContentLoaded && (
        <>
          <Script
            data-settings-id={settingsId}
            id="usercentrics-cmp"
            nonce={nonce}
            src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
            strategy="lazyOnload"
            onLoad={() => {
              // Set custom translations if provided
              if (
                translationsUrl &&
                typeof window !== "undefined" &&
                (window as any).uc
              ) {
                (window as any).uc.setCustomTranslations(translationsUrl);
              }
            }}
          />
        </>
      )}
    </>
  );
}
