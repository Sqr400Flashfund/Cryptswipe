import { defaultOgImage, siteName, siteUrl, logoUrl, social } from "@/config/site";
import type { Faq } from "@/content/faqs";

interface SeoInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
  jsonLd?: object[];
  extraLinks?: { rel: string; href: string }[];
}

export const abs = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

/** Build a TanStack route head() payload with full SEO tags. */
export function seo({ title, description, path, type = "website", image = defaultOgImage, noindex, jsonLd = [], extraLinks = [] }: SeoInput) {
  const url = abs(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: noindex ? "noindex,follow" : "index,follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:site_name", content: siteName },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }, ...extraLinks],
    scripts: jsonLd.map((j) => ({ type: "application/ld+json", children: JSON.stringify(j) })),
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: logoUrl,
  sameAs: Object.values(social),
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(list: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export const productLd = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  name: "Cryptswipe Multi-Chain Virtual Card",
  description:
    "A non-custodial virtual card that links to any crypto wallet so you can spend crypto online and on subscriptions at 0% FX.",
  brand: { "@type": "Brand", name: siteName },
  provider: { "@type": "Organization", name: siteName, url: siteUrl },
  url: abs("/how-it-works"),
  image: logoUrl,
  feesAndCommissionsSpecification: "Free issuance, no monthly fee, 0% foreign transaction fees. Network/swap fee shown before each transaction.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};
