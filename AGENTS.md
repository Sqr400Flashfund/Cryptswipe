<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Site-wide settings (APPLY_URL, siteUrl, emails, socials, GA4, limits) live only in `src/config/site.ts`; pages read from it so the owner edits one file.
- Every page builds its head via `seo()` in `src/lib/seo.ts` (canonical, OG, Twitter, JSON-LD) so SEO tags stay consistent.
- Blog posts are typed TS modules loaded lazily via `import.meta.glob`; keep `src/content/post-summaries.ts` synchronized with their listing fields and `src/content/slugs.ts` synchronized with their slugs so listings avoid article-body downloads and prerendering covers every post.
- All primary CTAs use `ApplyButton` (carries `data-event="apply_click"`) so tracking and the target URL stay centralised.
- Serve Inter through Fontsource and preload the local Latin font in the root head to avoid external render-blocking font requests.
- Animate CTA borders with composited transforms and disable animation for reduced-motion users to avoid continuous repaint work.
- Use TanStack Router loaders without a Query provider while no pages use Query; avoid shipping an unused cache library.
- Start decorative motion after browser idle, share scroll observers, and batch card pointer updates per animation frame so initial content stays prioritized.
