export function getString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export function isValidEmail(value: string) {
  if (!value || value.length > 254) return false
  if (value.includes(' ')) return false

  const atIndex = value.indexOf('@')

  if (atIndex <= 0 || atIndex !== value.lastIndexOf('@') || atIndex === value.length - 1) {
    return false
  }

  const localPart = value.slice(0, atIndex)
  const domain = value.slice(atIndex + 1)

  if (!localPart || !domain) return false
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false
  if (domain.startsWith('.') || domain.endsWith('.')) return false
  if (localPart.includes('..') || domain.includes('..')) return false

  const lastDotIndex = domain.lastIndexOf('.')

  if (lastDotIndex <= 0 || lastDotIndex === domain.length - 1) return false

  return true
}

export function formatSubmittedAt(date = new Date()) {
  return date.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
