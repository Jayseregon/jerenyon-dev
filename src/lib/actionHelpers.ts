import { BlogPost, BlogPostRefactor } from "@/interfaces/Hub";

export const refactorBlogPostsResponse = (
  data: BlogPost[],
): BlogPostRefactor[] => {
  return data.length > 0
    ? data.map((p) => ({
        title: p.title,
        thumbnail: p.coverImage || "/assets/thumbnail-placeholder.webp",
        description: p.summary,
        href: `/knowledge-hub/articles/${p.slug}`,
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

export async function verifyRecaptcha(
  token: string,
  recaptchaKey: string,
): Promise<boolean> {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${recaptchaKey}&response=${token}`,
    },
  );
  const data = await response.json();

  return data.success;
}
