"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogPostRefactor, MainCategoryCardProps } from "@/interfaces/Hub";
import { getLatestArticles } from "@/actions/prisma/blogPosts/action";
import { NonceContext } from "@/src/app/providers";

import { BlogPostTags } from "./BlogPostTags";

const MainCategoryCard = ({
  title,
  subtitle,
  buttonText,
  footerText,
  href,
}: MainCategoryCardProps) => {
  const [articles, setArticles] = useState<BlogPostRefactor[]>([]);
  const nonce = useContext(NonceContext);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getLatestArticles();

      if (data && data.length > 0) {
        setArticles(data);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col space-y-2" nonce={nonce}>
      <h2 className="text-foreground font-medium text-2xl" nonce={nonce}>
        {title}
      </h2>
      <Card
        className="relative text-start w-full bg-purple-800/15 dark:bg-purple-300/15  border border-purple-800 dark:border-purple-300 overflow-hidden"
        nonce={nonce}
      >
        <CardHeader className="flex-col items-start px-4">
          <p
            className="text-sm text-purple-800 dark:text-purple-300 uppercase font-bold"
            nonce={nonce}
          >
            {subtitle}
          </p>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          {articles.map((article, index) => (
            <Button
              key={index}
              asChild
              className="w-full h-auto p-0 hover:bg-transparent"
              variant="ghost"
            >
              <Link href={article.href}>
                <motion.div
                  className="w-full bg-background p-4 rounded-lg shadow-md border border-purple-800 dark:border-purple-300"
                  nonce={nonce}
                  transition={{ type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex">
                    <div className="shrink-0 relative w-16 h-16 mr-4">
                      <Image
                        fill
                        alt={article.title}
                        className="rounded-lg object-cover"
                        sizes="(max-width: 64px) 100vw"
                        src={article.thumbnail}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-2xl mb-2 font-bold text-purple-800 dark:text-purple-300 text-left text-ellipsis overflow-hidden">
                        {article.title}
                      </h5>
                      <p className="text-foreground whitespace-normal break-words">
                        {article.description}
                      </p>
                      <BlogPostTags
                        className="mt-5 justify-end"
                        tags={article.tags}
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </Button>
          ))}
        </CardContent>
        <CardFooter className="justify-between p-4">
          <p
            className="text-purple-800 dark:text-purple-300 text-start text-lg font-semibold w-5/6"
            nonce={nonce}
          >
            {footerText}
          </p>
          <Button
            className="w-1/6 rounded-full"
            nonce={nonce}
            variant="form"
            onClick={() => router.push(href)}
          >
            <span className="text-ellipsis overflow-hidden">{buttonText}</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MainCategoryCard;
