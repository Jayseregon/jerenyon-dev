"use client";

import React, { useEffect, useRef } from "react";
import NextLink from "next/link";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import ThemeSwitch from "@/components/root/ThemeSwitch";
import LocaleSwitcher from "@/components/root/LocaleSwitcher";
import SearchInput from "@/components/root/SearchInput";
// Import the shared UI store and remove prop dependencies.
import { useUIStore } from "@/src/store/uiStore";

export const CollapsedMenu = ({ nonce }: { nonce: string }) => {
  const t = useTranslations();

  const { showCollapsedMenu, setShowCollapsedMenu } = useUIStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowCollapsedMenu(false);
      }
    };

    if (showCollapsedMenu) {
      document.addEventListener("pointerdown", handleClickOutside);
    } else {
      document.removeEventListener("pointerdown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [showCollapsedMenu, setShowCollapsedMenu]);

  return (
    <div className="absolute" nonce={nonce}>
      <motion.div
        ref={menuRef}
        animate={{ scale: showCollapsedMenu ? 1 : 0 }}
        className={`${showCollapsedMenu ? "block" : "hidden"} fixed top-16 right-4 bg-background text-foreground w-[90%] h-fit max-w-xs max-h-fit rounded-2xl border border-purple-800 dark:border-purple-300 overflow-hidden shadow-2xl z-50`}
        initial={{ scale: 0 }}
        nonce={nonce}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="p-4 max-w-full mx-auto" nonce={nonce}>
          <SearchInput
            alwaysExpanded={showCollapsedMenu}
            isInsideNavbar={true}
            nonce={nonce}
          />
        </div>
        <motion.p
          className="px-4 text-purple-800 dark:text-purple-300"
          nonce={nonce}
        >
          {t("collapsedMenu.menuSection")}
        </motion.p>
        <motion.div className="px-4" nonce={nonce}>
          <motion.ul
            animate={showCollapsedMenu ? "visible" : "hidden"}
            className="flex flex-col gap-1 bg-background rounded-xl border border-purple-800 dark:border-purple-300 overflow-hidden"
            initial="hidden"
            nonce={nonce}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {siteConfig.navItems.map((item) => (
              <NextLink
                key={item.href}
                className="block bg-background hover:bg-purple-200 dark:hover:bg-purple-700 hover:border-purple-400 dark:hover:border-purple-400 focus:bg-purple-100 dark:focus:bg-purple-900 focus:border-purple-500 dark:focus:border-purple-500 text-sm text-foreground placeholder-foreground w-full h-full transition-colors"
                href={item.href}
                nonce={nonce}
                onClick={() => setShowCollapsedMenu(false)}
              >
                <motion.div
                  className="bg-none text-sm text-foreground px-4 py-1"
                  nonce={nonce}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(`collapsedMenu.${item.label}`)}
                </motion.div>
              </NextLink>
            ))}
          </motion.ul>
        </motion.div>
        <motion.div className="pt-3" nonce={nonce}>
          <motion.div
            animate={showCollapsedMenu ? "visible" : "hidden"}
            className="flex flex-col gap-1 bg-background rounded-xl overflow-hidden p-1"
            initial="hidden"
            nonce={nonce}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div
              className="ps-4 inline-flex items-center space-x-2"
              nonce={nonce}
            >
              <ThemeSwitch nonce={nonce} />
              <motion.span
                className="ps-2 text-purple-800 dark:text-purple-300"
                nonce={nonce}
              >
                {t("collapsedMenu.darkModeSwitch")}
              </motion.span>
            </motion.div>
            <motion.div
              className="ps-4 inline-flex items-center space-x-2"
              nonce={nonce}
            >
              <LocaleSwitcher nonce={nonce} />
              <motion.span
                className="ps-2 text-purple-800 dark:text-purple-300"
                nonce={nonce}
              >
                {t("collapsedMenu.languageSwitch")}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="pt-3 mb-2 flex flex-col items-center justify-center space-y-2 text-purple-950 dark:text-purple-200 text-xs text-center antialiased"
          nonce={nonce}
        >
          <NextLink
            className="underline"
            href="/policies/privacy"
            nonce={nonce}
          >
            {t("footer.privacy")}
          </NextLink>
          <NextLink className="underline" href="/policies/terms" nonce={nonce}>
            {t("footer.terms")}
          </NextLink>
          <NextLink
            className="underline"
            href="/policies/cookies"
            nonce={nonce}
          >
            {t("footer.cookies")}
          </NextLink>
          <NextLink
            className="underline"
            href="/policies/disclaimers"
            nonce={nonce}
          >
            {t("footer.disclaimer")}
          </NextLink>
        </motion.div>
      </motion.div>
    </div>
  );
};
