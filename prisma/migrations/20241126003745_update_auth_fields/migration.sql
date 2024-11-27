/*
  Warnings:

  - You are about to drop the column `method` on the `AuthenticationMethod` table. All the data in the column will be lost.
  - Added the required column `name` to the `AuthenticationMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estimate"."AuthenticationMethod" DROP COLUMN "method",
ADD COLUMN     "name" TEXT NOT NULL;
