import { notFound } from "next/navigation";
import { BlogPostCategory } from "@prisma/client";

import { BlogPost } from "@/src/interfaces/Hub";
import { TiptapEditor } from "@/src/components/hobbiton/TiptapEditor";
import { getSinglePost } from "@/src/action/prisma/action";

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
    <div className="prose light:prose-lightTheme dark:prose-darkTheme w-full border border-red-500">
      <h1>{postObject.title}</h1>
      <TiptapEditor content={JSON.parse(content)} editable={false} />
    </div>
  );
}
