"use client";

import { useTranslations } from "next-intl";
import { useContext } from "react";

import BlogPostPageTitleMotion from "@/components/knowledge-hub/BlogPostPageTitleMotion";
import { NonceContext } from "@/src/app/providers";

const BlogPostPageTitle = ({ title }: { title: string }) => {
  const nonce = useContext(NonceContext);
  const t = useTranslations("knowledge-hub");
  const pageTitle = t("title");

  return (
    <BlogPostPageTitleMotion
      nonce={nonce}
      pageTitle={pageTitle}
      postTitle={title}
    />
  );
};

export default BlogPostPageTitle;
