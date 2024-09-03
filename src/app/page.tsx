import { Snippet } from "@nextui-org/snippet";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/typography";
import { ColorCard, ColorCardScale } from "@/components/ColorCard";

export default function RootPage() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: "violet", size: "lg" })}>
          {siteConfig.name}
        </h1>
        <br />
        <h1 className={title()}>{siteConfig.heroTitle}</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          {siteConfig.heroDescription}
        </h2>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="flat">
          <span>{siteConfig.code}</span>
        </Snippet>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        <ColorCard />
        <ColorCardScale target_color="primary" />
        <ColorCardScale target_color="secondary" />
        <ColorCardScale target_color="success" />
        <ColorCardScale target_color="warning" />
        <ColorCardScale target_color="danger" />
      </div>
    </section>
  );
}
