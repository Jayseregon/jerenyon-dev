"use client";
import { useState, useEffect, useContext } from "react";
import cuid from "cuid";
import { useRouter } from "next/navigation";

// import { useTranslations } from "next-intl";

import { NonceContext } from "@/src/app/providers";
import { QuoteForm } from "@/src/interfaces/Quote";

import { BaseStructureSection } from "./Quote-BaseStructureSection";
import { AuthPermsSection } from "./Quote-AuthPermsSection";
import { IntegrationNoOptionSection } from "./Quote-IntegrationNoOptionSection";
import { IntegrationWithOptionSection } from "./Quote-IntegrationWithOptionSection";
import { MaintenanceSection } from "./Quote-MaintenanceSection";
import { QuoteSummarySection } from "./Quote-SummarySection";
import { ClientSubmit } from "./Quote-ClientSubmit";
import {
  authenticationMethods,
  apiIntegrations,
  addons,
  automationsList,
  legalPagesList,
  hourlyRate,
  bufferPercentage,
  developmentTimeEstimates,
} from "./getQuoteData";

export default function QuotingTool() {
  const router = useRouter();
  // const t = useTranslations("estimate");
  const nonce = useContext(NonceContext);
  const [quote, setQuote] = useState<QuoteForm>({
    clientName: "",
    clientEmail: "",
    comment: "",
    totalPrice: 0,
    staticPages: { selectedPages: 3, totalPrice: 0 },
    dynamicPages: { selectedPages: 0, totalPrice: 0 },
    authentication: [],
    legalPages: [],
    maintenancePlan: {
      type: "Monthly",
      duration: 3,
      regularUpdates: true,
      securityUpdates: true,
      minorBugFixes: true,
      featureEnhancement: false,
      prioritySupport: false,
    },
    websiteType: { type: "", price: 0 },
    customFeatures: [],
    automations: [],
    thirdPartyAPIs: [],
    addons: [],
  });

  const [_sessionId, setSessionId] = useState<string | null>(null);
  const [customApiName, setCustomApiName] = useState<string>("");
  const [customAddonName, setCustomAddonName] = useState<string>("");
  const [customAutomation, setCustomAutomation] = useState<string>("");

  // Save draft in sessionStorage and automatically remove if user leaves the page
  useEffect(() => {
    const sessionIdFromStorage = sessionStorage.getItem("quote-session-id");

    if (!sessionIdFromStorage) {
      const newSessionId = cuid();

      sessionStorage.setItem("quote-session-id", newSessionId);
      setSessionId(newSessionId);
    } else {
      setSessionId(sessionIdFromStorage);
    }

    const handleBeforeUnload = () => {
      sessionStorage.removeItem("quote-session-id");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Update the form fields as needed
  const handleInputChange = (field: keyof QuoteForm, value: any) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log(quote);
  }, [quote]);

  // Calculate the total price based on selected services, pages, and options
  useEffect(() => {
    const staticPagePrice =
      quote.staticPages.selectedPages *
      developmentTimeEstimates.staticPage *
      hourlyRate;

    const dynamicPagePrice =
      quote.dynamicPages.selectedPages *
      developmentTimeEstimates.dynamicPage *
      hourlyRate;

    const authPrice = quote.authentication.reduce((acc, auth) => {
      const authTime =
        developmentTimeEstimates.authMethod[
          auth.method as keyof typeof developmentTimeEstimates.authMethod
        ] || 0;

      return acc + authTime * hourlyRate;
    }, 0);

    const apiPrice = quote.thirdPartyAPIs.reduce((acc, api) => {
      const apiTime =
        developmentTimeEstimates.apiIntegration[
          api.apiName as keyof typeof developmentTimeEstimates.apiIntegration
        ] || 0;

      return acc + apiTime * hourlyRate;
    }, 0);

    const addonPrice = quote.addons.reduce((acc, addon) => {
      const addonTime =
        developmentTimeEstimates.addon[
          addon.addonName as keyof typeof developmentTimeEstimates.addon
        ] || 0;

      return acc + addonTime * hourlyRate;
    }, 0);

    const automationPrice = quote.automations.reduce((acc, automation) => {
      const automationTime =
        developmentTimeEstimates.automation[
          automation.automationType as keyof typeof developmentTimeEstimates.automation
        ] || 0;

      return acc + automationTime * hourlyRate;
    }, 0);

    const legalPagesPrice =
      quote.legalPages.length * developmentTimeEstimates.legalPage * hourlyRate;

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

    setQuote((prevQuote) => ({
      ...prevQuote,
      totalPrice: totalPrice,
    }));
  }, [
    quote.staticPages,
    quote.dynamicPages,
    quote.authentication,
    quote.thirdPartyAPIs,
    quote.addons,
    quote.automations,
    quote.legalPages,
    quote.maintenancePlan,
  ]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/submit-quote", {
        method: "POST",
        body: JSON.stringify(quote),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Redirect to a confirmation page or show success message
        router.push("/quote-success");
      }
    } catch (error) {
      console.error("Failed to submit quote:", error);
    }
  };

  // Authentication methods
  const handleAuthenticationChange = (
    method: string,
    price: number,
    checked: boolean,
  ) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      authentication: checked
        ? [...prevQuote.authentication, { method, price }]
        : prevQuote.authentication.filter((auth) => auth.method !== method),
    }));
  };

  // API integrations
  const handleApiIntegrationChange = (
    apiName: string,
    price: number,
    checked: boolean,
  ) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      thirdPartyAPIs: checked
        ? [...prevQuote.thirdPartyAPIs, { apiName, price }]
        : prevQuote.thirdPartyAPIs.filter((api) => api.apiName !== apiName),
    }));
  };

  // User input custom API
  const handleCustomApiIntegrationChange = () => {
    if (customApiName.trim() === "") return;

    setQuote((prevQuote) => ({
      ...prevQuote,
      thirdPartyAPIs: [
        ...prevQuote.thirdPartyAPIs,
        { apiName: customApiName, price: 200 },
      ],
    }));
    setCustomApiName("");
  };

  // Remove custom API
  const handleRemoveCustomApi = (apiName: string) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      thirdPartyAPIs: prevQuote.thirdPartyAPIs.filter(
        (api) => api.apiName !== apiName,
      ),
    }));
  };

  // Addons
  const handleAddonIntegrationChange = (
    addonName: string,
    price: number,
    checked: boolean,
  ) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      addons: checked
        ? [...prevQuote.addons, { addonName, price }]
        : prevQuote.addons.filter((addon) => addon.addonName !== addonName),
    }));
  };

  // User input custom addon
  const handleCustomAddonIntegrationChange = () => {
    if (customAddonName.trim() === "") return;

    setQuote((prevQuote) => ({
      ...prevQuote,
      addons: [...prevQuote.addons, { addonName: customAddonName, price: 200 }],
    }));
    setCustomAddonName("");
  };

  // Remove custom addon
  const handleRemoveCustomAddon = (addonName: string) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      addons: prevQuote.addons.filter((addon) => addon.addonName !== addonName),
    }));
  };

  // Automations
  const handleAutomationsChange = (
    automationType: string,
    price: number,
    checked: boolean,
  ) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      automations: checked
        ? [...prevQuote.automations, { automationType, price }]
        : prevQuote.automations.filter(
            (automation) => automation.automationType !== automationType,
          ),
    }));
  };

  // User input custom automation
  const handleCustomAutomationsChange = () => {
    if (customAutomation.trim() === "") return;

    setQuote((prevQuote) => ({
      ...prevQuote,
      automations: [
        ...prevQuote.automations,
        { automationType: customAutomation, price: 200 },
      ],
    }));
    setCustomAutomation("");
  };

  // Remove custom automation
  const handleRemoveCustomAutomation = (automationType: string) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      automations: prevQuote.automations.filter(
        (automation) => automation.automationType !== automationType,
      ),
    }));
  };

  // Legal pages
  const handleLegalPageChange = (
    name: string,
    price: number,
    checked: boolean,
  ) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      legalPages: checked
        ? [...prevQuote.legalPages, { name, price }]
        : prevQuote.legalPages.filter((page) => page.name !== name),
    }));
  };

  // Maintenance plan
  const handleTypeChange = (type: string) => {
    if (type === "none") {
      setQuote((prevQuote) => ({
        ...prevQuote,
        maintenancePlan: {
          type: "none",
          duration: 0,
          regularUpdates: false,
          securityUpdates: false,
          minorBugFixes: false,
          featureEnhancement: false,
          prioritySupport: false,
        },
      }));
    } else {
      setQuote((prevQuote) => ({
        ...prevQuote,
        maintenancePlan: {
          ...prevQuote.maintenancePlan,
          type,
          duration: 1, // Reset duration to default
          regularUpdates: true,
          securityUpdates: true,
          minorBugFixes: true,
          featureEnhancement: false,
          prioritySupport: false,
        },
      }));
    }
  };

  // Maintenance plan duration
  const handleDurationChange = (value: number | number[]) => {
    if (Array.isArray(value)) return;
    setQuote((prevQuote) => ({
      ...prevQuote,
      maintenancePlan: {
        ...prevQuote.maintenancePlan,
        duration: value,
      },
    }));
  };

  // Maintenance plan options
  const handlePlanOptionChange = (plan: string) => {
    const isAdvanced = plan === "advanced";

    setQuote((prevQuote) => ({
      ...prevQuote,
      maintenancePlan: {
        ...prevQuote.maintenancePlan,
        regularUpdates: true,
        securityUpdates: true,
        minorBugFixes: true,
        featureEnhancement: isAdvanced,
        prioritySupport: isAdvanced,
      },
    }));
  };

  return (
    <div className="p-4" nonce={nonce}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5" nonce={nonce}>
        {/* Base Settings */}
        <BaseStructureSection
          handleInputChange={handleInputChange}
          quote={quote}
        />

        {/* Authentication methods */}
        <AuthPermsSection
          authenticationMethods={authenticationMethods}
          handleAuthenticationChange={handleAuthenticationChange}
          quote={quote}
        />

        {/* Legal pages */}
        <IntegrationNoOptionSection
          customItems={quote.legalPages.map((page) => ({ name: page.name }))}
          handleIntegrationChange={handleLegalPageChange}
          header="Legal Pages"
          items={legalPagesList}
        />

        {/* API */}
        <IntegrationWithOptionSection
          customField="quotingTool.customAPI"
          customItems={quote.thirdPartyAPIs.map((api) => ({
            name: api.apiName,
          }))}
          customValue={customApiName}
          handleCustomIntegrationChange={handleCustomApiIntegrationChange}
          handleCustomValueChange={setCustomApiName}
          handleIntegrationChange={handleApiIntegrationChange}
          handleRemoveCustomIntegration={handleRemoveCustomApi}
          header="API Integrations"
          items={apiIntegrations}
        />

        {/* Addons */}
        <IntegrationWithOptionSection
          customField="quotingTool.customAddon"
          customItems={quote.addons.map((addon) => ({
            name: addon.addonName,
          }))}
          customValue={customAddonName}
          handleCustomIntegrationChange={handleCustomAddonIntegrationChange}
          handleCustomValueChange={setCustomAddonName}
          handleIntegrationChange={handleAddonIntegrationChange}
          handleRemoveCustomIntegration={handleRemoveCustomAddon}
          header="Addons"
          items={addons}
        />

        {/* Automations */}
        <IntegrationWithOptionSection
          customField="quotingTool.customAutomation"
          customItems={quote.automations.map((automation) => ({
            name: automation.automationType,
          }))}
          customValue={customAutomation}
          handleCustomIntegrationChange={handleCustomAutomationsChange}
          handleCustomValueChange={setCustomAutomation}
          handleIntegrationChange={handleAutomationsChange}
          handleRemoveCustomIntegration={handleRemoveCustomAutomation}
          header="Automations"
          items={automationsList}
        />

        {/* Maintenance Plan */}
        <MaintenanceSection
          handleDurationChange={handleDurationChange}
          handlePlanOptionChange={handlePlanOptionChange}
          handleTypeChange={handleTypeChange}
          quote={quote}
        />

        <div
          className="mb-8 mt-5 w-full col-span-1 md:col-span-2 space-y-5"
          nonce={nonce}
        >
          <QuoteSummarySection quote={quote} />

          <ClientSubmit
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            quote={quote}
          />
        </div>
      </div>
    </div>
  );
}
