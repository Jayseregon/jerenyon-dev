import { title } from "@/components/typography";
import { PageTmpCard } from "@/src/components/PageTmpCard";
import { siteConfig } from "@/config/site";

export default function ResumePage() {
  return (
    <div>
      <h1 className={title()}>{siteConfig.Resume.h1_title}</h1>

      <div className="py-3" />

      <PageTmpCard subtitle={siteConfig.Resume.subtitle} />
    </div>
  );
}
