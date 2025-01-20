"use server";

import { Resend } from "resend";
import { z } from "zod";

import { EmailTemplate as ContactEmailTemplate } from "@/src/components/contact/EmailTemplate";
import { EmailTemplate as QuoteEmailTemplate } from "@/src/components/estimate/EmailTemplate";
import { verifyRecaptcha } from "@/src/lib/actionHelpers";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const resend = new Resend(process.env.RESEND_API_KEY);

function validateEmailConfig() {
  if (!process.env.CONTACT_DEFAULT_FROM || !process.env.CONTACT_DEFAULT_TO) {
    throw new Error("Missing email configuration");
  }
}

export async function sendLikeNotification(
  slug: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    // check if the email configuration is set, allowing force unwrapping
    validateEmailConfig();
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_DEFAULT_FROM!,
      to: process.env.CONTACT_DEFAULT_TO!,
      subject: "Someone liked your post!",
      text: `Your post with slug '${slug}' has been liked!`,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return { success: false, error: errorMessage };
  }
}

export async function sendNewQuoteNotification(
  clientName: string,
  clientEmail: string,
  comment: string,
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const subject = "New quote request!";

    validateEmailConfig();
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_DEFAULT_FROM!,
      to: process.env.CONTACT_DEFAULT_TO!,
      subject: subject,
      text: subject,
      react: QuoteEmailTemplate({ clientName, clientEmail, comment }),
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return { success: false, error: errorMessage };
  }
}

export async function sendContactEmail(
  prevState: { success: boolean; error?: string },
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    validateEmailConfig();
    const schema = z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      subject: z.string().min(1, "Subject is required"),
      email: z.string().email("Invalid email address"),
      message: z.string().min(1, "Message is required"),
      honeypot: z.string().optional().nullable(),
      recaptchaToken: z.string().min(1, "Recaptcha token is required"),
    });

    const parse = schema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      subject: formData.get("subject"),
      email: formData.get("email"),
      message: formData.get("message"),
      honeypot: formData.get("honeypot"),
      recaptchaToken: formData.get("recaptchaToken"),
    });

    if (!parse.success) {
      return {
        success: false,
        error: parse.error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", "),
      };
    }

    const data = parse.data;

    if (data.honeypot) {
      return { success: false, error: "Bot detected" };
    }

    const recaptchaValid = await verifyRecaptcha(
      data.recaptchaToken,
      RECAPTCHA_SECRET!,
    );

    if (!recaptchaValid) {
      return { success: false, error: "Invalid captcha" };
    }

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_DEFAULT_FROM!,
      to: process.env.CONTACT_DEFAULT_TO!,
      subject: data.subject,
      text: data.subject,
      react: ContactEmailTemplate(data),
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return { success: false, error: errorMessage };
  }
}
