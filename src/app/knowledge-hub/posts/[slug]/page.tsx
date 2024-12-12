import { PrismaClient } from "@prisma/client";

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

  return (
    <div>
      <h1>{postObject.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: postObject.content }}
        className="prose dark:prose-darkTheme prose-sm sm:prose-base max-w-none"
      />
    </div>
  );
}
