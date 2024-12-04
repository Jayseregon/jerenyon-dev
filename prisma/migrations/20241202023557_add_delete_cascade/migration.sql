-- DropForeignKey
ALTER TABLE "estimate"."Addons" DROP CONSTRAINT "Addons_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."AuthenticationMethod" DROP CONSTRAINT "AuthenticationMethod_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."Automation" DROP CONSTRAINT "Automation_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."CustomFeature" DROP CONSTRAINT "CustomFeature_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."DynamicPage" DROP CONSTRAINT "DynamicPage_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."LegalPage" DROP CONSTRAINT "LegalPage_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."MaintenancePlan" DROP CONSTRAINT "MaintenancePlan_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."StaticPage" DROP CONSTRAINT "StaticPage_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."ThirdPartyAPI" DROP CONSTRAINT "ThirdPartyAPI_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "estimate"."WebsiteType" DROP CONSTRAINT "WebsiteType_quoteId_fkey";

-- AlterTable
ALTER TABLE "estimate"."Quote" ALTER COLUMN "projectRef" SET DEFAULT concat('PRJ', to_char(current_date, 'YY'), lpad(nextval('project_ref_seq')::text, 3, '0'));

-- AddForeignKey
ALTER TABLE "estimate"."StaticPage" ADD CONSTRAINT "StaticPage_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."DynamicPage" ADD CONSTRAINT "DynamicPage_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."AuthenticationMethod" ADD CONSTRAINT "AuthenticationMethod_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."LegalPage" ADD CONSTRAINT "LegalPage_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."MaintenancePlan" ADD CONSTRAINT "MaintenancePlan_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."WebsiteType" ADD CONSTRAINT "WebsiteType_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."CustomFeature" ADD CONSTRAINT "CustomFeature_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."Automation" ADD CONSTRAINT "Automation_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."ThirdPartyAPI" ADD CONSTRAINT "ThirdPartyAPI_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate"."Addons" ADD CONSTRAINT "Addons_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "estimate"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
