import { z } from "zod";

export interface Quote {
  id: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  clientName: string;
  clientEmail: string;
  comment: string;
  totalPrice: number;
  projectRef: string;
  staticPages?: StaticPage;
  dynamicPages?: DynamicPage;
  authentication: AuthenticationMethod[];
  legalPages: LegalPage[];
  maintenancePlan?: MaintenancePlan;
  websiteType?: WebsiteType;
  customFeature: CustomFeature[];
  automations: Automation[];
  thirdPartyAPIs: ThirdPartyAPI[];
  addons: Addon[];
}

export enum Status {
  DRAFT = "DRAFT",
  SENT = "SENT",
  FINALIZED = "FINALIZED",
}

export interface QuoteForm {
  clientName: string;
  clientEmail: string;
  comment: string;
  totalPrice: number;
  staticPages: StaticPage;
  dynamicPages: DynamicPage;
  authentication: AuthenticationMethod[];
  legalPages: LegalPage[];
  maintenancePlan: MaintenancePlan;
  websiteType: WebsiteType;
  customFeatures: CustomFeature[];
  automations: Automation[];
  thirdPartyAPIs: ThirdPartyAPI[];
  addons: Addon[];
}

export interface Addon {
  addonName: string;
  description?: string;
  price: number;
}

export interface Service {
  name: string;
  description?: string;
  price: number;
}

export interface StaticPage {
  selectedPages: number;
  totalPrice: number;
}

export interface DynamicPage {
  selectedPages: number;
  totalPrice: number;
}

export interface AuthenticationMethod {
  name: string;
  price: number;
}

export interface LegalPage {
  name: string;
  description?: string;
  price: number;
}

export interface MaintenancePlan {
  type: string;
  duration: number;
  regularUpdates: boolean;
  securityUpdates: boolean;
  minorBugFixes: boolean;
  featureEnhancement: boolean;
  prioritySupport: boolean;
}

export interface WebsiteType {
  type: string;
}

export interface CustomFeature {
  featureName: string;
  price: number;
  description?: string;
}

export interface Automation {
  automationType: string;
  description?: string;
  price: number;
}

export interface ThirdPartyAPI {
  apiName: string;
  description?: string;
  price: number;
}

export interface CardSectionProps {
  header: string | React.ReactNode;
  body: React.ReactNode;
  bodyClassName?: string;
  titleOutside?: boolean;
}

export interface QuoteSectionProps {
  quote: QuoteForm;
  handleInputChange: (field: keyof QuoteForm, value: any) => void;
}

export interface ClientSubmitProps {
  quote: QuoteForm;
  handleInputChange: (field: keyof QuoteForm, value: any) => void;
  handleSubmit: () => void;
  recaptchaToken: string | null;
  setRecaptchaToken: (value: string | null) => void;
}

export interface OptionSliderProps {
  label: string;
  id: string;
  settings: {
    minValue: number;
    maxValue: number;
    step: number;
  };
  value: number;
  onChange: (value: number | number[]) => void;
}

export interface AuthPermsSectionProps {
  quote: QuoteForm;
  authenticationMethods: {
    name: string;
    price: number;
    label: string;
    subLabel?: string;
    sup?: string;
  }[];
  handleAuthenticationChange: (
    name: string,
    price: number,
    checked: boolean,
  ) => void;
}

export interface IntegrationWithOptionSectionProps {
  header: string;
  items: {
    name: string;
    price: number;
    label: string;
    subLabel?: string;
    sup?: string;
  }[];
  customItems: { name: string }[];
  customField: string;
  customValue: string;
  handleIntegrationChange: (
    name: string,
    price: number,
    checked: boolean,
  ) => void;
  handleCustomIntegrationChange: () => void;
  handleRemoveCustomIntegration: (name: string) => void;
  handleCustomValueChange: (value: string) => void;
}

export interface IntegrationNoOptionSectionProps {
  header: string;
  items: {
    name: string;
    price: number;
    label: string;
    subLabel?: string;
    sup?: string;
  }[];
  customItems: { name: string }[];
  handleIntegrationChange: (
    name: string,
    price: number,
    checked: boolean,
  ) => void;
}

export interface MaintenanceSectionProps {
  quote: QuoteForm;
  handleTypeChange: (value: string) => void;
  handleDurationChange: (value: number | number[]) => void;
  handlePlanOptionChange: (plan: string) => void;
}

export interface PreconfigWebApp {
  label: string;
  schema: QuoteForm;
}

export interface PreconfigSectionProps {
  selectedPreconfig: string;
  onPreconfigChange: (value: string) => void;
}

// Zod schemas for validation
export const AddonSchema = z.object({
  addonName: z.string(),
  description: z.string().optional(),
  price: z.number(),
});

export const StaticPageSchema = z.object({
  selectedPages: z.number(),
  totalPrice: z.number(),
});

export const DynamicPageSchema = z.object({
  selectedPages: z.number(),
  totalPrice: z.number(),
});

export const AuthenticationMethodSchema = z.object({
  name: z.string(),
  price: z.number(),
});

export const LegalPageSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
});

export const MaintenancePlanSchema = z.object({
  type: z.string(),
  duration: z.number(),
  regularUpdates: z.boolean(),
  securityUpdates: z.boolean(),
  minorBugFixes: z.boolean(),
  featureEnhancement: z.boolean(),
  prioritySupport: z.boolean(),
});

export const WebsiteTypeSchema = z.object({
  type: z.string(),
});

export const CustomFeatureSchema = z.object({
  featureName: z.string(),
  price: z.number(),
  description: z.string().optional(),
});

export const AutomationSchema = z.object({
  automationType: z.string(),
  description: z.string().optional(),
  price: z.number(),
});

export const ThirdPartyAPISchema = z.object({
  apiName: z.string(),
  description: z.string().optional(),
  price: z.number(),
});

export const QuoteFormSchema = z.object({
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  comment: z.string(),
  totalPrice: z.number(),
  staticPages: StaticPageSchema,
  dynamicPages: DynamicPageSchema,
  authentication: z.array(AuthenticationMethodSchema),
  legalPages: z.array(LegalPageSchema),
  maintenancePlan: MaintenancePlanSchema,
  websiteType: WebsiteTypeSchema,
  customFeatures: z.array(CustomFeatureSchema),
  automations: z.array(AutomationSchema),
  thirdPartyAPIs: z.array(ThirdPartyAPISchema),
  addons: z.array(AddonSchema),
});
