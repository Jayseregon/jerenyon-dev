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
}

export interface Article {
  thumbnail: string;
  title: string;
  description: string;
  href: string;
}

export interface MainCategoryCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  footerText: string;
  articleCategory: PostTypes;
}

export interface PostPushCardProps {
  id: string;
  slug: string;
  title: string;
}

export type PostTypes = "articles-and-tutorials" | "projects-showcases";
