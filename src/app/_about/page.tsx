import { headers } from "next/headers";
import { Link } from "@nextui-org/link";

import { getListOfFiles } from "@/src/lib/mdReader";
import { title } from "@/components/typography";

export default function AboutPage() {
  const mdFiles = getListOfFiles("posts");
  const nonce = headers().get("x-nonce");

  return (
    <div>
      <h1 className={title()}>Title</h1>

      <div className="py-3" />

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
