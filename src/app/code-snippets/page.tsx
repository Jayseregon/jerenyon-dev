import { title } from "@/components/typography";
import { PageTmpCard } from "@/src/components/PageTmpCard";
import { siteConfig } from "@/src/config/site";

export default function CodeSnippetPage() {
  return (
    <div>
      <h1 className={title()}>{siteConfig.CodeSnippet.h1_title}</h1>

      <div className="py-3" />

      <PageTmpCard subtitle={siteConfig.CodeSnippet.subtitle} />
    </div>
  );
}
