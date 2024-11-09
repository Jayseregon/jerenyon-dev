"use client";
import { useState, useEffect, useContext } from "react";
import cuid from "cuid";
import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
import { Button, Card, CardBody } from "@nextui-org/react";

import { NonceContext } from "@/src/app/providers";
import { QuoteForm } from "@/src/interfaces/Quote";

import { ClientInfoSection } from "./Quote-ClientInfoSection";
import { BaseStructureSection } from "./Quote-BaseStructureSection";
import { AuthPermsSection } from "./Quote-AuthPermsSection";
import { IntegrationNoOptionSection } from "./Quote-IntegrationNoOptionSection";
import { IntegrationWithOptionSection } from "./Quote-IntegrationWithOptionSection";
import { MaintenanceSection } from "./Quote-MaintenanceSection";

export default function QuotingTool() {
  const router = useRouter();
  // const t = useTranslations("estimate");
  const nonce = useContext(NonceContext);
  const [quote, setQuote] = useState<QuoteForm>({
    clientName: "",
    clientEmail: "",
    comment: "",
    totalPrice: 0,
    services: [],
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

  // Calculate the total price based on selected services, pages, and options
  useEffect(() => {
    const servicePrices = quote.services.reduce(
      (acc, service) => acc + service.price,
      0,
    );
    const staticPagePrice = quote.staticPages.selectedPages * 100;
    const dynamicPagePrice = quote.dynamicPages.selectedPages * 150;
    const authPrice = quote.authentication.reduce(
      (acc, auth) => acc + auth.price,
      0,
    );
    const apiPrice = quote.thirdPartyAPIs.reduce(
      (acc, api) => acc + api.price,
      0,
    );
    const addonPrice = quote.addons.reduce(
      (acc, addon) => acc + addon.price,
      0,
    );
    const automationPrice = quote.automations.reduce(
      (acc, automation) => acc + automation.price,
      0,
    );
    const legalPagesPrice = quote.legalPages.reduce(
      (acc, page) => acc + page.price,
      0,
    );
    const maintenancePrice =
      {
        Monthly:
          (quote.maintenancePlan.prioritySupport ? 150 : 100) *
          quote.maintenancePlan.duration,
        Yearly:
          (quote.maintenancePlan.prioritySupport ? 1500 : 1000) *
          quote.maintenancePlan.duration,
      }[quote.maintenancePlan.type] || 0;

    setQuote((prevQuote) => ({
      ...prevQuote,
      totalPrice:
        servicePrices +
        staticPagePrice +
        dynamicPagePrice +
        authPrice +
        apiPrice +
        maintenancePrice +
        addonPrice +
        automationPrice +
        legalPagesPrice,
    }));
  }, [
    quote.services,
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
  const authenticationMethods = [
    {
      method: "Credentials",
      price: 100,
      label: "Classic Email-based Credentials",
    },
    {
      method: "SocialOAuth",
      price: 100,
      label: "Social & OAuth",
      subLabel: "(e.g., Google, GitHub, Facebook)",
    },
    {
      method: "Magic",
      price: 100,
      label: "Magic Links",
      subLabel: "(Email-based login links)",
    },
    {
      method: "SSO",
      price: 100,
      label: "Single Sign-On Integration",
      subLabel: "(e.g., SAML, OpenID Connect)",
    },
    {
      method: "JWT",
      price: 100,
      label: "JWT Token-based Authentication",
    },
  ];

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
  const apiIntegrations = [
    { name: "Stripe", price: 250, label: "Stripe Payment Gateway Integration" },
    { name: "Paypal", price: 200, label: "PayPal Payment Processing" },
    { name: "Clover", price: 200, label: "Clover Point-of-Sale Integration" },
    { name: "Resend", price: 150, label: "Resend Email Automation API" },
    { name: "SendGrid", price: 150, label: "SendGrid Email API" },
    { name: "Twilio", price: 200, label: "Twilio Messaging & Voice" },
    { name: "AWS", price: 300, label: "Amazon Web Services Integration" },
    { name: "Azure", price: 300, label: "Microsoft Azure Cloud Services" },
    { name: "Bunny", price: 150, label: "Bunny.net CDN and Storage" },
    { name: "ArcGIS", price: 300, label: "ArcGIS API for Python" },
    { name: "GoogleMaps", price: 150, label: "Google Maps API" },
  ];

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

  const handleRemoveCustomApi = (apiName: string) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      thirdPartyAPIs: prevQuote.thirdPartyAPIs.filter(
        (api) => api.apiName !== apiName,
      ),
    }));
  };

  // Addons
  const addons = [
    { name: "SEO", price: 350, label: "SEO Optimization & Strategy" },
    {
      name: "MultiLanguage",
      price: 500,
      label: "Multi-Language Support",
      subLabel: "(i.e., FR/EN only)",
    },
    {
      name: "Analytics",
      price: 250,
      label: "Analytics & Reporting Integration",
      subLabel: "(e.g., Google, Vercel)",
    },
    {
      name: "CMS",
      price: 450,
      label: "Content Management System Setup",
      subLabel: "(e.g., Sanity, Strapi)",
    },
    {
      name: "Security",
      price: 300,
      label: "Enhanced Security Features",
      subLabel: "(e.g., SSL, CSP, reCAPTCHA)",
    },
    // {
    //   name: "Accessibility",
    //   price: 200,
    //   label: "Accessibility Compliance (WCAG Standards)",
    // },
    { name: "Backup", price: 150, label: "Automated Backup Solutions" },
    {
      name: "Performance",
      price: 250,
      label: "Performance Optimization",
      subLabel: "(e.g., Micro-Frontend, Lazy Loading)",
    },
    {
      name: "CDN",
      price: 150,
      label: "CDN Integration",
      subLabel: "(e.g., Bunny.net, Cloudflare)",
    },
    {
      name: "CustomUI",
      price: 300,
      label: "Customizable UI Components",
    },
    {
      name: "DomainSetup",
      price: 100,
      label: "Custom Domain Setup & Configuration",
    },
    {
      name: "Training",
      price: 350,
      label: "User Training & Documentation",
    },
    {
      name: "SocialMedia",
      price: 120,
      label: "Social Media Integration",
      subLabel: "(e.g., Facebook, Twitter, Pinterest)",
    },
  ];

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

  const handleCustomAddonIntegrationChange = () => {
    if (customAddonName.trim() === "") return;

    setQuote((prevQuote) => ({
      ...prevQuote,
      addons: [...prevQuote.addons, { addonName: customAddonName, price: 200 }],
    }));
    setCustomAddonName("");
  };

  const handleRemoveCustomAddon = (addonName: string) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      addons: prevQuote.addons.filter((addon) => addon.addonName !== addonName),
    }));
  };

  // Automations
  const automationsList = [
    {
      name: "AIIntegration",
      price: 2000,
      label: "AI Integration",
      subLabel: "(e.g., OpenAI, Google, Anthropic)",
    },
    {
      name: "RetrievalSystems",
      price: 2500,
      label: "Intelligent Retrieval Systems",
      subLabel: "(e.g., RAG chatbots)",
    },
    {
      name: "MultiAgentSystems",
      price: 3000,
      label: "Multi AI Agent Systems",
      subLabel: "(e.g., CrewAI, Langchain processes)",
    },
    {
      name: "InteractiveMaps",
      price: 1500,
      label: "Interactive Mapping Tools",
      subLabel: "(e.g., Leaflet-based web apps)",
    },
    {
      name: "GeoDataWrangling",
      price: 1500,
      label: "Geospatial Data Wrangling & Analysis",
      subLabel: "(e.g., GeoPandas, Shapely, NetworkX)",
    },
    {
      name: "CustomGISolutions",
      price: 1500,
      label: "Tailored GIS Solutions",
      subLabel: "(e.g., QGIS, ArcGIS Pro, Python scripts)",
    },
    {
      name: "GeoWorkflows",
      price: 1500,
      label: "Automated Geospatial Workflows",
      subLabel: "(e.g., Data pipelines)",
    },
    {
      name: "WorkflowAutomation",
      price: 1500,
      label: "Custom Workflow Automation",
      subLabel: "(e.g., Data sync, reports, task automation)",
    },
  ];

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

  const handleRemoveCustomAutomation = (automationType: string) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      automations: prevQuote.automations.filter(
        (automation) => automation.automationType !== automationType,
      ),
    }));
  };

  // Legal pages
  const legalPagesList = [
    {
      name: "terms",
      price: 50,
      label: "Terms and Conditions",
      sup: "*",
    },
    {
      name: "privacy",
      price: 50,
      label: "Privacy Policy",
      sup: "*",
    },
    {
      name: "cookie",
      price: 50,
      label: "Cookie Policy",
      subLabel: "GDPR Compliant",
      sup: "*",
    },
    {
      name: "cookieConsent",
      price: 50,
      label: "Cookie Consent Banner",
      sup: "*",
    },
  ];

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
        {/* Client information for submit */}
        <ClientInfoSection
          handleInputChange={handleInputChange}
          quote={quote}
        />

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

        <Card
          className="bg-background rounded-lg shadow-xl border border-purple-800 dark:border-purple-300 mb-8 mt-5 w-full col-span-1 md:col-span-2"
          nonce={nonce}
        >
          <CardBody nonce={nonce}>
            <Button
              fullWidth
              aria-label="Submit Quote"
              color="primary"
              nonce={nonce}
              variant="flat"
              onClick={handleSubmit}
            >
              Submit Quote
            </Button>
            <h2 className="text-xl font-semibold mt-4" nonce={nonce}>
              Estimated Price: ${quote.totalPrice.toFixed(2)}
            </h2>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
