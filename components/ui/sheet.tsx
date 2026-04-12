"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetPortal = Dialog.Portal;

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));

SheetOverlay.displayName = Dialog.Overlay.displayName;

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  side?: "top" | "right" | "bottom" | "left";
}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  SheetContentProps
>(({ className, children, side = "right", ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <Dialog.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col gap-6 border border-border/70 bg-popover p-6 text-popover-foreground shadow-2xl backdrop-blur-xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out sm:max-w-md",
        side === "right" &&
          "inset-y-4 right-4 h-auto w-[calc(100%-2rem)] rounded-[1.8rem] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:w-[420px]",
        className,
      )}
      {...props}
    >
      {children}
      <Dialog.Close className="absolute top-5 right-5 rounded-full border border-border/80 p-2 text-foreground/60 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
        <X className="size-4" />
        <span className="sr-only">Close menu</span>
      </Dialog.Close>
    </Dialog.Content>
  </SheetPortal>
));

SheetContent.displayName = Dialog.Content.displayName;

export function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 text-left", className)} {...props} />;
}

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("text-2xl leading-[1.06] font-medium tracking-[-0.025em]", className)}
    {...props}
  />
));

SheetTitle.displayName = Dialog.Title.displayName;

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description ref={ref} className={cn("text-sm leading-7 text-muted-foreground", className)} {...props} />
));

SheetDescription.displayName = Dialog.Description.displayName;
