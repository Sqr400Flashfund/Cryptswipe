import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ApplyButton } from "@/components/site/ApplyButton";
import { Container } from "@/components/site/blocks";
import { APPLY_URL } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/apply")({
  head: () => {
    const h = seo({
      title: "Apply for Your Crypto Card | Cryptswipe",
      description: "Redirecting you to the Cryptswipe application. Connect your wallet, choose a network and get your crypto virtual card in under a minute.",
      path: "/apply",
      noindex: true,
    });
    return { ...h, meta: [...h.meta, { httpEquiv: "refresh", content: `2;url=${APPLY_URL}` }] };
  },
  component: Apply,
});

function Apply() {
  useEffect(() => {
    const t = setTimeout(() => window.location.assign(APPLY_URL), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <section className="py-32">
      <Container className="max-w-xl text-center">
        <h1 className="text-4xl">Taking you to the application…</h1>
        <p className="mt-4 text-muted-foreground">If nothing happens, use the button below.</p>
        <div className="mt-8"><ApplyButton size="lg" location="apply_stub" /></div>
      </Container>
    </section>
  );
}
