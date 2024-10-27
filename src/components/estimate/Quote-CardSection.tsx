"use client";
import React, { memo, useContext } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

import { NonceContext } from "@/src/app/providers";
import { CardSectionProps } from "@/interfaces/Quote";
import { cn } from "@/lib/utils";

// CardSection Component
export const CardSection = memo(function CardSection({
  header,
  body,
  bodyClassName,
}: CardSectionProps) {
  const nonce = useContext(NonceContext);

  return (
    <Card
      className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300"
      nonce={nonce}
    >
      <CardHeader>
        <h2 className="text-2xl font-semibold" nonce={nonce}>
          {header}
        </h2>
      </CardHeader>
      <CardBody className={cn("text-lg", bodyClassName)}>{body}</CardBody>
    </Card>
  );
});

//  max-w-md w-full mx-auto
