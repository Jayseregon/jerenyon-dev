"use client";

import { useActionState, useContext, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

import { NonceContext } from "@/src/app/providers";
import PageTitles from "@/src/components/root/PageTitles";
import { ContactFormData } from "@/src/interfaces/Contact";
import { sendContactEmail } from "@/src/actions/resend/action";
import { SuccessDisplay } from "@/src/components/contact/SuccessDisplay";
import { ErrorDisplay } from "@/src/components/contact/ErrorDisplay";
import { FieldInput } from "@/src/components/contact/FieldInput";
import { TextInput } from "@/src/components/contact/TextInput";
import { HoneypotField } from "@/src/components/contact/HoneypotField";
import ErrorBoundary from "@/src/components/root/ErrorBoundary";
import { ErrorDefaultDisplay } from "@/src/components/root/ErrorDefaultDisplay";
import { Button } from "@/src/components/ui/button";

const initialState = {
  success: false,
  error: undefined,
};

export default function ContactPage() {
  const nonce = useContext(NonceContext);
  const t = useTranslations("contact");
  const [contactForm, setContactForm] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    subject: "",
    email: "",
    message: "",
    honeypot: "",
    recaptchaToken: "",
  });
  const { pending } = useFormStatus();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [state, formAction] = useActionState(sendContactEmail, initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const heroSubtitles = (
    <div className="grid grid-cols-1 gap-2" nonce={nonce}>
      <span>{t("hero.subtitle.line1")}</span>
      <span>{t("hero.subtitle.line2")}</span>
    </div>
  );

  if (state?.success) {
    return (
      <div className="mt-4" nonce={nonce}>
        <SuccessDisplay t={t} />
      </div>
    );
  } else if (state?.error) {
    return (
      <div className="mt-4" nonce={nonce}>
        <ErrorDisplay t={t} />
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<ErrorDefaultDisplay />}>
      <div>
        <PageTitles
          heroSubtitle={heroSubtitles}
          heroTitle={t("hero.title")}
          nonce={nonce}
          pageTitle={t("title")}
        />

        <div className="py-3" nonce={nonce} />

        <section className="max-w-2xl mx-auto p-4" nonce={nonce}>
          <form action={formAction} className="space-y-4">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full"
              nonce={nonce}
            >
              <FieldInput
                fieldTarget="firstName"
                t={t}
                type="text"
                value={contactForm.firstName}
                onChange={handleChange}
              />
              <FieldInput
                fieldTarget="lastName"
                t={t}
                type="text"
                value={contactForm.lastName}
                onChange={handleChange}
              />
            </div>

            <FieldInput
              fieldTarget="email"
              t={t}
              type="email"
              value={contactForm.email}
              onChange={handleChange}
            />

            <FieldInput
              fieldTarget="subject"
              t={t}
              type="text"
              value={contactForm.subject}
              onChange={handleChange}
            />

            <TextInput
              fieldTarget="message"
              t={t}
              value={contactForm.message}
              onChange={handleChange}
            />

            <HoneypotField
              t={t}
              value={contactForm.honeypot ?? ""}
              onChange={handleChange}
            />

            <input
              name="recaptchaToken"
              type="hidden"
              value={recaptchaToken ?? ""}
              onChange={handleChange}
            />

            <div
              className="flex justify-center py-4 mx-auto"
              id="recaptcha"
              nonce={nonce}
            >
              <ReCAPTCHA
                nonce={nonce}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
                onChange={setRecaptchaToken}
              />
            </div>

            <Button
              // className="w-full rounded-full bg-background text-foreground py-2 px-4 border border-purple-800 dark:border-purple-300 dark:hover:border-purple-950 hover:bg-purple-800 dark:hover:bg-purple-950 hover:text-background dark:hover:text-foreground focus:outline-hidden"
              disabled={pending || !recaptchaToken}
              nonce={nonce}
              type="submit"
              variant="form"
            >
              {pending ? t("btn_pending") : t("btn")}
            </Button>
          </form>
        </section>
      </div>
    </ErrorBoundary>
  );
}
