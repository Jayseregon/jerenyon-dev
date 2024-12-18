import { notFound } from "next/navigation";
import { BlogPostCategory } from "@prisma/client";

import { BlogPost } from "@/src/interfaces/Hub";
import { getSinglePost } from "@/actions/prisma/blogPosts/action";
import { BlogPostReader } from "@/components/knowledge-hub/BlogPostReader";

export default async function ProjectsShowcaseReaderPage(props: {
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

  return (
    <BlogPostReader content={postObject.content} title={postObject.title} />
  );
}
