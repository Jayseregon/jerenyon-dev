import { Card, CardHeader, CardBody } from "@nextui-org/react";

import { CheckIcon } from "../icons";

export interface Section {
  name: string;
  optional: boolean;
  starting_price: number;
  whats_included: string[];
}

export interface Tier {
  name: string;
  subtitle: string;
  starting_price: number;
  sections: Section[];
}

export interface PricingTierProps {
  tier: Tier;
}

export const PricingTier = ({ tier }: PricingTierProps) => {
  return (
    <Card className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300 mb-8 mt-5 w-full">
      <CardHeader className="p-0 m-0 flex justify-center">
        <div className="grid grid-cols gap-2 text-background bg-purple-800 dark:bg-purple-300 rounded-b-2xl px-6 py-1">
          <h2 className="grid grid-cols-1">
            <span className="uppercase text-lg font-semibold">{tier.name}</span>
            <span className="font-light">Development Package</span>
          </h2>
        </div>
      </CardHeader>

      <CardBody className="p-6">
        <p className="text-start mx-auto text-xl max-w-md text-purple-800 dark:text-purple-300">
          {tier.subtitle}
        </p>
        <p className="grid grid-cols-1 pt-2 mx-auto">
          <span className="font-thin mx-auto">Starting at</span>
          <span className="text-4xl font-bold">
            {tier.starting_price > 0 ? (
              <>
                <span className="align-text-top text-xl">$</span>
                {tier.starting_price}
                <span className="align-super text-sm">*</span>
              </>
            ) : (
              "Contact Us"
            )}
          </span>
        </p>
        <hr className="border-t border-purple-800 dark:border-purple-300 mt-4 mb-6" />

        {tier.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="flex inline-block gap-2 text-purple-800 dark:text-purple-300">
              <span className="text-lg font-semibold">{section.name}</span>
              <span className="text-light italic">
                {section.optional ? "(Optional)" : ""}
              </span>
            </h3>
            <p className="text-md italic text-purple-800/70 dark:text-purple-300/70 mt-1">
              {tier.starting_price > 0 ?? (
                <>
                  <span className="text-sm pe-2">starting at</span>
                  <span className="align-text-top text-sm">$</span>
                  {section.starting_price}
                  <span className="align-super text-sm">*</span>
                </>
              )}
            </p>
            <ul className="list-none mt-3 space-y-2">
              {section.whats_included.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-md text-gray-800 dark:text-neutral-300"
                >
                  <CheckIcon
                    className="text-purple-800 dark:text-purple-300 mr-2 flex-shrink-0"
                    size={20}
                  />
                  <span className="flex-grow">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
