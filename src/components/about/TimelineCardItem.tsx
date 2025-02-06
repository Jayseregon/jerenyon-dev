"use client";

import { useState } from "react";
import Link from "next/link";

import {
  AwardCertificatIcon,
  SchoolBackpackIcon,
  LaptopIcon,
} from "@/src/components/icons";
import { WorkExperienceCardItemProps } from "@/interfaces/About";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { TimelineDescriptionModal } from "./TimelineDescriptionModal";

// Helper function to get color classes
const getColorClasses = (type: "work" | "award" | "school") => {
  const colorMap = {
    work: {
      border: "border border-purple-800 dark:border-purple-300",
      text: "text-purple-800 dark:text-purple-300",
      bg: "bg-purple-800 dark:bg-purple-300",
    },
    award: {
      border: "border border-cyan-800 dark:border-cyan-300",
      text: "text-cyan-800 dark:text-cyan-300",
      bg: "bg-cyan-800 dark:bg-cyan-300",
    },
    school: {
      border: "border border-amber-800 dark:border-amber-300",
      text: "text-amber-800 dark:text-amber-300",
      bg: "bg-amber-800 dark:bg-amber-300",
    },
  };

  return colorMap[type];
};

export const TimelineCardItem = ({
  item,
  index,
}: WorkExperienceCardItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const iconMap = {
    work: <LaptopIcon className="mx-auto z-30 text-background" size={24} />,
    award: (
      <AwardCertificatIcon className="mx-auto z-30 text-background" size={24} />
    ),
    school: (
      <SchoolBackpackIcon className="mx-auto z-30 text-background" size={24} />
    ),
  };

  // Add this back for Badge variants
  const colorMap: Record<
    "work" | "award" | "school",
    "purple" | "cyan" | "amber"
  > = {
    work: "purple",
    award: "cyan",
    school: "amber",
  };

  const badgeVariant =
    colorMap[item.timelineIcon as keyof typeof colorMap] || "gray";
  const colorClasses = getColorClasses(
    item.timelineIcon as "work" | "award" | "school",
  );

  const icon = iconMap[item.timelineIcon as keyof typeof iconMap];

  return (
    <>
      <Card
        className={`bg-background rounded-lg shadow-md ${colorClasses.border}`}
      >
        <CardHeader className="md:hidden p-0 m-0 flex justify-center">
          <div
            className={`flex gap-2 text-background ${colorClasses.bg} rounded-b-2xl px-6 py-1`}
          >
            {icon}
            {item.date}
          </div>
        </CardHeader>

        <CardHeader
          className={`flex justify-between items-start w-full text-left pt-4 ${
            index % 2 === 0
              ? "md:text-left"
              : "md:flex-row-reverse md:text-right"
          } relative`}
        >
          <div>
            <h3 className={`text-xl font-semibold ${colorClasses.text}`}>
              {item.label}
            </h3>
            <p className="grid grid-cols dark:text-neutral-400 text-neutral-500">
              <span className="font-semibold text-lg">{item.company}</span>
              <span className="font-light text-sm italic">{item.city}</span>
            </p>
          </div>
        </CardHeader>

        <CardContent
          className={`grid grid-cols gap-2 text-left ${
            index % 2 === 0 ? "md:text-left" : "md:text-right"
          }`}
        >
          <p>{item.summary}</p>
          <div>
            {item.keywords.map((keyword, idx) => (
              <Badge key={idx} variant={badgeVariant}>
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter
          className={`flex w-full justify-end ${
            index % 2 === 0 ? "md:justify-end" : "md:justify-start"
          }`}
        >
          {item.timelineIcon === "award" && item.href ? (
            <Button
              asChild
              className={`text-light ${colorClasses.text}/80`}
              variant="link"
            >
              <Link href={item.href} rel="noopener noreferrer" target="_blank">
                Show Credentials
              </Link>
            </Button>
          ) : (
            <Button
              className={`text-light ${colorClasses.text}/80`}
              variant="link"
              onClick={() => setIsModalOpen(true)}
            >
              More details
            </Button>
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
