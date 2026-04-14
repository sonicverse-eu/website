'use client'

import { useActionState } from 'react'

import { submitVulnReport } from '@/app/actions/vuln-report'
import { FormField } from '@/components/forms/form-field'
import { FormSubmitRow } from '@/components/forms/form-submit-row'
import { NameEmailFields } from '@/components/forms/name-email-fields'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { initialVulnReportFormState } from '@/lib/vuln-report-form'

export function VulnReportForm() {
  const [state, action, pending] = useActionState(submitVulnReport, initialVulnReportFormState)
  const currentState = state ?? initialVulnReportFormState
  const formKey = JSON.stringify(currentState.values)

  return (
    <form key={formKey} action={action} className="space-y-5">
      <div className="rounded-[1.6rem] border border-border/70 bg-background/56 px-5 py-4 text-sm leading-6 text-foreground/68 backdrop-blur-sm">
        Please report issues in good faith, avoid accessing other people’s data, and include enough
        detail for us to reproduce and verify the problem safely.
      </div>

      <NameEmailFields
        values={currentState.values}
        errors={currentState.errors}
        pending={pending}
        emailPlaceholder="researcher@example.com"
      />

      <FormField
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

      <FormField
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
        <FormField
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
        <FormField
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

      <FormSubmitRow
        pending={pending}
        status={currentState.status}
        message={currentState.message}
        idleMessage="We review responsible disclosures carefully and use the details here to reproduce the issue."
        submitLabel="Send report"
        pendingLabel="Sending..."
      />
    </form>
  )
}
