/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "estimate"."Service" DROP CONSTRAINT "Service_quoteId_fkey";

-- DropTable
DROP TABLE "estimate"."Service";
