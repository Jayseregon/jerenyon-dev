import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { handlePrismaError } from "@/src/lib/prismaErrorHandler";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { title, content } = await request.json();

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 },
    );
  }

  try {
    const slug = title.toLowerCase().replace(/ /g, "-");
    const newPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        slug,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    handlePrismaError(error);
  }
}
