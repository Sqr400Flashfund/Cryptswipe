import { createFileRoute } from "@tanstack/react-router";
import { Container, CTASection, FAQAccordion, PageHero } from "@/components/site/blocks";
import { faqs } from "@/content/faqs";
import { breadcrumbLd, faqLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo({
      title: "Crypto Card FAQ: Fees, KYC, Wallets | Cryptswipe",
      description:
        "Answers to every Cryptswipe crypto card question: supported wallets and networks, KYC, 0% FX fees, limits, subscriptions and security. Find yours here.",
      path: "/faq",
      jsonLd: [breadcrumbLd([{ name: "FAQ", path: "/faq" }]), faqLd(faqs)],
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ" }]}
        title={<>Crypto card <span className="text-gradient">FAQ</span></>}
        intro="Everything people ask about the Cryptswipe crypto card, in one place."
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <h2 className="sr-only">All questions</h2>
          <FAQAccordion items={faqs} />
        </Container>
      </section>
      <CTASection />
    </>
  );
}
