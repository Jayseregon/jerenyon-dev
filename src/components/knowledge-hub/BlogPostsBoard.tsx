import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BlogPostRefactor } from "@/src/interfaces/Hub";

import { BlogPostBoardTile } from "./BlogPostBoardTile";

export const BlogPostsBoard = ({ data }: { data: BlogPostRefactor[] }) => {
  const firstColumn = data.filter((_, index) => index % 3 === 0);
  const secondColumn = data.filter((_, index) => index % 3 === 1);
  const thirdColumn = data.filter((_, index) => index % 3 === 2);

  return (
    <div className="mx-auto">
      <Breadcrumbs />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-8">
          {firstColumn.map((article, index) => (
            <BlogPostBoardTile key={index} article={article} index={index} />
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {secondColumn.map((article, index) => (
            <BlogPostBoardTile key={index} article={article} index={index} />
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {thirdColumn.map((article, index) => (
            <BlogPostBoardTile key={index} article={article} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
