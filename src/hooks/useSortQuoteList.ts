import { useAsyncList } from "@react-stately/data";

import { Quote } from "@/interfaces/Quote";
import { convertQuoteDates } from "@/lib/utils";

export const useSortQuoteList = (
  apiEndpoint: string
): ReturnType<typeof useAsyncList<Quote>> =>
  useAsyncList<Quote>({
    initialSortDescriptor: {
      column: "createdAt",
      direction: "ascending",
    },
    async load({ signal }) {
      const res = await fetch(apiEndpoint, {
        method: "GET",
        signal,
      });
      const data = await res.json();

      const quotesWithDates = data.map((quote: Quote) =>
        convertQuoteDates(quote)
      );

      const sortedQuotes = quotesWithDates.sort((a: Quote, b: Quote) =>
        a.projectRef.localeCompare(b.projectRef)
      );

      return { items: sortedQuotes };
    },
    async sort({ items, sortDescriptor }) {
      if (!sortDescriptor) {
        return { items };
      }

      const sortedItems = [...items].sort((a, b) => {
        const column = sortDescriptor.column as keyof Quote;
        const aValue = a[column];
        const bValue = b[column];

        if (aValue == null || bValue == null) {
          return 0;
        }

        let comparison = 0;

        if (
          typeof aValue === "object" &&
          aValue !== null &&
          "type" in aValue &&
          typeof bValue === "object" &&
          bValue !== null &&
          "type" in bValue
        ) {
          comparison = (aValue as any).type.localeCompare((bValue as any).type);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          comparison = aValue - bValue;
        } else if (typeof aValue === "string" && typeof bValue === "string") {
          comparison = aValue.localeCompare(bValue);
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else {
          comparison = 0;
        }

        return sortDescriptor.direction === "ascending"
          ? comparison
          : -comparison;
      });

      return { items: sortedItems };
    },
  });
