import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, PageHero } from "@/components/site/blocks";
import { contactEndpoint, social, supportEmail } from "@/config/site";
import { breadcrumbLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact Cryptswipe Support — Crypto Card Help",
      description:
        "Questions about your Cryptswipe crypto card? Message our support team, email us, or reach us on X, Telegram and Discord. We reply around the clock.",
      path: "/contact",
      jsonLd: [breadcrumbLd([{ name: "Contact", path: "/contact" }])],
    }),
  component: Contact,
});

const input = "mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-subtle";

function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    try {
      const res = await fetch(contactEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }
  return (
    <>
      <PageHero crumbs={[{ name: "Contact" }]} title={<>Contact <span className="text-gradient">Cryptswipe</span></>} intro="Support is available 24/7. Send a message and we'll get back to you." />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card p-7 sm:p-10">
            <h2 className="text-2xl">Send a message</h2>
            <div>
              <label htmlFor="c-name" className="text-sm font-medium">Name</label>
              <input id="c-name" name="name" required autoComplete="name" className={input} />
            </div>
            <div>
              <label htmlFor="c-email" className="text-sm font-medium">Email</label>
              <input id="c-email" name="email" type="email" required autoComplete="email" className={input} />
            </div>
            <div>
              <label htmlFor="c-msg" className="text-sm font-medium">Message</label>
              <textarea id="c-msg" name="message" required rows={6} maxLength={4000} className={input} />
            </div>
            <p className="text-sm text-subtle">Never include your seed phrase or private key. We will never ask for it.</p>
            <button disabled={state === "sending"} className="h-12 rounded-full bg-gradient-lime px-7 font-semibold text-accent-foreground disabled:opacity-60">
              {state === "sending" ? "Sending…" : "Send message"}
            </button>
            <p aria-live="polite" className="text-sm">
              {state === "sent" && <span className="text-lime">Thanks — we've got your message.</span>}
              {state === "error" && <span className="text-destructive">Couldn't send right now. Email us at {supportEmail} instead.</span>}
            </p>
          </form>
          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-7">
              <h2 className="text-xl">Email</h2>
              <a href={`mailto:${supportEmail}`} className="mt-2 block text-cyan underline underline-offset-2">{supportEmail}</a>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <h2 className="text-xl">Community</h2>
              <ul className="mt-3 space-y-2">
                {Object.entries(social).map(([k, v]) => (
                  <li key={k}><a href={v} target="_blank" rel="noopener" className="capitalize text-muted-foreground hover:text-lime">{k === "x" ? "X (Twitter)" : k}</a></li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
