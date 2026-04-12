"use server";

import {
  initialContactFormState,
  type ContactFormState,
} from "@/lib/contact-form";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    company: getString(formData, "company"),
    projectType: getString(formData, "projectType"),
    brief: getString(formData, "brief"),
  };

  const source = getString(formData, "source") || "/contact";
  const errors: ContactFormState["errors"] = {};

  if (!values.name) {
    errors.name = "Please share your name.";
  }

  if (!values.email) {
    errors.email = "Please share an email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.brief) {
    errors.brief = "Please include a short project brief.";
  } else if (values.brief.length < 30) {
    errors.brief = "A little more context will help us respond usefully.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      errors,
      values,
    };
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      status: "error",
      message:
        "Contact delivery is not configured yet. Add CONTACT_WEBHOOK_URL in your runtime secrets before going live.",
      errors: {},
      values,
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        source,
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        status: "error",
        message:
          "The message could not be delivered right now. Please try again or use the direct email listed below.",
        errors: {},
        values,
      };
    }

    return {
      status: "success",
      message:
        "Thanks. Your note is on its way, and Sonicverse will reply with a thoughtful next step.",
      errors: {},
      values: initialContactFormState.values,
    };
  } catch {
    return {
      status: "error",
      message:
        "Something interrupted delivery. Please try again shortly or use the direct email route.",
      errors: {},
      values,
    };
  }
}
