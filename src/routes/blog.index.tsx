import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogCard, Container, PageHero } from "@/components/site/blocks";
import { categories, posts } from "@/content/posts";
import type { PostCategory } from "@/content/types";
import { breadcrumbLd, seo } from "@/lib/seo";

const PER_PAGE = 9;

interface BlogSearch {
  page?: number | undefined;
  category?: PostCategory | undefined;
  q?: string | undefined;
}

export const Route = createFileRoute("/blog/")({
  validateSearch: (s: Record<string, unknown>): BlogSearch => ({
    page: Number(s['page']) > 1 ? Math.floor(Number(s['page'])) : undefined,
    category: categories.includes(s['category'] as PostCategory) ? (s['category'] as PostCategory) : undefined,
    q: typeof s['q'] === "string" && s['q'].trim() ? s['q'].slice(0, 80) : undefined,
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    const q = deps.q?.toLowerCase();
    const filtered = posts.filter(
      (p) => (!deps['category'] || p.category === deps['category']) && (!q || `${p.title} ${p.description} ${p.keyword}`.toLowerCase().includes(q)),
    );
    const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const page = Math.min(deps['page'] ?? 1, pages);
    return { page, pages, total: filtered.length, slugs: filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((p) => p.slug), filtered: !!(deps['category'] || deps['q']) };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page ?? 1;
    const pages = loaderData?.pages ?? 1;
    const path = page > 1 ? `/blog?page=${page}` : "/blog";
    const links: { rel: string; href: string }[] = [];
    if (page > 1) links.push({ rel: "prev", href: page === 2 ? "https://cryptswipe.com/blog" : `https://cryptswipe.com/blog?page=${page - 1}` });
    if (page < pages) links.push({ rel: "next", href: `https://cryptswipe.com/blog?page=${page + 1}` });
    return seo({
      title: page > 1 ? `Crypto Card Blog (Page ${page}) | Cryptswipe` : "Crypto Card Blog: How to Spend Crypto Online | Cryptswipe",
      description:
        "Guides, comparisons and security deep-dives on crypto virtual cards: how to spend crypto online, pay subscriptions and keep your keys safe. Start reading.",
      path,
      noindex: !!loaderData?.filtered,
      extraLinks: links,
      jsonLd: [breadcrumbLd([{ name: "Blog", path: "/blog" }])],
    });
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { page, pages, slugs, total } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/blog/" });
  const list = slugs.map((s) => posts.find((p) => p.slug === s)!);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog" }]}
        title={<>The Cryptswipe <span className="text-gradient">blog</span></>}
        intro="Practical guides to spend crypto online, honest comparisons of crypto cards, and security explainers."
      />
      <section className="py-16">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap gap-2" aria-label="Categories">
              <li>
                <Link to="/blog" search={{ q: search.q }} className={cn("inline-flex rounded-full border px-4 py-2 text-sm font-semibold", !search.category ? "border-lime bg-lime text-accent-foreground" : "border-border text-muted-foreground hover:text-foreground")}>All</Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link to="/blog" search={{ category: c, q: search.q }} className={cn("inline-flex rounded-full border px-4 py-2 text-sm font-semibold", search.category === c ? "border-lime bg-lime text-accent-foreground" : "border-border text-muted-foreground hover:text-foreground")}>{c}</Link>
                </li>
              ))}
            </ul>
            <form
              role="search"
              className="relative w-full lg:w-80"
              onSubmit={(e) => {
                e.preventDefault();
                const q = String(new FormData(e.currentTarget).get("q") || "");
                navigate({ search: (s) => ({ ...s, q: q || undefined, page: undefined }) });
              }}
            >
              <label htmlFor="blog-q" className="sr-only">Search articles</label>
              <input id="blog-q" name="q" defaultValue={search.q} placeholder="Search articles…" className="h-11 w-full rounded-full border border-input bg-card pl-5 pr-11 text-foreground placeholder:text-subtle" />
              <button aria-label="Search" className="absolute right-1.5 top-1.5 inline-flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground"><Search className="size-4" /></button>
            </form>
          </div>

          <h2 className="sr-only">Articles</h2>
          {total === 0 ? (
            <p className="mt-16 text-center text-muted-foreground">No articles match that search. <Link to="/blog" className="text-cyan underline">Clear filters</Link></p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => <BlogCard key={p.slug} post={p} />)}
            </div>
          )}

          {pages > 1 && (
            <nav aria-label="Pagination" className="mt-12 flex justify-center gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <Link key={n} to="/blog" search={{ ...search, page: n > 1 ? n : undefined }} aria-current={n === page ? "page" : undefined} className={cn("inline-flex size-11 items-center justify-center rounded-full border font-semibold", n === page ? "border-lime bg-lime text-accent-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
                  {n}
                </Link>
              ))}
            </nav>
          )}
        </Container>
      </section>
    </>
  );
}
