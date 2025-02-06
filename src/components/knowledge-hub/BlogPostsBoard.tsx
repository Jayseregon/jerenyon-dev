import Breadcrumbs from "@/src/components/root/Breadcrumbs";
import { BlogPostRefactor } from "@/src/interfaces/Hub";

import { BlogPostBoardTile } from "./BlogPostBoardTile";

export const BlogPostsBoard = ({
  data,
  nonce,
}: {
  data: BlogPostRefactor[];
  nonce?: string;
}) => {
  const firstColumn = data.filter((_, index) => index % 3 === 0);
  const secondColumn = data.filter((_, index) => index % 3 === 1);
  const thirdColumn = data.filter((_, index) => index % 3 === 2);

  return (
    <div className="mx-auto" nonce={nonce}>
      <Breadcrumbs />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" nonce={nonce}>
        <div className="flex flex-col gap-8" nonce={nonce}>
          {firstColumn.map((article, index) => (
            <BlogPostBoardTile key={index} article={article} index={index} />
          ))}
        </div>
        <div className="flex flex-col gap-8" nonce={nonce}>
          {secondColumn.map((article, index) => (
            <BlogPostBoardTile key={index} article={article} index={index} />
          ))}
        </div>
        <div className="flex flex-col gap-8" nonce={nonce}>
          {thirdColumn.map((article, index) => (
            <BlogPostBoardTile key={index} article={article} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
