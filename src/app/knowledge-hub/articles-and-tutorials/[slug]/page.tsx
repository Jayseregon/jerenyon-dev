import { notFound } from "next/navigation";
import { BlogPostCategory } from "@prisma/client";

import { BlogPost } from "@/src/interfaces/Hub";
import { getSinglePost } from "@/actions/prisma/blogPosts/action";
import BlogPostPageTitle from "@/components/knowledge-hub/BlogPostPageTitle";
import { BlogPostReader } from "@/components/knowledge-hub/BlogPostReader";

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const postDb = await getSinglePost(slug);

  if (!postDb) {
    notFound();
  }

  const postObject: BlogPost = {
    ...postDb,
    category: postDb.category as BlogPostCategory,
  };

  const content = postObject.content;

  return (
    <div>
      <BlogPostPageTitle
        category="articles-and-tutorials"
        title={postObject.title}
      />
      <BlogPostReader content={content} />
    </div>
  );
}
