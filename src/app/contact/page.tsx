import { title } from "@/components/typography";
import { PageTmpCard } from "@/src/components/PageTmpCard";
import { siteConfig } from "@/src/config/site";

export default function ContactPage() {
  return (
    <div>
      <h1 className={title()}>{siteConfig.Contact.h1_title}</h1>

      <div className="py-3" />

      <PageTmpCard subtitle={siteConfig.Contact.subtitle} />

      <div className="py-5" />
    </div>
  );
}
