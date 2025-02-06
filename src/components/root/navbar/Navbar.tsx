"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

import { cn } from "@/src/lib/utils";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { SignOut } from "@/components/auth/SignOut-Button";
import ThemeSwitch from "@/components/root/ThemeSwitch";
import LocaleSwitcher from "@/components/root/LocaleSwitcher";
import SearchInput from "@/components/root/SearchInput";
import { HamburgerMenuButton } from "@/components/root/navbar/HamburgerMenuButton";
import { CollapsedMenu } from "@/components/root/navbar//CollapsedMenu";

export default function Navbar({ nonce }: { nonce: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const t = useTranslations("collapsedMenu");
  const { data: session } = useSession();

  // Toggles the state of the mobile menu.
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
                <Logo nonce={nonce} size={34} />
                <span className="font-bold text-foreground text-xl text-nowrap ">
                  {siteConfig.name}
                </span>
              </NextLink>
            </div>

            {/* Mobile menu button */}
            <HamburgerMenuButton
              isMenuOpen={isMenuOpen}
              menuButtonVariants={menuButtonVariants}
              nonce={nonce}
              toggleMenu={toggleMenu}
              topBarVariants={topBarVariants}
            />

            {/* Conditionally render SignOut button */}
            {session && <SignOut />}
          </div>
        </div>
        {/* Collapsed menu for mobile */}
        <CollapsedMenu
          isMenuOpen={isMenuOpen}
          nonce={nonce}
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
                <Logo nonce={nonce} size={34} />
                <span className="font-bold text-foreground text-xl text-nowrap">
                  {siteConfig.name}
                </span>
              </NextLink>
            </div>
            {/* Links in the middle */}
            <div className="hidden md:flex items-center space-x-4 grow justify-center">
              <motion.div
                animate={{ opacity: 1 }}
                className="relative flex items-center space-x-4 border border-purple-800 dark:border-purple-300 rounded-full py-1 px-1"
                initial={{ opacity: 0 }}
                nonce={nonce}
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
                        nonce={nonce}
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
              <SearchInput nonce={nonce} />
              <ThemeSwitch nonce={nonce} />
              <LocaleSwitcher nonce={nonce} />

              {session && <SignOut />}
            </div>

            {/* Mobile menu button */}
            <HamburgerMenuButton
              isMenuOpen={isMenuOpen}
              menuButtonVariants={menuButtonVariants}
              nonce={nonce}
              styling="md:hidden"
              toggleMenu={toggleMenu}
              topBarVariants={topBarVariants}
            />
          </div>
        </div>
        {/* Collapsed menu for mobile */}
        <CollapsedMenu
          isMenuOpen={isMenuOpen}
          nonce={nonce}
          setIsMenuOpen={setIsMenuOpen}
        />
      </nav>
    );
  }
}
