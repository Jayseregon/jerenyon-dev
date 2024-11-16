"use client";

import { useEffect, useState } from "react";

import {
  AwardCertificatIcon,
  SchoolBackpackIcon,
  LaptopIcon,
} from "@/src/components/icons";
import { TimelineItem } from "@/interfaces/About";

import { TimelineCardItem } from "./TimelineCardItem";

export const Timeline = () => {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);

  useEffect(() => {
    fetch("/json/timelineData.json")
      .then((response) => response.json())
      .then((data) => setTimelineData(data));
  }, []);

  return (
    <div className="relative w-10/12 mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-3 border-foreground dark:border-foreground" />
      {timelineData.map((item, index) => (
        <div
          key={index}
          className={`mb-12 md:mb-8 flex justify-between items-center w-full ${
            index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
          } relative flex-col items-center`}
        >
          <div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:ps-10" : "md:pe-10"} z-40`}
          >
            <TimelineCardItem index={index} item={item} />
          </div>

          <div
            className={`w-full md:w-1/2 hidden md:inline-block ${index % 2 === 0 ? "md:text-right" : "md:text-left"} z-30`}
          >
            <div className="hidden md:inline-block">
              <div
                className={`hidden md:inline-block ${item.timelineIcon == "work" ? "text-purple-800 dark:text-purple-300 border-purple-800 dark:border-purple-300" : item.timelineIcon == "award" ? "text-cyan-800 dark:text-cyan-300 border-cyan-800 dark:border-cyan-300" : "text-amber-800 dark:text-amber-300 border-amber-800 dark:border-amber-300"} font-light border-2 py-1 italic ${index % 2 === 0 ? "md:pe-6 ps-3 rounded-s-3xl" : "md:ps-6 pe-3 rounded-e-3xl"}`}
              >
                {item.date}
              </div>
            </div>
          </div>

          <div
            className={`absolute top-1/2 transform -translate-y-1/2 h-1 ${item.timelineIcon == "work" ? "bg-purple-800 dark:bg-purple-300" : item.timelineIcon == "award" ? "bg-cyan-800 dark:bg-cyan-300" : "bg-amber-800 dark:bg-amber-300"} ${index % 2 === 0 ? "left-1/2" : "right-1/2"} w-1/6 z-10 hidden md:block`}
          />
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 ${item.timelineIcon == "work" ? "bg-purple-800 dark:bg-purple-300" : item.timelineIcon == "award" ? "bg-cyan-800 dark:bg-cyan-300" : "bg-amber-800 dark:bg-amber-300"} border-5 border-background rounded-full size-12 flex items-center justify-center z-0 hidden md:flex`}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-transparent rounded-full size-12 flex items-center justify-center z-40 hidden md:flex">
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
          </div>
        </div>
      ))}
    </div>
  );
};
