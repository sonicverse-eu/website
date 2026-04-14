import { Resend } from 'resend'

type SendEmailPayload = Parameters<Resend['emails']['send']>[0]
type SendEmailOptions = {
  timeoutMs?: number
}

export function createResendClient(apiKey: string) {
  return new Resend(apiKey)
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Email request timed out after ${timeoutMs}ms`))
    }, timeoutMs)

    promise.then(
      (value) => {
        clearTimeout(timeoutId)
        resolve(value)
      },
      (error) => {
        clearTimeout(timeoutId)
        reject(error)
      },
    )
  })
}

export async function sendEmailOrThrow(
  resend: Resend,
  payload: SendEmailPayload,
  { timeoutMs = 10_000 }: SendEmailOptions = {},
) {
  const response = await withTimeout(resend.emails.send(payload), timeoutMs)

  if (response.error) {
    throw new Error(`Resend API error: ${response.error.message}`)
  }

  return response.data
}
