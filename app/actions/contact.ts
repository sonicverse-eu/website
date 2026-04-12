"use server";

import {
  initialContactFormState,
  type ContactFormState,
} from "@/lib/contact-form";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function buildEmailHtml(values: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  brief: string;
  submittedAt: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:24px;border:1px solid rgba(15,23,42,0.08);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4d35ef,#432dd7);padding:32px 40px;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.7);">Sonicverse</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.03em;">New Contact Inquiry</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Name & Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="padding-right:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Name</p>
                    <p style="margin:0;font-size:15px;color:#0d1727;font-weight:500;">${values.name}</p>
                  </td>
                  <td width="50%" style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Email</p>
                    <p style="margin:0;font-size:15px;color:#432dd7;font-weight:500;">
                      <a href="mailto:${values.email}" style="color:#432dd7;text-decoration:none;">${values.email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Company & Project Type -->
              ${values.company || values.projectType ? `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  ${values.company ? `
                  <td width="50%" style="padding-right:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Company</p>
                    <p style="margin:0;font-size:15px;color:#0d1727;">${values.company}</p>
                  </td>` : "<td></td>"}
                  ${values.projectType ? `
                  <td width="50%" style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Project type</p>
                    <p style="margin:0;font-size:15px;color:#0d1727;">${values.projectType}</p>
                  </td>` : "<td></td>"}
                </tr>
              </table>` : ""}

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid rgba(15,23,42,0.08);margin:0 0 24px;" />

              <!-- Brief -->
              <p style="margin:0 0 8px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Project brief</p>
              <div style="background:#f4f7fd;border-radius:16px;padding:20px 24px;border:1px solid rgba(15,23,42,0.06);">
                <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.78);">${values.brief.replace(/\n/g, "<br/>")}</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;border-top:1px solid rgba(15,23,42,0.06);">
              <p style="margin:0 0 16px;font-size:12px;color:rgba(13,23,39,0.38);">Submitted ${values.submittedAt} · sonicverse.eu</p>
              <div style="display:flex;gap:16px;">
                <a href="https://github.com/sonicverse-eu" style="color:#432dd7;font-size:12px;text-decoration:none;">GitHub</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildConfirmationEmailHtml(values: {
  name: string;
  submittedAt: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:24px;border:1px solid rgba(15,23,42,0.08);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4d35ef,#432dd7);padding:32px 40px;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.7);">Sonicverse</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.03em;">We received your message</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">Hi ${values.name},</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">Thanks for reaching out. Your note reached us successfully and we’ll review it carefully before replying.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">Submitted ${values.submittedAt} · sonicverse.eu</p>

              <!-- Call to Action -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="https://sonicverse.eu" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#4d35ef,#432dd7);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">Visit Our Website</a>
                  </td>
                </tr>
              </table>

              <!-- Additional Info -->
              <p style="margin:0 0 8px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">In the meantime, you can:</p>
              <ul style="margin:0 0 16px;padding-left:20px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.78);">
                <li>Explore our portfolio and services</li>
                <li>Follow us on social media for updates</li>
                <li>Check out our blog for insights</li>
              </ul>

              <!-- Contact Info -->
              <p style="margin:0 0 4px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">Need immediate assistance?</p>
              <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.78);">Reply to this email or contact us at <a href="mailto:hello@sonicverse.eu" style="color:#432dd7;text-decoration:none;">hello@sonicverse.eu</a></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;border-top:1px solid rgba(15,23,42,0.06);">
              <p style="margin:0 0 16px;font-size:12px;color:rgba(13,23,39,0.38);">Submitted ${values.submittedAt} · sonicverse.eu</p>
              <div style="display:flex;gap:16px;">
                <a href="https://github.com/sonicverse-eu" style="color:#432dd7;font-size:12px;text-decoration:none;">GitHub</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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

  if (!values.name) errors.name = "Please share your name.";

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
    return { status: "error", message: "Please review the highlighted fields.", errors, values };
  }

  const senderAddress = process.env.EMAIL_SENDER ?? "Sonicverse <hello@sonicverse.eu>";
  const recipientAddress = process.env.EMAIL_RECIPIENT ?? "hello@sonicverse.eu";

  const submittedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    const subject = `New inquiry from ${values.name}${values.company ? ` · ${values.company}` : ""}`;
    const confirmationSubject = "We received your message";

    // Prefer Cloudflare Email Workers binding `SEND_EMAIL` when available on globalThis.

    type SendEmailBinding = {
      send: (options: {
        from: string;
        to: string;
        replyTo?: string;
        subject: string;
        text: string;
        html: string;
      }) => Promise<void>;
    };
    const sendBinding = (globalThis as { SEND_EMAIL?: SendEmailBinding }).SEND_EMAIL;

    if (sendBinding && typeof sendBinding.send === "function") {
      await sendBinding.send({
        from: senderAddress,
        to: recipientAddress,
        replyTo: values.email,
        subject,
        text: `${values.name} <${values.email}>\n\n${values.brief}`,
        html: buildEmailHtml({ ...values, submittedAt }),
      });

      await sendBinding.send({
        from: senderAddress,
        to: values.email,
        subject: confirmationSubject,
        text: `Hi ${values.name},\n\nThanks for reaching out. Your note reached us successfully and we’ll review it carefully before replying.\n\nSubmitted ${submittedAt} · sonicverse.eu`,
        html: buildConfirmationEmailHtml({ name: values.name, submittedAt }),
      });
    } else {
      return {
        status: "error",
        message: "Contact delivery is not configured. Configure the SEND_EMAIL binding in your Cloudflare deployment and set EMAIL_SENDER / EMAIL_RECIPIENT.",
        errors: {},
        values,
      };
    }
  } catch (e) {
    return {
      status: "error",
      message: "The message could not be delivered right now. Please try again or email us directly.",
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks. We sent a confirmation email and will reply with a thoughtful next step.",
    errors: {},
    values: initialContactFormState.values,
  };
}
