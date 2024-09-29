"use client";

import React, { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { cn } from "@/src/lib/utils";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";

import ThemeSwitch from "./ThemeSwitch";
import LocaleSwitcher from "./LocaleSwitcher";
import SearchInput from "./SearchInput";

interface HamburgerMenuButtonProps {
  toggleMenu: (event: React.PointerEvent<HTMLButtonElement>) => void;
  menuButtonVariants: {
    open: { rotate: number };
    closed: { rotate: number };
  };
  isMenuOpen: boolean;
  topBarVariants: {
    open: { d: string };
    closed: { d: string };
  };
  styling?: string;
  nonce: string;
}

interface CollapsedMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  nonce: string;
}

/**
 * Navbar component that displays the navigation bar.
 * It includes the logo, navigation links, search input, theme switcher, and locale switcher.
 * The navbar layout changes based on whether the user is on the main page or not.
 */
export default function Navbar({ nonce }: { nonce: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const t = useTranslations("collapsedMenu");

  /**
   * Toggles the state of the mobile menu.
   */
  const toggleMenu = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    setIsMenuOpen((prev) => !prev);
  };

  // Variants for the hamburger menu button animation
  const menuButtonVariants = {
    open: { rotate: 90 },
    closed: { rotate: 0 },
  };

  // Variants for the top bar of the hamburger menu button
  const topBarVariants = {
    open: { d: "M6 18L18 6M6 6l12 12" },
    closed: { d: "M4 6h16M4 12h16" },
  };

  if (isMainPage) {
    return (
      <nav className="absolute top-0 left-0 w-full z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo on the left */}
            <div className="flex items-center">
              <NextLink className="flex items-center gap-4" href="/">
                <Logo nonce={nonce} size={28} />
                <span className="font-bold text-foreground text-nowrap ">
                  {siteConfig.name}
                </span>
              </NextLink>
            </div>
            {/* Mobile menu button */}
            <HamburgerMenuButton
              isMenuOpen={isMenuOpen}
              menuButtonVariants={menuButtonVariants}
              nonce={nonce} // Pass nonce to HamburgerMenuButton
              toggleMenu={toggleMenu}
              topBarVariants={topBarVariants}
            />
          </div>
        </div>
        {/* Collapsed menu for mobile */}
        <CollapsedMenu
          isMenuOpen={isMenuOpen}
          nonce={nonce} // Pass nonce to CollapsedMenu
          setIsMenuOpen={setIsMenuOpen}
        />
      </nav>
    );
  } else {
    return (
      <nav className="sticky top-0 left-0 w-full z-50 bg-background">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo on the left */}
            <div className="flex items-center">
              <NextLink className="flex items-center gap-4" href="/">
                <Logo nonce={nonce} size={28} />
                <span className="font-bold text-foreground text-nowrap">
                  {siteConfig.name}
                </span>
              </NextLink>
            </div>
            {/* Links in the middle */}
            <div className="hidden md:flex items-center space-x-4 flex-grow justify-center">
              <motion.div
                animate={{ opacity: 1 }}
                className="relative flex items-center space-x-4 border border-purple-800 dark:border-purple-300 rounded-full py-1 px-1"
                initial={{ opacity: 0 }}
                nonce={nonce} // Add nonce to motion.div
                transition={{ duration: 0.5 }}
              >
                {siteConfig.navItems.map((item) => (
                  <NextLink
                    key={item.href}
                    className={cn(
                      "relative transition-colors",
                      pathname === item.href
                        ? "text-background dark:text-foreground"
                        : "text-foreground hover:text-primary",
                    )}
                    href={item.href}
                  >
                    {pathname === item.href && (
                      <motion.div
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-purple-700 rounded-full"
                        initial={{ scale: 0.8 }}
                        layoutId="highlight"
                        nonce={nonce} // Add nonce to motion.div
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    )}
                    <span className="relative px-2 z-10">{t(item.label)}</span>
                  </NextLink>
                ))}
              </motion.div>
            </div>
            {/* Search and switches on the right */}
            <div className="hidden md:flex items-center space-x-4">
              <SearchInput nonce={nonce} /> {/* Pass nonce to SearchInput */}
              <ThemeSwitch nonce={nonce} /> {/* Pass nonce to ThemeSwitch */}
              <LocaleSwitcher nonce={nonce} />{" "}
              {/* Pass nonce to LocaleSwitcher */}
            </div>
            {/* Mobile menu button */}
            <HamburgerMenuButton
              isMenuOpen={isMenuOpen}
              menuButtonVariants={menuButtonVariants}
              nonce={nonce} // Pass nonce to HamburgerMenuButton
              styling="md:hidden"
              toggleMenu={toggleMenu}
              topBarVariants={topBarVariants}
            />
          </div>
        </div>
        {/* Collapsed menu for mobile */}
        <CollapsedMenu
          isMenuOpen={isMenuOpen}
          nonce={nonce} // Pass nonce to CollapsedMenu
          setIsMenuOpen={setIsMenuOpen}
        />
      </nav>
    );
  }
}

/**
 * HamburgerMenuButton component that displays a button to toggle the mobile menu.
 * The button animates between an open and closed state using Framer Motion.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.toggleMenu - Function to toggle the menu state.
 * @param {Object} props.menuButtonVariants - Variants for the button animation.
 * @param {boolean} props.isMenuOpen - Boolean indicating if the menu is open.
 * @param {Object} props.topBarVariants - Variants for the top bar animation.
 * @param {string} [props.styling] - Additional styling classes.
 */
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
        className={`${isMenuOpen ? "text-purple-800 dark:text-purple-300" : "text-foreground"} focus:outline-none pr-2`}
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

/**
 * CollapsedMenu component that displays a collapsible menu for mobile view.
 * The menu includes a search input, navigation links, theme switcher, and locale switcher.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isMenuOpen - Boolean indicating if the menu is open.
 * @param {Function} props.setIsMenuOpen - Function to set the menu open state.
 */
export const CollapsedMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  nonce,
}: CollapsedMenuProps) => {
  const t = useTranslations();

  // Create a ref for the collapsed menu
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu if clicking outside the menu area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("pointerdown", handleClickOutside);
    } else {
      document.removeEventListener("pointerdown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <div className="absolute" nonce={nonce}>
      <motion.div
        ref={menuRef}
        animate={{ scale: isMenuOpen ? 1 : 0 }}
        className={`${isMenuOpen ? "block" : "hidden"} fixed top-16 right-4 bg-background text-foreground w-[90%] h-[90%] max-w-xs max-h-[400px] rounded-2xl border border-purple-800 dark:border-purple-300 overflow-hidden shadow-2xl z-50`}
        initial={{ scale: 0 }}
        nonce={nonce}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onPointerDown={(e) => e.stopPropagation()} // Prevent pointerdown event from propagating to the document
      >
        {/* Search input field */}
        <div className="p-4 max-w-full mx-auto" nonce={nonce}>
          <SearchInput
            alwaysExpanded={isMenuOpen}
            isInsideNavbar={true}
            nonce={nonce}
          />
        </div>
        {/* Menu section title */}
        <motion.p
          className="px-4 text-purple-800 dark:text-purple-300"
          nonce={nonce}
        >
          {t("collapsedMenu.menuSection")}
        </motion.p>
        <motion.div className="px-4" nonce={nonce}>
          <motion.ul
            animate={isMenuOpen ? "visible" : "hidden"}
            className="flex flex-col gap-1 bg-background rounded-xl border border-purple-800 dark:border-purple-300 overflow-hidden"
            initial="hidden"
            nonce={nonce}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* Site navigation links */}
            {siteConfig.navItems.map((item) => (
              <NextLink
                key={item.href}
                className="block bg-background hover:bg-purple-200 dark:hover:bg-purple-700 hover:border-purple-400 dark:hover:border-purple-400 focus:bg-purple-100 dark:focus:bg-purple-900 focus:border-purple-500 dark:focus:border-purple-500 text-sm text-foreground placeholder-foreground w-full h-full transition-colors"
                href={item.href}
                nonce={nonce}
                onClick={() => setIsMenuOpen(false)}
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
            animate={isMenuOpen ? "visible" : "hidden"}
            className="flex flex-col gap-1 bg-background rounded-xl overflow-hidden p-1"
            initial="hidden"
            nonce={nonce}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* Dark mode switch */}
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

            {/* Language switch */}
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
          className="absolute bottom-0 left-0 right-0 mb-2 flex flex-col items-center justify-center space-y-2 text-purple-950 dark:text-purple-200 text-xs text-center antialiased"
          nonce={nonce}
        >
          <NextLink
            className="underline"
            href="/policies/privacy"
            nonce={nonce}
          >
            {t("footer.privacy")}
          </NextLink>
          <NextLink
            className="underline"
            href="/policies/cookies"
            nonce={nonce}
          >
            {t("footer.cookies")}
          </NextLink>
        </motion.div>
      </motion.div>
    </div>
  );
};
