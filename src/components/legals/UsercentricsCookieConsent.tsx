"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import SimpleCookieBanner from "./SimpleCookieBanner";

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
  const [showUsercentrics, setShowUsercentrics] = useState(false);
  const [showSimpleBanner, setShowSimpleBanner] = useState(true);
  const [blockingScriptLoaded, setBlockingScriptLoaded] = useState(false);

  // Only execute on client-side and after hydration
  useEffect(() => {
    setIsClient(true);

    // Check if there's already a consent stored by Usercentrics
    const hasExistingConsent =
      (typeof window !== "undefined" &&
        document.cookie.includes("ucConsent")) ||
      localStorage.getItem("uc-settings");

    if (hasExistingConsent) {
      // If consent exists, don't show the simple banner
      setShowSimpleBanner(false);

      // Load Usercentrics but with extra delay to prioritize content
      setTimeout(() => {
        setShowUsercentrics(true);
      }, 3000);
    }
  }, []);

  const handleAcceptAll = () => {
    // Load Usercentrics and set consent
    setShowUsercentrics(true);

    // Give time for Usercentrics to load before triggering acceptance
    setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).UC_UI) {
        (window as any).UC_UI.acceptAllConsents();
      }
    }, 1000);
  };

  const handleCustomize = () => {
    // Load Usercentrics and open settings
    setShowUsercentrics(true);

    // Give time for Usercentrics to load before opening UI
    setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).UC_UI) {
        (window as any).UC_UI.showSecondLayer();
      }
    }, 1000);
  };

  if (!isClient) return null;

  return (
    <>
      {showSimpleBanner && (
        <SimpleCookieBanner
          onAccept={handleAcceptAll}
          onCustomize={handleCustomize}
        />
      )}

      {/* Always load the essential blocking script but control when it runs */}
      <Script
        id="uc-block-bundle"
        nonce={nonce}
        src="https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js"
        strategy="lazyOnload"
        onLoad={() => setBlockingScriptLoaded(true)}
      />

      {/* Only load the full Usercentrics after user interaction or if there's prior consent */}
      {showUsercentrics && blockingScriptLoaded && (
        <Script
          data-settings-id={settingsId}
          id="usercentrics-cmp"
          nonce={nonce}
          src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
          strategy="lazyOnload"
          onLoad={() => {
            if (
              translationsUrl &&
              typeof window !== "undefined" &&
              (window as any).uc
            ) {
              (window as any).uc.setCustomTranslations(translationsUrl);
            }
          }}
        />
      )}
    </>
  );
}
