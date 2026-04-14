import { headers } from 'next/headers'

type RateLimitOptions = {
  action: string
  maxRequests: number
  windowMs: number
}

type RateLimitResult =
  | {
      allowed: true
    }
  | {
      allowed: false
      retryAfterMs: number
    }

type RateLimitEntry = {
  count: number
  resetAt: number
}

declare global {
  var __sonicverseSubmissionRateLimitStore: Map<string, RateLimitEntry> | undefined
}

function getStore() {
  if (!globalThis.__sonicverseSubmissionRateLimitStore) {
    globalThis.__sonicverseSubmissionRateLimitStore = new Map()
  }

  return globalThis.__sonicverseSubmissionRateLimitStore
}

async function getClientFingerprint() {
  const requestHeaders = await headers()
  const forwardedFor = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim()
  const clientIp =
    requestHeaders.get('cf-connecting-ip') ?? requestHeaders.get('x-real-ip') ?? forwardedFor
  const userAgent = requestHeaders.get('user-agent') ?? 'unknown'

  return clientIp ? `ip:${clientIp}` : `ua:${userAgent}`
}

export async function checkSubmissionRateLimit({
  action,
  maxRequests,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  const store = getStore()
  const now = Date.now()

  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key)
    }
  }

  const fingerprint = await getClientFingerprint()
  const key = `${action}:${fingerprint}`
  const current = store.get(key)

  if (!current) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterMs: Math.max(0, current.resetAt - now),
    }
  }

  current.count += 1
  store.set(key, current)

  return { allowed: true }
}
