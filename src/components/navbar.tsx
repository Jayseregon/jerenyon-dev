"use client";

// NextUI components
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

// NextJS components
import { useState } from "react";
import NextLink from "next/link";
import clsx from "clsx";

// Custom components
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { SearchInput } from "@/components/SearchInput";
import LocaleSwitcher from "./LocaleSwitcher";

export const Navbar = () => {
  // Navbar state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // brand definition
    <NextUINavbar
      maxWidth="2xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered>
      <NavbarContent>
        <NavbarBrand
          as="li"
          className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-4"
            href="/">
            <Logo />
            <p className="font-bold text-inherit">{siteConfig.name}</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* navbar menu  */}
      <NavbarContent justify="center">
        {/* toggle menu */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          className="md:hidden"
        />

        {/* or list items menu */}
        <ul className="hidden md:flex items-start justify-start gap-16">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* avatar menu with theme switch and search */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <SearchInput />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <LocaleSwitcher />
        </NavbarItem>
      </NavbarContent>

      {/* menu definition when toggled */}
      <NavbarMenu>
        <SearchInput alwaysExpanded={true} />
        <div className="mx-4 mt-2 flex flex-col gap-3">
          {siteConfig.navMenuToggleItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
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
