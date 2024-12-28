/*
  Warnings:

  - Added the required column `category` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "blog"."BlogPostCategory" AS ENUM ('ARTICLE', 'PROJECT');

-- AlterTable
ALTER TABLE "blog"."BlogPost" ADD COLUMN     "category" "blog"."BlogPostCategory" NOT NULL,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "summary" TEXT;

-- AlterTable
ALTER TABLE "estimate"."Quote" ALTER COLUMN "projectRef" SET DEFAULT concat('PRJ', to_char(current_date, 'YY'), lpad(nextval('project_ref_seq')::text, 3, '0'));
