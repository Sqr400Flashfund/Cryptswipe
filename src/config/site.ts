/**
 * Single source of truth for site-wide settings.
 * See README → "Things to change before launch".
 */
export const siteUrl = "https://cryptswipe.com";
export const siteName = "Cryptswipe";
export const tagline = "Your crypto. Every checkout.";

/** Every "Apply for Card" button links here (same tab). */
export const APPLY_URL = "https://cryptswipe.online";

export const supportEmail = "support@cryptswipe.com";
export const securityEmail = "security@cryptswipe.com";
export const pressEmail = "hello@cryptswipe.com";

/** Contact form POST target (placeholder). */
export const contactEndpoint = "https://api.cryptswipe.com/contact";

export const social = {
  x: "https://x.com/cryptswipe",
  telegram: "https://t.me/cryptswipe",
  discord: "https://discord.gg/cryptswipe",
  linkedin: "https://www.linkedin.com/company/cryptswipe",
} as const;

/** GA4 measurement ID. Leave as placeholder to disable analytics. */
export const ga4Id = "G-XXXXXXXXXX";

/** Card limits in USD (placeholder values — edit freely). */
export const limits = {
  tier1Daily: 2500,
  tier1Monthly: 10000,
  tier2Daily: 25000,
  tier2Monthly: 100000,
} as const;

export const defaultOgImage = `${siteUrl}/brand/social-og-1200x630.png`;
export const logoUrl = `${siteUrl}/brand/cryptswipe-icon-1024.png`;
