import { cloneElement, type ReactElement } from 'react'

import { Label } from '@/components/ui/label'

type FieldControlProps = {
  'aria-describedby'?: string
  'aria-errormessage'?: string
  'aria-invalid'?: boolean | 'true' | 'false'
}

type FormFieldProps = {
  id: string
  label: string
  input: ReactElement<FieldControlProps>
  description?: string
  error?: string
}

export function FormField({ id, label, input, description, error }: FormFieldProps) {
  const descriptionId = `${id}-desc`
  const errorId = `${id}-error`
  const describedBy = [input.props['aria-describedby'], description ? descriptionId : undefined]
    .filter(Boolean)
    .join(' ')

  const enhancedInput = cloneElement(input, {
    'aria-describedby': describedBy || undefined,
    'aria-errormessage': error ? errorId : input.props['aria-errormessage'],
    'aria-invalid': error ? true : input.props['aria-invalid'],
  })

  return (
    <div className="space-y-2.5">
      <Label htmlFor={id}>{label}</Label>
      {enhancedInput}
      {description ? (
        <p id={descriptionId} className="text-sm leading-6 text-foreground/52">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
