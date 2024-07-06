import { title } from "@/components/typography";
import { useTranslations } from "next-intl";

export default function AppsPage() {
  const t = useTranslations("Contact");

  return (
    <div>
      <h1 className={title()}>{t("h1_title")}</h1>
    </div>
  );
}
