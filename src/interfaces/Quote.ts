import { useTranslations } from "next-intl";

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
  method: string;
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
  price: number;
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

export interface FieldInputProps {
  fieldTarget: string;
  t: ReturnType<typeof useTranslations>;
  value?: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
}

export interface TextInputProps {
  fieldTarget: string;
  t: ReturnType<typeof useTranslations>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  width?: string;
  height?: string;
}

export interface CardSectionProps {
  header: string;
  body: React.ReactNode;
  bodyClassName?: string;
}

export interface QuoteSectionProps {
  quote: QuoteForm;
  handleInputChange: (field: keyof QuoteForm, value: any) => void;
}

export interface QuoteOptionSliderProps {
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
  authenticationMethods: { method: string; price: number; label: string }[];
  handleAuthenticationChange: (
    method: string,
    price: number,
    checked: boolean
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
    checked: boolean
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
    checked: boolean
  ) => void;
}

export interface MaintenanceSectionProps {
  quote: QuoteForm;
  handleTypeChange: (value: string) => void;
  handleDurationChange: (value: number | number[]) => void;
  handlePlanOptionChange: (plan: string) => void;
}
