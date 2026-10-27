import { createFileRoute } from "@tanstack/react-router";
import { posts } from "@/content/posts";
import { staticPaths } from "@/content/slugs";
import { siteUrl } from "@/config/site";

const SITE_UPDATED = "2026-10-24";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...staticPaths.map((p) => ({ loc: `${siteUrl}${p === "/" ? "" : p}`, lastmod: SITE_UPDATED })),
          ...posts.map((p) => ({ loc: `${siteUrl}/blog/${p.slug}`, lastmod: p.updated })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
          .map((u) => `<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`)
          .join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
