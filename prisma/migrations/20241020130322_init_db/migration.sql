-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "estimate";

-- CreateEnum
CREATE TYPE "estimate"."QuoteStatus" AS ENUM ('DRAFT', 'SENT', 'FINALIZED');

-- CreateTable
CREATE TABLE "estimate"."Quote" (
    "id" TEXT NOT NULL,
    "status" "estimate"."QuoteStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "comment" TEXT,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "websiteInitialized" BOOLEAN NOT NULL DEFAULT false,
    "sendDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quoteId" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."StaticPage" (
    "id" TEXT NOT NULL,
    "selectedPages" INTEGER NOT NULL DEFAULT 0,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "quoteId" TEXT NOT NULL,

    CONSTRAINT "StaticPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."DynamicPage" (
    "id" TEXT NOT NULL,
    "selectedPages" INTEGER NOT NULL DEFAULT 0,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "quoteId" TEXT NOT NULL,

    CONSTRAINT "DynamicPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."AuthenticationMethod" (
    "id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quoteId" TEXT NOT NULL,

    CONSTRAINT "AuthenticationMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."LegalPage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "quoteId" TEXT,

    CONSTRAINT "LegalPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."MaintenancePlan" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "regularUpdates" BOOLEAN NOT NULL,
    "securityUpdates" BOOLEAN NOT NULL,
    "minorBugFixes" BOOLEAN NOT NULL,
    "featureEnhancement" BOOLEAN NOT NULL,
    "prioritySupport" BOOLEAN NOT NULL,
    "quoteId" TEXT NOT NULL,

    CONSTRAINT "MaintenancePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."WebsiteType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quoteId" TEXT,

    CONSTRAINT "WebsiteType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."CustomFeature" (
    "id" TEXT NOT NULL,
    "featureName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "quoteId" TEXT,

    CONSTRAINT "CustomFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."Automation" (
    "id" TEXT NOT NULL,
    "automationType" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "quoteId" TEXT,

    CONSTRAINT "Automation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."ThirdPartyAPI" (
    "id" TEXT NOT NULL,
    "apiName" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "quoteId" TEXT,

    CONSTRAINT "ThirdPartyAPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate"."Addons" (
    "id" TEXT NOT NULL,
    "addonName" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "quoteId" TEXT,

    CONSTRAINT "Addons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaticPage_quoteId_key" ON "estimate"."StaticPage"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicPage_quoteId_key" ON "estimate"."DynamicPage"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "LegalPage_quoteId_key" ON "estimate"."LegalPage"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "MaintenancePlan_quoteId_key" ON "estimate"."MaintenancePlan"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteType_quoteId_key" ON "estimate"."WebsiteType"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomFeature_quoteId_key" ON "estimate"."CustomFeature"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "Automation_quoteId_key" ON "estimate"."Automation"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "ThirdPartyAPI_quoteId_key" ON "estimate"."ThirdPartyAPI"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "Addons_quoteId_key" ON "estimate"."Addons"("quoteId");

-- AddForeignKey
ALTER TABLE "estimate"."Service" ADD CONSTRAINT "Service_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."StaticPage" ADD CONSTRAINT "StaticPage_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."DynamicPage" ADD CONSTRAINT "DynamicPage_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."AuthenticationMethod" ADD CONSTRAINT "AuthenticationMethod_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."LegalPage" ADD CONSTRAINT "LegalPage_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."MaintenancePlan" ADD CONSTRAINT "MaintenancePlan_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."WebsiteType" ADD CONSTRAINT "WebsiteType_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."CustomFeature" ADD CONSTRAINT "CustomFeature_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."Automation" ADD CONSTRAINT "Automation_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."ThirdPartyAPI" ADD CONSTRAINT "ThirdPartyAPI_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."Addons" ADD CONSTRAINT "Addons_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
