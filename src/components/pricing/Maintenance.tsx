"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Switch, cn } from "@nextui-org/react";

export interface MaintenancePlan {
  name: string;
  monthly: string;
  yearly: string;
  description: string[];
}

export const Maintenance = () => {
  const [maintenancePlans, setMaintenancePlans] = useState<MaintenancePlan[]>(
    [],
  );
  const [showYearly, setShowYearly] = useState(false);

  useEffect(() => {
    fetch("/json/pricing.json")
      .then((response) => response.json())
      .then((data) => {
        const plans = Object.keys(data.maintenance).map((key) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          ...data.maintenance[key],
        }));

        setMaintenancePlans(plans);
      });
  }, []);

  return (
    <Card className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300 mb-8 mt-5 w-full">
      <CardHeader className="p-0 m-0 flex justify-center">
        <div className="grid grid-cols gap-2 text-background bg-purple-800 dark:bg-purple-300 rounded-b-2xl px-6 py-1">
          <h2 className="grid grid-cols-1 uppercase text-lg font-semibold">
            Maintenance Plans
          </h2>
        </div>
      </CardHeader>

      <CardBody className="p-6">
        <div className="flex justify-center mb-4 items-center">
          <div className="grid grid-cols-1 gap-2">
            <span className="mr-2 text-md text-purple-800 dark:text-purple-300">
              {showYearly ? "Yearly" : "Monthly"}
            </span>
            <Switch
              classNames={{
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn(
                  "w-6 h-6 border-2 shadow-xl",
                  "group-data-[hover=true]:border-primary",
                  // selected
                  "group-data-[selected=true]:ml-6",
                  // pressed
                  "group-data-[pressed=true]:w-7",
                  "group-data-[selected]:group-data-[pressed]:ml-4",
                ),
              }}
              isSelected={showYearly}
              onValueChange={setShowYearly}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 md:gap-56 mx-auto">
          {maintenancePlans.map((plan, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                {plan.name} Plan
              </h3>
              <p className="text-md italic text-purple-800/70 dark:text-purple-300/70 mt-1">
                <span className="text-sm pe-2">starting at</span>
                <span className="align-text-top text-sm">$</span>
                {showYearly ? plan.yearly : plan.monthly}
                <span className="align-super text-sm">*</span>
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 ps-5">
                {plan.description.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-md text-gray-800 dark:text-neutral-300 list-outside"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
