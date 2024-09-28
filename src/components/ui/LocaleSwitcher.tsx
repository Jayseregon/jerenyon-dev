"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { setUserLocale } from "@/lib/locale";

export interface LocaleSwitcherProps {
  nonce?: string;
}

export default function LocaleSwitcher({
  nonce,
}: LocaleSwitcherProps): JSX.Element {
  const locale = useLocale();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "fr" : "en";

    localStorage.setItem("preferredLocale", newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    setUserLocale(newLocale as "en" | "fr");
  };

  return (
    <motion.div
      className={cn(
        "relative flex items-center p-1 rounded-full w-16 h-8 border border-purple-800 dark:border-purple-300 cursor-pointer",
        nonce,
      )}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLocale}
    >
      <motion.div
        className={cn(
          "absolute right-1 w-6 h-6 flex items-center justify-center",
          {
            "text-purple-600": locale === "en",
            hidden: locale === "fr",
          },
        )}
      >
        EN
      </motion.div>
      <motion.div
        className={cn(
          "absolute left-1 w-6 h-6 flex items-center justify-center",
          {
            hidden: locale === "en",
            "text-purple-600": locale === "fr",
          },
        )}
      >
        FR
      </motion.div>
      <motion.div
        layout
        animate={{ x: locale === "fr" ? 30 : 0 }}
        className={
          "w-6 h-6 border-2 shadow-xl rounded-full flex items-center justify-center bg-purple-600 border-purple-700"
        }
        initial={{ x: locale === "fr" ? 30 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </motion.div>
  );
}
