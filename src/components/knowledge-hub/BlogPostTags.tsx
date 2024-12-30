"use client";

import { Chip } from "@nextui-org/react";
import { useContext } from "react";

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
        <Chip
          key={tag.id}
          aria-label={`Remove tag ${tag.name}`}
          classNames={{
            base: "bg-transparent border border-purple-500",
            content: "text-sm text-purple-500",
          }}
          nonce={nonce}
          size="sm"
          variant="flat"
        >
          {tag.name}
        </Chip>
      ))}
    </div>
  );
};
