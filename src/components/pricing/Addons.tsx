"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

export interface Addon {
  name: string;
  starting_price: string;
}

export const Addons = () => {
  const [addons, setAddons] = useState<Addon[]>([]);

  useEffect(() => {
    fetch("/json/pricing.json")
      .then((response) => response.json())
      .then((data) => setAddons(data.addons));
  }, []);

  return (
    <Card className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300 mb-8 mt-5 w-full">
      <CardHeader className="p-0 m-0 flex justify-center">
        <div className="grid grid-cols gap-2 text-background bg-purple-800 dark:bg-purple-300 rounded-b-2xl px-6 py-1">
          <h2 className="grid grid-cols-1 uppercase text-lg font-semibold">
            Addons
          </h2>
        </div>
      </CardHeader>

      <CardBody className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addons.map((addon, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                {addon.name}
              </h3>
              <p className="text-md italic text-purple-800/70 dark:text-purple-300/70 mt-1">
                <span className="text-sm pe-2">starting at</span>
                <span className="align-text-top text-sm">$</span>
                {addon.starting_price}
                <span className="align-super text-sm">*</span>
              </p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
