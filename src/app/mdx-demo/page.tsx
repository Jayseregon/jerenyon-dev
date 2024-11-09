import path from "path";
import fs from "fs";

import { title } from "@/components/typography";
import MDXFilesList from "@/components/mdx/MDXFilesList";

const postType = "blogs-articles";

export default function MdxPage() {
  const contentDir = path.join(process.cwd(), `public/content/${postType}`);
  const files = fs.readdirSync(contentDir);
  const mdFiles = files.filter((file) => file.endsWith(".mdx"));

  return (
    <div>
      <h1 className={title()}>Titles</h1>
      <div className="py-3" />
      <MDXFilesList mdFiles={mdFiles} />
    </div>
  );
}
