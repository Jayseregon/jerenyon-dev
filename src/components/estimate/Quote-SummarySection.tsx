"use client";
import React, { memo, useContext, useMemo } from "react";
import { CardSection } from "./Quote-CardSection";
import { QuoteForm } from "@/interfaces/Quote";
import { NonceContext } from "@/src/app/providers";
import {
  developmentTimeEstimates,
  hourlyRate,
  bufferPercentage,
  authenticationMethods,
  apiIntegrations,
  addons,
  automationsList,
  legalPagesList,
} from "./getQuoteData";

// Replace react-icons with lucide-react icons
import { CircleCheck, Circle } from "lucide-react";

export const QuoteSummarySection = memo(function QuoteSummarySection({
  quote,
}: {
  quote: QuoteForm;
}) {
  const nonce = useContext(NonceContext);

  const summaryData = useMemo(() => {
    // Calculate total development time (in hours)
    const staticPageHours =
      quote.staticPages.selectedPages * developmentTimeEstimates.staticPage;
    const dynamicPageHours =
      quote.dynamicPages.selectedPages * developmentTimeEstimates.dynamicPage;

    const authHours = quote.authentication.reduce((acc, auth) => {
      const time =
        developmentTimeEstimates.authMethod[
          auth.method as keyof typeof developmentTimeEstimates.authMethod
        ] || 0;
      return acc + time;
    }, 0);

    const apiHours = quote.thirdPartyAPIs.reduce((acc, api) => {
      const time =
        developmentTimeEstimates.apiIntegration[
          api.apiName as keyof typeof developmentTimeEstimates.apiIntegration
        ] || 0;
      return acc + time;
    }, 0);

    const addonHours = quote.addons.reduce((acc, addon) => {
      const time =
        developmentTimeEstimates.addon[
          addon.addonName as keyof typeof developmentTimeEstimates.addon
        ] || 0;
      return acc + time;
    }, 0);

    const automationHours = quote.automations.reduce((acc, automation) => {
      const time =
        developmentTimeEstimates.automation[
          automation.automationType as keyof typeof developmentTimeEstimates.automation
        ] || 0;
      return acc + time;
    }, 0);

    const legalPagesHours =
      quote.legalPages.length * developmentTimeEstimates.legalPage;

    const totalHours =
      staticPageHours +
      dynamicPageHours +
      authHours +
      apiHours +
      addonHours +
      automationHours +
      legalPagesHours;

    // Calculate category prices
    const staticPagePrice = staticPageHours * hourlyRate;
    const dynamicPagePrice = dynamicPageHours * hourlyRate;

    const authPrice = authHours * hourlyRate;
    const apiPrice = apiHours * hourlyRate;
    const addonPrice = addonHours * hourlyRate;
    const automationPrice = automationHours * hourlyRate;
    const legalPagesPrice = legalPagesHours * hourlyRate;
    // Maintenance price is calculated differently
    const maintenancePrice =
      {
        Monthly:
          (quote.maintenancePlan.prioritySupport ? 150 : 100) *
          quote.maintenancePlan.duration,
        Yearly:
          (quote.maintenancePlan.prioritySupport ? 1500 : 1000) *
          quote.maintenancePlan.duration,
      }[quote.maintenancePlan.type] || 0;

    // Apply buffer percentage to total price
    const totalPrice =
      (staticPagePrice +
        dynamicPagePrice +
        authPrice +
        apiPrice +
        addonPrice +
        automationPrice +
        legalPagesPrice) *
        (1 + bufferPercentage) +
      maintenancePrice;

    return {
      totalHours,
      totalPrice,
      categories: [
        {
          name: "Static Pages",
          items: [`${quote.staticPages.selectedPages} pages`],
          price: staticPagePrice * (1 + bufferPercentage),
        },
        {
          name: "Dynamic Pages",
          items: [`${quote.dynamicPages.selectedPages} pages`],
          price: dynamicPagePrice * (1 + bufferPercentage),
        },
        {
          name: "Authentication",
          items: quote.authentication.map((auth) => {
            const authMethod = authenticationMethods.find(
              (method) => method.method === auth.method
            );
            return authMethod ? authMethod.label : auth.method;
          }),
          price: authPrice * (1 + bufferPercentage),
        },
        {
          name: "API Integrations",
          items: quote.thirdPartyAPIs.map((api) => {
            const apiIntegration = apiIntegrations.find(
              (integration) => integration.name === api.apiName
            );
            return apiIntegration ? apiIntegration.label : api.apiName;
          }),
          price: apiPrice * (1 + bufferPercentage),
        },
        {
          name: "Addons",
          items: quote.addons.map((addon) => {
            const addonItem = addons.find(
              (item) => item.name === addon.addonName
            );
            return addonItem ? addonItem.label : addon.addonName;
          }),
          price: addonPrice * (1 + bufferPercentage),
        },
        {
          name: "Automations",
          items: quote.automations.map((automation) => {
            const automationItem = automationsList.find(
              (item) => item.name === automation.automationType
            );
            return automationItem
              ? automationItem.label
              : automation.automationType;
          }),
          price: automationPrice * (1 + bufferPercentage),
        },
        {
          name: "Legal Pages",
          items: quote.legalPages.map((page) => {
            const legalPage = legalPagesList.find(
              (item) => item.name === page.name
            );
            return legalPage ? legalPage.label : page.name;
          }),
          price: legalPagesPrice * (1 + bufferPercentage),
        },
        {
          name: "Maintenance Plan",
          items:
            quote.maintenancePlan.type !== "none"
              ? [
                  `${quote.maintenancePlan.type} - ${quote.maintenancePlan.duration} ${
                    quote.maintenancePlan.type === "Monthly"
                      ? "months"
                      : "years"
                  }`,
                ]
              : [],
          price: maintenancePrice,
        },
      ],
    };
  }, [quote]);

  return (
    <CardSection
      header="Summary"
      body={
        <div
          nonce={nonce}
          className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              Total Estimated Development Time
            </h3>
            <span className="text-lg">
              {summaryData.totalHours.toFixed(2)} hours
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {summaryData.categories.map((category) => {
              if (category.items.length === 0) return null;
              return (
                <div
                  key={category.name}
                  nonce={nonce}
                  className="bg-purple-200 dark:bg-purple-950 rounded-lg shadow-md p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-foreground">
                      {category.name}
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {category.items.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm flex items-center">
                          <CircleCheck className="text-green-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <span className="font-semibold text-foreground">
                      Category Price:
                    </span>{" "}
                    <span className="text-green-600">
                      ${category.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end items-center mt-4">
            <span className="font-bold text-xl text-foreground">
              Total Estimated Price:
            </span>{" "}
            <span className="text-2xl text-green-600 ml-2">
              ${summaryData.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      }
    />
  );
});
