import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

import { BlogPost, BlogPostCategory } from "@/src/interfaces/Hub";
import { TiptapEditor } from "@/src/components/hobbiton/TiptapEditor";

const prisma = new PrismaClient();

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const postDb = await prisma.blogPost.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!postDb) {
    notFound();
  }

  const postObject: BlogPost = {
    ...postDb,
    category: postDb.category as BlogPostCategory,
  };

  const content = postObject.content;

  return (
    <div className="prose light:prose-lightTheme dark:prose-darkTheme max-w-none border border-red-500">
      <h1>{postObject.title}</h1>
      <TiptapEditor content={JSON.parse(content)} editable={false} />
    </div>
  );
}
