import { motion } from "motion/react";

import { BlogPostPageTitleMotionProps } from "@/src/interfaces/Hub";

const BlogPostPageTitleMotion = ({
  pageTitle,
  postTitle,
}: BlogPostPageTitleMotionProps) => {
  return (
    <>
      <motion.div className="flex flex-col-reverse">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {postTitle}
        </motion.h1>
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="text-purple-800 dark:text-purple-300 mb-3"
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {pageTitle}
        </motion.h2>
      </motion.div>
    </>
  );
};

export default BlogPostPageTitleMotion;
