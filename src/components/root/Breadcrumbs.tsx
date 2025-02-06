"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
    <Breadcrumb className="mb-4" nonce={nonce}>
      <BreadcrumbList nonce={nonce}>
        <BreadcrumbItem nonce={nonce}>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => (
          <BreadcrumbItem
            key={`/${segments.slice(0, index + 1).join("/")}`}
            nonce={nonce}
          >
            <BreadcrumbSeparator nonce={nonce} />
            {index === segments.length - 1 ? (
              <BreadcrumbPage nonce={nonce}>
                {formatLabel(segment)}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={`/${segments.slice(0, index + 1).join("/")}`}>
                  {formatLabel(segment)}
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
