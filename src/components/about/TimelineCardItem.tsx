"use client";

import { useState } from "react";
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

import { TimelineDescriptionModal } from "./TimelineDescriptionModal";

export const TimelineCardItem = ({
  item,
  index,
}: WorkExperienceCardItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const iconMap = {
    work: (
      <LaptopIcon
        className="mx-auto z-30 text-background"
        size={24}
      />
    ),
    award: (
      <AwardCertificatIcon
        className="mx-auto z-30 text-background"
        size={24}
      />
    ),
    school: (
      <SchoolBackpackIcon
        className="mx-auto z-30 text-background"
        size={24}
      />
    ),
  };

  const colorMap = {
    work: "purple",
    award: "cyan",
    school: "amber",
  };

  const color = colorMap[item.timelineIcon as keyof typeof colorMap] || "gray";
  const icon = iconMap[item.timelineIcon as keyof typeof iconMap];

  return (
    <>
      <Card
        className={`bg-background rounded-lg shadow-md border-3 border-${color}-800 dark:border-${color}-300`}>
        <CardHeader className="md:hidden p-0 m-0 flex justify-center">
          <div
            className={`flex inline-block gap-2 text-background bg-${color}-800 dark:bg-${color}-300 rounded-b-2xl px-6 py-1`}>
            {icon}
            {item.date}
          </div>
        </CardHeader>

        <CardHeader
          className={`flex justify-between items-start w-full text-left ${
            index % 2 === 0
              ? "md:text-left"
              : "md:flex-row-reverse md:text-right"
          } relative`}>
          <div>
            <h3
              className={`text-xl font-semibold text-${color}-800 dark:text-${color}-300`}>
              {item.label}
            </h3>
            <p className="grid grid-cols dark:text-neutral-400 text-neutral-500">
              <span className="font-semibold text-lg">{item.company}</span>
              <span className="font-light text-sm italic">{item.city}</span>
            </p>
          </div>
        </CardHeader>

        <CardBody
          className={`grid grid-cols gap-2 text-left ${
            index % 2 === 0 ? "md:text-left" : "md:text-right"
          }`}>
          <p>{item.summary}</p>
          <div>
            {item.keywords.map((keyword, idx) => (
              <Chip
                key={idx}
                classNames={{
                  base: `bg-transparent border border-${color}-500 mx-0.5`,
                  content: `text-${color}-500`,
                }}
                radius="full"
                size="sm"
                variant="bordered">
                {keyword}
              </Chip>
            ))}
          </div>
        </CardBody>

        <CardFooter
          className={`flex w-full justify-end ${
            index % 2 === 0 ? "md:justify-end" : "md:justify-start"
          }`}>
          {item.timelineIcon === "award" && item.href ? (
            <Link
              isExternal
              showAnchorIcon
              className={`text-light text-${color}-800/50 dark:text-${color}-300/50`}
              href={item.href}>
              Show Credentials
            </Link>
          ) : (
            <Link
              className={`text-light text-${color}-800/50 dark:text-${color}-300/50`}
              onPress={() => setIsModalOpen(true)}>
              More details
            </Link>
          )}
        </CardFooter>
      </Card>
      <TimelineDescriptionModal
        isOpen={isModalOpen}
        item={item}
        onClose={handleModalClose}
      />
    </>
  );
};
