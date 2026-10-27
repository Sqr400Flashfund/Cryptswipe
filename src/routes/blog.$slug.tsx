import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { marked } from "marked";
import { CheckCircle2 } from "lucide-react";
import { BlogCard, Breadcrumbs, Container, CTASection, PostCover } from "@/components/site/blocks";
import { NotFoundView } from "@/components/site/NotFoundView";
import { formatDate, getPost, relatedPosts } from "@/content/posts";
import { abs, breadcrumbLd, seo } from "@/lib/seo";
import { defaultOgImage, logoUrl, siteName } from "@/config/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return seo({ title: "Article Not Found | Cryptswipe", description: "This article could not be found. Browse the Cryptswipe blog for guides to spending crypto online.", path: `/blog/${params.slug}`, noindex: true });
    const path = `/blog/${post.slug}`;
    return seo({
      title: `${post.title} | Cryptswipe`,
      description: post.description,
      path,
      type: "article",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          image: [defaultOgImage],
          datePublished: post.date,
          dateModified: post.updated,
          author: { "@type": "Organization", name: "Cryptswipe Team", url: abs("/about") },
          publisher: { "@type": "Organization", name: siteName, logo: { "@type": "ImageObject", url: logoUrl } },
          mainEntityOfPage: abs(path),
          keywords: post.keyword,
        },
        breadcrumbLd([{ name: "Blog", path: "/blog" }, { name: post.title, path }]),
      ],
    });
  },
  notFoundComponent: NotFoundView,
  errorComponent: () => <div role="alert" className="mx-auto max-w-4xl px-5 py-20">This article could not load. Please try again.</div>,
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const html = marked.parse(post.body, { async: false }) as string;
  const related = relatedPosts(post);
  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-border">
          <div aria-hidden className="absolute -top-40 left-1/2 h-[480px] w-[800px] -translate-x-1/2" style={{ background: "var(--glow-violet)" }} />
          <Container className="relative max-w-4xl py-14 sm:py-20">
            <Breadcrumbs items={[{ name: "Blog", to: "/blog" }, { name: post.title }]} />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-lime">{post.category}</p>
            <h1 className="mt-3 text-4xl leading-[1.05] tracking-[-0.04em] sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-sm text-subtle">
              By Cryptswipe Team · <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated !== post.date && <> · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></>} · {post.readMinutes} min read
            </p>
          </Container>
        </header>
        <Container className="max-w-4xl py-12">
          <PostCover post={post} />
          <aside aria-label="Key takeaways" className="mt-10 rounded-3xl border border-lime/40 bg-lime/5 p-7">
            <h2 className="text-lg font-semibold tracking-normal text-lime">Key takeaways</h2>
            <ul className="mt-4 space-y-3">
              {post.takeaways.map((t) => (
                <li key={t} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-lime" />
                  {t}
                </li>
              ))}
            </ul>
          </aside>
          <div className="prose-cs mt-10" dangerouslySetInnerHTML={{ __html: html }} />
        </Container>
        <CTASection headingLevel={2} title={<>Ready to <span className="text-gradient">spend your crypto?</span></>} />
      </article>
      <section aria-labelledby="related-h" className="pb-24">
        <Container>
          <h2 id="related-h" className="text-3xl">Related posts</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
          <Link to="/blog" className="mt-8 inline-block font-semibold text-cyan hover:text-lime">All articles →</Link>
        </Container>
      </section>
    </>
  );
}
