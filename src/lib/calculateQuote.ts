import { QuoteForm } from "@/interfaces/Quote";

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

export function calculateQuoteSummary(quote: QuoteForm) {
  // Calculate total development time (in hours)
  const staticPageHours =
    quote.staticPages.selectedPages * developmentTimeEstimates.staticPage;
  const dynamicPageHours =
    quote.dynamicPages.selectedPages * developmentTimeEstimates.dynamicPage;

  const authHours = quote.authentication.reduce((acc, auth) => {
    const time =
      developmentTimeEstimates.authMethod[
        auth.name as keyof typeof developmentTimeEstimates.authMethod
      ] || 3;

    return acc + time;
  }, 0);

  const apiHours = quote.thirdPartyAPIs.reduce((acc, api) => {
    const time =
      developmentTimeEstimates.apiIntegration[
        api.apiName as keyof typeof developmentTimeEstimates.apiIntegration
      ] || 3;

    return acc + time;
  }, 0);

  const addonHours = quote.addons.reduce((acc, addon) => {
    const time =
      developmentTimeEstimates.addon[
        addon.addonName as keyof typeof developmentTimeEstimates.addon
      ] || 3;

    return acc + time;
  }, 0);

  const automationHours = quote.automations.reduce((acc, automation) => {
    const time =
      developmentTimeEstimates.automation[
        automation.automationType as keyof typeof developmentTimeEstimates.automation
      ] || 3;

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

  // Calculate category prices with unit price + (time * hourlyRate)
  const staticPagePrice =
    quote.staticPages.selectedPages *
    developmentTimeEstimates.staticPage *
    hourlyRate;

  const dynamicPagePrice =
    quote.dynamicPages.selectedPages *
    developmentTimeEstimates.dynamicPage *
    hourlyRate;

  const authPrice = quote.authentication.reduce((acc, auth) => {
    return acc + auth.price + authHours * hourlyRate;
  }, 0);

  const apiPrice = quote.thirdPartyAPIs.reduce((acc, api) => {
    return acc + api.price + apiHours * hourlyRate;
  }, 0);

  const addonPrice = quote.addons.reduce((acc, addon) => {
    return acc + addon.price + addonHours * hourlyRate;
  }, 0);

  const automationPrice = quote.automations.reduce((acc, automation) => {
    return acc + automation.price + automationHours * hourlyRate;
  }, 0);

  const legalPagesPrice = quote.legalPages.reduce((acc, page) => {
    return acc + page.price + legalPagesHours * hourlyRate;
  }, 0);

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

  const totalDevelopmentTime =
    staticPagePrice +
    dynamicPagePrice +
    authPrice +
    apiPrice +
    addonPrice +
    automationPrice +
    legalPagesPrice;

  const subTotalPrice = totalDevelopmentTime * (1 + bufferPercentage);
  const totalPrice = subTotalPrice + maintenancePrice;

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
            (method) => method.name === auth.name,
          );

          return authMethod ? authMethod.label : auth.name;
        }),
        price: authPrice * (1 + bufferPercentage),
      },
      {
        name: "API Integrations",
        items: quote.thirdPartyAPIs.map((api) => {
          const apiIntegration = apiIntegrations.find(
            (integration) => integration.name === api.apiName,
          );

          return apiIntegration ? apiIntegration.label : api.apiName;
        }),
        price: apiPrice * (1 + bufferPercentage),
      },
      {
        name: "Addons",
        items: quote.addons.map((addon) => {
          const addonItem = addons.find(
            (item) => item.name === addon.addonName,
          );

          return addonItem ? addonItem.label : addon.addonName;
        }),
        price: addonPrice * (1 + bufferPercentage),
      },
      {
        name: "Automations",
        items: quote.automations.map((automation) => {
          const automationItem = automationsList.find(
            (item) => item.name === automation.automationType,
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
            (item) => item.name === page.name,
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
                  quote.maintenancePlan.type === "Monthly" ? "months" : "years"
                }`,
              ]
            : [],
        price: maintenancePrice,
      },
    ],
  };
}
