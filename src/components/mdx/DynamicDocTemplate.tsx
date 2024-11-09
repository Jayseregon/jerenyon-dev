import fs from "fs";
import path from "path";

import { Metadata } from "next";
import { Suspense } from "react";

import { title } from "@/components/typography";
import SpinLoader from "@/components/ui/SpinLoader";
import { MDXRenderer } from "@/components/mdx/MDXRenderer";
import {
  DynamicDocTemplateProps,
  MetadataTemplateProps,
} from "@/interfaces/mdx";

const docsDirectory = (postType: string) =>
  path.join(process.cwd(), `public/content/${postType}`);

async function getDocContent(postType: string, slug: string) {
  const filePath = path.join(docsDirectory(postType), `${slug}.mdx`);

  return fs.promises.readFile(filePath, "utf8");
}

export default async function DynamicDocTemplate({
  params,
  postType,
}: DynamicDocTemplateProps) {
  const source = await getDocContent(postType, params.slug);
  const { content, frontmatter } = await MDXRenderer({ source });

  return (
    <div>
      <h1 className={title()}>{frontmatter.title as string}</h1>
      <div className="py-3" />
      <div className="prose prose-lightTheme dark:prose-darkTheme text-justify max-w-screen-md mx-auto">
        <Suspense fallback={<SpinLoader />}>{content}</Suspense>
      </div>
    </div>
  );
}

// Update metadata dynamically based on frontmatter
export async function generateMetadataTemplate({
  params,
  postType,
}: MetadataTemplateProps): Promise<Metadata> {
  const source = await getDocContent(postType, params.slug);
  const { frontmatter } = await MDXRenderer({ source });

  return { title: frontmatter.title as string };
}

export async function generateStaticParamsTemplate(postType: string) {
  const files = fs.readdirSync(docsDirectory(postType));

  return files.map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}
