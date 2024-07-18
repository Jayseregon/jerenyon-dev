import { useTranslations } from "next-intl";

import { title } from "@/components/typography";
import { PageTmpCard } from "@/src/components/PageTmpCard";

export default function ResumePage() {
  const t = useTranslations("Resume");

  return (
    <div>
      <h1 className={title()}>{t("h1_title")}</h1>

      <div className="py-3" />

      <PageTmpCard subtitle={t("subtitle")} />
    </div>
  );
}
