"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

import BaseButton from "@/components/buttons/BaseButton";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/typography";

export default function RootPage() {
  const t = useTranslations("homepage");

  return (
    <>
      {/* Cover Image */}
      <div
        className="relative w-screen h-screen overflow-hidden"
        id="cover-image">
        <Image
          fill
          alt="Cover Image"
          className="absolute top-0 left-0 w-full h-full"
          quality={100}
          src="/coverImage.png"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div className="inline-block text-center justify-center px-10">
            <h1 className="hidden">{siteConfig.name}</h1>
            <h2 className="text-5xl font-bold text-white">{t("hero.title")}</h2>
            <h3 className="text-2xl font-semibold mt-2 text-white max-w-3xl mx-auto p-5">
              {t("hero.subtitle")}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex flex-col items-center justify-center space-y-12 mt-20 pb-10">
        {/* About Section */}
        <div className="max-w-lg text-center">
          <h2 className={title()}>{t("about.title")}</h2>
          <p className="mt-4">{t("about.description")}</p>
        </div>

        {/* Services Section */}
        <div className="max-w-4xl text-center">
          <h2 className={title()}>{t("services.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 pb-10">
            <div>
              <h3 className={subtitle()}>{t("services.service1.title")}</h3>
              <p>{t("services.service1.description")}</p>
            </div>
            <div>
              <h3 className={subtitle()}>{t("services.service2.title")}</h3>
              <p>{t("services.service2.description")}</p>
            </div>
            <div>
              <h3 className={subtitle()}>{t("services.service3.title")}</h3>
              <p>{t("services.service3.description")}</p>
            </div>
          </div>
          <Link href={t("services.cta_link")}>
            <BaseButton
              className="w-40"
              content={t("services.cta_button")}
            />
          </Link>
        </div>

        {/* Resume and Portfolio Section */}
        <div className="max-w-lg text-center">
          <h2 className={title()}>{t("resume_portfolio.title")}</h2>
          <p className="mt-4">{t("resume_portfolio.description")}</p>
          <div className="flex space-x-4 justify-center mt-4">
            <Link href="/resume">
              <BaseButton
                className="w-40"
                content={t("resume_portfolio.resume_link")}
              />
            </Link>
            <Link href="/portfolio">
              <BaseButton
                className="w-40"
                content={t("resume_portfolio.portfolio_link")}
              />
            </Link>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="max-w-lg text-center">
          <h2 className={title()}>{t("cta_section.title")}</h2>
          <p className="mt-4">{t("cta_section.description")}</p>
          <Link href={t("cta_section.cta_link")}>
            <BaseButton content={t("cta_section.cta_button")} />
          </Link>
        </div>
      </section>
    </>
  );
}
