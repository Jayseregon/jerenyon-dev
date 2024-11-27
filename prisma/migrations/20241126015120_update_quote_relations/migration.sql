/*
  Warnings:

  - Made the column `quoteId` on table `Addons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quoteId` on table `Automation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quoteId` on table `CustomFeature` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quoteId` on table `LegalPage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quoteId` on table `ThirdPartyAPI` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "estimate"."Addons" DROP CONSTRAINT "Addons_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."Automation" DROP CONSTRAINT "Automation_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."CustomFeature" DROP CONSTRAINT "CustomFeature_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."LegalPage" DROP CONSTRAINT "LegalPage_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."ThirdPartyAPI" DROP CONSTRAINT "ThirdPartyAPI_quoteId_fkey";

-- DropIndex
DROP INDEX "estimate"."Addons_quoteId_key";

-- DropIndex
DROP INDEX "estimate"."Automation_quoteId_key";

-- DropIndex
DROP INDEX "estimate"."CustomFeature_quoteId_key";

-- DropIndex
DROP INDEX "estimate"."LegalPage_quoteId_key";

-- DropIndex
DROP INDEX "estimate"."ThirdPartyAPI_quoteId_key";

-- AlterTable
ALTER TABLE "estimate"."Addons" ALTER COLUMN "quoteId" SET NOT NULL;

-- AlterTable
ALTER TABLE "estimate"."Automation" ALTER COLUMN "quoteId" SET NOT NULL;

-- AlterTable
ALTER TABLE "estimate"."CustomFeature" ALTER COLUMN "quoteId" SET NOT NULL;

-- AlterTable
ALTER TABLE "estimate"."LegalPage" ALTER COLUMN "quoteId" SET NOT NULL;

-- AlterTable
ALTER TABLE "estimate"."ThirdPartyAPI" ALTER COLUMN "quoteId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "estimate"."LegalPage" ADD CONSTRAINT "LegalPage_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."CustomFeature" ADD CONSTRAINT "CustomFeature_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."Automation" ADD CONSTRAINT "Automation_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."ThirdPartyAPI" ADD CONSTRAINT "ThirdPartyAPI_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."Addons" ADD CONSTRAINT "Addons_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
