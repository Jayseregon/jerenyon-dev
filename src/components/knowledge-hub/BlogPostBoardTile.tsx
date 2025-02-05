"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import { useContext } from "react";

import { BlogPostRefactor } from "@/src/interfaces/Hub";
import { NonceContext } from "@/src/app/providers";

import { BlogPostTags } from "./BlogPostTags";

export const BlogPostBoardTile = ({
  article,
  index,
}: {
  article: BlogPostRefactor;
  index: number;
}) => {
  const nonce = useContext(NonceContext);

  return (
    <Link key={index} href={article.href}>
      <motion.div
        key={index}
        className="bg-background p-4 rounded-lg shadow-md border border-purple-800 dark:border-purple-300"
        nonce={nonce}
        transition={{ type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="clearfix after:clear-both after:block" nonce={nonce}>
          <Image
            alt={article.title}
            className="float-left w-20 h-20 mr-4 mb-2 rounded-lg"
            height={200}
            nonce={nonce}
            src={article.thumbnail}
            width={200}
          />
          <h5
            className="text-2xl mb-2 font-bold text-purple-800 dark:text-purple-300 text-left"
            nonce={nonce}
          >
            {article.title}
          </h5>
          <p
            className="text text-justify text-pretty text-foreground"
            nonce={nonce}
          >
            {article.description.slice(0, 200)}
          </p>
          <BlogPostTags className="mt-5" tags={article.tags} />
          <div className="flex items-center justify-end gap-2 mt-2 text-sm text-purple-800/70 dark:text-purple-300/70">
            <CalendarDays size={16} />
            <span>{article.publishedDate}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
