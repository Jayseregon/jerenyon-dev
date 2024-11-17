// "use client";

// import { useEffect, useState } from "react";

// import { PricingTier, Tier } from "./PricingTier";

// export const PricingBoard = () => {
//   const [pricingData, setPricingData] = useState<Tier[]>([]);

//   useEffect(() => {
//     fetch("/json/pricing.json")
//       .then((response) => response.json())
//       .then((data) => setPricingData(data.tiers));
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 mx-auto">
//       {pricingData.map((tier, index) => (
//         <PricingTier key={index} tier={tier} />
//       ))}
//     </div>
//   );
// };
