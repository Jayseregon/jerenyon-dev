"use client";

import { Spinner } from "@nextui-org/react";
import React, { useContext } from "react";

import { NonceContext } from "@/src/app/providers";

export default function SpinLoader() {
  const nonce = useContext(NonceContext);

  return (
    <div
      className="absolute inset-0 flex justify-center items-center"
      nonce={nonce}
    >
      <Spinner
        classNames={{
          label: "text-lg text-purple-800 dark:text-purple-300",
        }}
        label="Loading..."
        nonce={nonce}
        size="lg"
      />
    </div>
  );
}
