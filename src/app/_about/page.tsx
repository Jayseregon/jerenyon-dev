import { headers } from "next/headers";
import { Link } from "@nextui-org/link";

import { PageTmpCard } from "@/src/components/PageTmpCard";
import { getListOfFiles } from "@/src/lib/mdReader";
import { title } from "@/components/typography";
import { siteConfig } from "@/src/config/site";

export default function AboutPage() {
  const mdFiles = getListOfFiles("posts");
  const nonce = headers().get("x-nonce");

  return (
    <div>
      <h1 className={title()}>{siteConfig.About.h1_title}</h1>

      <div className="py-3" />

      <PageTmpCard subtitle={siteConfig.About.subtitle} />

      <div className="py-20" />

      <div>
        {mdFiles.map((file, index) => (
          <ul key={index}>
            <li key={`${index}-${file}`}>
              <Link
                href={`/about/${file.replace(".mdx", "")}`}
                nonce={nonce || undefined}
              >
                {file}
              </Link>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
