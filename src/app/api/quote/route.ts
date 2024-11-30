import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { handlePrismaError } from "@/lib/prismaErrorHandler";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      include: {
        staticPages: true,
        dynamicPages: true,
        authentication: true,
        legalPages: true,
        maintenancePlan: true,
        websiteType: true,
        customFeature: true,
        automations: true,
        thirdPartyAPIs: true,
        addons: true,
      },
    });

    console.log("Find all quotes:", quotes);

    return NextResponse.json(quotes);
  } catch (error: any) {
    return handlePrismaError(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function PUT() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function DELETE() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function OPTIONS() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function PATCH() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
