import { APPLY_URL } from "@/config/site";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  location?: string;
}

/** The single primary CTA used everywhere. Links to APPLY_URL in the same tab. */
export function ApplyButton({ className, size = "md", label = "Apply for Card", location = "unknown" }: Props) {
  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-8 text-base",
  };
  return (
    <a
      href={APPLY_URL}
      data-event="apply_click"
      data-location={location}
      className={cn(
        "cta-border group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-accent-foreground transition-transform duration-200 hover:-translate-y-0.5",
        sizes[size],
        className,
      )}
    >
      {label}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}

export function SecondaryButton({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-foreground/5 px-6 text-[15px] font-semibold text-foreground transition-colors duration-200 hover:bg-foreground/10",
        className,
      )}
    >
      {children}
    </a>
  );
}
