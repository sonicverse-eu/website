'use server'

import { formatSubmittedAt, getString, isValidEmail } from '@/lib/form-utils'
import { initialVulnReportFormState, type VulnReportFormState } from '@/lib/vuln-report-form'
import { createResendClient, sendEmailOrThrow } from '@/lib/resend'
import { checkSubmissionRateLimit } from '@/lib/submission-guard'

const VULN_REPORT_RATE_LIMIT = {
  action: 'vuln-report-form',
  maxRequests: 5,
  windowMs: 10 * 60 * 1000,
} as const

const VULN_REPORT_GENERIC_ERROR =
  'The report could not be delivered right now. Please try again or email us directly.'

const EMAIL_FONT_IMPORT = "@import url('https://use.typekit.net/ofv2hls.css');"

const EMAIL_BODY_FONT = "'proxima-nova', 'Avenir Next', Avenir, 'Segoe UI', sans-serif"
const EMAIL_HEADING_FONT = "'futura-100', Futura, 'Avenir Next', sans-serif"
const EMAIL_BOOK_HEADING_FONT = "'futura-100-book', Futura, 'Avenir Next', sans-serif"

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatMultiline(value: string) {
  return escapeHtml(value).replace(/\n/g, '<br/>')
}

function truncateSubject(summary: string, maxLength = 72) {
  if (summary.length <= maxLength) return summary
  return `${summary.slice(0, maxLength - 1).trimEnd()}…`
}

function buildEmailHtml(values: {
  name: string
  email: string
  summary: string
  steps: string
  impact: string
  version: string
  submittedAt: string
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Security Report</title>
  <style>
    ${EMAIL_FONT_IMPORT}
  </style>
</head>
<body style="margin:0;padding:0;background:#f4f7fd;font-family:${EMAIL_BODY_FONT};">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:24px;border:1px solid rgba(15,23,42,0.08);overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#4d35ef,#432dd7);padding:32px 40px;">
              <p style="margin:0;font-family:${EMAIL_HEADING_FONT};font-size:11px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.7);">Sonicverse</p>
              <h1 style="margin:8px 0 0;font-family:${EMAIL_HEADING_FONT};font-size:22px;font-weight:400;color:#ffffff;letter-spacing:-0.03em;">New Security Report</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="padding-right:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-family:${EMAIL_BOOK_HEADING_FONT};font-size:10px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Reporter</p>
                    <p style="margin:0;font-size:15px;color:#0d1727;font-weight:500;">${escapeHtml(values.name)}</p>
                  </td>
                  <td width="50%" style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-family:${EMAIL_BOOK_HEADING_FONT};font-size:10px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Email</p>
                    <p style="margin:0;font-size:15px;color:#432dd7;font-weight:500;">
                      <a href="mailto:${escapeHtml(values.email)}" style="color:#432dd7;text-decoration:none;">${escapeHtml(values.email)}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="padding-right:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-family:${EMAIL_BOOK_HEADING_FONT};font-size:10px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Affected version</p>
                    <p style="margin:0;font-size:15px;color:#0d1727;">${escapeHtml(values.version || 'Not provided')}</p>
                  </td>
                  <td width="50%" style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-family:${EMAIL_BOOK_HEADING_FONT};font-size:10px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Submitted</p>
                    <p style="margin:0;font-size:15px;color:#0d1727;">${escapeHtml(values.submittedAt)}</p>
                  </td>
                </tr>
              </table>

              <div style="margin-bottom:20px;">
                <p style="margin:0 0 8px;font-family:${EMAIL_BOOK_HEADING_FONT};font-size:10px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Summary</p>
                <div style="background:#f4f7fd;border-radius:16px;padding:20px 24px;border:1px solid rgba(15,23,42,0.06);">
                  <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">${formatMultiline(values.summary)}</p>
                </div>
              </div>

              <div style="margin-bottom:20px;">
                <p style="margin:0 0 8px;font-family:${EMAIL_BOOK_HEADING_FONT};font-size:10px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Reproduction steps</p>
                <div style="background:#f4f7fd;border-radius:16px;padding:20px 24px;border:1px solid rgba(15,23,42,0.06);">
                  <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">${formatMultiline(values.steps)}</p>
                </div>
              </div>

              <div>
                <p style="margin:0 0 8px;font-family:${EMAIL_BOOK_HEADING_FONT};font-size:10px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Impact</p>
                <div style="background:#f4f7fd;border-radius:16px;padding:20px 24px;border:1px solid rgba(15,23,42,0.06);">
                  <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">${formatMultiline(values.impact)}</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 32px;border-top:1px solid rgba(15,23,42,0.06);">
              <p style="margin:0;font-size:12px;color:rgba(13,23,39,0.38);">Security report submitted ${escapeHtml(values.submittedAt)} · sonicverse.eu</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function submitVulnReport(
  _previousState: VulnReportFormState,
  formData: FormData,
): Promise<VulnReportFormState> {
  const rateLimit = await checkSubmissionRateLimit(VULN_REPORT_RATE_LIMIT)

  if (!rateLimit.allowed) {
    return {
      status: 'error',
      message:
        'Too many reports were sent from this connection. Please wait a few minutes and try again.',
      errors: {},
      values: initialVulnReportFormState.values,
    }
  }

  const values = {
    name: getString(formData, 'name'),
    email: getString(formData, 'email'),
    summary: getString(formData, 'summary'),
    steps: getString(formData, 'steps'),
    impact: getString(formData, 'impact'),
    version: getString(formData, 'version'),
  }

  const errors: VulnReportFormState['errors'] = {}

  if (!values.name) errors.name = 'Please share your name.'

  if (!values.email) {
    errors.email = 'Please share an email address.'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.summary) errors.summary = 'Please add a short summary of the issue.'
  if (!values.steps) errors.steps = 'Please include reproduction steps.'
  if (!values.impact) errors.impact = 'Please describe the security impact.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please review the highlighted fields.', errors, values }
  }

  const senderAddress = process.env.EMAIL_SENDER ?? 'noreply@mail.sonicverse.eu'
  const recipientAddress = 'security@sonicverse.eu'
  const resendApiKey = process.env.RESEND_API_KEY

  const submittedAt = formatSubmittedAt()

  if (!resendApiKey) {
    console.error(
      '[submitVulnReport] Email delivery is unavailable because RESEND_API_KEY is missing.',
    )
    return {
      status: 'error',
      message: VULN_REPORT_GENERIC_ERROR,
      errors: {},
      values,
    }
  }

  try {
    const resend = createResendClient(resendApiKey)
    const subject = `Security Report: ${truncateSubject(values.summary)}`

    await sendEmailOrThrow(resend, {
      from: senderAddress,
      to: [recipientAddress],
      subject,
      text: [
        `Reporter: ${values.name}`,
        `Email: ${values.email}`,
        `Affected version: ${values.version || 'Not provided'}`,
        `Submitted: ${submittedAt}`,
        '',
        `Summary:\n${values.summary}`,
        '',
        `Reproduction steps:\n${values.steps}`,
        '',
        `Impact:\n${values.impact}`,
      ].join('\n'),
      html: buildEmailHtml({ ...values, submittedAt }),
      replyTo: values.email,
    })
  } catch (error) {
    console.error('[submitVulnReport] Failed to send vulnerability report email.', error)
    return {
      status: 'error',
      message: VULN_REPORT_GENERIC_ERROR,
      errors: {},
      values,
    }
  }

  return {
    status: 'success',
    message: 'Thanks. Your report was sent to our security inbox for review.',
    errors: {},
    values: initialVulnReportFormState.values,
  }
}
