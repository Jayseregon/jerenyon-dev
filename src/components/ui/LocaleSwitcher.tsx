"use client";

import { useLocale } from "next-intl";
import { JSX } from "react";

import { setUserLocale } from "@/src/lib/locale";

import CustomToggleSwitch from "./CustomToggleSwitch";

export interface LocaleSwitcherProps {
  nonce: string;
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
    <CustomToggleSwitch
      height={32}
      isOn={locale === "fr"}
      nonce={nonce}
      offColor="purple"
      offIcon="EN"
      width={64}
      onColor="purple"
      onIcon="FR"
      onToggle={toggleLocale}
    />
  );
}
