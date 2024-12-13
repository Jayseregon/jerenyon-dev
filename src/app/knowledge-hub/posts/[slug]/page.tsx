import { PrismaClient } from "@prisma/client";
import parse from "html-react-parser";

import { BlogPost, BlogPostCategory } from "@/src/interfaces/Hub";

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
    return <div>Post not found</div>;
  }

  const postObject: BlogPost = {
    ...postDb,
    category: postDb.category as BlogPostCategory,
  };

  const content = parse(postObject.content, {
    // No need to replace or modify nodes; inline styles will be preserved
  });

  return (
    <div className="prose light:prose-lightTheme dark:prose-darkTheme max-w-none">
      <h1>{postObject.title}</h1>
      {content}
    </div>
  );
}
