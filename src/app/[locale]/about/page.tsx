import { title } from "@/components/typography";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { PageTmpCard } from "@/src/components/PageTmpCard";

export default function AppsPage() {
  const t = useTranslations("About");

  return (
    <div>
      <h1 className={title()}>{t("h1_title")}</h1>

      <div className="py-3"></div>

      <PageTmpCard subtitle={t("subtitle")} />
    </div>
  );
}
