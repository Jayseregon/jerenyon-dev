import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { SunThemeIcon, MoonThemeIcon } from "@/components/icons";

interface ThemeSwitchProps {
  className?: string;
  nonce: string;
}

/**
 * ThemeSwitch component that toggles between light and dark themes.
 * The switch animates between sun and moon icons based on the current theme.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names for the component.
 * @param {string} [props.nonce] - Nonce for security purposes.
 */
export default function ThemeSwitch({ className, nonce }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted state to true after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Toggles the theme between light and dark.
   */
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Return null if the component is not mounted to avoid SSR issues
  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      nonce={nonce}
      className={cn(
        "relative flex items-center p-1 rounded-full w-16 h-8 border border-purple-800 dark:border-purple-300 cursor-pointer",
        className
      )}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}>
      <motion.div
        nonce={nonce}
        className={cn(
          "absolute right-1 w-6 h-6 flex items-center justify-center",
          {
            "text-amber-600": theme === "light",
            hidden: theme === "dark",
          }
        )}>
        <SunThemeIcon nonce={nonce} />
      </motion.div>
      <motion.div
        nonce={nonce}
        className={cn(
          "absolute left-1 w-6 h-6 flex items-center justify-center",
          {
            hidden: theme === "light",
            "text-purple-600": theme === "dark",
          }
        )}>
        <MoonThemeIcon nonce={nonce} />
      </motion.div>
      <motion.div
        layout
        nonce={nonce}
        animate={{ x: theme === "dark" ? 30 : 0 }}
        className={cn(
          "w-6 h-6 border-2 shadow-xl rounded-full flex items-center justify-center",
          {
            "bg-amber-300 border-amber-400": theme === "light",
            "bg-purple-600 border-purple-700": theme === "dark",
          }
        )}
        initial={{ x: theme === "dark" ? 30 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </motion.div>
  );
}
