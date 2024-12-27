import { BlogPostCategory } from "@prisma/client";
import { Editor, JSONContent } from "@tiptap/react";

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
  coverImage?: string | null;
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
  coverImage?: string | null;
}

export interface TagInputProps {
  existingTags: Tag[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  nonce?: string;
}

export interface EditorProps {
  content: JSONContent | undefined;
  setContent?: (content: JSONContent | undefined) => void;
  initialContent?: JSONContent;
  editable?: boolean;
  onEditorReady?: (editor: Editor) => void;
  onTocItemsUpdate?: (items: any[]) => void;
}
