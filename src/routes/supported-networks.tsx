import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container, CTASection, PageHero, SectionHeading } from "@/components/site/blocks";
import { networks, networkType, tokens, wallets } from "@/content/site-data";
import { breadcrumbLd, seo } from "@/lib/seo";

const filters = ["All", "EVM", "Layer 2", "Non-EVM"] as const;

/** Placeholder availability data — replace before launch. */
const regions = [
  { region: "European Economic Area", status: "Available", note: "Online + Apple Pay / Google Pay" },
  { region: "United Kingdom", status: "Available", note: "Online + Apple Pay / Google Pay" },
  { region: "Latin America", status: "Available", note: "Online merchants" },
  { region: "Africa", status: "Available", note: "Online merchants" },
  { region: "Asia-Pacific", status: "Rolling out", note: "Selected countries" },
  { region: "United States", status: "Coming soon", note: "Join the waitlist via Apply" },
];

export const Route = createFileRoute("/supported-networks")({
  head: () =>
    seo({
      title: "Multi-Chain Crypto Card: Supported Networks | Cryptswipe",
      description:
        "The Cryptswipe multi-chain crypto card supports 100+ networks, from Ethereum and Solana to Base and Tron, plus every major wallet. Check your chain and apply.",
      path: "/supported-networks",
      jsonLd: [breadcrumbLd([{ name: "Supported networks", path: "/supported-networks" }])],
    }),
  component: Networks,
});

function Networks() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const shown = networks.filter((n) => f === "All" || networkType[n] === f);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Supported networks" }]}
        title={<>Supported chains, <span className="text-gradient">tokens and wallets</span></>}
        intro="Cryptswipe is a multi-chain crypto card. Fund it from any of 100+ blockchains and connect from the wallet you already use."
      />

      <section className="py-20">
        <Container>
          <SectionHeading title="Multi-chain crypto card networks" />
          <div role="group" aria-label="Filter networks" className="mt-8 flex flex-wrap gap-2">
            {filters.map((x) => (
              <button
                key={x}
                type="button"
                aria-pressed={f === x}
                onClick={() => setF(x)}
                className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition-colors", f === x ? "border-lime bg-lime text-accent-foreground" : "border-border text-muted-foreground hover:text-foreground")}
              >
                {x}
              </button>
            ))}
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {shown.map((n) => (
              <li key={n} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-semibold">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-subtle">{networkType[n]}</p>
              </li>
            ))}
            <li className="flex items-center rounded-2xl border border-dashed border-lime/50 p-5 font-semibold text-lime">and 80+ more</li>
          </ul>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Popular funding tokens</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {tokens.map((t) => <li key={t} className="rounded-full border border-border bg-card px-4 py-2 font-mono text-sm">{t}</li>)}
            </ul>
            <p className="mt-4 text-sm text-subtle">Any liquid token on a supported chain can be set as a funding source.</p>
          </div>
          <div>
            <h2 className="text-3xl">Supported wallets</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {wallets.map((w) => <li key={w} className="rounded-full border border-border bg-card px-4 py-2 text-sm">{w}</li>)}
              <li className="rounded-full border border-border px-4 py-2 text-sm text-subtle">Any WalletConnect wallet</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-3xl">Card availability by region</h2>
          <p className="mt-3 text-muted-foreground">Cards work at online merchants worldwide. Program availability depends on where you live.</p>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-border">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">Card program availability by region</caption>
              <thead className="bg-card">
                <tr>
                  <th scope="col" className="p-5">Region</th>
                  <th scope="col" className="p-5">Status</th>
                  <th scope="col" className="p-5">Notes</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((r) => (
                  <tr key={r.region} className="border-t border-border">
                    <th scope="row" className="p-5 font-medium">{r.region}</th>
                    <td className={cn("p-5 font-semibold", r.status === "Available" ? "text-lime" : "text-cyan")}>{r.status}</td>
                    <td className="p-5 text-muted-foreground">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
