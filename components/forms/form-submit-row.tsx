import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type FormSubmitRowProps = {
  pending: boolean
  status: 'idle' | 'success' | 'error'
  message?: string
  idleMessage: string
  submitLabel: string
  pendingLabel: string
  highlightError?: boolean
}

export function FormSubmitRow({
  pending,
  status,
  message,
  idleMessage,
  submitLabel,
  pendingLabel,
  highlightError = true,
}: FormSubmitRowProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div
        className={cn(
          'text-sm leading-6',
          status === 'success'
            ? 'text-primary'
            : status === 'error' && highlightError
              ? 'text-destructive'
              : 'text-foreground/56',
        )}
      >
        {message ?? idleMessage}
      </div>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
    </div>
  )
}
