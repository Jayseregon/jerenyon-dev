"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface HeroSectionProps {
  VisualComponent: React.ComponentType;
}

export const HeroSection = ({ VisualComponent }: HeroSectionProps) => {
  const t = useTranslations("homepage");

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 space-y-6 md:pr-8">
          <motion.h1
            animate="animate"
            className="text-5xl md:text-7xl font-bold text-white"
            initial="initial"
            transition={{ duration: 0.8, delay: 0.2 }}
            variants={fadeIn}
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            animate="animate"
            className="text-xl md:text-2xl text-blue-200 max-w-2xl"
            initial="initial"
            transition={{ duration: 0.8, delay: 0.4 }}
            variants={fadeIn}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            animate="animate"
            className="flex flex-wrap gap-4 pt-4"
            initial="initial"
            transition={{ duration: 0.8, delay: 0.6 }}
            variants={fadeIn}
          >
            <a
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              href="/knowledge-hub"
            >
              Explore Knowledge Hub
            </a>
            <a
              className="px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-blue-900 transition"
              href="/contact"
            >
              Start a Project
            </a>
          </motion.div>
        </div>

        {/* Visual Element */}
        <motion.div
          animate="animate"
          className="w-full md:w-1/2 mt-8 md:mt-0"
          initial="initial"
          transition={{ duration: 0.8, delay: 0.8 }}
          variants={fadeIn}
        >
          <VisualComponent />
        </motion.div>
      </div>
    </section>
  );
};
