import React from "react";
import { motion } from "motion/react";

import { HamburgerMenuButtonProps } from "@/src/interfaces/Root";

export const HamburgerMenuButton = ({
  toggleMenu,
  menuButtonVariants,
  isMenuOpen,
  topBarVariants,
  styling,
  nonce,
}: HamburgerMenuButtonProps) => {
  return (
    <div
      className={`flex items-center justify-end w-full ${styling} relative`}
      nonce={nonce}
    >
      <button
        aria-label="Toggle menu button"
        className={`${isMenuOpen ? "text-purple-800 dark:text-purple-300" : "text-foreground"} focus:outline-hidden pr-2`}
        nonce={nonce}
        onPointerDown={toggleMenu}
        onPointerUp={(e) => e.stopPropagation()} // Prevent the pointerup event from propagating to the document
      >
        <motion.svg
          animate={isMenuOpen ? "open" : "closed"}
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          transition={{ duration: 0.3 }}
          variants={menuButtonVariants}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={isMenuOpen ? "open" : "closed"}
            initial={false}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            variants={topBarVariants}
          />
        </motion.svg>
      </button>
    </div>
  );
};
