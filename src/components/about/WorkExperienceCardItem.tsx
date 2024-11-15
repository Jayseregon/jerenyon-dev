"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Link,
} from "@nextui-org/react";

import {
  AwardCertificatIcon,
  SchoolBackpackIcon,
  LaptopIcon,
} from "@/src/components/icons";
import { WorkExperienceCardItemProps } from "@/interfaces/About";

export const WorkExperienceCardItem = ({
  item,
  index,
}: WorkExperienceCardItemProps) => {
  return (
    <Card className="bg-background rounded-lg shadow-md border-3 border-purple-800 dark:border-purple-300">
      <CardHeader className="md:hidden p-0 m-0 flex justify-center">
        <div className="flex inline-block gap-2 text-background bg-purple-800 dark:bg-purple-300 rounded-b-2xl px-6 py-1">
          {item.timelineIcon == "work" ? (
            <LaptopIcon className="mx-auto z-30 text-background" size={24} />
          ) : item.timelineIcon == "award" ? (
            <AwardCertificatIcon
              className="mx-auto z-30 text-background"
              size={24}
            />
          ) : (
            <SchoolBackpackIcon
              className="mx-auto z-30 text-background"
              size={24}
            />
          )}
          {item.date}
        </div>
      </CardHeader>

      <CardHeader
        className={`flex justify-between items-start w-full text-left ${
          index % 2 === 0 ? "md:text-left" : "md:flex-row-reverse md:text-right"
        } relative`}
      >
        <div>
          <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">
            {item.label}
          </h3>
          <p className="grid grid-cols dark:text-neutral-400 text-neutral-500">
            <span className="font-semibold text-lg">{item.company}</span>
            <span className="font-light text-sm italic">{item.city}</span>
          </p>
        </div>
      </CardHeader>

      <CardBody
        className={`grid grid-cols gap-2 text-left ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}
      >
        <p>{item.summary}</p>
        <div>
          {item.keywords.map((keyword, idx) => (
            <Chip
              key={idx}
              classNames={{
                base: "bg-transparent border-small border-purple-500 mx-0.5",
                content: "text-purple-500",
              }}
              radius="full"
              size="sm"
              variant="bordered"
            >
              {keyword}
            </Chip>
          ))}
        </div>
      </CardBody>

      <CardFooter
        className={`flex w-full justify-end ${
          index % 2 === 0 ? "md:justify-end" : "md:justify-start"
        }`}
      >
        <Link
          isExternal
          showAnchorIcon
          className="text-light text-purple-800/50 dark:text-purple-300/50"
          href="#"
        >
          More details
        </Link>
      </CardFooter>
    </Card>
  );
};
