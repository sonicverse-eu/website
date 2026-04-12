import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
};

export function Spotlight({ className }: SpotlightProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute top-[-10%] left-[18%] h-64 w-64 rounded-full bg-[var(--hero-orbit)] blur-3xl md:h-80 md:w-80" />
      <div className="absolute top-[6%] right-[12%] h-56 w-56 rounded-full bg-[var(--hero-spotlight)] blur-3xl md:h-72 md:w-72" />
      <div className="absolute inset-x-[18%] top-[-14%] h-72 rounded-full bg-white/28 blur-3xl dark:bg-white/6" />
    </div>
  );
}
