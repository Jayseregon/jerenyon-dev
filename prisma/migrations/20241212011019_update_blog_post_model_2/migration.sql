/*
  Warnings:

  - You are about to drop the column `coverImage` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `BlogPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog"."BlogPost" DROP COLUMN "coverImage",
DROP COLUMN "summary";

-- AlterTable
ALTER TABLE "estimate"."Quote" ALTER COLUMN "projectRef" SET DEFAULT concat('PRJ', to_char(current_date, 'YY'), lpad(nextval('project_ref_seq')::text, 3, '0'));
