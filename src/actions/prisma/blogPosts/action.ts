"use server";

import { BlogPostCategory, PrismaClient } from "@prisma/client";
import { z } from "zod";

import { BlogPost, PostDataProps, PostTypes } from "@/src/interfaces/Hub";
import { refactorBlogPostsResponse } from "@/src/lib/actionHelpers";
// import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Define Zod schemas
const postDataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content cannot be empty"),
  category: z.nativeEnum(BlogPostCategory),
  summary: z.string().trim().min(1, "Summary is required"),
  published: z.boolean().default(false),
});

const updatePostDataSchema = postDataSchema.partial();

export async function getSinglePost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: slug,
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
    const { title, content, category, summary, published } = data;

    const slug = title.toLowerCase().replace(/ /g, "-");

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

    await prisma.blogPost.create({
      data: {
        title,
        content,
        slug,
        category,
        summary,
        published: published,
      },
    });

    // revalidatePath("/hobbiton/content-editor");
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

export async function updatePost(slug: string, data: Partial<BlogPost>) {
  try {
    // Validate the data
    const validData = updatePostDataSchema.parse(data);

    await prisma.blogPost.update({
      where: { slug },
      data: validData,
    });

    // revalidatePath("/hobbiton/content-editor");
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

    // revalidatePath("/knowledge-hub");

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

export async function getLatestArticlesAndProjects(postType: PostTypes) {
  const postTypeMap: Record<PostTypes, BlogPostCategory> = {
    "articles-and-tutorials": "ARTICLE" as BlogPostCategory,
    "projects-showcase": "PROJECT" as BlogPostCategory,
  };
  const category = postTypeMap[postType];

  try {
    const data: BlogPost[] = await prisma.blogPost.findMany({
      where: {
        category: category,
        published: true,
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    const res = refactorBlogPostsResponse(data, postType);

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
        category: "ARTICLE",
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const res = refactorBlogPostsResponse(data, "articles-and-tutorials");

    return res;
  } catch (error: any) {
    console.log("Error getting published articles:", error);

    return [];
  }
}

export async function getPublishedProjects() {
  try {
    const data: BlogPost[] = await prisma.blogPost.findMany({
      where: {
        category: "PROJECT",
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const res = refactorBlogPostsResponse(data, "projects-showcase");

    return res;
  } catch (error: any) {
    console.log("Error getting published projects:", error);

    return [];
  }
}
