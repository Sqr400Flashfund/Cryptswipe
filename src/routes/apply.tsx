import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/blocks";
import { APPLY_URL } from "@/config/site";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply")({
  head: () =>
    seo({
      title: "Apply for Your Crypto Card | Cryptswipe",
      description: "Fill in your card details, then connect your wallet to claim your Cryptswipe crypto virtual card in under a minute.",
      path: "/apply",
      noindex: true,
    }),
  component: Apply,
});

const schema = z.object({
  fullName: z.string().trim().min(2).max(26),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().regex(/^\+?[0-9\s\-()]{7,20}$/),
  country: z.string().trim().min(2).max(60),
  city: z.string().trim().min(2).max(60),
  address: z.string().trim().min(4).max(120),
  zip: z.string().trim().min(2).max(12),
});

type Form = z.infer<typeof schema>;

const fields: { key: keyof Form; label: string; type?: string; autoComplete: string; hint?: string; full?: boolean }[] = [
  { key: "fullName", label: "Full name (as it appears on card)", autoComplete: "name", hint: "Max 26 characters", full: true },
  { key: "email", label: "Email address", type: "email", autoComplete: "email" },
  { key: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
  { key: "country", label: "Country", autoComplete: "country-name" },
  { key: "city", label: "City", autoComplete: "address-level2" },
  { key: "address", label: "Address", autoComplete: "street-address", full: true },
  { key: "zip", label: "ZIP / Postal code", autoComplete: "postal-code" },
];

function Apply() {
  const [form, setForm] = useState<Form>({ fullName: "", email: "", phone: "", country: "", city: "", address: "", zip: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const result = useMemo(() => schema.safeParse(form), [form]);
  const invalid = new Set(result.success ? [] : result.error.issues.map((i) => i.path[0] as keyof Form));
  const ready = result.success;

  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">Apply for your <span className="text-gradient">Cryptswipe card</span></h1>
        <p className="mt-4 text-muted-foreground">Fill in every field. Once complete, connect your wallet to claim your card.</p>
        <form
          noValidate
          className="mt-10 grid gap-5 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (ready) window.location.assign(APPLY_URL);
          }}
        >
          {fields.map((f) => {
            const err = touched[f.key] && invalid.has(f.key);
            return (
              <div key={f.key} className={cn("flex flex-col gap-2", f.full && "sm:col-span-2")}>
                <label htmlFor={f.key} className="text-sm font-medium">{f.label}</label>
                <input
                  id={f.key}
                  name={f.key}
                  type={f.type ?? "text"}
                  autoComplete={f.autoComplete}
                  required
                  value={form[f.key]}
                  maxLength={f.key === "fullName" ? 26 : 120}
                  aria-invalid={err || undefined}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  onBlur={() => setTouched((p) => ({ ...p, [f.key]: true }))}
                  className={cn(
                    "h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    err && "border-destructive",
                  )}
                />
                {err ? <p className="text-xs text-destructive">Please enter a valid {f.label.toLowerCase()}.</p> : f.hint ? <p className="text-xs text-subtle">{f.hint}</p> : null}
              </div>
            );
          })}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={!ready}
              data-event="apply_click"
              data-location="apply_form"
              className={cn(
                "inline-flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-semibold transition-transform duration-200",
                ready ? "cta-border text-accent-foreground hover:-translate-y-0.5" : "cursor-not-allowed bg-foreground/10 text-muted-foreground",
              )}
            >
              Connect to claim card <ArrowRight aria-hidden className="size-4" />
            </button>
            {!ready && <p className="mt-3 text-center text-xs text-subtle">Complete every field to unlock this button.</p>}
          </div>
        </form>
      </Container>
    </section>
  );
}
