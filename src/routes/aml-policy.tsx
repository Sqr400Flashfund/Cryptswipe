import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { breadcrumbLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/aml-policy")({
  head: () =>
    seo({
      title: "AML & Compliance Policy | Cryptswipe",
      description: "How Cryptswipe prevents money laundering and financial crime: risk-based verification tiers, on-chain screening, sanctions checks and reporting. Read more.",
      path: "/aml-policy",
      jsonLd: [breadcrumbLd([{ name: "AML policy", path: "/aml-policy" }])],
    }),
  component: () => (
    <LegalPage
      title="AML policy"
      updated="October 2026"
      intro="Our approach to anti-money-laundering and counter-terrorist-financing controls."
      sections={[
        { h: "Purpose", p: ["Cryptswipe is committed to preventing its card program from being used for money laundering, terrorist financing or sanctions evasion."] },
        { h: "Risk-based tiers", p: ["Standard cards use on-chain credential checks with lower limits. Higher limits require Tier 2 verification using zero-knowledge proofs through regulated partners."] },
        { h: "Wallet screening", p: ["Connected wallet addresses are screened against sanctions lists and known illicit-activity sources before and during card use."] },
        { h: "Transaction monitoring", p: ["Card activity is monitored for unusual patterns. We may request more information or pause a card while we review."] },
        { h: "Reporting", p: ["Where required, suspicious activity is reported to the relevant authorities."] },
        { h: "Record keeping", p: ["Compliance records are retained for the periods required by applicable law."] },
      ]}
    />
  ),
});
