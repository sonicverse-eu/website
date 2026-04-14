import { FormField } from '@/components/forms/form-field'
import { Input } from '@/components/ui/input'

type NameEmailFieldsProps = {
  values: {
    name: string
    email: string
  }
  errors: Partial<Record<'name' | 'email', string>>
  pending: boolean
  emailPlaceholder: string
}

export function NameEmailFields({
  values,
  errors,
  pending,
  emailPlaceholder,
}: NameEmailFieldsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <FormField
        id="name"
        label="Name"
        error={errors.name}
        input={
          <Input
            id="name"
            name="name"
            defaultValue={values.name}
            placeholder="Alicia Chen"
            disabled={pending}
            aria-invalid={Boolean(errors.name)}
          />
        }
      />
      <FormField
        id="email"
        label="Email"
        error={errors.email}
        input={
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={values.email}
            placeholder={emailPlaceholder}
            disabled={pending}
            aria-invalid={Boolean(errors.email)}
          />
        }
      />
    </div>
  )
}
