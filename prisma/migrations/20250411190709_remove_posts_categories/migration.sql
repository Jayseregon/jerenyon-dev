/*
  Warnings:

  - You are about to drop the column `category` on the `BlogPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog"."BlogPost" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "estimate"."Quote" ALTER COLUMN "projectRef" SET DEFAULT concat('PRJ', to_char(current_date, 'YY'), lpad(nextval('project_ref_seq')::text, 3, '0'));

-- DropEnum
DROP TYPE "blog"."BlogPostCategory";
