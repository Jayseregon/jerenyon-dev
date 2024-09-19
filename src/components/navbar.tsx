"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Logo } from "@/components/icons";
import { SearchInput } from "@/components/SearchInput";

interface NavbarProps {
  nonce?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ nonce }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  // Handle visibility of the navbar based on scroll position
  useEffect(() => {
    if (!isMainPage) {
      setIsVisible(true);

      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const coverImage = document.querySelector("#cover-image");

    if (coverImage) {
      observer.observe(coverImage);
    }

    return () => {
      if (coverImage) {
        observer.unobserve(coverImage);
      }
    };
  }, [isMainPage]);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full transition-transform duration-300 z-50",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isVisible ? "bg-background" : "bg-transparent"
      )}
      {...(nonce ? { nonce } : {})}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex items-center">
            <NextLink
              className="flex items-center gap-4"
              href="/">
              <Logo size={28} />
              <span className="font-bold text-foreground hidden md:block">
                {siteConfig.name}
              </span>
            </NextLink>
          </div>
          {/* Links in the middle */}
          <div className="hidden md:flex items-center space-x-4 flex-grow justify-center">
            {siteConfig.navItems.map((item) => (
              <NextLink
                key={item.href}
                className="text-foreground hover:text-primary transition-colors"
                href={item.href}>
                {item.label}
              </NextLink>
            ))}
          </div>
          {/* Search and switches on the right */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchInput />
            <ThemeSwitch className="text-foreground bg-transparent hover:bg-primary-100" />
            <LocaleSwitcher />
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-center w-full relative">
            <button
              className="text-foreground focus:outline-none pr-7"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                ) : (
                  <path
                    d="M4 6h16M4 12h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                )}
              </svg>
            </button>
            <div className="absolute right-0 flex items-center space-x-4">
              <ThemeSwitch className="text-foreground bg-transparent hover:bg-primary-100" />
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
      {/* Collapsed menu for mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-background bg-opacity-50 px-4 py-6 transition-max-height duration-500 ease-in-out overflow-hidden">
          <div className="space-y-4">
            <div className="px-4 py-2 max-w-xl mx-auto">
              <SearchInput alwaysExpanded={isMenuOpen} />
            </div>
            {siteConfig.navItems.map((item) => (
              <NextLink
                key={item.href}
                className="block text-foreground hover:text-primary transition-colors indent-6 max-w-xl mx-auto"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </NextLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
