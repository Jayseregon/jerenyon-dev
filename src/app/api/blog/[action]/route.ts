import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { handlePrismaError } from "@/src/lib/prismaErrorHandler";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { title, content, category } = await request.json();

  if (!title || !content || !category) {
    return NextResponse.json(
      { error: "Title, content, and category are required" },
      { status: 400 },
    );
  }

  try {
    const slug = title.toLowerCase().replace(/ /g, "-");

    // Check if slug exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 },
      );
    }

    const newPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        slug,
        category,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    handlePrismaError(error);

    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}
