"use client";
import React, { memo, useContext } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
      <Card nonce={nonce}>
        {!titleOutside && (
          <CardHeader nonce={nonce}>
            <h2 className="text-2xl font-semibold" nonce={nonce}>
              {header}
            </h2>
          </CardHeader>
        )}
        <CardContent className={cn("text-left", bodyClassName)} nonce={nonce}>
          {body}
        </CardContent>
      </Card>
    </>
  );
});
