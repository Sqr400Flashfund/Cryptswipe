import { createFileRoute } from "@tanstack/react-router";
import { Container, CTASection, PageHero } from "@/components/site/blocks";
import { limits } from "@/config/site";
import { breadcrumbLd, seo } from "@/lib/seo";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const fees = [
  ["Card issuance", "$0"],
  ["Monthly fee", "$0"],
  ["Foreign transaction (FX) fee", "0%"],
  ["Swap / network fee", "Shown before each transaction"],
  ["Card reissue", "$0"],
  ["ATM withdrawal", "Not applicable (virtual card)"],
];

export const Route = createFileRoute("/fees")({
  head: () =>
    seo({
      title: "Crypto Card 0% FX Fees & Limits | Cryptswipe",
      description:
        "Cryptswipe crypto card fees: $0 issuance, $0 monthly, 0% FX fees. The swap fee is shown before every payment. See daily and monthly limits, then apply.",
      path: "/fees",
      jsonLd: [breadcrumbLd([{ name: "Fees & limits", path: "/fees" }])],
    }),
  component: Fees,
});

function Fees() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Fees & limits" }]}
        title={<>Fees and <span className="text-gradient">limits</span></>}
        intro="A crypto card with 0% FX fees, free issuance and no monthly charge. The only cost is a small swap and network fee, and you see it before you confirm."
      />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">0% FX fees, no hidden costs</h2>
            <dl className="mt-8 divide-y divide-border rounded-3xl border border-border bg-card">
              {fees.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 p-5">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-semibold text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-3xl">Limits by tier</h2>
            <div className="mt-8 overflow-x-auto rounded-3xl border border-border">
              <table className="w-full text-left">
                <caption className="sr-only">Spending limits by verification tier</caption>
                <thead className="bg-card">
                  <tr>
                    <th scope="col" className="p-5">Tier</th>
                    <th scope="col" className="p-5">Daily</th>
                    <th scope="col" className="p-5">Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <th scope="row" className="p-5 font-medium">Standard<span className="block text-sm font-normal text-subtle">Instant, on-chain check</span></th>
                    <td className="p-5">{usd(limits.tier1Daily)}</td>
                    <td className="p-5">{usd(limits.tier1Monthly)}</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="p-5 font-medium">Tier 2<span className="block text-sm font-normal text-subtle">Zero-knowledge compliance</span></th>
                    <td className="p-5">{usd(limits.tier2Daily)}</td>
                    <td className="p-5">{usd(limits.tier2Monthly)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-subtle">Limits apply per card. You can create multiple cards and set lower caps on any of them.</p>
          </div>
        </Container>
      </section>
      <section className="pb-8">
        <Container>
          <div className="rounded-3xl border border-lime/40 bg-lime/5 p-8">
            <h2 className="text-2xl">No hidden fees. Ever.</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Before every payment you see the exact token amount and the swap and network fee. Conversions use the interbank spot rate with no markup. If a fee is not on screen, you do not pay it.
            </p>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
