import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Quote } from "@/interfaces/Quote";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const convertQuoteDates = (quote: any): Quote => ({
  ...quote,
  createdAt: quote.createdAt ? new Date(quote.createdAt) : undefined,
  updatedAt: quote.updatedAt ? new Date(quote.updatedAt) : undefined,
});
