import { useTranslations } from "next-intl";

import { Timeline } from "@/src/components/resume/Timeline";

export default function ResumePage() {
  const t = useTranslations("resume");

  return (
    <div>
      <h1 className="text-purple-800 dark:text-purple-300 mb-3">
        {t("title")}
      </h1>
      <h2 className="text-5xl font-bold">{t("hero.title")}</h2>
      <h3 className="text-xl mt-2 text-purple-800/70 dark:text-purple-300/70 max-w-2xl mx-auto p-5">
        {t("hero.subtitle")}
      </h3>

      <div className="py-3" />

      <div className="py-3" />

      <Timeline />
    </div>
  );
}
