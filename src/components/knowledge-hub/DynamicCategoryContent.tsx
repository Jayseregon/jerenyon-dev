"use client";

// import { notFound } from "next/navigation";
import { BlogPostCategory } from "@prisma/client";
import { useEffect, useState } from "react";

import { BlogPost } from "@/src/interfaces/Hub";
import { getSinglePost } from "@/actions/prisma/blogPosts/action";
import BlogPostPageTitle from "@/components/knowledge-hub/BlogPostPageTitle";
import { BlogPostReader } from "@/components/knowledge-hub/BlogPostReader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function DynamicCategoryContent({ slug }: { slug: string }) {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSinglePost(slug);

      if (res) {
        const data: BlogPost = {
          ...res,
          category: res.category as BlogPostCategory,
        };

        setContent(data.content);
        setTitle(data.title);
      }
    };

    fetchData();
  }, []);

  //   if (!postDb) {
  //     notFound();
  //   }

  return (
    <div>
      <BlogPostPageTitle title={title} />
      <div className="mt-10 max-w-5xl mx-auto">
        <Breadcrumbs />
      </div>
      <BlogPostReader content={content} />
    </div>
  );
}
