import { siteConfig } from "@/src/config/site";
import { title } from "@/components/typography";
import { PageTmpCard } from "@/src/components/PageTmpCard";

export default function ProjectPage() {
  return (
    <div>
      <h1 className={title()}>{siteConfig.Projects.h1_title}</h1>

      <div className="py-3" />

      <PageTmpCard subtitle={siteConfig.Projects.subtitle} />
    </div>
  );
}
