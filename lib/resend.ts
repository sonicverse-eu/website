import { Resend } from 'resend'

type SendEmailPayload = Parameters<Resend['emails']['send']>[0]

export function createResendClient(apiKey: string) {
  return new Resend(apiKey)
}

export async function sendEmailOrThrow(resend: Resend, payload: SendEmailPayload) {
  const response = await resend.emails.send(payload)

  if (response.error) {
    throw new Error(`Resend API error: ${response.error.message}`)
  }

  return response.data
}
