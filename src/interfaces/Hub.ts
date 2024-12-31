import type { MouseEvent } from "react";

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
  views: number;
  likes: number;
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
  nonce?: string;
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
  views?: number;
  likes?: number;
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

export type TiptapMenuBarProps = {
  editor: Editor;
  isBubbleMenu?: boolean;
  nonce?: string;
};

export interface BlogPostMetadataProps {
  post: BlogPost;
  t: (key: string) => string;
  nonce?: string;
}

export interface BlogPostDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  post: BlogPost;
  editor?: Editor;
  tocItems?: any[]; // or your typed items
}

export interface TableOfContentsItem {
  id: string;
  textContent: string;
  level: number;
  itemIndex: number;
  isActive?: boolean;
  isScrolledOver?: boolean;
}

export type OnItemClick = (
  e: MouseEvent<HTMLAnchorElement>,
  id: string,
) => void;

export interface ToCProps {
  items?: TableOfContentsItem[];
  editor?: Editor;
  nonce?: string;
}

export interface ToCItemProps {
  item: TableOfContentsItem;
  onItemClick: OnItemClick;
  index: number;
  nonce?: string;
}

export interface SitemapPost {
  slug: string;
  updatedAt: Date;
}

export interface ShareButtonProps {
  url: string;
  title: string;
  summary: string;
  nonce?: string;
}
