import { createFileRoute } from "@tanstack/react-router";
import { Container, CTASection, PageHero } from "@/components/site/blocks";
import { pressEmail } from "@/config/site";
import { breadcrumbLd, seo } from "@/lib/seo";

const values = [
  { t: "Custody stays with you", b: "We built the card around your wallet, not around a deposit account. If we ever held your funds, we would have failed the brief." },
  { t: "Plain pricing", b: "Free to issue, nothing monthly, 0% FX. The swap fee is shown before you confirm, every time." },
  { t: "Every chain matters", b: "People hold value on dozens of networks. A crypto card should spend from all of them." },
];

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Cryptswipe — The Multi-Chain Crypto Card",
      description:
        "Cryptswipe makes crypto spendable everywhere without giving up custody. Learn who builds the multi-chain crypto card and why. Meet the team behind it.",
      path: "/about",
      jsonLd: [breadcrumbLd([{ name: "About", path: "/about" }])],
    }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About" }]}
        title={<>About <span className="text-gradient">Cryptswipe</span></>}
        intro="Our mission: make crypto spendable everywhere, without asking you to surrender custody."
      />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg text-muted-foreground">
            <h2 className="text-3xl text-foreground">Why we built a multi-chain crypto card</h2>
            <p>Most crypto cards ask you to move funds onto an exchange first. That adds days, fees and risk. We thought your wallet should just work at checkout.</p>
            <p>Cryptswipe links a virtual card straight to the wallet you already use. You pick the network and token. We handle the swap at the moment you pay, for exactly that amount.</p>
            <p>Cryptswipe is an independent company. Press and partnerships: <a className="text-cyan underline underline-offset-2" href={`mailto:${pressEmail}`}>{pressEmail}</a>.</p>
          </div>
          <ul className="space-y-4">
            {values.map((v) => (
              <li key={v.t} className="rounded-3xl border border-border bg-card p-7">
                <h3 className="text-xl tracking-[-0.02em]">{v.t}</h3>
                <p className="mt-2 text-muted-foreground">{v.b}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
