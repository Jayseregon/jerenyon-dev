"use client";

import { useEffect, useState } from "react";

import { BlogPostRefactor } from "@/src/interfaces/Hub";
import { getPublishedArticles } from "@/actions/prisma/blogPosts/action";
import { BlogPostsBoard } from "@/components/knowledge-hub/BlogPostsBoard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ArticlesAndTutorialsBoardPage() {
  const [articles, setArticles] = useState<BlogPostRefactor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublishedArticles();

      if (data && data.length > 0) {
        setArticles(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Breadcrumbs />
      <BlogPostsBoard data={articles} />
    </div>
  );
}
