"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import React, { useState } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { SearchInput } from "@/components/SearchInput";
import LocaleSwitcher from "./LocaleSwitcher";

interface NavbarProps {
  nonce?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ nonce }) => {
  // Navbar state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // brand definition
    <NextUINavbar
      maxWidth="2xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      nonce={nonce}>
      <NavbarContent nonce={nonce}>
        <NavbarBrand
          as="li"
          className="gap-3 max-w-fit"
          nonce={nonce}>
          <NextLink
            className="flex justify-start items-center gap-4"
            href="/"
            nonce={nonce}>
            <Logo />
            <p className="font-bold text-inherit">{siteConfig.name}</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* navbar menu  */}
      <NavbarContent
        justify="center"
        nonce={nonce}>
        {/* toggle menu */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          className="md:hidden"
          nonce={nonce}
        />

        {/* or list items menu */}
        <ul className="hidden md:flex items-start justify-start gap-16">
          {siteConfig.navItems.map((item) => (
            <NavbarItem
              key={item.href}
              nonce={nonce}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
                nonce={nonce}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* avatar menu with theme switch and search */}
      <NavbarContent
        justify="end"
        nonce={nonce}>
        <NavbarItem
          className="hidden md:flex"
          nonce={nonce}>
          <SearchInput />
        </NavbarItem>
        <NavbarItem nonce={nonce}>
          <ThemeSwitch nonce={nonce} className="text-foreground bg-transparent hover:bg-primary-100"/>
        </NavbarItem>
        <NavbarItem nonce={nonce}>
          <LocaleSwitcher nonce={nonce}/>
        </NavbarItem>
      </NavbarContent>

      {/* menu definition when toggled */}
      <NavbarMenu nonce={nonce}>
        <SearchInput alwaysExpanded={true} />
        <div className="mx-4 mt-2 flex flex-col gap-3">
          {siteConfig.navMenuToggleItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              nonce={nonce}>
              <Link
                color="foreground"
                nonce={nonce}
                className="w-full"
                href={item.href}
                size="lg"
                onClick={() => {
                  setIsMenuOpen((prev) => !prev);
                }}>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
