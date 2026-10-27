# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Things to change before launch

All site-wide settings live in `src/config/site.ts`:

- `APPLY_URL` — where every "Apply for Card" button goes (default `https://app.cryptswipe.com/apply`).
- `siteUrl` — production domain used for canonical URLs, sitemap, RSS and JSON-LD.
- `supportEmail`, `securityEmail`, `pressEmail` — contact addresses.
- `contactEndpoint` — URL the contact form POSTs `{ name, email, message }` to.
- `social` — X, Telegram, Discord, LinkedIn URLs (also used in Organization `sameAs`).
- `ga4Id` — GA4 measurement ID. Analytics stays off while it contains `XXXX`. Clicks on `[data-event]` elements (e.g. `apply_click`) are sent as GA4 events.
- `limits` — tier 1 / tier 2 daily and monthly limits shown on /fees.
- `defaultOgImage` — default social share image.

Also review: region availability table in `src/routes/supported-networks.tsx`, legal copy in `/privacy`, `/terms`, `/aml-policy`, and `public/llms.txt`.

Blog posts live in `src/content/posts/*.ts`; add new slugs to `src/content/slugs.ts` so they are prerendered.
