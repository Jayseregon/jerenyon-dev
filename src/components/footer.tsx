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
      className="w-full flex text-xs text-center antialiased items-center justify-center py-3 text-foreground/50 text-wrap"
      nonce={nonce || undefined}
    >
      <div>
        <p>
          <span>
            &copy; {new Date().getFullYear()} {t("copyright1")} -{" "}
            {t("copyright2")} - {t("google1")}
          </span>
          <Link
            className="underline"
            href="https://policies.google.com/privacy"
          >
            {t("gpp")}
          </Link>
          {t("gtxt1")}
          <Link className="underline" href="https://policies.google.com/terms">
            {t("gts")}
          </Link>
          {t("gtxt2")}
        </p>
      </div>
    </footer>
  );
};
