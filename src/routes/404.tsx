import { createFileRoute } from "@tanstack/react-router";
import { NotFoundView } from "@/components/site/NotFoundView";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/404")({
  head: () =>
    seo({
      title: "Page Not Found | Cryptswipe",
      description: "This page doesn't exist. Search the Cryptswipe blog or jump to How it works, Fees, Supported networks or the FAQ to find what you need.",
      path: "/404",
      noindex: true,
    }),
  component: NotFoundView,
});
