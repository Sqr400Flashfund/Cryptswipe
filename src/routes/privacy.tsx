import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { breadcrumbLd, seo } from "@/lib/seo";
import { supportEmail } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy | Cryptswipe",
      description: "How Cryptswipe collects, uses and protects your data when you use our crypto virtual card and website. Read what we store, why, and your rights.",
      path: "/privacy",
      jsonLd: [breadcrumbLd([{ name: "Privacy policy", path: "/privacy" }])],
    }),
  component: () => (
    <LegalPage
      title="Privacy policy"
      updated="October 2026"
      intro="What we collect, why we collect it, and the choices you have."
      sections={[
        { h: "Who we are", p: ["Cryptswipe is an independent company. This policy covers cryptswipe.com and the Cryptswipe card dashboard."] },
        { h: "Data we collect", p: ["Your public wallet address, card usage records, the contact details you give us, and basic device and analytics data.", "We never collect or store seed phrases or private keys."] },
        { h: "How we use it", p: ["To issue and run your card, prevent fraud, meet legal obligations, answer support requests, and improve the service."] },
        { h: "Sharing", p: ["We share data only with card issuing partners, payment networks, compliance providers and service vendors who need it to operate the card, or where the law requires."] },
        { h: "Retention", p: ["We keep records for as long as your account is active and as long as financial regulations require afterwards."] },
        { h: "Your rights", p: [`You can request access, correction or deletion of your data by emailing ${supportEmail}. Depending on where you live, you may have further rights.`] },
        { h: "Cookies", p: ["We use essential cookies to run the site and, if enabled, privacy-friendly analytics to understand usage."] },
        { h: "Changes", p: ["We will post any changes on this page and update the date above."] },
      ]}
    />
  ),
});
