import type { ReactNode } from 'react'

import { Label } from '@/components/ui/label'

type FormFieldProps = {
  id: string
  label: string
  input: ReactNode
  description?: string
  error?: string
}

export function FormField({ id, label, input, description, error }: FormFieldProps) {
  return (
    <div className="space-y-2.5">
      <Label htmlFor={id}>{label}</Label>
      {input}
      {description ? <p className="text-sm leading-6 text-foreground/52">{description}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}
