import { Card, CardHeader, CardFooter, CardBody } from "@nextui-org/react";
import Image from "next/image";

import { AboutCardProps } from "@/interfaces/About";

export const AboutCard = ({
  title,
  subtitle,
  paragraphs,
  imgName,
}: AboutCardProps) => {
  return (
    <Card
      isFooterBlurred
      className="relative text-start w-full border border-purple-800 dark:border-purple-300 bg-background flex flex-col"
    >
      <CardHeader className="flex-col items-start px-8 pt-4">
        <p className="text-sm text-purple-800 dark:text-purple-300 uppercase font-bold">
          {subtitle}
        </p>
      </CardHeader>
      <CardBody className="px-8 pb-4 text-foreground space-y-5">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-justify">
            {paragraph}
          </p>
        ))}
      </CardBody>
      <CardFooter className="border-t-1 border-purple-800 dark:border-purple-300 justify-between px-8 py-4 bg-background">
        <h1 className="text-background text-start font-semibold w-2/3 text-xl text-purple-800 dark:text-purple-300">
          {title}
        </h1>
        <Image
          alt={`section image ${imgName}`}
          height={30}
          src={`/static/${imgName}.webp`}
          width={30}
        />
      </CardFooter>
    </Card>
  );
};
