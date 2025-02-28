import Image from "next/image";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { AboutCardProps } from "@/interfaces/About";

export const AboutCard = ({
  title,
  subtitle,
  paragraphs,
  imgName,
}: AboutCardProps) => {
  return (
    <Card>
      <CardHeader className="border-b-[0.5px] border-purple-800 dark:border-purple-300">
        <div className="flex justify-between items-center w-full">
          <CardTitle>{title}</CardTitle>
          <Image
            alt={`section image ${imgName}`}
            height={30}
            src={`/static/${imgName}.webp`}
            width={30}
          />
        </div>
      </CardHeader>
      <CardHeader className="flex-col items-start">
        <p className="text-sm text-purple-800 dark:text-purple-300 uppercase font-bold">
          {subtitle}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-justify">
            {paragraph}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};
