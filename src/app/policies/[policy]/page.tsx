"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Policy } from "@/src/components/legals/Policy";

const policyKeys = {
  privacy: {
    apiKey: process.env.NEXT_PUBLIC_TERMAGEDDON_PRIVACY_POLICY || "",
    translationId: "privacy_policy",
  },
  cookies: {
    apiKey: process.env.NEXT_PUBLIC_TERMAGEDDON_COOKIE_POLICY || "",
    translationId: "cookies_policy",
  },
  terms: {
    apiKey: process.env.NEXT_PUBLIC_TERMAGEDDON_TERMS_OF_SERVICE || "",
    translationId: "terms_of_service",
  },
};

export default function PolicyPage() {
  const { policy } = useParams();
  const t = useTranslations("policies");

  const policyData = policyKeys[policy as keyof typeof policyKeys];

  return (
    <div className="w-full max-w-4xl md:max-w-5xl mx-auto">
      <h1 className="text-purple-800 dark:text-purple-300 mb-3">
        {t(`${policyData.translationId}.title`)}
      </h1>
      <h2 className="text-5xl font-bold max-w-xl mx-auto">
        {t(`${policyData.translationId}.heroTitle`)}
      </h2>

      <div className="py-3" />

      <Policy policyKey={policyData.apiKey} />

      <div className="py-3" />
    </div>
  );
}
