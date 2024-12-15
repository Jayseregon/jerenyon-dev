"use client";

import { useTranslations } from "next-intl";

import { BlogPostPageTitleProps } from "@/src/interfaces/Hub";
import BlogPostPageTitleMotion from "@/components/knowledge-hub/BlogPostPageTitleMotion";

const BlogPostPageTitle = ({ title, category }: BlogPostPageTitleProps) => {
  const t = useTranslations("knowledge-hub");
  const pageTitle = t("title");
  const categoryTitle = t(`hubCategories.${category}.title`);

  return (
    <BlogPostPageTitleMotion
      categoryTitle={categoryTitle}
      pageTitle={pageTitle}
      postTitle={title}
    />
  );
};

export default BlogPostPageTitle;
