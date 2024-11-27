import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const handlePrismaError = (error: any) => {
  console.error("Prisma Error:", error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return NextResponse.json(
          { error: "Duplicate field value", target: error.meta?.target },
          { status: 409 },
        );
      case "P2015":
        return NextResponse.json(
          { error: "Invalid foreign key reference" },
          { status: 400 },
        );
      case "P2025":
        return NextResponse.json(
          { error: "Record not found" },
          { status: 404 },
        );
      default:
        return NextResponse.json(
          { error: "Database error", message: error.message },
          { status: 400 },
        );
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(
      { error: "Validation error", message: error.message },
      { status: 400 },
    );
  }

  // Default error response
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
};
