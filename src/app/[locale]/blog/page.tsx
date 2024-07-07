import { title } from "@/components/typography";
import { useTranslations } from "next-intl";
import { PageTmpCard } from "@/src/components/PageTmpCard";

export default function AppsPage() {
  const t = useTranslations("Blog");

  return (
    <div>
      <h1 className={title()}>{t("h1_title")}</h1>

      <div className="py-3"></div>

      <PageTmpCard subtitle={t("subtitle")} />
    </div>
  );
}
