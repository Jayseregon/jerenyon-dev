import { BlogPostCategory } from "@prisma/client";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: BlogPostCategory;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  author: string;
  summary: string;
  publishedAt?: Date | null;
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface BlogPostRefactor {
  thumbnail: string;
  title: string;
  description: string;
  href: string;
  publishedDate?: string;
  tags: Tag[];
}

export interface MainCategoryCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  footerText: string;
  articleCategory: PostTypes;
  href: string;
}

export interface PostPushCardProps {
  id: string;
  slug: string;
  title: string;
}

export type PostTypes = "articles-and-tutorials" | "projects-showcase";

export interface BLogPostReaderProps {
  post: BlogPost;
}

export interface BlogPostPageTitleMotionProps {
  pageTitle: string;
  postTitle: string;
}

export interface PostDataProps {
  title: string;
  content: string;
  category: BlogPostCategory;
  published: boolean;
  summary: string;
  tags: string[];
  publishedAt?: Date | null;
}

export interface TagInputProps {
  existingTags: Tag[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  nonce?: string;
}
