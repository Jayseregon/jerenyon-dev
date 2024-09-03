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

interface TimelineItem {
  date: string;
  jobTitle: string;
  city: string;
  keywords: string[];
  description: string;
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
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-3 border-purple-800 dark:border-purple-300"></div>
      {timelineData.map((item, index) => (
        <div
          key={index}
          className={`mb-8 flex justify-between items-center w-full ${
            index % 2 === 0 ? "flex-row-reverse" : ""
          } relative`}>
          <div className="w-3/6 px-10 z-10">
            <WorkExperienceCardItem
              item={item}
              index={index}
            />
          </div>

          <div className={`w-3/6 ${index % 2 === 0 ? "text-right pe-2" : "text-left ps-2"} z-10`}>
            <div className="p-2 inline-block">
              <span className="text-purple-800 dark:text-purple-300 italic">
                {item.date}
              </span>
            </div>
          </div>

          <div className={`absolute top-1/2 transform -translate-y-1/2 h-2 bg-purple-800 dark:bg-purple-300 ${index % 2 === 0 ? "left-1/2" : "right-1/2"} w-1/6 z-0`}></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-purple-800 dark:bg-purple-300 border-5 border-background rounded-full w-6 h-6 flex items-center justify-center z-10">
            <div className="bg-background size-2 rounded-full"></div>
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
    <Card className="bg-background p-4 rounded-lg shadow-md border-5 border-purple-800 dark:border-purple-300">
      <CardHeader
        className={`flex justify-between items-start w-full ${
          index % 2 === 0 ? "text-left" : "flex-row-reverse text-right"
        } relative`}>
        <div>
          <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">
            {item.jobTitle}
          </h3>
          <p className="text-gray-400">{item.city}</p>
        </div>
      </CardHeader>

      <CardBody className={` ${index % 2 === 0 ? "text-left" : "text-right"}`}>
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

      <CardFooter>
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
