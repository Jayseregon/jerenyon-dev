"use client";

import React, { useEffect, useState, useContext } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";

import { NonceContext } from "@/src/app/providers";

import { Button } from "../ui/button";

interface HeroSectionProps {
  VisualComponent: React.ComponentType;
}

export const HeroSection = ({ VisualComponent }: HeroSectionProps) => {
  const t = useTranslations("homepage");
  const nonce = useContext(NonceContext);
  const [isVisible, setIsVisible] = useState(false);

  // Immediately start animations to match visual components
  useEffect(() => {
    // Set visible immediately - no delays for critical content
    setIsVisible(true);
  }, []);

  // Pre-compute content to avoid render delays
  const heroTitle = t("hero.title");
  const heroSubtitle = t("hero.subtitle");

  return (
    <section className="relative w-full h-full flex items-center justify-center py-8 md:py-0">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        {/* Visual Element */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <VisualComponent />
        </div>

        {/* Text Content - Custom landing page implementation */}
        <div className="md:w-1/2 space-y-6 md:pr-8 order-2 md:order-1 mt-4 md:mt-0">
          {/* Title with subtle framer-motion animation */}
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold"
            initial={{ opacity: 0.9, y: -5 }}
            nonce={nonce}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              opacity: { duration: 0.3 },
            }}
          >
            {heroTitle}
          </motion.h1>

          {/* Subtitle with controlled animation */}
          <motion.h2
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            className="text-xl md:text-2xl text-purple-800/70 dark:text-purple-300/70 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            nonce={nonce}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {heroSubtitle}
          </motion.h2>

          {/* Action buttons with synchronized animation */}
          <motion.div
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            className="flex flex-col md:flex-row gap-4 pt-2 pb-8 md:pb-0"
            initial={{ opacity: 0, y: 20 }}
            nonce={nonce}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Button
              asChild
              className="w-full md:w-auto flex-1"
              size="lg"
              variant="cta"
            >
              <Link href="/knowledge-hub">Explore Knowledge Hub</Link>
            </Button>
            <Button
              asChild
              className="w-full md:w-auto flex-1"
              size="lg"
              variant="form"
            >
              <Link href="/contact">Start a Project</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
