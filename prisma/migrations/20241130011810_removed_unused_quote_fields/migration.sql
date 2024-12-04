/*
  Warnings:

  - You are about to drop the column `sendDate` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `websiteInitialized` on the `Quote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "estimate"."Quote" DROP COLUMN "sendDate",
DROP COLUMN "websiteInitialized";
