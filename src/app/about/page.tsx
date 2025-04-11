"use client";

import { useTranslations } from "next-intl";
import { useContext } from "react";
import { FileDown } from "lucide-react";

import { Timeline } from "@/src/components/about/Timeline";
import PageTitles from "@/src/components/root/PageTitles";
import { AboutCardProps } from "@/interfaces/About";
import { AboutCard } from "@/components/about/AboutCard";
import { NonceContext } from "@/src/app/providers";
import { Button } from "@/src/components/ui/button";
import { LinkedInIcon } from "@/components/icons";

export default function AboutPage() {
  const nonce = useContext(NonceContext);
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
        nonce={nonce}
        pageTitle={t("title")}
      />
      <div className="space-y-20 mt-10" nonce={nonce}>
        <div
          className="flex flex-col max-w-lg md:max-w-3xl mx-auto space-y-20 px-6"
          nonce={nonce}
        >
          {sectionData.map((section, index) => (
            <AboutCard key={index} {...section} />
          ))}
        </div>

        {/* Resume and LinkedIn buttons */}
        <div
          className="flex flex-col items-center justify-center py-6"
          nonce={nonce}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="flex items-center gap-2"
              size="lg"
              variant="form"
            >
              <a download href="/assets/resume/cv-jeremie-bitsch.pdf">
                <FileDown className="h-4 w-4 mr-2" /> {t("button.download")}
              </a>
            </Button>
            <Button
              asChild
              className="flex items-center gap-2"
              size="lg"
              variant="form"
            >
              <a
                href="https://www.linkedin.com/in/jeremie-bitsch"
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkedInIcon className="h-4 w-4 mr-2" /> {t("button.linkedin")}
              </a>
            </Button>
          </div>
        </div>

        <Timeline />
      </div>
    </div>
  );
}
