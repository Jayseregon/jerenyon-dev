import React from "react";
import { motion } from "motion/react";

import { useUIStore } from "@/src/store/uiStore";
import { HamburgerMenuButtonProps } from "@/src/interfaces/Root";

// Updated interface in HamburgerMenuButtonProps should only require nonce, styling, menuButtonVariants, topBarVariants.
export const HamburgerMenuButton = ({
  menuButtonVariants,
  topBarVariants,
  styling,
  nonce,
}: Pick<
  HamburgerMenuButtonProps,
  "menuButtonVariants" | "topBarVariants" | "styling" | "nonce"
>) => {
  const { showCollapsedMenu, setShowCollapsedMenu } = useUIStore();

  return (
    <div
      className={`flex items-center justify-end w-full ${styling} relative`}
      nonce={nonce}
    >
      <button
        aria-label="Toggle menu button"
        className={`${showCollapsedMenu ? "text-purple-800 dark:text-purple-300" : "text-foreground"} focus:outline-hidden pr-2`}
        nonce={nonce}
        onPointerDown={(e) => {
          e.stopPropagation();
          setShowCollapsedMenu(!showCollapsedMenu);
        }}
        onPointerUp={(e) => e.stopPropagation()} // Prevent the pointerup event from propagating to the document
      >
        <motion.svg
          animate={showCollapsedMenu ? "open" : "closed"}
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          transition={{ duration: 0.3 }}
          variants={menuButtonVariants}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={showCollapsedMenu ? "open" : "closed"}
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
