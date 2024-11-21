// In North America or Western Europe, hourly rates for freelance web developers generally range between $50–$150/hour,
// depending on experience and specialization.
// For your skills (Full-stack, Python, GIS, AI/ML, Next.js), a rate between $75–$125/hour
// would be more aligned with the market.
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
    Resend: 2,
    SendGrid: 2,
    Twilio: 3,
    AWS: 5,
    Azure: 5,
    Bunny: 2,
    ArcGIS: 5,
    GoogleMaps: 2,
  },
  addon: {
    SEO: 5,
    MultiLanguage: 6,
    Analytics: 5,
    CMS: 8,
    Security: 6,
    Performance: 5,
    CDN: 3,
    CustomUI: 6,
    DomainSetup: 2,
    Training: 5,
    SocialMedia: 3,
  },
  automation: {
    AIIntegration: 10,
    RetrievalSystems: 20,
    MultiAgentSystems: 20,
    InteractiveMaps: 10,
    GeoDataWrangling: 10,
    CustomGISolutions: 10,
    GeoWorkflows: 10,
    WorkflowAutomation: 10,
  },
  legalPage: 1,
};

export const authenticationMethods = [
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

export const apiIntegrations = [
  { name: "Stripe", price: 200, label: "Stripe Payment Gateway Integration" },
  { name: "Paypal", price: 200, label: "PayPal Payment Processing" },
  { name: "Clover", price: 200, label: "Clover Point-of-Sale Integration" },
  { name: "Resend", price: 150, label: "Resend Email Automation API" },
  { name: "SendGrid", price: 150, label: "SendGrid Email API" },
  { name: "Twilio", price: 200, label: "Twilio Messaging & Voice" },
  { name: "GoogleMaps", price: 150, label: "Google Maps API" },
  { name: "AWS", price: 300, label: "Amazon Web Services Integration" },
  { name: "Azure", price: 300, label: "Microsoft Azure Cloud Services" },
  { name: "Bunny", price: 150, label: "Bunny.net CDN and Storage" },
  { name: "ArcGIS", price: 300, label: "ArcGIS API for Python" },
];

export const addons = [
  { name: "SEO", price: 300, label: "SEO Optimization & Strategy" },
  {
    name: "MultiLanguage",
    price: 250,
    label: "Multi-Language Support",
    subLabel: "(i.e., FR/EN only)",
  },
  {
    name: "Analytics",
    price: 200,
    label: "Analytics & Reporting Integration",
    subLabel: "(e.g., Google, Vercel)",
  },
  {
    name: "CMS",
    price: 300,
    label: "Content Management System Setup",
    subLabel: "(e.g., Sanity, Strapi)",
  },
  {
    name: "Security",
    price: 200,
    label: "Enhanced Security Features",
    subLabel: "(e.g., SSL, CSP, reCAPTCHA)",
  },
  {
    name: "Performance",
    price: 250,
    label: "Performance Optimization",
    subLabel: "(e.g., Code Splitting, Lazy Loading)",
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
    price: 300,
    label: "User Training & Documentation",
  },
  {
    name: "SocialMedia",
    price: 150,
    label: "Social Media Integration",
    subLabel: "(e.g., Facebook, Twitter, Pinterest)",
  },
];

export const automationsList = [
  {
    name: "AIIntegration",
    price: 2000,
    label: "AI Integration",
    subLabel: "(e.g., OpenAI, Google, Anthropic)",
  },
  {
    name: "RetrievalSystems",
    price: 3000,
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

export const legalPagesList = [
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
