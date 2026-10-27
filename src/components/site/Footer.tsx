import { Link } from "@tanstack/react-router";
import { social, supportEmail, tagline } from "@/config/site";
import logo from "@/assets/logo-compact.webp.asset.json";

const cols = [
  {
    title: "Product",
    links: [
      { to: "/how-it-works", label: "How it works" },
      { to: "/supported-networks", label: "Supported networks" },
      { to: "/fees", label: "Fees & limits" },
      { to: "/security", label: "Security" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy policy" },
      { to: "/terms", label: "Terms of service" },
      { to: "/aml-policy", label: "AML policy" },
    ],
  },
] as const;

const socials = [
  { href: social.x, label: "X" },
  { href: social.telegram, label: "Telegram" },
  { href: social.discord, label: "Discord" },
  { href: social.linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <img src={logo.url} srcSet={`${logo.url} 254w, /brand/logo-white.webp 450w`} sizes="141px" alt="Cryptswipe" width={141} height={40} loading="lazy" decoding="async" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-muted-foreground">{tagline} A virtual card that spends straight from the wallet you already use.</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" className="inline-flex rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-lime hover:text-lime">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-subtle">
            Support: <a className="underline underline-offset-2 hover:text-foreground" href={`mailto:${supportEmail}`}>{supportEmail}</a>
          </p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-subtle">{c.title}</h2>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-subtle sm:flex-row sm:justify-between lg:px-8">
          <p>© Cryptswipe. All rights reserved.</p>
          <p>Crypto values can go up or down.</p>
        </div>
      </div>
    </footer>
  );
}
