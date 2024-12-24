import { Chip } from "@nextui-org/react";

import { Tag } from "@/src/interfaces/Hub";

export const BlogPostTags = ({
  tags,
  className,
}: {
  tags: Tag[];
  className?: string;
}) => {
  return (
    <div
      aria-label="Selected tags"
      className={`flex flex-wrap gap-1 ${className}`}
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
          size="sm"
          variant="flat"
        >
          {tag.name}
        </Chip>
      ))}
    </div>
  );
};
