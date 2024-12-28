import { BlogPost, BlogPostRefactor, PostTypes } from "@/interfaces/Hub";

export const refactorBlogPostsResponse = (
  data: BlogPost[],
  postType: PostTypes,
): BlogPostRefactor[] => {
  return data.length > 0
    ? data.map((p) => ({
        title: p.title,
        thumbnail: p.coverImage || "/assets/thumbnail-placeholder.webp",
        description: p.summary,
        href: `/knowledge-hub/${postType}/${p.slug}`,
        publishedDate: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString("en-CA") // formats as YYYY-MM-DD in local timezone
          : undefined,
        tags: p.tags,
      }))
    : [];
};

export function sanitizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
