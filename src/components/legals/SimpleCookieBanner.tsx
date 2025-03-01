"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface SimpleCookieBannerProps {
  onAccept: () => void;
  onCustomize: () => void;
}

export default function SimpleCookieBanner({
  onAccept,
  onCustomize,
}: SimpleCookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if cookies have been accepted before
    const hasConsent = localStorage.getItem("simple-cookie-consent");

    if (!hasConsent) {
      // Show banner after a small delay to prioritize main content render
      const timer = setTimeout(() => {
        setVisible(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("simple-cookie-consent", "accepted");
    setVisible(false);
    onAccept();
  };

  const handleCustomize = () => {
    setVisible(false);
    onCustomize();
  };

  if (!visible) return null;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-purple-800 dark:border-purple-300 z-50"
      initial={{ opacity: 0, y: 20 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground">
          This site uses cookies to enhance your experience. By continuing, you
          agree to our use of cookies.
        </p>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 text-sm border border-purple-800 dark:border-purple-300 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900"
            onClick={handleCustomize}
          >
            Customize
          </button>
          <button
            className="px-4 py-2 text-sm bg-purple-800 dark:bg-purple-300 text-white dark:text-black rounded-md hover:bg-purple-700 dark:hover:bg-purple-200"
            onClick={handleAccept}
          >
            Accept All
          </button>
        </div>
      </div>
    </motion.div>
  );
}
