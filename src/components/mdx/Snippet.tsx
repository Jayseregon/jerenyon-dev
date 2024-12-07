"use client";
import { useContext, type JSX } from "react";

import { NonceContext } from "@/src/app/providers";
import { MdxCompsDefaultProps } from "@/interfaces/mdx";

export default function Snippet({
  children,
}: MdxCompsDefaultProps): JSX.Element {
  const nonce = useContext(NonceContext);

  return (
    <span
      className="inline-block bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-50 p-1 mx-1 font-mono text-sm border-1 border-gray-600 dark:border-gray-50 rounded-md"
      nonce={nonce}
    >
      {children}
    </span>
  );
}
