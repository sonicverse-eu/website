import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-5",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Badge variant="muted">{eyebrow}</Badge> : null}
      <div className="space-y-4">
        <h2 className="section-title">
          {title}
        </h2>
        {description ? (
          <p className="section-copy">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
