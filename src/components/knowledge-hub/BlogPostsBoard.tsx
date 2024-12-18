import Link from "next/link";
import { Image } from "@nextui-org/react";

import { BlogPostRefactor } from "@/src/interfaces/Hub";

export const BlogPostsBoard = ({ data }: { data: BlogPostRefactor[] }) => {
  return (
    <div className="px-4">
      {data.map((article, index) => (
        <Link key={index} href={article.href}>
          <div
            key={index}
            className="flex cursor-pointer hover:scale-105 transition-transform items-start mb-4 bg-white p-2 rounded-lg shadow-md"
          >
            <Image
              removeWrapper
              alt={article.title}
              className="w-12 h-12 mr-4 rounded-lg"
              src={article.thumbnail}
            />
            <div>
              <h5 className="text-lg font-semibold text-foreground dark:text-background">
                {article.title}
              </h5>
              <p className="text-sm text-gray-600">{article.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
