/*
  Warnings:

  - A unique constraint covering the columns `[projectRef]` on the table `Quote` will be added. If there are existing duplicate values, this will fail.

*/
CREATE SEQUENCE project_ref_seq START WITH 1 INCREMENT BY 1;

-- AlterTable
ALTER TABLE "estimate"."Quote" ADD COLUMN     "projectRef" TEXT NOT NULL DEFAULT concat('PRJ', to_char(current_date, 'YY'), lpad(nextval('project_ref_seq')::text, 3, '0'));

-- CreateIndex
CREATE UNIQUE INDEX "Quote_projectRef_key" ON "estimate"."Quote"("projectRef");
