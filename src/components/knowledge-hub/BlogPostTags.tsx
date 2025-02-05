"use client";

import { useContext } from "react";

import { Badge } from "@/components/ui/badge";
import { Tag } from "@/src/interfaces/Hub";
import { NonceContext } from "@/src/app/providers";

export const BlogPostTags = ({
  tags,
  className,
}: {
  tags: Tag[];
  className?: string;
}) => {
  const nonce = useContext(NonceContext);

  return (
    <div
      aria-label="Selected tags"
      className={`flex flex-wrap gap-1 ${className}`}
      nonce={nonce}
      role="list"
    >
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          aria-label={`Remove tag ${tag.name}`}
          variant="purple"
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};
