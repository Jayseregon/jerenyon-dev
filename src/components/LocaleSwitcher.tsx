"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useEffect, useTransition } from "react";
import { useRouter, usePathname } from "@/navigation";
import { locales } from "@/config";
import { Switch } from "@nextui-org/react";

export interface LocaleSwitcherProps {
  nonce?: string;
}

export default function LocaleSwitcher({nonce}: LocaleSwitcherProps) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    const preferredLocale = localStorage.getItem("preferredLocale");
    if (preferredLocale && preferredLocale !== locale) {
      document.cookie = `NEXT_LOCALE=${preferredLocale}; path=/; max-age=31536000; SameSite=Lax`;
      startTransition(() => {
        router.replace(
          { pathname },
          { locale: preferredLocale as "en" | "fr" | undefined }
        );
      });
    }
  }, [locale, pathname, router, startTransition]);

  function onLocaleToggle() {
    const newLocale = locale === "en" ? "fr" : "en"; // Assuming only two locales for simplicity
    localStorage.setItem("preferredLocale", newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    startTransition(() => {
      router.replace({ pathname }, { locale: newLocale as "en" | "fr" | undefined });
    });
  }

  return (
    <Switch
      defaultSelected={locale === locales[0]}
      onChange={onLocaleToggle}
      size="md"
      color="primary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? t("localeFlag", { locale: locales[0] }) : t("localeFlag", { locale: locales[1] })
      }
      nonce={nonce}
    />
  );
}
