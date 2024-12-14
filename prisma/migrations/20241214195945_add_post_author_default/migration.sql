-- AlterTable
ALTER TABLE "blog"."BlogPost" ADD COLUMN     "author" TEXT NOT NULL DEFAULT 'Jeremie Bitsch';

-- AlterTable
ALTER TABLE "estimate"."Quote" ALTER COLUMN "projectRef" SET DEFAULT concat('PRJ', to_char(current_date, 'YY'), lpad(nextval('project_ref_seq')::text, 3, '0'));
