import { PreconfigWebApp } from "@/src/interfaces/Quote";

/**
 * In North America or Western Europe, hourly rates for freelance web developers generally range between $50–$150/hour,
 * depending on experience and specialization.
 * For your skills (Full-stack, Python, GIS, AI/ML, Next.js), a rate between $75–$125/hour
 * would be more aligned with the market.
 */
export const hourlyRate = 70;

// 20% buffer for overhead
export const bufferPercentage = 0.2;

// Define development time and complexity factors for each type of service
export const complexityMultipliers = {
  low: 1,
  medium: 1.5,
  high: 2,
};

// in hours
export const developmentTimeEstimates = {
  staticPage: 2,
  dynamicPage: 4,
  authMethod: {
    Credentials: 3,
    SocialOAuth: 4,
    Magic: 4,
    SSO: 5,
    JWT: 4,
  },
  apiIntegration: {
    Stripe: 3,
    Paypal: 3,
    Clover: 3,
    Resend: 3,
    SendGrid: 3,
    Twilio: 3,
    AWS: 5,
    Azure: 5,
    Bunny: 3,
    ArcGIS: 5,
    GoogleMaps: 3,
  },
  addon: {
    SEO: 5,
    MultiLanguage: 5,
    Analytics: 5,
    CMS: 6,
    Security: 6,
    Performance: 5,
    CDN: 3,
    CustomUI: 8,
    DomainSetup: 2,
    Training: 5,
    SocialMedia: 3,
  },
  automation: {
    AIIntegration: 13,
    RetrievalSystems: 16,
    MultiAgentSystems: 16,
    InteractiveMaps: 10,
    GeoDataWrangling: 13,
    CustomGISolutions: 16,
    GeoWorkflows: 10,
    WorkflowAutomation: 16,
  },
  legalPage: 1,
};

export const authenticationMethods = [
  {
    name: "Credentials",
    price: 50,
    label: "Classic Email-based Credentials",
  },
  {
    name: "SocialOAuth",
    price: 50,
    label: "Social & OAuth",
    subLabel: "(e.g., Google, GitHub, Facebook)",
  },
  {
    name: "Magic",
    price: 50,
    label: "Magic Links",
    subLabel: "(Email-based login links)",
  },
  {
    name: "SSO",
    price: 50,
    label: "Single Sign-On Integration",
    subLabel: "(e.g., SAML, OpenID Connect)",
  },
  {
    name: "JWT",
    price: 50,
    label: "JWT Token-based Authentication",
  },
];

export const apiIntegrations = [
  {
    name: "Stripe",
    price: 100,
    label: "Stripe Payment Gateway Integration",
    subLabel: "(e.g., Apple Pay, Google Pay)",
  },
  {
    name: "Paypal",
    price: 100,
    label: "PayPal Payment Processing",
    subLabel: "(e.g., PayPal Checkout, PayPal Credit)",
  },
  {
    name: "Clover",
    price: 100,
    label: "Clover Point-of-Sale Integration",
    subLabel: "(e.g., Retail POS Systems)",
  },
  {
    name: "Resend",
    price: 100,
    label: "Resend Email Automation API",
    subLabel: "(e.g., Transactional Emails)",
  },
  {
    name: "SendGrid",
    price: 100,
    label: "SendGrid Email API",
    subLabel: "(e.g., Email Marketing)",
  },
  {
    name: "Twilio",
    price: 100,
    label: "Twilio Messaging & Voice",
    subLabel: "(e.g., SMS & Voice Calls)",
  },
  {
    name: "GoogleMaps",
    price: 50,
    label: "Google Maps API",
    subLabel: "(e.g., Location Services)",
  },
  {
    name: "AWS",
    price: 150,
    label: "Amazon Web Services Integration",
    subLabel: "(e.g., Cloud Computing)",
  },
  {
    name: "Azure",
    price: 150,
    label: "Azure Cloud Services",
    subLabel: "(e.g., Cloud Storage)",
  },
  {
    name: "Bunny",
    price: 100,
    label: "Bunny.net CDN and Storage",
    subLabel: "(e.g., Content Delivery Network)",
  },
  {
    name: "ArcGIS",
    price: 150,
    label: "ArcGIS API for Python",
    subLabel: "(e.g., Geospatial Analysis)",
  },
];

export const addons = [
  { name: "SEO", price: 150, label: "SEO Optimization & Strategy" },
  {
    name: "MultiLanguage",
    price: 100,
    label: "Multi-Language Support",
    subLabel: "(i.e., FR/EN only)",
  },
  {
    name: "Analytics",
    price: 100,
    label: "Analytics & Reporting Integration",
    subLabel: "(e.g., Google, Vercel)",
  },
  {
    name: "CMS",
    price: 150,
    label: "Content Management System Setup",
    subLabel: "(e.g., Sanity, Strapi)",
  },
  {
    name: "Security",
    price: 100,
    label: "Enhanced Security Features",
    subLabel: "(e.g., SSL, CSP, reCAPTCHA)",
  },
  {
    name: "Performance",
    price: 150,
    label: "Performance Optimization",
    subLabel: "(e.g., Code Splitting, Lazy Loading)",
  },
  {
    name: "CDN",
    price: 100,
    label: "CDN Integration",
    subLabel: "(e.g., Bunny.net, Cloudflare)",
  },
  {
    name: "CustomUI",
    price: 100,
    label: "Customizable UI Components",
  },
  {
    name: "DomainSetup",
    price: 50,
    label: "Custom Domain Setup & Configuration",
  },
  {
    name: "Training",
    price: 100,
    label: "User Training & Documentation",
  },
  {
    name: "SocialMedia",
    price: 50,
    label: "Social Media Integration",
    subLabel: "(e.g., Facebook, Twitter, Pinterest)",
  },
];

export const automationsList = [
  {
    name: "AIIntegration",
    price: 1000,
    label: "AI Integration",
    subLabel: "(e.g., OpenAI, Google, Anthropic)",
  },
  {
    name: "RetrievalSystems",
    price: 1300,
    label: "Intelligent Retrieval Systems",
    subLabel: "(e.g., RAG chatbots)",
  },
  {
    name: "MultiAgentSystems",
    price: 1300,
    label: "Multi AI Agent Systems",
    subLabel: "(e.g., CrewAI, Langchain processes)",
  },
  {
    name: "InteractiveMaps",
    price: 1000,
    label: "Interactive Mapping Tools",
    subLabel: "(e.g., Leaflet-based web apps)",
  },
  {
    name: "GeoDataWrangling",
    price: 1000,
    label: "Geospatial Data Wrangling & Analysis",
    subLabel: "(e.g., GeoPandas, Shapely, NetworkX)",
  },
  {
    name: "CustomGISolutions",
    price: 1300,
    label: "Tailored GIS Solutions",
    subLabel: "(e.g., QGIS, ArcGIS Pro, Python scripts)",
  },
  {
    name: "GeoWorkflows",
    price: 1000,
    label: "Automated Geospatial Workflows",
    subLabel: "(e.g., Data pipelines)",
  },
  {
    name: "WorkflowAutomation",
    price: 1300,
    label: "Custom Workflow Automation",
    subLabel: "(e.g., Data sync, reports, task automation)",
  },
];

export const legalPagesList = [
  {
    name: "terms",
    price: 25,
    label: "Terms and Conditions",
    subLabel: "(e.g., User Agreement)",
    sup: "*",
  },
  {
    name: "privacy",
    price: 25,
    label: "Privacy Policy",
    subLabel: "(e.g., Data Collection Practices)",
    sup: "*",
  },
  {
    name: "cookie",
    price: 25,
    label: "Cookie Policy",
    subLabel: "(e.g., Cookie Usage, GDPR, CCPR)",
    sup: "*",
  },
  {
    name: "cookieConsent",
    price: 25,
    label: "Cookie Consent Banner",
    subLabel: "(e.g., GDPR Compliant Consent Banner)",
    sup: "*",
  },
];

function createItemMap<T extends { name: string }>(
  list: T[],
): Record<string, T> {
  return list.reduce(
    (map, item) => {
      map[item.name] = item;

      return map;
    },
    {} as Record<string, T>,
  );
}

// Create maps for each category
const legalPagesMap = createItemMap(legalPagesList);
const addonsMap = createItemMap(addons);
const automationsMap = createItemMap(automationsList);
const apiIntegrationsMap = createItemMap(apiIntegrations);
const authenticationMethodsMap = createItemMap(authenticationMethods);

export const preconfigWebApps: Record<string, PreconfigWebApp> = {
  BasicWebsite: {
    label: "basicWebsite",
    schema: {
      clientName: "",
      clientEmail: "",
      comment: "",
      totalPrice: 0,
      staticPages: { selectedPages: 3, totalPrice: 0 },
      dynamicPages: { selectedPages: 0, totalPrice: 0 },
      authentication: [],
      legalPages: [
        {
          name: "terms",
          price: legalPagesMap["terms"].price,
        },
        {
          name: "privacy",
          price: legalPagesMap["privacy"].price,
        },
      ],
      maintenancePlan: {
        type: "Monthly",
        duration: 3,
        regularUpdates: true,
        securityUpdates: true,
        minorBugFixes: true,
        featureEnhancement: false,
        prioritySupport: false,
      },
      websiteType: { type: "BasicWebsite" },
      customFeatures: [],
      automations: [],
      thirdPartyAPIs: [],
      addons: [
        {
          addonName: "SEO",
          price: addonsMap["SEO"].price,
        },
        {
          addonName: "DomainSetup",
          price: addonsMap["DomainSetup"].price,
        },
      ],
    },
  },
  AutomationPlatform: {
    label: "automationPlatform",
    schema: {
      clientName: "",
      clientEmail: "",
      comment: "",
      totalPrice: 0,
      staticPages: { selectedPages: 1, totalPrice: 0 },
      dynamicPages: { selectedPages: 4, totalPrice: 0 },
      authentication: [
        {
          name: "JWT",
          price: authenticationMethodsMap["JWT"].price,
        },
        {
          name: "Credentials",
          price: authenticationMethodsMap["Credentials"].price,
        },
      ],
      legalPages: [
        { name: "terms", price: legalPagesMap["terms"].price },
        { name: "privacy", price: legalPagesMap["privacy"].price },
      ],
      maintenancePlan: {
        type: "Monthly",
        duration: 6,
        regularUpdates: true,
        securityUpdates: true,
        minorBugFixes: true,
        featureEnhancement: true,
        prioritySupport: true,
      },
      websiteType: { type: "AutomationPlatform" },
      customFeatures: [],
      automations: [
        {
          automationType: "WorkflowAutomation",
          price: automationsMap["WorkflowAutomation"].price,
        },
      ],
      thirdPartyAPIs: [
        {
          apiName: "Resend",
          price: apiIntegrationsMap["Resend"].price,
        },
        {
          apiName: "Twilio",
          price: apiIntegrationsMap["Twilio"].price,
        },
      ],
      addons: [
        { addonName: "CMS", price: addonsMap["CMS"].price },
        { addonName: "Analytics", price: addonsMap["Analytics"].price },
        { addonName: "Training", price: addonsMap["Training"].price },
      ],
    },
  },
  GeospatialIntelligence: {
    label: "geospatialIntelligence",
    schema: {
      clientName: "",
      clientEmail: "",
      comment: "",
      totalPrice: 0,
      staticPages: { selectedPages: 1, totalPrice: 0 },
      dynamicPages: { selectedPages: 3, totalPrice: 0 },
      authentication: [
        {
          name: "SSO",
          price: authenticationMethodsMap["SSO"].price,
        },
        {
          name: "SocialOAuth",
          price: authenticationMethodsMap["SocialOAuth"].price,
        },
      ],
      legalPages: [
        { name: "terms", price: legalPagesMap["terms"].price },
        { name: "privacy", price: legalPagesMap["privacy"].price },
        { name: "cookie", price: legalPagesMap["cookie"].price },
        { name: "cookieConsent", price: legalPagesMap["cookieConsent"].price },
      ],
      maintenancePlan: {
        type: "Yearly",
        duration: 1,
        regularUpdates: true,
        securityUpdates: true,
        minorBugFixes: true,
        featureEnhancement: false,
        prioritySupport: false,
      },
      websiteType: { type: "GeospatialIntelligence" },
      customFeatures: [],
      automations: [
        {
          automationType: "InteractiveMaps",
          price: automationsMap["InteractiveMaps"].price,
        },
        {
          automationType: "GeoDataWrangling",
          price: automationsMap["GeoDataWrangling"].price,
        },
        {
          automationType: "CustomGISolutions",
          price: automationsMap["CustomGISolutions"].price,
        },
        {
          automationType: "GeoWorkflows",
          price: automationsMap["GeoWorkflows"].price,
        },
      ],
      thirdPartyAPIs: [
        {
          apiName: "Resend",
          price: apiIntegrationsMap["Resend"].price,
        },
        {
          apiName: "Azure",
          price: apiIntegrationsMap["Azure"].price,
        },
        {
          apiName: "ArcGIS",
          price: apiIntegrationsMap["ArcGIS"].price,
        },
      ],
      addons: [
        { addonName: "CustomUI", price: addonsMap["CustomUI"].price },
        { addonName: "Performance", price: addonsMap["Performance"].price },
        { addonName: "Training", price: addonsMap["Training"].price },
      ],
    },
  },
  AISolutions: {
    label: "aiSolutions",
    schema: {
      clientName: "",
      clientEmail: "",
      comment: "",
      totalPrice: 0,
      staticPages: { selectedPages: 3, totalPrice: 0 },
      dynamicPages: { selectedPages: 5, totalPrice: 0 },
      authentication: [
        {
          name: "SSO",
          price: authenticationMethodsMap["SSO"].price,
        },
        {
          name: "JWT",
          price: authenticationMethodsMap["JWT"].price,
        },
      ],
      legalPages: [
        { name: "terms", price: legalPagesMap["terms"].price },
        { name: "privacy", price: legalPagesMap["privacy"].price },
        { name: "cookie", price: legalPagesMap["cookie"].price },
        { name: "cookieConsent", price: legalPagesMap["cookieConsent"].price },
      ],
      maintenancePlan: {
        type: "Yearly",
        duration: 1,
        regularUpdates: true,
        securityUpdates: true,
        minorBugFixes: true,
        featureEnhancement: true,
        prioritySupport: true,
      },
      websiteType: { type: "AISolutions" },
      customFeatures: [],
      automations: [
        {
          automationType: "AIIntegration",
          price: automationsMap["AIIntegration"].price,
        },
        {
          automationType: "RetrievalSystems",
          price: automationsMap["RetrievalSystems"].price,
        },
        {
          automationType: "MultiAgentSystems",
          price: automationsMap["MultiAgentSystems"].price,
        },
      ],
      thirdPartyAPIs: [
        {
          apiName: "Azure",
          price: apiIntegrationsMap["Azure"].price,
        },
        {
          apiName: "Resend",
          price: apiIntegrationsMap["Resend"].price,
        },
      ],
      addons: [
        { addonName: "Analytics", price: addonsMap["Analytics"].price },
        { addonName: "Security", price: addonsMap["Security"].price },
        { addonName: "Training", price: addonsMap["Training"].price },
      ],
    },
  },
};
