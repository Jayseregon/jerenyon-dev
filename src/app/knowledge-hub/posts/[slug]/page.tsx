import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
