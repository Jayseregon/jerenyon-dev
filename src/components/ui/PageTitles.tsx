import { motion } from "motion/react";

interface PageTitlesProps {
  pageTitle: string;
  heroTitle: string;
  heroSubtitle: string | React.ReactNode;
}

const PageTitles = ({
  pageTitle,
  heroTitle,
  heroSubtitle,
}: PageTitlesProps) => {
  return (
    <>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-purple-800 dark:text-purple-300 mb-3">
          {pageTitle}
        </h1>
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-5xl font-bold">{heroTitle}</h2>
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl mt-2 text-purple-800/70 dark:text-purple-300/70 max-w-3xl mx-auto p-5">
          {heroSubtitle}
        </h3>
      </motion.div>
    </>
  );
};

export default PageTitles;
