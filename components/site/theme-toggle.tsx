"use client";

import { Monitor, MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", label: "Light", icon: SunMedium },
  { value: "dark", label: "Dark", icon: MoonStar },
  { value: "system", label: "Auto", icon: Monitor },
] as const;

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const currentTheme = mounted ? theme ?? resolvedTheme ?? "system" : "system";

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-border/70 bg-background/40 p-1 backdrop-blur",
        className,
      )}
    >
      {themes.map(({ value, label, icon: Icon }) => {
        const active = currentTheme === value;

        return (
          <Button
            key={value}
            variant={active ? "secondary" : "ghost"}
            size="sm"
            className="h-9 rounded-full px-3"
            onClick={() => setTheme(value)}
            type="button"
            aria-pressed={active}
          >
            <Icon className="size-4" />
            <span className="sr-only">{label}</span>
          </Button>
        );
      })}
    </div>
  );
}
