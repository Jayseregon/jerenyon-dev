import { motion } from "motion/react";

interface PageTitlesProps {
  pageTitle: string;
  heroTitle: string;
  heroSubtitle: string | React.ReactNode;
  nonce?: string;
}

const PageTitles = ({
  pageTitle,
  heroTitle,
  heroSubtitle,
  nonce,
}: PageTitlesProps) => {
  return (
    <>
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        className="text-purple-800 dark:text-purple-300 mb-3"
        initial={{ opacity: 0, y: -50 }}
        nonce={nonce}
        transition={{ duration: 0.5 }}
      >
        {pageTitle}
      </motion.h1>
      <motion.h2
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        nonce={nonce}
        transition={{ duration: 0.5 }}
      >
        {heroTitle}
      </motion.h2>
      <motion.h3
        animate={{ opacity: 1, y: 0 }}
        className="text-xl mt-2 text-purple-800/70 dark:text-purple-300/70 max-w-3xl mx-auto p-5"
        initial={{ opacity: 0, y: 50 }}
        nonce={nonce}
        transition={{ duration: 0.5 }}
      >
        {heroSubtitle}
      </motion.h3>
    </>
  );
};

export default PageTitles;
