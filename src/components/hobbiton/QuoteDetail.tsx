"use client";

import React, { useEffect, useState } from "react";
import { CircleCheck, Hourglass, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

import { calculateQuoteSummary } from "@/lib/calculateQuote";
import { CardSection } from "@/components/estimate/Quote-CardSection";
import { Quote, QuoteForm } from "@/interfaces/Quote";
import { QuoteDetailProps } from "@/src/interfaces/Auth";

export const QuoteDetail: React.FC<QuoteDetailProps> = ({
  quoteId,
  onDelete,
}) => {
  const router = useRouter();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/quote/action?id=${quoteId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch quote");
        }
        const data: Quote = await res.json();

        setQuote(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch quote");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, [quoteId]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/quote/action?id=${quoteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete quote");
      }

      onDelete(); // Notify parent component
    } catch (error) {
      console.error(error);
      setError("Failed to delete quote");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div>Search...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!quote) {
    return <div>Quote not found.</div>;
  }

  // Map the fetched Quote to QuoteForm
  const quoteForm: QuoteForm = {
    clientName: quote.clientName,
    clientEmail: quote.clientEmail,
    comment: quote.comment,
    totalPrice: quote.totalPrice,
    staticPages: quote.staticPages || { selectedPages: 0, totalPrice: 0 },
    dynamicPages: quote.dynamicPages || { selectedPages: 0, totalPrice: 0 },
    authentication: quote.authentication,
    legalPages: quote.legalPages,
    maintenancePlan: quote.maintenancePlan || {
      type: "",
      duration: 0,
      regularUpdates: false,
      securityUpdates: false,
      minorBugFixes: false,
      featureEnhancement: false,
      prioritySupport: false,
    },
    websiteType: quote.websiteType || { type: "" },
    customFeatures: quote.customFeature,
    automations: quote.automations,
    thirdPartyAPIs: quote.thirdPartyAPIs,
    addons: quote.addons,
  };

  const summaryData = calculateQuoteSummary(quoteForm);

  return (
    <div className="mt-6">
      <CardSection
        titleOutside
        body={
          <div className="space-y-4">
            <div className="rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-purple-800 dark:text-purple-300 mb-1">
                    Client Name:
                  </span>
                  <span className="pl-2">{quoteForm.clientName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-purple-800 dark:text-purple-300 mb-1">
                    Email:
                  </span>
                  <span className="pl-2">{quoteForm.clientEmail}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-purple-800 dark:text-purple-300 mb-1">
                    Estimated Time:
                  </span>
                  <span className="pl-2">
                    {summaryData.totalHours.toFixed(0)} hours
                  </span>
                </div>
              </div>

              {quoteForm.comment && (
                <div className="flex flex-col">
                  <span className="font-semibold text-purple-800 dark:text-purple-300 mb-1">
                    Comment:
                  </span>
                  <p className="pl-2 whitespace-pre-wrap">
                    {quoteForm.comment}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {summaryData.categories.map((category) => {
                if (category.items.length === 0) return null;

                return (
                  <div
                    key={category.name}
                    className="bg-purple-200 dark:bg-purple-950 rounded-lg shadow-md p-4 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-foreground">
                        {category.name}
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {category.items.map((item, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <CircleCheck className="text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-semibold text-foreground">
                        Subtotal:
                      </span>
                      <span className="text-green-600">
                        ${category.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end mt-6">
              <Button
                isIconOnly
                className="bg-red-500 hover:bg-red-600 text-white"
                color={undefined}
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting ? <Hourglass /> : <Trash2 size={24} />}
              </Button>
            </div>
          </div>
        }
        header={
          <div className="flex justify-between items-center">
            <span>Quote Details for {quote.projectRef}</span>
            <span className="text-2xl text-green-600">
              ${" "}
              {summaryData.totalPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        }
      />
    </div>
  );
};
