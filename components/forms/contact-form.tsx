"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";

import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { initialContactFormState } from "@/lib/contact-form";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [state, action, pending] = useActionState(
    submitContactForm,
    initialContactFormState,
  );
  const currentState = state ?? initialContactFormState;

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="source" value="/contact" />
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
              placeholder="alicia@company.com"
              disabled={pending}
              aria-invalid={Boolean(currentState.errors.email)}
            />
          }
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
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
        <Field
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

        <Field
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className={cn(
            "text-sm leading-6",
            currentState.status === "success"
              ? "text-primary"
              : "text-foreground/56",
          )}
        >
          {currentState.message ??
            "A thoughtful brief is enough for a strong first conversation."}
        </div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Sending..." : "Send inquiry"}
        </Button>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  input: ReactNode;
  description?: string;
  error?: string;
};

function Field({ id, label, input, description, error }: FieldProps) {
  return (
    <div className="space-y-2.5">
      <Label htmlFor={id}>{label}</Label>
      {input}
      {description ? <p className="text-sm leading-6 text-foreground/52">{description}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
