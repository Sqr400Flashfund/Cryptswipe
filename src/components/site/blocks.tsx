import { Link } from "@tanstack/react-router";
import { useId, useState, type ReactNode } from "react";
import { ChevronDown, Check, X as XIcon, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/content/faqs";
import type { PostSummary } from "@/content/types";
import { formatDate } from "@/lib/format-date";
import { ApplyButton, SecondaryButton } from "./ApplyButton";
import { Reveal } from "./Reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-7xl px-5 lg:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">{children}</p>;
}

export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl leading-[1.08] sm:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-subtle">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link to="/" className="hover:text-foreground">Home</Link></li>
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {it.to ? (
              <a href={it.to} className="hover:text-foreground">{it.name}</a>
            ) : (
              <span aria-current="page" className="text-muted-foreground">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ crumbs, eyebrow, title, intro, children }: { crumbs: { name: string; to?: string }[]; eyebrow?: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="grain relative overflow-hidden border-b border-border">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <div aria-hidden className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2" style={{ background: "var(--glow-violet)" }} />
      <Container className="relative py-16 sm:py-24">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <div className="mt-8"><Eyebrow>{eyebrow}</Eyebrow></div>}
        <h1 className={cn("max-w-4xl text-4xl leading-[1.04] tracking-[-0.04em] sm:text-6xl", eyebrow ? "mt-3" : "mt-8")}>{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}

export function FAQAccordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="divide-y divide-border rounded-3xl border border-border bg-card">
      {items.map((f, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div key={f.q}>
            <h3 className="text-base font-semibold tracking-normal sm:text-lg">
              <button
                type="button"
                id={`${id}-btn`}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left hover:text-lime"
              >
                {f.q}
                <ChevronDown aria-hidden className={cn("size-5 shrink-0 transition-transform duration-300", isOpen && "rotate-180 text-lime")} />
              </button>
            </h3>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-btn`}
              className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-muted-foreground">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const catColor: Record<string, string> = {
  Guides: "text-lime",
  Comparisons: "text-cyan",
  Security: "text-violet",
  Networks: "text-cyan",
};

export function BlogCard({ post }: { post: PostSummary }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-foreground/25">
      <PostCover post={post} small />
      <div className="flex flex-1 flex-col p-6">
        <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", catColor[post.category])}>{post.category}</p>
        <h3 className="mt-3 text-xl leading-snug tracking-[-0.02em]">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{post.description}</p>
        <p className="mt-auto pt-5 text-xs text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
        </p>
      </div>
    </article>
  );
}

/** Generated cover art (no image request → no CLS, instant LCP). */
export function PostCover({ post, small }: { post: PostSummary; small?: boolean }) {
  const hue = post.slug.length * 37;
  return (
    <div
      role="img"
      aria-label={post.heroAlt}
      className={cn("relative overflow-hidden border-b border-border", small ? "aspect-[16/9]" : "aspect-[21/9] rounded-3xl border")}
      style={{
        background: `radial-gradient(70% 90% at ${20 + (hue % 60)}% 0%, rgb(124 58 237 / 0.55), transparent 60%), radial-gradient(60% 80% at 100% 100%, rgb(34 211 238 / 0.35), transparent 60%), #0e1326`,
      }}
    >
      <div aria-hidden className="grid-lines absolute inset-0" />
      <img src="/brand/cryptswipe-mark.svg" alt="" width={96} height={96} loading="lazy" className={cn("absolute opacity-90", small ? "bottom-5 right-5 size-14" : "bottom-8 right-8 size-24")} />
      <p className={cn("absolute left-6 top-6 max-w-[70%] font-display font-bold leading-tight tracking-[-0.03em] text-foreground/90", small ? "text-lg" : "text-2xl sm:text-4xl")}>
        {post.keyword}
      </p>
    </div>
  );
}

export function StepList({ steps }: { steps: { title: string; body: ReactNode }[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 80} className="relative rounded-3xl border border-border bg-card p-7">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-brand font-bold">{i + 1}</span>
          <h3 className="mt-6 text-xl tracking-[-0.02em]">{s.title}</h3>
          <div className="mt-3 text-muted-foreground">{s.body}</div>
        </Reveal>
      ))}
    </ol>
  );
}

type Cell = string | boolean | null;
export function ComparisonTable({ columns, rows, caption }: { columns: string[]; rows: { label: string; cells: Cell[] }[]; caption: string }) {
  const render = (c: Cell) =>
    c === true ? <Check aria-label="Yes" className="size-5 text-lime" /> : c === false ? <XIcon aria-label="No" className="size-5 text-subtle" /> : c === null ? <Minus aria-label="Not applicable" className="size-5 text-subtle" /> : c;
  return (
    <div className="overflow-x-auto rounded-3xl border border-border">
      <table className="w-full min-w-[640px] text-left text-sm sm:text-base">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-card">
            <th scope="col" className="p-5 font-medium text-subtle">Feature</th>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={cn("p-5 font-semibold", i === 0 && "bg-violet/15 text-lime")}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-border last:border-0">
              <th scope="row" className="p-5 font-medium text-muted-foreground">{r.label}</th>
              {r.cells.map((c, i) => (
                <td key={i} className={cn("p-5", i === 0 ? "bg-violet/10 font-semibold text-foreground" : "text-muted-foreground")}>{render(c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CTASection({ title = <>Your crypto.<br /><span className="text-gradient">Every checkout.</span></>, body = "Connect your wallet and get a virtual card in under a minute. Free to issue. No monthly fee.", headingLevel = 2 }: { title?: ReactNode; body?: string; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="grain relative overflow-hidden rounded-[40px] border border-border bg-card px-6 py-16 text-center sm:px-16 sm:py-24">
          <div aria-hidden className="absolute -bottom-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2" style={{ background: "var(--glow-violet)" }} />
          <div aria-hidden className="absolute -top-32 right-0 h-[360px] w-[520px]" style={{ background: "var(--glow-cyan)" }} />
          <div className="relative">
            <H className="mx-auto max-w-3xl text-4xl leading-[1.04] tracking-[-0.04em] sm:text-6xl">{title}</H>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{body}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ApplyButton size="lg" location="cta_section" />
              <SecondaryButton href="/how-it-works">See how it works</SecondaryButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
