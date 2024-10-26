"use client";
import React, { memo } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

import { CardSectionProps } from "@/interfaces/Quote";

// CardSection Component
export const CardSection = memo(function CardSection({
  header,
  body,
  bodyClassName,
}: CardSectionProps) {
  return (
    <Card className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300">
      <CardHeader>
        <h2 className="text-xl font-semibold">{header}</h2>
      </CardHeader>
      <CardBody className={bodyClassName}>{body}</CardBody>
    </Card>
  );
});

//  max-w-md w-full mx-auto
