import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { Container, CTASection, PageHero, SectionHeading } from "@/components/site/blocks";
import { securityPoints } from "@/content/site-data";
import { securityEmail } from "@/config/site";
import { breadcrumbLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/security")({
  head: () =>
    seo({
      title: "Non-Custodial Crypto Card Security | Cryptswipe",
      description:
        "How the Cryptswipe non-custodial crypto card keeps you safe: wallet signature on every payment, dynamic CVV, 3-D Secure and encryption. Read the details.",
      path: "/security",
      jsonLd: [breadcrumbLd([{ name: "Security", path: "/security" }])],
    }),
  component: Security,
});

function Security() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Security" }]}
        title={<>Security at <span className="text-gradient">Cryptswipe</span></>}
        intro="Cryptswipe is a non-custodial crypto card. Your crypto stays in your wallet, and nothing moves without your signature."
      />
      <section className="py-10">
        <Container>
          <div role="note" className="flex items-start gap-4 rounded-3xl border border-lime/50 bg-lime/10 p-6 sm:items-center">
            <ShieldAlert aria-hidden className="size-7 shrink-0 text-lime" />
            <p className="text-lg font-semibold">We will never ask for your seed phrase. Anyone who does, claiming to be Cryptswipe, is a scammer.</p>
          </div>
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="The model" title="How a non-custodial crypto card works" />
            <p className="mt-5 text-lg text-muted-foreground">
              Your tokens never leave your wallet to sit with us. At checkout, the card network asks for approval, your wallet signs, and the router swaps exactly the amount needed. The merchant gets paid in their currency.
            </p>
          </div>
          <CustodyDiagram />
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <h2 className="text-3xl sm:text-4xl">Protection on every layer</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {securityPoints.map((s) => (
              <li key={s.title} className="rounded-3xl border border-border bg-card p-6">
                <s.icon aria-hidden className="size-6 text-lime" />
                <h3 className="mt-5 text-lg tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-2xl">Responsible disclosure</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Found a vulnerability? Email <a className="text-cyan underline underline-offset-2" href={`mailto:${securityEmail}`}>{securityEmail}</a> with steps to reproduce. We reply within two business days and will not take action against good-faith research.
            </p>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}

function CustodyDiagram() {
  const box = "fill-[#0E1326] stroke-[rgb(255_255_255/0.2)]";
  return (
    <svg viewBox="0 0 520 300" role="img" aria-labelledby="cd-t" className="w-full">
      <title id="cd-t">Diagram: your wallet signs, the liquidity router swaps the exact amount, the merchant is paid. Cryptswipe never holds funds.</title>
      <defs>
        <linearGradient id="cdg" x1="0" x2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 10 5 0 10z" fill="#C6FF3D" />
        </marker>
      </defs>
      <rect x="10" y="30" width="150" height="90" rx="20" className={box} />
      <text x="85" y="70" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="16">Your wallet</text>
      <text x="85" y="94" textAnchor="middle" fill="rgb(255 255 255 / .6)" fontSize="12">keys + funds stay here</text>
      <rect x="185" y="30" width="150" height="90" rx="20" fill="url(#cdg)" opacity=".9" />
      <text x="260" y="70" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="16">Liquidity router</text>
      <text x="260" y="94" textAnchor="middle" fill="#fff" fontSize="12">swaps exact amount</text>
      <rect x="360" y="30" width="150" height="90" rx="20" className={box} />
      <text x="435" y="70" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="16">Merchant</text>
      <text x="435" y="94" textAnchor="middle" fill="rgb(255 255 255 / .6)" fontSize="12">paid in local currency</text>
      <path d="M160 75h22M335 75h22" stroke="#C6FF3D" strokeWidth="2.5" markerEnd="url(#arr)" />
      <rect x="110" y="190" width="300" height="80" rx="20" className={box} strokeDasharray="6 6" />
      <text x="260" y="226" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="15">Cryptswipe card</text>
      <text x="260" y="248" textAnchor="middle" fill="rgb(255 255 255 / .6)" fontSize="12">requests your signature · never holds funds</text>
      <path d="M260 190v-66" stroke="rgb(255 255 255 / .35)" strokeWidth="2" strokeDasharray="4 5" />
      <path d="M85 120v60c0 10 10 10 25 20" stroke="rgb(255 255 255 / .35)" strokeWidth="2" fill="none" strokeDasharray="4 5" />
      <text x="20" y="160" fill="#C6FF3D" fontSize="12" fontWeight="600">sign ✓</text>
    </svg>
  );
}
