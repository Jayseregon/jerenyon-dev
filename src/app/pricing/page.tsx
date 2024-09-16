import { useTranslations } from "next-intl";

import { PricingBoard } from "@/src/components/pricing/PricingBoard";
import { Addons } from "@/src/components/pricing/Addons";
import { Maintenance } from "@/src/components/pricing/Maintenance";

export default function PricingPage() {
  const t = useTranslations("pricing");

  return (
    <div>
      <h1 className="text-purple-800 dark:text-purple-300 mb-3">
        {t("title")}
      </h1>
      <h2 className="text-5xl font-bold">{t("hero.title")}</h2>
      <h3 className="text-xl mt-2 text-purple-800/70 dark:text-purple-300/70 max-w-3xl mx-auto p-5">
        {t("hero.subtitle")}
      </h3>

      <div className="py-3" />

      <PricingBoard />

      <div className="py-3" />

      <h3 className="text-3xl font-bold">{t("addons")}</h3>
      <Addons />
      <Maintenance />

      <div className="py-3" />

      <p className="text-center text-sm text-purple-800/70 dark:text-purple-300/70 mt-5">
        <span className="align-super text-sm">*</span>
        {t("disclaimer.line1")}
        <br />
        {t("disclaimer.line2")}
        <br />
        {t("disclaimer.line3")}
      </p>
    </div>
  );
}
