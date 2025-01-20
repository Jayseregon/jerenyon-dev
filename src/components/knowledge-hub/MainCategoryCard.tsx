"use client";

import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Image,
  CardBody,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

import { BlogPostRefactor, MainCategoryCardProps } from "@/interfaces/Hub";
import { getLatestArticlesAndProjects } from "@/actions/prisma/blogPosts/action";
import { NonceContext } from "@/src/app/providers";

import { BlogPostTags } from "./BlogPostTags";

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
  const nonce = useContext(NonceContext);
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
    <div className="flex flex-col space-y-2" nonce={nonce}>
      <h2 className="text-white font-medium text-2xl" nonce={nonce}>
        {title}
      </h2>
      <Card
        isFooterBlurred
        className="relative text-start w-full border border-purple-800 dark:border-purple-300 flex flex-col"
        nonce={nonce}
      >
        <div className="relative">
          <Image
            removeWrapper
            alt={imageAlt}
            className="absolute inset-0 z-0 w-full h-full object-cover"
            nonce={nonce}
            src={imageSrc}
          />
          <div className="relative z-10" nonce={nonce}>
            <CardHeader className="flex-col items-start px-4" nonce={nonce}>
              <p
                className="text-sm text-white/60 uppercase font-bold"
                nonce={nonce}
              >
                {subtitle}
              </p>
            </CardHeader>
            <CardBody className="px-4 space-y-4" nonce={nonce}>
              {articles.map((article, index) => (
                <Link key={index} href={article.href} nonce={nonce}>
                  <motion.div
                    className="bg-background p-4 rounded-lg shadow-md border border-purple-800 dark:border-purple-300"
                    nonce={nonce}
                    transition={{ type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="clearfix after:clear-both after:block">
                      <Image
                        removeWrapper
                        alt={article.title}
                        className="float-left w-16 h-16 mr-4 rounded-lg"
                        nonce={nonce}
                        src={article.thumbnail}
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
                        {article.description}
                      </p>
                      <BlogPostTags
                        className="mt-5 justify-end"
                        tags={article.tags}
                      />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </CardBody>
            <CardFooter
              className="bg-purple-800/50 dark:bg-purple-300/70 border-t-1 border-zinc-100/50 justify-between p-4"
              nonce={nonce}
            >
              <p
                className="text-background text-start font-semibold w-2/3 text-sm"
                nonce={nonce}
              >
                {footerText}
              </p>
              <Button
                className="bg-background text-foreground py-2 px-4 border border-purple-800 dark:border-purple-300 hover:bg-purple-800 hover:text-background hover:dark:text-purple-300 focus:outline-none"
                color="primary"
                nonce={nonce}
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
