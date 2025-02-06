"use client";
import { useContext } from "react";

import { Badge } from "@/components/ui/badge";
import { Tag } from "@/src/interfaces/Hub";
import { NonceContext } from "@/src/app/providers";

// Added optional onTagClick callback.
export interface BlogPostTagsProps {
  tags: Tag[];
  className?: string;
  onTagClick?: (tag: Tag) => void;
}

export const BlogPostTags = ({
  tags,
  className,
  onTagClick,
}: BlogPostTagsProps) => {
  const nonce = useContext(NonceContext);

  return (
    <div
      aria-label="Tags list"
      className={`flex flex-wrap gap-1 ${className}`}
      nonce={nonce}
      role="list"
    >
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          aria-label={onTagClick ? `Select tag ${tag.name}` : `Tag ${tag.name}`}
          className={onTagClick ? "cursor-pointer text-sm" : "text-sm"}
          variant="purple"
          // Call onTagClick if provided
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};
