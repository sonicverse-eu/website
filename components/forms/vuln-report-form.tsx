'use client'

import type { ReactNode } from 'react'
import { useActionState } from 'react'

import { submitVulnReport } from '@/app/actions/vuln-report'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { initialVulnReportFormState } from '@/lib/vuln-report-form'
import { cn } from '@/lib/utils'

export function VulnReportForm() {
  const [state, action, pending] = useActionState(submitVulnReport, initialVulnReportFormState)
  const currentState = state ?? initialVulnReportFormState

  return (
    <form action={action} className="space-y-5">
      <div className="rounded-[1.6rem] border border-border/70 bg-background/56 px-5 py-4 text-sm leading-6 text-foreground/68 backdrop-blur-sm">
        Please report issues in good faith, avoid accessing other people’s data, and include enough
        detail for us to reproduce and verify the problem safely.
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          error={currentState.errors.name}
          input={
            <Input
              id="name"
              name="name"
              defaultValue={currentState.values.name}
              placeholder="Alicia Chen"
              disabled={pending}
              aria-invalid={Boolean(currentState.errors.name)}
            />
          }
        />
        <Field
          id="email"
          label="Email"
          error={currentState.errors.email}
          input={
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={currentState.values.email}
              placeholder="researcher@example.com"
              disabled={pending}
              aria-invalid={Boolean(currentState.errors.email)}
            />
          }
        />
      </div>

      <Field
        id="summary"
        label="Summary"
        error={currentState.errors.summary}
        input={
          <Input
            id="summary"
            name="summary"
            defaultValue={currentState.values.summary}
            placeholder="Stored XSS in the account settings profile field"
            disabled={pending}
            aria-invalid={Boolean(currentState.errors.summary)}
          />
        }
      />

      <Field
        id="steps"
        label="Reproduction steps"
        error={currentState.errors.steps}
        description="List the sequence, test account context, payloads, and any prerequisites."
        input={
          <Textarea
            id="steps"
            name="steps"
            rows={8}
            defaultValue={currentState.values.steps}
            placeholder={`1. Sign in as a standard user...
2. Open profile settings...
3. Paste the payload into the display name field...`}
            disabled={pending}
            aria-invalid={Boolean(currentState.errors.steps)}
          />
        }
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="impact"
          label="Impact"
          error={currentState.errors.impact}
          description="Explain what an attacker can achieve and who is affected."
          input={
            <Textarea
              id="impact"
              name="impact"
              rows={5}
              defaultValue={currentState.values.impact}
              placeholder="An attacker can execute JavaScript in another user’s session and exfiltrate CSRF-protected actions."
              disabled={pending}
              aria-invalid={Boolean(currentState.errors.impact)}
            />
          }
        />
        <Field
          id="version"
          label="Affected version"
          description="Optional. Include a release number, commit SHA, environment, or URL if known."
          input={
            <Input
              id="version"
              name="version"
              defaultValue={currentState.values.version}
              placeholder="Production on commit 1a2b3c4"
              disabled={pending}
            />
          }
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className={cn(
            'text-sm leading-6',
            currentState.status === 'success'
              ? 'text-primary'
              : currentState.status === 'error'
                ? 'text-destructive'
                : 'text-foreground/56',
          )}
        >
          {currentState.message ??
            'We review responsible disclosures carefully and use the details here to reproduce the issue.'}
        </div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? 'Sending...' : 'Send report'}
        </Button>
      </div>
    </form>
  )
}

type FieldProps = {
  id: string
  label: string
  input: ReactNode
  description?: string
  error?: string
}

function Field({ id, label, input, description, error }: FieldProps) {
  return (
    <div className="space-y-2.5">
      <Label htmlFor={id}>{label}</Label>
      {input}
      {description ? <p className="text-sm leading-6 text-foreground/52">{description}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}
