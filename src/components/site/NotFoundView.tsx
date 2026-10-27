import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Container } from "./blocks";

const top = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/supported-networks", label: "Supported networks" },
  { to: "/fees", label: "Fees & limits" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blog" },
] as const;

export function NotFoundView() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2" style={{ background: "var(--glow-violet)" }} />
      <Container className="relative max-w-2xl text-center">
        <p className="font-display text-8xl font-extrabold tracking-[-0.05em] text-gradient">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">This page swiped left.</h1>
        <p className="mt-4 text-muted-foreground">The page you're looking for doesn't exist or has moved. Search the blog or jump to a popular page.</p>
        <form
          role="search"
          className="mx-auto mt-8 flex max-w-md gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/blog", search: { q: q || undefined } });
          }}
        >
          <label htmlFor="nf-q" className="sr-only">Search articles</label>
          <input id="nf-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="h-12 flex-1 rounded-full border border-input bg-card px-5 text-foreground placeholder:text-subtle" />
          <button type="submit" aria-label="Search" className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Search className="size-5" />
          </button>
        </form>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {top.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-lime hover:text-lime">{l.label}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
