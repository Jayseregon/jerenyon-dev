import { PricingBoard } from "@/src/components/pricing/PricingBoard";
import { Addons } from "@/src/components/pricing/Addons";
import { Maintenance } from "@/src/components/pricing/Maintenance";

export default function PricingPage() {
  return (
    <div>
      <h1 className="text-purple-800 dark:text-purple-300 mb-3">Pricing</h1>
      <h2 className="text-5xl font-bold">Unlock your online potential.</h2>
      <h3 className="text-xl mt-2 text-purple-800/70 dark:text-purple-300/70 max-w-3xl mx-auto p-5">
        From custom websites to advanced e-commerce and automation, delivering
        exactly what you need - today and tomorrow.
      </h3>

      <div className="py-3" />

      <PricingBoard />

      <div className="py-3" />

      <h3 className="text-3xl font-bold">
        Enhance your package with additional features and services.
      </h3>
      <Addons />
      <Maintenance />

      <div className="py-3" />

      <p className="text-center text-sm text-purple-800/70 dark:text-purple-300/70 mt-5">
        <span className="align-super text-sm">*</span>The prices listed are
        estimates and may vary based on the specific requirements of your
        project.
        <br />
        Final costs will be determined after a detailed discussion of your
        needs.
        <br />
        Additional features or services may incur extra charges.
      </p>
    </div>
  );
}
