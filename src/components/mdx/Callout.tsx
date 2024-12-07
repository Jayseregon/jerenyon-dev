"use client";
import { useContext, type JSX } from "react";

import { cn } from "@/lib/utils";
import { NonceContext } from "@/src/app/providers";
import { CalloutProps } from "@/interfaces/mdx";

export default function Callout({
  children,
  type = "default",
  ...props
}: CalloutProps): JSX.Element {
  const nonce = useContext(NonceContext);

  return (
    <div
      className={cn("my-3 px-4 mx-auto rounded-md border-2 border-l-8 w-full", {
        "border-red-900 bg-red-50 prose text-red-900": type === "danger",
        "border-yellow-900 bg-yellow-50 prose text-yellow-900":
          type === "warning",
      })}
      nonce={nonce}
      {...props}
    >
      <div>{children}</div>
    </div>
  );
}
