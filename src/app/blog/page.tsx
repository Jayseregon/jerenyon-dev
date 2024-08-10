import { title } from "@/components/typography";
import { PageTmpCard } from "@/src/components/PageTmpCard";
import { siteConfig } from "@/src/config/site";

export default function BlogPage() {
  return (
    <div>
      <h1 className={title()}>{siteConfig.Blog.h1_title}</h1>

      <div className="py-3" />

      <PageTmpCard subtitle={siteConfig.Blog.subtitle} />
    </div>
  );
}
