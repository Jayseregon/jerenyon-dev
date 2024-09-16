"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

import BaseButton from "@/components/buttons/BaseButton";
import { siteConfig } from "@/config/site";

export default function RootPage() {
  const t = useTranslations("homepage");

  return (
    <>
      {/* Cover Image */}
      <div
        className="relative w-screen h-screen overflow-hidden"
        id="cover-image"
      >
        <Image
          fill
          alt="Cover Image"
          className="absolute top-0 left-0 w-full h-full object-cover"
          quality={100}
          src="/coverImage.png"
          style={{ objectFit: "cover", objectPosition: "center" }}
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
        <Card className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300 mb-8 mt-5 w-full max-w-lg">
          <CardHeader className="p-0 m-0 flex justify-center">
            <div className="grid grid-cols gap-2 text-background bg-purple-800 dark:bg-purple-300 rounded-b-2xl px-6 py-1">
              <h2 className="grid grid-cols-1 uppercase text-lg font-semibold">
                {t("about.title")}
              </h2>
            </div>
          </CardHeader>
          <CardBody className="p-6 text-center">
            <p className="mt-4">{t("about.description")}</p>
          </CardBody>
        </Card>

        {/* Services Section */}
        <Card className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300 mb-8 mt-5 w-full max-w-xl">
          <CardHeader className="p-0 m-0 flex justify-center">
            <div className="grid grid-cols gap-2 text-background bg-purple-800 dark:bg-purple-300 rounded-b-2xl px-6 py-1">
              <h2 className="grid grid-cols-1 uppercase text-lg font-semibold">
                {t("services.title")}
              </h2>
            </div>
          </CardHeader>
          <CardBody className="p-6 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 pb-10">
              <div>
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                  {t("services.service1.title")}
                </h3>
                <p className="mt-1 text-md text-purple-800/70 dark:text-purple-300/70">
                  {t("services.service1.description")}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                  {t("services.service2.title")}
                </h3>
                <p className="mt-1 text-md text-purple-800/70 dark:text-purple-300/70">
                  {t("services.service2.description")}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                  {t("services.service3.title")}
                </h3>
                <p className="mt-1 text-md text-purple-800/70 dark:text-purple-300/70">
                  {t("services.service3.description")}
                </p>
              </div>
            </div>
            <Link href={t("services.cta_link")}>
              <BaseButton className="w-40" content={t("services.cta_button")} />
            </Link>
          </CardBody>
        </Card>

        {/* Resume and Portfolio Section */}
        <Card className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300 mb-8 mt-5 w-full max-w-lg">
          <CardHeader className="p-0 m-0 flex justify-center">
            <div className="grid grid-cols gap-2 text-background bg-purple-800 dark:bg-purple-300 rounded-b-2xl px-6 py-1">
              <h2 className="grid grid-cols-1 uppercase text-lg font-semibold">
                {t("resume_portfolio.title")}
              </h2>
            </div>
          </CardHeader>
          <CardBody className="p-6 text-center">
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
          </CardBody>
        </Card>

        {/* Call to Action Section */}
        <Card className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300 mb-8 mt-5 w-full max-w-lg">
          <CardHeader className="p-0 m-0 flex justify-center">
            <div className="grid grid-cols gap-2 text-background bg-purple-800 dark:bg-purple-300 rounded-b-2xl px-6 py-1">
              <h2 className="grid grid-cols-1 uppercase text-lg font-semibold">
                {t("cta_section.title")}
              </h2>
            </div>
          </CardHeader>
          <CardBody className="p-6 text-center">
            <p className="mt-4">{t("cta_section.description")}</p>
            <Link href={t("cta_section.cta_link")}>
              <BaseButton content={t("cta_section.cta_button")} />
            </Link>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
