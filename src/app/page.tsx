"use client";

import { useTranslations } from "next-intl";

import ParallaxImage from "@/components/ui/ParallaxImage";

export default function RootPage() {
  const t = useTranslations("homepage");

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Bounding Box */}
      {/* <div className="absolute top-16 left-0 right-0 flex items-start justify-center z-10">
          <div className="w-full h-full pt-32 pb-28 md:pt-28 md:pb-32">
            <BoundingBox pathLengthRange={[50, 100]} />
          </div>
        </div> */}

      {/* <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-full h-full pt-32 pb-28 md:pt-28 md:pb-32">
            <BoundingBox pathLengthRange={[50, 100]} />
          </div>
        </div> */}

      {/* Cover Image */}
      {/* <div className="absolute top-16 left-0 right-0 flex items-start justify-center z-20">
          <Image
            id="cover-image"
            alt="Cover Image"
            className="relative max-w-full max-h-full object-contain scale-80 md:scale-100"
            quality={100}
            src="/coverImage-new-purple2.png"
            width={800}
            height={600}
            style={{ width: "auto", height: "auto" }}
          />
        </div> */}

      {/* Parallax Image */}
      <div>
        {/* Example for small screens */}
        <div className="block md:hidden">
          <ParallaxImage height="50vh" marginTopClass="mt-16" width="100%" />
        </div>

        {/* Example for medium and large screens */}
        <div className="hidden md:block">
          <ParallaxImage height="80vh" marginTopClass="mt-12" width="80%" />
        </div>
      </div>

      {/* Hero Title */}
      <div className="absolute bottom-0 left-0 w-full grid grid-cols-1 gap-2 items-center justify-center bg-none z-40">
        <div className="inline-block text-center w-full">
          <h2
            className="text-5xl font-bold text-foreground max-w-xl mx-auto"
            id="hero-title"
          >
            {t("hero.title")}
          </h2>
        </div>

        {/* Hero Subtitle */}
        <div className="inline-block text-center w-full">
          <h3
            className="text-2xl font-semibold mt-2 text-foreground max-w-3xl mx-auto p-5"
            id="hero-subtitle"
          >
            {t("hero.subtitle")}
          </h3>
        </div>
      </div>
    </div>
  );
}
