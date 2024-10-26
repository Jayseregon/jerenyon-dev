"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterProps {
  nonce?: string;
}

export default function Footer({ nonce }: FooterProps) {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (isMainPage) {
    return null;
  } else {
    return (
      <footer
        className="w-full py-4 bg-purple-200 dark:bg-purple-950 text-purple-950 dark:text-purple-200 text-xs text-center antialiased mt-auto"
        nonce={nonce || undefined}
      >
        <div className="mb-2">
          <p>
            <span>
              &copy; {new Date().getFullYear()} {t("copyright1")} -{" "}
              {t("copyright2")}
            </span>
          </p>
        </div>
        <div className="flex justify-center space-x-2 mb-2">
          <Link className="underline" href="/policies/privacy">
            {t("privacy")}
          </Link>
          <Link className="underline" href="/policies/terms">
            {t("terms")}
          </Link>
          <Link className="underline" href="/policies/cookies">
            {t("cookies")}
          </Link>
        </div>
        <div className="text-xs max-w-4md md:max-w-4xl mx-auto text-purple-950/50 dark:text-purple-200/50">
          <p>
            {t("google1")}
            <Link
              className="underline"
              href="https://policies.google.com/privacy"
            >
              {t("gpp")}
            </Link>
            {t("gtxt1")}
            <Link
              className="underline"
              href="https://policies.google.com/terms"
            >
              {t("gts")}
            </Link>
            {t("gtxt2")}
          </p>
        </div>
      </footer>
    );
  }
}
