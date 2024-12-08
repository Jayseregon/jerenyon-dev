import { PrismaClient } from "@prisma/client";

import { BlogPost } from "@/src/interfaces/Hub";

const prisma = new PrismaClient();

export default async function PostsPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post: BlogPost) => (
          <li key={post.id}>
            <a href={`/knowledge-hub/posts/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
