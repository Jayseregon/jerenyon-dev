import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { QuoteFormSchema } from "@/src/interfaces/Quote";
import { handlePrismaError } from "@/lib/prismaErrorHandler";

const prisma = new PrismaClient();
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

// Verify recaptcha token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
    },
  );
  const data = await response.json();

  return data.success;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Quote ID is required" },
        { status: 400 },
      );
    }

    const quote = await prisma.quote.findUnique({
      where: { id },
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

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // Serialize Date objects to ISO strings
    const serializedQuote = {
      ...quote,
      createdAt: quote.createdAt.toISOString(),
      updatedAt: quote.updatedAt.toISOString(),
    };

    return NextResponse.json(serializedQuote);
  } catch (error: any) {
    return handlePrismaError(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recaptchaToken, ...quoteData } = body;

    // Verify recaptcha
    const recaptchaValid = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaValid) {
      return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });
    }

    // Validate quote data
    const validatedData = QuoteFormSchema.parse(quoteData);

    // Create quote with nested creates
    const quote = await prisma.quote.create({
      data: {
        clientName: validatedData.clientName,
        clientEmail: validatedData.clientEmail,
        comment: validatedData.comment,
        totalPrice: validatedData.totalPrice,
        staticPages: validatedData.staticPages
          ? {
              create: {
                selectedPages: validatedData.staticPages.selectedPages,
                totalPrice: validatedData.staticPages.totalPrice,
              },
            }
          : undefined,
        dynamicPages: validatedData.dynamicPages
          ? {
              create: {
                selectedPages: validatedData.dynamicPages.selectedPages,
                totalPrice: validatedData.dynamicPages.totalPrice,
              },
            }
          : undefined,
        authentication: {
          create: validatedData.authentication,
        },
        legalPages: {
          create: validatedData.legalPages,
        },
        maintenancePlan: validatedData.maintenancePlan
          ? {
              create: validatedData.maintenancePlan,
            }
          : undefined,
        websiteType: validatedData.websiteType
          ? {
              create: validatedData.websiteType,
            }
          : undefined,
        customFeature: {
          create: validatedData.customFeatures,
        },
        automations: {
          create: validatedData.automations,
        },
        thirdPartyAPIs: {
          create: validatedData.thirdPartyAPIs,
        },
        addons: {
          create: validatedData.addons,
        },
      },
    });

    return NextResponse.json({ success: true, data: quote });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 },
      );
    }

    return handlePrismaError(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, recaptchaToken, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Quote ID is required" },
        { status: 400 },
      );
    }

    // Verify recaptcha
    const recaptchaValid = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaValid) {
      return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });
    }

    // Validate update data
    const validatedData = QuoteFormSchema.parse(updateData);

    // Update quote and related records
    const quote = await prisma.quote.update({
      where: { id },
      data: {
        clientName: validatedData.clientName,
        clientEmail: validatedData.clientEmail,
        comment: validatedData.comment,
        totalPrice: validatedData.totalPrice,
        staticPages: {
          update: validatedData.staticPages,
        },
        dynamicPages: {
          update: validatedData.dynamicPages,
        },
        authentication: {
          deleteMany: {},
          create: validatedData.authentication,
        },
        legalPages: {
          deleteMany: {},
          create: validatedData.legalPages,
        },
        maintenancePlan: {
          update: validatedData.maintenancePlan,
        },
        websiteType: {
          update: validatedData.websiteType,
        },
        customFeature: {
          deleteMany: {},
          create: validatedData.customFeatures,
        },
        automations: {
          deleteMany: {},
          create: validatedData.automations,
        },
        thirdPartyAPIs: {
          deleteMany: {},
          create: validatedData.thirdPartyAPIs,
        },
        addons: {
          deleteMany: {},
          create: validatedData.addons,
        },
      },
    });

    return NextResponse.json(quote);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Quote ID is required" },
        { status: 400 },
      );
    }

    const deletedQuote = await prisma.quote.delete({
      where: { id },
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

    return NextResponse.json({
      success: true,
      message: "Quote deleted successfully",
      data: deletedQuote,
    });
  } catch (error: any) {
    console.error("Delete error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to delete quote",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function OPTIONS() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function PATCH() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
