import { createFileRoute } from "@tanstack/react-router";
import { posts } from "@/content/posts";
import { siteUrl } from "@/config/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: () => {
        const items = posts
          .map(
            (p) => `<item><title>${esc(p.title)}</title><link>${siteUrl}/blog/${p.slug}</link><guid>${siteUrl}/blog/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><category>${p.category}</category><description>${esc(p.description)}</description></item>`,
          )
          .join("");
        const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Cryptswipe Blog</title><link>${siteUrl}/blog</link><atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/><description>Guides to spending crypto online with a virtual card.</description><language>en</language>${items}</channel></rss>`;
        return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
      },
    },
  },
});
