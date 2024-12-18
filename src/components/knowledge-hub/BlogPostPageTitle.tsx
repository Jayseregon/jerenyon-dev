"use client";

import { useTranslations } from "next-intl";

import BlogPostPageTitleMotion from "@/components/knowledge-hub/BlogPostPageTitleMotion";

const BlogPostPageTitle = ({ title }: { title: string }) => {
  const t = useTranslations("knowledge-hub");
  const pageTitle = t("title");

  return <BlogPostPageTitleMotion pageTitle={pageTitle} postTitle={title} />;
};

export default BlogPostPageTitle;
