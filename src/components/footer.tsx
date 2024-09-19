import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface FooterProps {
  nonce?: string;
}

export const Footer: React.FC<FooterProps> = ({ nonce }) => {
  const t = useTranslations("footer");

  return (
    <footer
      className="w-full py-4 bg-purple-200 dark:bg-purple-950 text-purple-950 dark:text-purple-200 text-xs text-center antialiased mt-auto"
      nonce={nonce || undefined}>
      <div className="mb-2">
        <p>
          <span>
            &copy; {new Date().getFullYear()} {t("copyright1")} -{" "}
            {t("copyright2")}
          </span>
        </p>
      </div>
      <div className="flex justify-center space-x-2 mb-2">
        <Link
          className="underline"
          href="/policies/privacy">
          Privacy Policy
        </Link>
        <Link
          className="underline"
          href="/policies/cookies">
          Cookie Policy
        </Link>
      </div>
      <div className="text-xs text-purple-950/50 dark:text-purple-200/50">
        <p>
          {t("google1")}
          <Link
            className="underline"
            href="https://policies.google.com/privacy">
            {t("gpp")}
          </Link>
          {t("gtxt1")}
          <Link
            className="underline"
            href="https://policies.google.com/terms">
            {t("gts")}
          </Link>
          {t("gtxt2")}
        </p>
      </div>
    </footer>
  );
};
