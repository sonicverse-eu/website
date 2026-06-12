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
          label="You are a…"
          input={
            <select
              id="projectType"
              name="projectType"
              defaultValue={currentState.values.projectType}
              disabled={pending}
              className="flex h-12 w-full rounded-2xl border border-border/80 bg-background/70 px-4 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] outline-none transition focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-primary/10"
            >
              <option value="">Select a role</option>
              <option value="Independent / community station">
                Independent / community station
              </option>
              <option value="Station manager">Station manager</option>
              <option value="Technical team at a station">Technical team at a station</option>
              <option value="Multi-station network">Multi-station network</option>
              <option value="Just following along">Just following along</option>
            </select>
          }
        />
      </div>

      <FormField
        id="brief"
        label="Tell us about your station"
        error={currentState.errors.brief}
        description="Outline what you run today, where the legacy tools fall short, and what you’d want early access to do for you."
        input={
          <Textarea
            id="brief"
            name="brief"
            defaultValue={currentState.values.brief}
            placeholder="We run a community station on an ageing proprietary playout system. The contract is up for renewal and we want to move to something open we can self-host and extend."
            disabled={pending}
            aria-invalid={Boolean(currentState.errors.brief)}
          />
        }
      />

      <FormSubmitRow
        pending={pending}
        status={currentState.status}
        message={currentState.message}
        idleMessage="A few lines about your station is enough to start."
        submitLabel="Send message"
        pendingLabel="Sending..."
        highlightError={false}
      />
    </form>
  )
}
