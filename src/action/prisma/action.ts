"use server";

import { BlogPostCategory, PrismaClient } from "@prisma/client";

import { BlogPost, PostTypes } from "@/src/interfaces/Hub";
// import { z } from "zod";

const prisma = new PrismaClient();

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
  } catch (error) {
    console.error("Error getting all posts:", error);

    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export async function updatePost(slug: string, data: Partial<BlogPost>) {
  try {
    const updatedPost = await prisma.blogPost.update({
      where: { slug },
      data,
    });

    return updatedPost;
  } catch (error: any) {
    console.error("Error updating post:", error);

    return null;
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
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    const res = {
      posts:
        data.length > 0
          ? data.map((p) => ({
              title: p.title,
              thumbnail: "/assets/thumbnail-placeholder.webp",
              description: `Upcoming ${p.category.toLocaleLowerCase()} description.`,
              href: `/knowledge-hub/${postType}/${p.slug}`,
            }))
          : [],
    };

    return res;
  } catch (error: any) {
    console.log("Error getting articles and projects:", error);

    return null;
  } finally {
    await prisma.$disconnect();
  }
}
