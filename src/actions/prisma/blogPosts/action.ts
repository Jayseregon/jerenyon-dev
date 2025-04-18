"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import { BlogPost, PostDataProps } from "@/src/interfaces/Hub";
import { refactorBlogPostsResponse } from "@/src/lib/actionHelpers";

const prisma = new PrismaClient();

// Define Zod schemas
const postDataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content cannot be empty"),
  summary: z
    .string()
    .trim()
    .min(1, "Summary is required")
    .max(200, "Summary is too long"),
  published: z.boolean().default(false),
  tags: z.array(z.string()),
});

const updatePostDataSchema = postDataSchema
  .extend({
    publishedAt: z.date().nullish(),
    coverImage: z.string().nullish(),
  })
  .partial();

export async function getSinglePost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: slug,
      },
      include: {
        tags: true,
      },
    });

    return post;
  } catch (error: any) {
    console.log("Error getting post:", error);

    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
      },
    });

    return posts;
  } catch (error: any) {
    console.error("Error getting all posts:", error);

    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export async function createPost(formData: PostDataProps) {
  try {
    // Validate the formData
    const data = postDataSchema.parse(formData);
    const { title, content, summary, published } = data;

    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim() // Remove leading/trailing spaces
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

    // Check if slug exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return {
        message: "A post with a similar title already exists",
        ok: false,
      };
    }

    if (published) {
      await prisma.blogPost.create({
        data: {
          title,
          content,
          slug,
          summary,
          published: published,
          publishedAt: new Date(
            new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }),
          ),
          coverImage: formData.coverImage || null,
          tags: {
            connectOrCreate: formData.tags.map((tagName: string) => ({
              where: { name: tagName },
              create: { name: tagName },
            })),
          },
          views: 0,
          likes: 0,
        },
      });
    } else {
      await prisma.blogPost.create({
        data: {
          title,
          content,
          slug,
          summary,
          published: published,
          publishedAt: null,
          coverImage: formData.coverImage || null,
          tags: {
            connectOrCreate: formData.tags.map((tagName) => ({
              where: { name: tagName },
              create: { name: tagName },
            })),
          },
          views: 0,
          likes: 0,
        },
      });
    }

    revalidatePath("/hobbiton/content-editor");
    revalidatePath("/knowledge-hub");
    return {
      message: "Post created successfully",
      ok: true,
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        message: error.errors.map((e) => e.message).join(", "),
        ok: false,
      };
    }
    console.error("Error creating post:", error);

    return {
      message: "Failed to create post",
      ok: false,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updatePost(slug: string, data: PostDataProps) {
  try {
    // Validate the data
    const validData = updatePostDataSchema.parse(data);

    const existingPost = await prisma.blogPost.findUnique({ where: { slug } });

    if (!existingPost) {
      return {
        message: "Post not found",
        ok: false,
      };
    }

    if (validData.published && !existingPost?.publishedAt) {
      validData.publishedAt = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }),
      );
    } else {
      delete validData.publishedAt;
    }

    await prisma.blogPost.update({
      where: { slug },
      data: {
        ...validData,
        coverImage: data.coverImage || null,
        tags: {
          set: [], // First disconnect all tags
          connectOrCreate: data.tags.map((tagName: string) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
        views: data.views ?? existingPost.views ?? 0,
        likes: data.likes ?? existingPost.likes ?? 0,
      },
    });

    revalidatePath("/hobbiton/content-editor");
    revalidatePath("/knowledge-hub");
    revalidatePath(`/knowledge-hub/${slug}`);
    return {
      message: "Post updated successfully",
      ok: true,
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        message: error.errors.map((e) => e.message).join(", "),
        ok: false,
      };
    }
    console.error("Error updating post:", error);

    return {
      message: "Failed to update post",
      ok: false,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deletePost(slug: string) {
  try {
    await prisma.blogPost.delete({
      where: { slug },
    });

    revalidatePath("/hobbiton/content-editor");
    revalidatePath("/knowledge-hub");

    return {
      message: "Post deleted successfully",
      ok: true,
    };
  } catch (error: any) {
    console.error("Error deleting post:", error);

    return {
      message: "Failed to delete post",
      ok: false,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getLatestArticles() {
  try {
    const data: BlogPost[] = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      include: {
        tags: true,
      },
      take: 3,
      orderBy: {
        publishedAt: "desc",
      },
    });

    const res = refactorBlogPostsResponse(data);

    return res;
  } catch (error: any) {
    console.log("Error getting articles and projects:", error);

    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getPublishedArticles() {
  try {
    const data: BlogPost[] = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      include: {
        tags: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    const res = refactorBlogPostsResponse(data);

    return res;
  } catch (error: any) {
    console.log("Error getting published articles:", error);

    return [];
  }
}

// Add new function to get all tags
export async function getAllTags() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return tags;
  } catch (error) {
    console.error("Error getting tags:", error);

    return [];
  }
}

export async function incrementViews(slug: string) {
  const updated = await prisma.blogPost.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });

  return updated;
}

export async function incrementLikes(slug: string) {
  const updated = await prisma.blogPost.update({
    where: { slug },
    data: { likes: { increment: 1 } },
  });

  return updated;
}

export async function getSitemapPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    return posts;
  } catch (error) {
    console.error("Error getting sitemap posts:", error);

    return { articles: [], projects: [] };
  } finally {
    await prisma.$disconnect();
  }
}
