import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import interFont from "@fontsource-variable/inter/files/inter-latin-opsz-normal.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { NotFoundView } from "@/components/site/NotFoundView";
import { organizationLd } from "@/lib/seo";
import { ga4Id } from "@/config/site";
import { useAnalytics } from "@/lib/analytics";
import { deferMotion } from "@/lib/defer-motion";

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl">This page didn't load</h1>
        <p className="mt-2 text-muted-foreground">Something went wrong on our end. Try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            Try again
          </button>
          <Link to="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const gaEnabled = !ga4Id.includes("XXXX");

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A0E1A" },
      { title: "Cryptswipe — Spend crypto anywhere online" },
      { name: "author", content: "Cryptswipe" },
      { property: "og:site_name", content: "Cryptswipe" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preload", href: interFont, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
      { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon-64.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96.png" },
      { rel: "icon", type: "image/svg+xml", href: "/brand/cryptswipe-icon.svg" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "alternate", type: "application/rss+xml", title: "Cryptswipe Blog", href: "/rss.xml" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationLd) },
      ...(gaEnabled
        ? [
            { src: `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`, async: true },
            { children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga4Id}');` },
          ]
        : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundView,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RTWT72D0ZG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RTWT72D0ZG');
</script>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useAnalytics();
  useEffect(() => {
    const cancel = deferMotion(() => {
      document.documentElement.dataset['motionReady'] = "true";
    });
    return () => {
      cancel();
      delete document.documentElement.dataset['motionReady'];
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
