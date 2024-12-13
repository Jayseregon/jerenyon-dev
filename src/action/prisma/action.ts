"use server";

import { PrismaClient } from "@prisma/client";
// import { z } from "zod";

const prisma = new PrismaClient();

export async function getBlogPost(slug: string) {
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

// export async function getRoadmapCardCategories() {
//   try {
//     const categories = await prisma.roadmapCardCategory.findMany();

//     return categories;
//   } catch (error: any) {
//     console.log("Error getting categories:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export async function getRoadmapCards() {
//   try {
//     const cards = await prisma.roadmapCard.findMany({
//       include: { projects: true, category: true },
//       orderBy: { position: "asc" },
//     });

//     return cards;
//   } catch (error: any) {
//     console.log("Error getting cards:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export async function getRoadmapProjects() {
//   try {
//     const projects = await prisma.roadmapProject.findMany({
//       include: { cards: true },
//       orderBy: { position: "asc" },
//     });

//     return projects;
//   } catch (error: any) {
//     console.log("Error getting projects:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
