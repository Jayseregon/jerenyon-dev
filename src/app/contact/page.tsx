"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";
import { z } from "zod";

import PageTitles from "@/src/components/ui/PageTitles";
import {
  FieldInput,
  TextInput,
  HoneypotField,
  ErrorDisplay,
  SuccessDisplay,
} from "@/src/components/contact/contactFormElements";

// Define Zod schema for form validation
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  subject: z.string().min(1, "Subject is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  honeypot: z.string().optional(),
});

interface FormData {
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  message: string;
  honeypot?: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  subject: "",
  email: "",
  message: "",
  honeypot: "",
};

export default function ContactPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    error?: string;
    success?: boolean;
  } | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data using Zod
    const validation = formSchema.safeParse(formData);

    if (!validation.success) {
      setResponse({
        error: validation.error.errors.map((err) => err.message).join(", "),
      });
      setLoading(false);

      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const result = await res.json();

      setResponse(result);
    } catch {
      setResponse({ error: "An error occurred while sending the email" });
    } finally {
      setLoading(false);
      setFormData(initialFormData);
    }
  };

  const heroSubtitles = (
    <div className="grid grid-cols-1 gap-2">
      <span>{t("hero.subtitle.line1")}</span>
      <span>{t("hero.subtitle.line2")}</span>
    </div>
  );

  if (response) {
    return (
      <div className="mt-4">
        {response.error ? <ErrorDisplay t={t} /> : <SuccessDisplay t={t} />}
      </div>
    );
  } else {
    return (
      <div>
        <PageTitles
          heroSubtitle={heroSubtitles}
          heroTitle={t("hero.title")}
          pageTitle={t("title")}
        />

        <div className="py-3" />

        <section className="max-w-fit mx-auto p-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FieldInput
                fieldTarget="firstName"
                t={t}
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
              <FieldInput
                fieldTarget="lastName"
                t={t}
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <FieldInput
              fieldTarget="email"
              t={t}
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <FieldInput
              fieldTarget="subject"
              t={t}
              type="text"
              value={formData.subject}
              onChange={handleChange}
            />

            <TextInput
              fieldTarget="message"
              t={t}
              value={formData.message}
              onChange={handleChange}
            />

            <HoneypotField
              t={t}
              value={formData.honeypot}
              onChange={handleChange}
            />

            <div className="flex justify-center py-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
                onChange={setRecaptchaToken}
              />
            </div>

            <Button
              className="w-full bg-background text-foreground py-2 px-4 border border-purple-800 dark:border-purple-300 hover:bg-purple-800 hover:text-background hover:dark:text-purple-300 focus:outline-none"
              disabled={loading || !recaptchaToken}
              radius="full"
              type="submit"
            >
              {loading ? t("btn_pending") : t("btn")}
            </Button>
          </form>
        </section>
      </div>
    );
  }
}
