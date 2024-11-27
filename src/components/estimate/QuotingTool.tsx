"use client";
import { useState, useEffect, useContext } from "react";
import cuid from "cuid";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { QuoteForm, QuoteFormSchema } from "@/src/interfaces/Quote";
import { NonceContext } from "@/src/app/providers";
import {
  authenticationMethods,
  apiIntegrations,
  addons,
  automationsList,
  legalPagesList,
  preconfigWebApps,
} from "@/lib/getQuoteData";
import { calculateQuoteSummary } from "@/lib/calculateQuote";

import { BaseStructureSection } from "./Quote-BaseStructureSection";
import { AuthPermsSection } from "./Quote-AuthPermsSection";
import { IntegrationNoOptionSection } from "./Quote-IntegrationNoOptionSection";
import { IntegrationWithOptionSection } from "./Quote-IntegrationWithOptionSection";
import { MaintenanceSection } from "./Quote-MaintenanceSection";
import { QuoteSummarySection } from "./Quote-SummarySection";
import { ClientSubmit } from "./Quote-ClientSubmit";
import { PreconfigSection } from "./Quote-PreconfigSection";
import { ErrorDisplay, SuccessDisplay } from "./OnSubmitQuoteDisplay";

export default function QuotingTool() {
  const t = useTranslations("estimate");
  const nonce = useContext(NonceContext);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [response, setResponse] = useState<{
    error?: string;
    success?: boolean;
  } | null>(null);
  const [quote, setQuote] = useState<QuoteForm>(
    preconfigWebApps.BasicWebsite.schema,
  );
  const [_sessionId, setSessionId] = useState<string | null>(null);
  const [customApiName, setCustomApiName] = useState<string>("");
  const [customAddonName, setCustomAddonName] = useState<string>("");
  const [customAutomation, setCustomAutomation] = useState<string>("");
  const [selectedPreconfig, setSelectedPreconfig] =
    useState<string>("BasicWebsite");

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

  // Calculate the total price based on selected services, pages, and options
  useEffect(() => {
    const summary = calculateQuoteSummary(quote);

    setQuote((prevQuote) => ({
      ...prevQuote,
      totalPrice: summary.totalPrice,
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
      // Validate the quote data using Zod
      QuoteFormSchema.parse(quote);
      console.log("Quote data is valid:", quote);

      const response = await fetch("/api/quote/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...quote,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(error.message || "Failed to submit quote");
      }

      const res = await response.json();

      console.log("Response: ", res);

      setResponse(res);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setResponse({ error: "Validation error" });
        console.error("Validation errors:", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  // Authentication methods
  const handleAuthenticationChange = (
    name: string,
    price: number,
    checked: boolean,
  ) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      authentication: checked
        ? [...prevQuote.authentication, { name, price }]
        : prevQuote.authentication.filter((auth) => auth.name !== name),
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

  // Handler to update the quote based on selected preconfig
  const handlePreconfigChange = (preconfigKey: string) => {
    setSelectedPreconfig(preconfigKey);
    setQuote(preconfigWebApps[preconfigKey].schema);
  };

  if (response) {
    return (
      <div className="mt-4">
        {response.error ? <ErrorDisplay t={t} /> : <SuccessDisplay t={t} />}
      </div>
    );
  } else {
    return (
      <div className="p-4" nonce={nonce}>
        <div
          className="mt-5 w-full col-span-1 md:col-span-2 space-y-5"
          nonce={nonce}
        >
          {/* Preconfiguration Selection */}
          <PreconfigSection
            selectedPreconfig={selectedPreconfig}
            onPreconfigChange={handlePreconfigChange}
          />
        </div>

        <h3 className="text-xl my-10 text-purple-800/70 dark:text-purple-300/70 max-w-3xl mx-auto p-5">
          <p>{t("accordion.description1")}</p>
          <p>{t("accordion.description2")}</p>
        </h3>

        <Accordion
          className="rounded-lg shadow-xl border border-purple-800 dark:border-purple-300"
          variant="light"
        >
          <AccordionItem
            key="1"
            aria-label={t("accordion.title")}
            classNames={{
              title: "text-2xl font-semibold",
            }}
            title={t("accordion.title")}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              nonce={nonce}
            >
              <div
                className="mt-5 w-full col-span-1 md:col-span-2 space-y-5"
                nonce={nonce}
              >
                {/* Base Settings */}
                <BaseStructureSection
                  handleInputChange={handleInputChange}
                  quote={quote}
                />
              </div>
              {/* Authentication methods */}
              <AuthPermsSection
                authenticationMethods={authenticationMethods}
                handleAuthenticationChange={handleAuthenticationChange}
                quote={quote}
              />

              {/* Legal pages */}
              <IntegrationNoOptionSection
                customItems={quote.legalPages.map((page) => ({
                  name: page.name,
                }))}
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
                handleCustomIntegrationChange={
                  handleCustomAddonIntegrationChange
                }
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
            </div>
          </AccordionItem>
        </Accordion>

        <h3 className="text-xl my-10 text-purple-800/70 dark:text-purple-300/70 max-w-3xl mx-auto p-5">
          <p>{t("summary.description1")}</p>
          <p>{t("summary.description2")}</p>
        </h3>

        <div
          className="mb-8 mt-5 w-full col-span-1 md:col-span-2 space-y-5"
          nonce={nonce}
        >
          <QuoteSummarySection quote={quote} />

          <h3 className="text-xl my-10 text-purple-800/70 dark:text-purple-300/70 max-w-3xl mx-auto p-5">
            <p>{t("quotingTool.description1")}</p>
            <p>{t("quotingTool.description2")}</p>
          </h3>

          <ClientSubmit
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            quote={quote}
            recaptchaToken={recaptchaToken}
            setRecaptchaToken={setRecaptchaToken}
          />
        </div>
      </div>
    );
  }
}
