import Link from "next/link";
import { Image } from "@nextui-org/react";
import { motion } from "motion/react";
import { CalendarDays } from "lucide-react";

import { BlogPostRefactor } from "@/src/interfaces/Hub";

export const BlogPostBoardTile = ({
  article,
  index,
}: {
  article: BlogPostRefactor;
  index: number;
}) => {
  return (
    <Link key={index} href={article.href}>
      <motion.div
        key={index}
        className="bg-background p-4 rounded-lg shadow-md border border-purple-800 dark:border-purple-300"
        transition={{ type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="clearfix after:clear-both after:block">
          <Image
            removeWrapper
            alt={article.title}
            className="float-left w-20 h-20 mr-4 mb-2 rounded-lg"
            src={article.thumbnail}
          />
          <h5 className="text-2xl mb-2 font-bold text-purple-800 dark:text-purple-300 text-left">
            {article.title}
          </h5>
          <p className="text text-justify text-pretty text-foreground">
            {article.description.slice(0, 200)}
          </p>
          <div className="flex items-center justify-end gap-2 mt-2 text-sm text-purple-800/70 dark:text-purple-300/70">
            <CalendarDays size={16} />
            <span>{article.publishedDate}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
