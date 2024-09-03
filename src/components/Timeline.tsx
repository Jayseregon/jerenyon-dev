"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Link,
} from "@nextui-org/react";
import { AwardCertificatIcon, SchoolBackpackIcon, LaptopIcon } from "./icons";

interface TimelineItem {
  date: string;
  jobTitle: string;
  company: string;
  city: string;
  keywords: string[];
  description: string;
  responsibilities: string[];
  timelineIcon: string;
}

interface WorkExperienceCardItemProps {
  item: TimelineItem;
  index: number;
}

export const Timeline = () => {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);

  useEffect(() => {
    fetch("/json/timelineData.json")
      .then((response) => response.json())
      .then((data) => setTimelineData(data));
  }, []);

  return (
    <div className="relative w-10/12 mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-3 border-foreground dark:border-foreground"></div>
      {timelineData.map((item, index) => (
        <div
          key={index}
          className={`sm:mb-12 md:mb-8 flex justify-between items-center w-full ${
            index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
          } relative sm:flex-col sm:items-center`}>
          <div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:ps-10" : "md:pe-10"} z-40 sm:w-full sm:px-0`}>
            {item.timelineIcon == "work" ? (
              <WorkExperienceCardItem
                item={item}
                index={index}
              />
            ) : item.timelineIcon == "award" ? (
              <CertificateCardItem
                item={item}
                index={index}
              />
            ) : (
              <EducationCardItem
                item={item}
                index={index}
              />
            )}
          </div>

          <div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} z-30 sm:w-full sm:text-center sm:pe-0 sm:ps-0`}>
            <div className="sm:hidden md:inline-block">
              <div
                className={`${item.timelineIcon == "work" ? "text-purple-800 dark:text-purple-300 border-purple-800 dark:border-purple-300" : item.timelineIcon == "award" ? "text-cyan-800 dark:text-cyan-300 border-cyan-800 dark:border-cyan-300" : "text-amber-800 dark:text-amber-300 border-amber-800 dark:border-amber-300"}  font-light border-2 py-1 italic ${index % 2 === 0 ? "md:pe-6 ps-3 rounded-s-3xl" : "md:ps-6 pe-3 rounded-e-3xl"}`}>
                {item.date}
              </div>
            </div>
          </div>

          <div
            className={`absolute top-1/2 transform -translate-y-1/2 h-1 ${item.timelineIcon == "work" ? "bg-purple-800 dark:bg-purple-300" : item.timelineIcon == "award" ? "bg-cyan-800 dark:bg-cyan-300" : "bg-amber-800 dark:bg-amber-300"} ${index % 2 === 0 ? "left-1/2" : "right-1/2"} w-1/6 z-10 hidden md:block`}></div>
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 ${item.timelineIcon == "work" ? "bg-purple-800 dark:bg-purple-300" : item.timelineIcon == "award" ? "bg-cyan-800 dark:bg-cyan-300" : "bg-amber-800 dark:bg-amber-300"} border-5 border-background rounded-full size-12 flex items-center justify-center z-0 hidden md:flex`}></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-transparent rounded-full size-12 flex items-center justify-center z-40 hidden md:flex">
            {item.timelineIcon == "work" ? (
              <LaptopIcon
                size={24}
                className="mx-auto z-30 text-background"
              />
            ) : item.timelineIcon == "award" ? (
              <AwardCertificatIcon
                size={24}
                className="mx-auto z-30 text-background"
              />
            ) : (
              <SchoolBackpackIcon
                size={24}
                className="mx-auto z-30 text-background"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export const WorkExperienceCardItem = ({
  item,
  index,
}: WorkExperienceCardItemProps) => {
  return (
    <Card className="bg-background rounded-lg shadow-md border-3 border-purple-800 dark:border-purple-300">
      <CardHeader className="md:hidden p-0 m-0 flex justify-center">
        <div className="flex inline-block gap-2 text-background bg-purple-800 dark:bg-purple-300 rounded-b-2xl px-6 py-1">
          {item.timelineIcon == "work" ? (
            <LaptopIcon
              size={24}
              className="mx-auto z-30 text-background"
            />
          ) : item.timelineIcon == "award" ? (
            <AwardCertificatIcon
              size={24}
              className="mx-auto z-30 text-background"
            />
          ) : (
            <SchoolBackpackIcon
              size={24}
              className="mx-auto z-30 text-background"
            />
          )}
          {item.date}
        </div>
      </CardHeader>

      <CardHeader
        className={`flex justify-between items-start w-full sm:text-left ${
          index % 2 === 0 ? "md:text-left" : "md:flex-row-reverse md:text-right"
        } relative`}>
        <div>
          <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">
            {item.jobTitle}
          </h3>
          <p className="grid grid-cols dark:text-neutral-400 text-neutral-500">
            <span className="font-semibold text-lg">{item.company}</span>
            <span className="font-light text-sm italic">{item.city}</span>
          </p>
        </div>
      </CardHeader>

      <CardBody
        className={`grid grid-cols gap-2 sm:text-left ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
        <p>{item.description}</p>
        <div>
          {item.keywords.map((keyword, idx) => (
            <Chip
              key={idx}
              variant="bordered"
              radius="full"
              size="sm"
              classNames={{
                base: "bg-transparent border-small border-purple-500 mx-0.5",
                content: "text-purple-500",
              }}>
              {keyword}
            </Chip>
          ))}
        </div>
      </CardBody>

      <CardFooter
        className={`flex w-full sm:justify-end ${
          index % 2 === 0 ? "md:justify-end" : "md:justify-start"
        }`}>
        <Link
          isExternal
          showAnchorIcon
          href="#"
          className="text-light text-purple-800/50 dark:text-purple-300/50">
          More details
        </Link>
      </CardFooter>
    </Card>
  );
};

export const EducationCardItem = ({
  item,
  index,
}: WorkExperienceCardItemProps) => {
  return (
    <Card className="bg-background rounded-lg shadow-md border-3 border-amber-800 dark:border-amber-300">
      <CardHeader className="md:hidden p-0 m-0 flex justify-center">
        <div className="flex inline-block gap-2 text-background bg-amber-800 dark:bg-amber-300 rounded-b-2xl px-6 py-1">
          {item.timelineIcon == "work" ? (
            <LaptopIcon
              size={24}
              className="mx-auto z-30 text-background"
            />
          ) : item.timelineIcon == "award" ? (
            <AwardCertificatIcon
              size={24}
              className="mx-auto z-30 text-background"
            />
          ) : (
            <SchoolBackpackIcon
              size={24}
              className="mx-auto z-30 text-background"
            />
          )}
          {item.date}
        </div>
      </CardHeader>

      <CardHeader
        className={`flex justify-between items-start w-full sm:text-left ${
          index % 2 === 0 ? "md:text-left" : "md:flex-row-reverse md:text-right"
        } relative`}>
        <div>
          <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-300">
            {item.jobTitle}
          </h3>
          <p className="grid grid-cols dark:text-neutral-400 text-neutral-500">
            <span className="font-semibold text-lg">{item.company}</span>
            <span className="font-light text-sm italic">{item.city}</span>
          </p>
        </div>
      </CardHeader>

      <CardBody
        className={`grid grid-cols gap-2 sm:text-left ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
        <p>{item.description}</p>
        <div>
          {item.keywords.map((keyword, idx) => (
            <Chip
              key={idx}
              variant="bordered"
              radius="full"
              size="sm"
              classNames={{
                base: "bg-transparent border-small border-amber-500 mx-0.5",
                content: "text-amber-500",
              }}>
              {keyword}
            </Chip>
          ))}
        </div>
      </CardBody>

      <CardFooter
        className={`flex w-full sm:justify-end ${
          index % 2 === 0 ? "md:justify-end" : "md:justify-start"
        }`}>
        <Link
          isExternal
          showAnchorIcon
          href="#"
          className="text-light text-amber-800/50 dark:text-amber-300/50">
          More details
        </Link>
      </CardFooter>
    </Card>
  );
};

export const CertificateCardItem = ({
  item,
  index,
}: WorkExperienceCardItemProps) => {
  return (
    <Card className="bg-background rounded-lg shadow-md border-3 border-cyan-800 dark:border-cyan-300">
      <CardHeader className="md:hidden p-0 m-0 flex justify-center">
        <div className="flex inline-block gap-2 text-background bg-cyan-800 dark:bg-cyan-300 rounded-b-2xl px-6 py-1">
          {item.timelineIcon == "work" ? (
            <LaptopIcon
              size={24}
              className="mx-auto z-30 text-background"
            />
          ) : item.timelineIcon == "award" ? (
            <AwardCertificatIcon
              size={24}
              className="mx-auto z-30 text-background"
            />
          ) : (
            <SchoolBackpackIcon
              size={24}
              className="mx-auto z-30 text-background"
            />
          )}
          {item.date}
        </div>
      </CardHeader>

      <CardHeader
        className={`flex justify-between items-start w-full sm:text-left ${
          index % 2 === 0 ? "md:text-left" : "md:flex-row-reverse md:text-right"
        } relative`}>
        <div>
          <h3 className="text-xl font-semibold text-cyan-800 dark:text-cyan-300">
            {item.jobTitle}
          </h3>
          <p className="grid grid-cols dark:text-neutral-400 text-neutral-500">
            <span className="font-semibold text-lg">{item.company}</span>
            <span className="font-light text-sm italic">{item.city}</span>
          </p>
        </div>
      </CardHeader>

      <CardBody
        className={`grid grid-cols gap-2 sm:text-left ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
        <p>{item.description}</p>
        <div>
          {item.keywords.map((keyword, idx) => (
            <Chip
              key={idx}
              variant="bordered"
              radius="full"
              size="sm"
              classNames={{
                base: "bg-transparent border-small border-cyan-500 mx-0.5",
                content: "text-cyan-500",
              }}>
              {keyword}
            </Chip>
          ))}
        </div>
      </CardBody>

      <CardFooter
        className={`flex w-full sm:justify-end ${
          index % 2 === 0 ? "md:justify-end" : "md:justify-start"
        }`}>
        <Link
          isExternal
          showAnchorIcon
          href="#"
          className="text-light text-cyan-800/50 dark:text-cyan-300/50">
          More details
        </Link>
      </CardFooter>
    </Card>
  );
};
