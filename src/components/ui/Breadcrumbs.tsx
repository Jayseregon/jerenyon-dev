"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  // Remove trailing slash and split into segments
  const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center m-0 p-0 list-none">
        <li className="flex items-center">
          <Link
            className="text-purple-800 dark:text-purple-300 hover:underline"
            href="/"
          >
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={path} className="flex items-center">
              <span className="mx-2 text-foreground">/</span>
              {isLast ? (
                <span className="text-foreground">{formatLabel(segment)}</span>
              ) : (
                <Link
                  className="text-purple-800 dark:text-purple-300 hover:underline"
                  href={path}
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
