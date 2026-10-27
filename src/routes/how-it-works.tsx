import { createFileRoute } from "@tanstack/react-router";
import { ApplyButton } from "@/components/site/ApplyButton";
import { CardMockup } from "@/components/site/CardMockup";
import { Container, CTASection, FAQAccordion, PageHero, SectionHeading } from "@/components/site/blocks";
import { Reveal } from "@/components/site/Reveal";
import { faqs } from "@/content/faqs";
import { breadcrumbLd, faqLd, productLd, seo, abs } from "@/lib/seo";

const detailed = [
  {
    title: "Connect your wallet",
    body: [
      "Tap Apply for Card. Choose WalletConnect to scan a QR code with your mobile wallet, or open cryptswipe.com inside your wallet's own browser and approve the connection in one tap.",
      "Connecting only shares your public address. You never type a seed phrase or private key.",
    ],
  },
  {
    title: "Choose your network",
    body: [
      "Pick the chain and token that will fund the card: SOL on Solana, USDC on Base, ETH on Ethereum, BNB on BNB Chain, USDT on Tron and 100+ more.",
      "You can change the funding token later, and run different cards from different tokens.",
    ],
  },
  {
    title: "Get your virtual card",
    body: [
      "Your card number, expiry and dynamic CVV appear within about 60 seconds. Use it at any online checkout that takes cards.",
      "Add it to Apple Pay or Google Pay to tap in store. Each payment asks your wallet to sign before it settles.",
    ],
  },
];

const walletGuides = [
  { name: "Trust Wallet", how: "Open the Browser tab, enter cryptswipe.com, tap Apply for Card and approve the connection." },
  { name: "MetaMask Mobile", how: "Tap the Browser icon, visit cryptswipe.com, then choose MetaMask when asked to connect." },
  { name: "Phantom", how: "Tap the Explore (globe) tab, search cryptswipe.com and approve the Solana connection request." },
  { name: "OKX Wallet", how: "Go to Discover, open the dApp browser, load cryptswipe.com and confirm the connection." },
  { name: "Binance Web3", how: "In the Binance app switch to Web3 Wallet, open Discover, enter cryptswipe.com and connect." },
];

const glossary = [
  { term: "Virtual card", def: "A card number, expiry date and CVV that exists only digitally. It works anywhere online and in mobile wallets like Apple Pay." },
  { term: "Non-custodial", def: "A setup where you, not a company, hold the keys to your crypto. Cryptswipe never takes possession of your funds." },
  { term: "WalletConnect", def: "An open protocol that links a mobile or desktop wallet to an app by scanning a QR code, without sharing private keys." },
  { term: "Liquidity router", def: "Software that finds the best on-chain route to swap your token into the currency a merchant charges, at the moment of payment." },
  { term: "3-D Secure", def: "An extra authentication step used by card networks to confirm it is really you at an online checkout." },
  { term: "Dynamic CVV", def: "A card security code that changes over time, so a leaked code quickly becomes useless." },
];

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    seo({
      title: "How a Crypto Virtual Card Works | Cryptswipe",
      description:
        "See how the Cryptswipe crypto virtual card works: connect your wallet, choose a network, and get a card in under 60 seconds. Start spending crypto today.",
      path: "/how-it-works",
      jsonLd: [
        breadcrumbLd([{ name: "How it works", path: "/how-it-works" }]),
        productLd,
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to get a Cryptswipe crypto virtual card",
          totalTime: "PT1M",
          estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
          step: detailed.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body.join(" "), url: `${abs("/how-it-works")}#step-${i + 1}` })),
        },
        faqLd(faqs.slice(0, 4)),
      ],
    }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "How it works" }]}
        title={<>How Cryptswipe <span className="text-gradient">works</span></>}
        intro="A crypto virtual card is a card number that spends directly from your wallet. Here is how Cryptswipe turns any wallet into one in three steps."
      >
        <div className="mt-9"><ApplyButton size="lg" location="hiw_hero" /></div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="space-y-20">
          {detailed.map((s, i) => (
            <Reveal key={s.title} className="grid items-center gap-10 lg:grid-cols-2">
              <div id={`step-${i + 1}`} className={i % 2 ? "lg:order-2" : ""}>
                <p className="font-display text-6xl font-extrabold tracking-[-0.05em] text-gradient">0{i + 1}</p>
                <h2 className="mt-3 text-3xl sm:text-4xl">{s.title}</h2>
                {s.body.map((p) => <p key={p} className="mt-4 text-lg text-muted-foreground">{p}</p>)}
              </div>
              <StepVisual index={i} />
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="border-y border-border bg-card py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="In-app browsers" title="Using Cryptswipe inside your wallet browser" intro="The fastest way to connect is to open cryptswipe.com from inside your wallet. One tap, no QR code." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {walletGuides.map((w) => (
              <article key={w.name} className="rounded-3xl border border-border bg-background p-7">
                <h3 className="text-xl tracking-[-0.02em]">{w.name}</h3>
                <p className="mt-3 text-muted-foreground">{w.how}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Glossary" title="Key terms, in plain English" />
          <dl className="mt-12 grid gap-5 md:grid-cols-2">
            {glossary.map((g) => (
              <div key={g.term} className="rounded-3xl border border-border bg-card p-7">
                <dt className="text-lg font-semibold text-lime">{g.term}</dt>
                <dd className="mt-2 text-muted-foreground">{g.def}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="pb-8">
        <Container className="max-w-4xl">
          <h2 className="mb-8 text-3xl sm:text-4xl">Common questions</h2>
          <FAQAccordion items={faqs.slice(0, 4)} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}

function StepVisual({ index }: { index: number }) {
  if (index === 2) return <div className="mx-auto w-full max-w-md [container-type:inline-size]"><CardMockup /></div>;
  const items = index === 0 ? ["WalletConnect", "Trust Wallet", "MetaMask", "Phantom"] : ["SOL · Solana", "USDC · Base", "ETH · Ethereum", "BNB · BNB Chain"];
  return (
    <div role="img" aria-label={index === 0 ? "Wallet connection options" : "Network and token selection"} className="relative mx-auto w-full max-w-md overflow-hidden rounded-[32px] border border-border bg-card p-6">
      <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72" style={{ background: "var(--glow-violet)" }} />
      <p className="relative text-sm font-semibold text-subtle">{index === 0 ? "Connect a wallet" : "Fund your card from"}</p>
      <ul className="relative mt-4 space-y-3">
        {items.map((it, i) => (
          <li key={it} className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 ${i === 0 ? "border-lime bg-lime/10 text-foreground" : "border-border text-muted-foreground"}`}>
            {it}
            <span aria-hidden className={`size-2.5 rounded-full ${i === 0 ? "bg-lime" : "bg-foreground/20"}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
