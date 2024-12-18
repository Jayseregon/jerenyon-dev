import { BlogPost, BlogPostRefactor, PostTypes } from "@/interfaces/Hub";

export const refactorBlogPostsResponse = (
  data: BlogPost[],
  postType: PostTypes,
): BlogPostRefactor[] => {
  return data.length > 0
    ? data.map((p) => ({
        title: p.title,
        thumbnail: "/assets/thumbnail-placeholder.webp",
        description: p.summary,
        href: `/knowledge-hub/${postType}/${p.slug}`,
      }))
    : [];
};
