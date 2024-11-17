"use client";

import { useTranslations } from "next-intl";

import { Timeline } from "@/src/components/about/Timeline";
import PageTitles from "@/src/components/ui/PageTitles";
import { AboutCardProps } from "@/interfaces/About";
import { AboutCard } from "@/components/about/AboutCard";

export default function AboutPage() {
  const t = useTranslations("about");

  const sectionData: AboutCardProps[] = [
    {
      title: t("sections.jerenyon-dev.title"),
      subtitle: t("sections.jerenyon-dev.subtitle"),
      paragraphs: [
        t("sections.jerenyon-dev.paragraphs.p1"),
        t("sections.jerenyon-dev.paragraphs.p2"),
        t("sections.jerenyon-dev.paragraphs.p3"),
        t("sections.jerenyon-dev.paragraphs.p4"),
      ],
      imgName: "jerenyon-icon",
    },
    {
      title: t("sections.jeremie.title"),
      subtitle: t("sections.jeremie.subtitle"),
      paragraphs: [
        t("sections.jeremie.paragraphs.p1"),
        t("sections.jeremie.paragraphs.p2"),
        t("sections.jeremie.paragraphs.p3"),
      ],
      imgName: "jeremie-icon",
    },
  ];

  return (
    <div>
      <PageTitles
        heroSubtitle={t("hero.subtitle")}
        heroTitle={t("hero.title")}
        pageTitle={t("title")}
      />
      <div className="space-y-20 mt-10">
        <div className="flex flex-col max-w-lg md:max-w-3xl mx-auto space-y-20 px-5">
          {sectionData.map((section, index) => (
            <AboutCard key={index} {...section} />
          ))}
        </div>
        <Timeline />
      </div>
    </div>
  );
}
