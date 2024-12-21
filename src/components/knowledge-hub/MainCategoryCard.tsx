"use client";

import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Image,
  CardBody,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

import { BlogPostRefactor, MainCategoryCardProps } from "@/interfaces/Hub";
import { getLatestArticlesAndProjects } from "@/actions/prisma/blogPosts/action";

const MainCategoryCard = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  buttonText,
  footerText,
  articleCategory,
  href,
}: MainCategoryCardProps) => {
  const [articles, setArticles] = useState<BlogPostRefactor[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getLatestArticlesAndProjects(articleCategory);

      if (data && data.length > 0) {
        setArticles(data);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-white font-medium text-2xl">{title}</h2>
      <Card
        isFooterBlurred
        className="relative text-start w-full border border-purple-800 dark:border-purple-300 flex flex-col"
      >
        <div className="relative">
          <Image
            removeWrapper
            alt={imageAlt}
            className="absolute inset-0 z-0 w-full h-full object-cover"
            src={imageSrc}
          />
          <div className="relative z-10">
            <CardHeader className="flex-col items-start px-4">
              <p className="text-sm text-white/60 uppercase font-bold">
                {subtitle}
              </p>
            </CardHeader>
            <CardBody className="px-4">
              {articles.map((article, index) => (
                <Link key={index} href={article.href}>
                  <motion.div
                    key={index}
                    className="flex cursor-pointer items-start mb-4 bg-white p-2 rounded-lg shadow-md"
                    transition={{ type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                      <p className="text-sm text-gray-600">
                        {article.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </CardBody>
            <CardFooter className="bg-purple-800/50 dark:bg-purple-300/70 border-t-1 border-zinc-100/50 justify-between p-4">
              <p className="text-background text-start font-semibold w-2/3 text-sm">
                {footerText}
              </p>
              <Button
                className="bg-background text-foreground py-2 px-4 border border-purple-800 dark:border-purple-300 hover:bg-purple-800 hover:text-background hover:dark:text-purple-300 focus:outline-none"
                color="primary"
                radius="full"
                size="sm"
                onPress={() => router.push(href)}
              >
                {buttonText}
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MainCategoryCard;
