import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ApplyButton, SecondaryButton } from "@/components/site/ApplyButton";
import { CardMockup } from "@/components/site/CardMockup";
import { Reveal } from "@/components/site/Reveal";
import { BlogCard, ComparisonTable, Container, CTASection, Eyebrow, FAQAccordion, SectionHeading, StepList } from "@/components/site/blocks";
import { comparison, features, securityPoints, steps, useCases, wallets } from "@/content/site-data";
import { homeFaqs } from "@/content/faqs";
import { postSummaries } from "@/content/post-summaries";
import { faqLd, productLd, seo } from "@/lib/seo";
import { siteName, siteUrl } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Crypto Virtual Card — Spend Crypto Online | Cryptswipe",
      description:
        "Cryptswipe is a crypto virtual card that links to any wallet. Spend crypto online on 100+ networks at 0% FX, issued in under 60 seconds. Apply for your card.",
      path: "/",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: siteUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/blog?q={search_term_string}` },
            "query-input": "required name=search_term_string",
          },
        },
        productLd,
        faqLd(homeFaqs),
      ],
    }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="grain relative overflow-hidden">
        <div aria-hidden className="grid-lines absolute inset-0" />
        <div aria-hidden className="absolute -left-40 -top-40 h-[640px] w-[640px]" style={{ background: "var(--glow-violet)" }} />
        <div aria-hidden className="absolute -right-20 top-40 h-[480px] w-[480px]" style={{ background: "var(--glow-cyan)" }} />
        <Container className="relative grid items-center gap-14 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-lime" aria-hidden /> The crypto virtual card for any wallet
            </p>
            <h1 className="mt-6 text-5xl leading-[0.98] tracking-[-0.045em] sm:text-7xl xl:text-[5.25rem]">
              Spend crypto
              <br />
              <span className="text-gradient">anywhere online.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Connect your wallet, pick the network, get a virtual card in seconds. No bank account. No off-ramp hassle.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ApplyButton size="lg" location="hero" />
              <SecondaryButton href="#how-it-works">See how it works</SecondaryButton>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[520px] [container-type:inline-size]">
            <CardMockup />
          </div>
        </Container>
        <div className="relative border-y border-border bg-card/60">
          <Container>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-5 text-sm font-medium text-muted-foreground">
              {["Works with every wallet", "100+ networks", "0% FX fees", "Instant issuance"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="size-1.5 rounded-full bg-lime" />
                  {t}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* 2. Wallets */}
      <section className="py-16" aria-labelledby="wallets-h">
        <Container>
          <h2 id="wallets-h" className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-subtle">
            Works with the wallet you already use
          </h2>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {wallets.map((w) => (
              <li key={w} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground">
                {w}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. How it works */}
      <section id="how-it-works" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title={<>Your wallet becomes a card <span className="text-gradient">in three steps</span></>} />
          <div className="mt-14">
            <StepList steps={steps} />
          </div>
          <Link to="/how-it-works" className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan hover:text-lime">
            Read the full walkthrough <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>

      {/* 4. Features */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Features" title={<>Built for people who <span className="text-gradient">actually live on-chain</span></>} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 50} className="rounded-3xl border border-border bg-card p-7 transition-colors hover:border-foreground/25">
                <f.icon aria-hidden className="size-7 text-lime" />
                <h3 className="mt-6 text-xl tracking-[-0.02em]">{f.title}</h3>
                <p className="mt-3 text-muted-foreground">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Security */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grain relative overflow-hidden rounded-[40px] border border-border bg-card p-8 sm:p-14">
            <div aria-hidden className="absolute -right-40 -top-40 h-[520px] w-[520px]" style={{ background: "var(--glow-violet)" }} />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <Eyebrow>Security</Eyebrow>
                <h2 className="mt-3 text-4xl leading-[1.04] sm:text-5xl">
                  Your keys <span className="text-gradient">stay yours.</span>
                </h2>
                <p className="mt-5 text-lg text-muted-foreground">
                  Cryptswipe never takes custody. Your crypto moves only when you pay, and only for that amount.
                </p>
                <Link to="/security" className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan hover:text-lime">
                  How we protect you <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {securityPoints.map((s) => (
                  <li key={s.title} className="flex gap-4 rounded-2xl border border-border bg-background/60 p-5">
                    <s.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-lime" />
                    <div>
                      <h3 className="text-base font-semibold tracking-normal">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Use cases */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Use cases" title={<>One card for <span className="text-gradient">everything you pay for online</span></>} />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <li key={u.title} className="bg-background p-7">
                <u.icon aria-hidden className="size-6 text-cyan" />
                <h3 className="mt-5 text-lg tracking-[-0.02em]">{u.title}</h3>
                <p className="mt-2 text-muted-foreground">{u.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 7. Comparison */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Compare" title={<>The faster way to <span className="text-gradient">spend crypto online</span></>} intro="How a Cryptswipe crypto virtual card stacks up against the usual options." />
          <div className="mt-12">
            <ComparisonTable caption="Cryptswipe compared with traditional crypto cards and selling crypto to a bank" columns={comparison.columns} rows={comparison.rows} />
          </div>
        </Container>
      </section>

      {/* 8. Stats */}
      <section aria-label="Key numbers" className="border-y border-border bg-card">
        <Container>
          <dl className="grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x">
            {[
              ["100+", "networks"],
              ["<60s", "issuance"],
              ["0%", "FX fees"],
              ["24/7", "support"],
            ].map(([n, l]) => (
              <div key={l} className="px-4 py-10 text-center">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="block font-display text-5xl font-extrabold tracking-[-0.04em] text-gradient sm:text-6xl">{n}</span>
                  <span className="mt-2 block text-sm uppercase tracking-[0.18em] text-subtle">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 9. FAQ */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="FAQ" title="Questions, answered." />
            <Link to="/faq" className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan hover:text-lime">
              See all questions <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <FAQAccordion items={homeFaqs} />
        </Container>
      </section>

      {/* 10. Blog */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="From the blog" title="Guides for spending crypto" />
            <Link to="/blog" className="inline-flex items-center gap-2 font-semibold text-cyan hover:text-lime">
              All articles <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {postSummaries.slice(0, 3).map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* 11. Final CTA */}
      <CTASection />
    </>
  );
}
