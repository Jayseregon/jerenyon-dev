"use client";

import { Card } from "@nextui-org/react";
import { useContext } from "react";

import { NonceContext } from "@/src/app/providers";
import { TiptapEditor } from "@/src/components/hobbiton/TiptapEditor";
import { BLogPostReaderProps } from "@/src/interfaces/Hub";

export const BlogPostReader = ({ content }: BLogPostReaderProps) => {
  const nonce = useContext(NonceContext);

  return (
    <Card className="bg-background rounded-lg max-w-5xl mx-auto" nonce={nonce}>
      <div className="w-full mx-auto">
        <TiptapEditor content={JSON.parse(content)} editable={false} />
      </div>
    </Card>
  );
};
