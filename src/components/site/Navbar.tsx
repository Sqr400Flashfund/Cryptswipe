import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ApplyButton } from "./ApplyButton";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-compact.webp.asset.json";

export const navLinks = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/supported-networks", label: "Networks" },
  { to: "/fees", label: "Fees" },
  { to: "/security", label: "Security" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="glass sticky top-0 z-50 border-b border-border">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground">
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center" aria-label="Cryptswipe home">
          <img src={logo.url} srcSet={`${logo.url} 254w, /brand/logo-white.webp 450w`} sizes="127px" alt="Cryptswipe" width={141} height={40} decoding="async" className="h-9 w-auto" />
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground bg-foreground/5" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <ApplyButton size="sm" location="navbar" />
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls={open ? "mobile-nav" : undefined}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>
      {open && (
        <div id="mobile-nav" className="border-t border-border px-5 pb-6 lg:hidden">
          <ul className="flex flex-col py-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-base font-medium text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ApplyButton className="w-full" location="mobile_nav" />
        </div>
      )}
    </header>
  );
}
