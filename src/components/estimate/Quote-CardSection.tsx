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
  titleOutside,
}: CardSectionProps) {
  const nonce = useContext(NonceContext);

  return (
    <>
      {titleOutside && (
        <h2 className="text-2xl font-semibold text-left" nonce={nonce}>
          {header}
        </h2>
      )}
      <Card
        className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300"
        nonce={nonce}
      >
        {!titleOutside && (
          <CardHeader nonce={nonce}>
            <h2 className="text-2xl font-semibold" nonce={nonce}>
              {header}
            </h2>
          </CardHeader>
        )}
        <CardBody className={cn("text-lg", bodyClassName)} nonce={nonce}>
          {body}
        </CardBody>
      </Card>
    </>
  );
});

//  max-w-md w-full mx-auto
