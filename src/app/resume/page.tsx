import { title } from "@/components/typography";
import { siteConfig } from "@/config/site";
import { Timeline } from "@/src/components/Timeline";

export default function ResumePage() {
  return (
    <div>
      <h1 className={title()}>{siteConfig.Resume.h1_title}</h1>

      <div className="py-3" />

      <Timeline />
    </div>
  );
}
