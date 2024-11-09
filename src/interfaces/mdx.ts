import { ReactNode } from "react";

export interface MdPageContentProps {
  params: {
    slug: string;
  };
}

export interface DynamicDocTemplateProps {
  params: { slug: string };
  postType: string;
}

export interface MetadataTemplateProps {
  params: { slug: string };
  postType: "blogs-articles" | "projects";
}

export interface MdxRendererProps {
  source: string;
}

export interface MdxFileListProps {
  mdFiles: string[];
}

export interface MdxCompsDefaultProps {
  children?: ReactNode;
}

export interface LoadDynamicImageProps {
  imageName: string;
}

export interface CalloutProps {
  children?: ReactNode;
  type?: "default" | "warning" | "danger";
}
