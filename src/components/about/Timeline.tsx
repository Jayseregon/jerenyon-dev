"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

import {
  AwardCertificatIcon,
  SchoolBackpackIcon,
  LaptopIcon,
} from "@/src/components/icons";

import { TimelineCardItem } from "./TimelineCardItem";
import { getTimelineData } from "./getTimelineData";

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -100px 0px" });

  const variants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? 100 : -100 },
    visible: { opacity: 1, x: 0 },
  };

  // Get text and border colors for date element
  const dateColorClasses =
    item.timelineIcon === "work"
      ? "text-purple-800 dark:text-purple-300 border-purple-800 dark:border-purple-300"
      : item.timelineIcon === "award"
        ? "text-cyan-800 dark:text-cyan-300 border-cyan-800 dark:border-cyan-300"
        : "text-amber-800 dark:text-amber-300 border-amber-800 dark:border-amber-300";

  // Get background colors for line and circle
  const bgColorClasses =
    item.timelineIcon === "work"
      ? "bg-purple-800 dark:bg-purple-300"
      : item.timelineIcon === "award"
        ? "bg-cyan-800 dark:bg-cyan-300"
        : "bg-amber-800 dark:bg-amber-300";

  return (
    <motion.div
      key={index}
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      className={`mb-12 md:mb-8 flex justify-between items-center w-full ${
        index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
      } relative flex-col items-center`}
      initial="hidden"
      transition={{ duration: 0.5, ease: "easeOut" }}
      variants={variants}
    >
      <div
        className={`w-full md:w-1/2 ${
          index % 2 === 0 ? "md:ps-10" : "md:pe-10"
        } z-40`}
      >
        <TimelineCardItem index={index} item={item} />
      </div>

      <div
        className={`w-full md:w-1/2 hidden md:inline-block ${
          index % 2 === 0 ? "md:text-right" : "md:text-left"
        } z-30`}
      >
        <div className="hidden md:inline-block">
          <div
            className={`hidden md:inline-block ${dateColorClasses} font-light border-2 py-1 italic ${index % 2 === 0 ? "md:pe-6 ps-3 rounded-s-3xl" : "md:ps-6 pe-3 rounded-e-3xl"}`}
          >
            {item.date}
          </div>
        </div>
      </div>

      <motion.div
        animate={isInView ? "visible" : "hidden"}
        className={`absolute top-1/2 transform -translate-y-1/2 h-1 ${bgColorClasses} ${
          index % 2 === 0 ? "left-1/2" : "right-1/2"
        } w-1/6 z-10 hidden md:block`}
        initial="hidden"
        transition={{ duration: 0.5, ease: "easeOut" }}
        variants={variants}
      />
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 ${bgColorClasses} border-5 border-background rounded-full size-12 items-center justify-center z-0 hidden md:flex`}
      />
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-transparent rounded-full size-12 items-center justify-center z-40 hidden md:flex">
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
    </motion.div>
  );
};

export const Timeline = () => {
  const t = useTranslations("timeline");
  const timelineData = getTimelineData(t);

  return (
    <div className="relative w-10/12 mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full border border-violet-900" />
      {timelineData.map((item, index) => (
        <TimelineItem key={index} index={index} item={item} />
      ))}
    </div>
  );
};
