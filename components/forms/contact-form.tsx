'use client'

import { useActionState } from 'react'

import { submitContactForm } from '@/app/actions/contact'
import { FormField } from '@/components/forms/form-field'
import { FormSubmitRow } from '@/components/forms/form-submit-row'
import { NameEmailFields } from '@/components/forms/name-email-fields'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { initialContactFormState } from '@/lib/contact-form'

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initialContactFormState)
  const currentState = state ?? initialContactFormState

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="source" value="/contact" />
      <NameEmailFields
        values={currentState.values}
        errors={currentState.errors}
        pending={pending}
        emailPlaceholder="alicia@company.com"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="company"
          label="Company or team"
          input={
            <Input
              id="company"
              name="company"
              defaultValue={currentState.values.company}
              placeholder="Sonicverse"
              disabled={pending}
            />
          }
        />
        <FormField
          id="projectType"
          label="Project type"
          input={
            <select
              id="projectType"
              name="projectType"
              defaultValue={currentState.values.projectType}
              disabled={pending}
              className="flex h-12 w-full rounded-2xl border border-border/80 bg-background/70 px-4 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] outline-none transition focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-primary/10"
            >
              <option value="">Select an area</option>
              <option value="Product engineering">Product engineering</option>
              <option value="Web platform">Web platform</option>
              <option value="Design system">Design system</option>
              <option value="Open-source tooling">Open-source tooling</option>
              <option value="Technical architecture">Technical architecture</option>
            </select>
          }
        />
      </div>

      <FormField
        id="brief"
        label="Project brief"
        error={currentState.errors.brief}
        description="Share the shape of the system, what is changing, and what a good outcome looks like."
        input={
          <Textarea
            id="brief"
            name="brief"
            defaultValue={currentState.values.brief}
            placeholder="We need a modern platform foundation with a premium public site and a calmer delivery path for the next release cycle."
            disabled={pending}
            aria-invalid={Boolean(currentState.errors.brief)}
          />
        }
      />

      <FormSubmitRow
        pending={pending}
        status={currentState.status}
        message={currentState.message}
        idleMessage="A thoughtful brief is enough for a strong first conversation."
        submitLabel="Send inquiry"
        pendingLabel="Sending..."
        highlightError={false}
      />
    </form>
  )
}
