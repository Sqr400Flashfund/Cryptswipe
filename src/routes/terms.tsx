import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { breadcrumbLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({
      title: "Terms of Service | Cryptswipe",
      description: "The terms that apply when you use the Cryptswipe crypto virtual card and website: eligibility, card use, fees, limits and your responsibilities. Read them.",
      path: "/terms",
      jsonLd: [breadcrumbLd([{ name: "Terms of service", path: "/terms" }])],
    }),
  component: () => (
    <LegalPage
      title="Terms of service"
      updated="October 2026"
      intro="The agreement between you and Cryptswipe when you use our card and site."
      sections={[
        { h: "Acceptance", p: ["By applying for or using a Cryptswipe card you agree to these terms and to the card issuer's cardholder agreement."] },
        { h: "Eligibility", p: ["You must be of legal age where you live and reside in a region where the card program is available."] },
        { h: "Your wallet", p: ["You remain solely responsible for your wallet, keys and seed phrase. Cryptswipe cannot recover lost keys."] },
        { h: "Using the card", p: ["Each transaction requires your wallet's authorisation. The crypto amount is locked at authorisation and shown before you confirm."] },
        { h: "Fees and limits", p: ["Fees and limits are listed on the Fees page. We will notify you before changing them."] },
        { h: "Prohibited use", p: ["You may not use the card for illegal activity, sanctioned parties or to evade compliance controls."] },
        { h: "Suspension", p: ["We may freeze or close a card to protect you, comply with law, or stop misuse."] },
        { h: "Liability", p: ["Crypto prices move. Cryptswipe is not liable for market losses or for failures of third-party networks or wallets."] },
      ]}
    />
  ),
});
