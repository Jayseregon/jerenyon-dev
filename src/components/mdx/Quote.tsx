"use client";
import { useContext, type JSX } from "react";

import { NonceContext } from "@/src/app/providers";
import { MdxCompsDefaultProps } from "@/interfaces/mdx";

export default function Quote({ children }: MdxCompsDefaultProps): JSX.Element {
  const nonce = useContext(NonceContext);

  return (
    <span
      className="inline-block text-gray-600 dark:text-gray-50 italic font-mono text-sm"
      nonce={nonce}
    >
      {children}
    </span>
  );
}
