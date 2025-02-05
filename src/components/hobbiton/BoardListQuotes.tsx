"use client";

import { useContext, useEffect, useState } from "react";

import { Quote } from "@/interfaces/Quote";
import { NonceContext } from "@/src/app/providers";
import SpinLoader from "@/src/components/root/SpinLoader";

import { QuoteDetail } from "./QuoteDetail";
import { QuotesTable } from "./QuotesTable";

export const BoardListQuotes = () => {
  const nonce = useContext(NonceContext);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/quote");
      const data = await res.json();

      setQuotes(
        data.map((quote: Quote) => ({
          ...quote,
          createdAt: new Date(quote.createdAt),
          updatedAt: new Date(quote.updatedAt),
        })),
      );
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuoteDeleted = () => {
    setSelectedQuoteId(null);
    fetchQuotes();
  };

  return (
    <div className="mt-10 w-fit" nonce={nonce}>
      <div
        className="rounded-md border border-purple-800 dark:border-purple-300"
        nonce={nonce}
      >
        {isLoading ? (
          <div className="p-4">
            <SpinLoader />
          </div>
        ) : (
          <QuotesTable data={quotes} onRowClick={setSelectedQuoteId} />
        )}
      </div>
      {selectedQuoteId && (
        <QuoteDetail quoteId={selectedQuoteId} onDelete={handleQuoteDeleted} />
      )}
    </div>
  );
};
