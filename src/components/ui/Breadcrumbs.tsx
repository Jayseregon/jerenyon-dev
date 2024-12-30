"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

import { NonceContext } from "@/src/app/providers";

const formatLabel = (segment: string) => {
  // Remove any special characters and replace dashes/underscores with spaces
  const formatted = segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // Check if it's a dynamic route parameter (starts with [...] or [])
  if (segment.startsWith("[") && segment.endsWith("]")) {
    return segment.slice(1, -1).replace(/[\[\]\.\.\.]/g, "");
  }

  return formatted;
};

export default function Breadcrumbs() {
  const nonce = useContext(NonceContext);
  const pathname = usePathname();

  // Remove trailing slash and split into segments
  const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="py-4" nonce={nonce}>
      <ol
        className="flex flex-wrap items-center m-0 p-0 list-none"
        nonce={nonce}
      >
        <li className="flex items-center" nonce={nonce}>
          <Link
            className="text-purple-800 dark:text-purple-300 hover:underline"
            href="/"
            nonce={nonce}
          >
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={path} className="flex items-center" nonce={nonce}>
              <span className="mx-2 text-foreground" nonce={nonce}>
                /
              </span>
              {isLast ? (
                <span className="text-foreground" nonce={nonce}>
                  {formatLabel(segment)}
                </span>
              ) : (
                <Link
                  className="text-purple-800 dark:text-purple-300 hover:underline"
                  href={path}
                  nonce={nonce}
                >
                  {formatLabel(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
