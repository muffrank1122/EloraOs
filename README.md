# EloraOS.com

The website for **Elora** — a private, local-first AI companion for Windows that runs entirely on your PC.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | [Astro](https://astro.build) 7, static output | Every page ships as finished HTML — crawlers and AI search read the full text without running JavaScript. Zero framework JS by default. |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 (compiled) | The design tokens from the *Astral Cybernetics* design system live in `@theme` in `src/styles/global.css`. Only used classes ship (~15 KB gzipped). |
| Animation | [GSAP](https://gsap.com) 3 + ScrollTrigger + SplitText | Scroll-driven reveals, the hero's tilt-to-flat workspace, the cognitive-loop stages lighting up, typing and count-ups. Free for commercial use under GSAP's standard license. |
| Page transitions | Native cross-document View Transitions (CSS only) | Smooth page-to-page fades with no router script. |
| Fonts | Self-hosted via Fontsource (Space Grotesk, Plus Jakarta Sans, JetBrains Mono) | No Google Fonts request; the two main fonts are preloaded. |
| Icons | Lucide, inlined as SVG at build time (`src/components/Icon.astro`) | No icon font download. |
| Images | `astro:assets` → responsive AVIF/WebP with fixed dimensions | The 317 KB hero becomes 23–122 KB depending on screen size, with no layout shift. |

Motion is progressive enhancement: all content is visible without JavaScript, nothing animates for visitors who ask for reduced motion, and a failsafe un-hides everything if the animation script doesn't load.

## SEO built in

- Unique `<title>`, meta description, canonical URL and Open Graph / Twitter card on every page (`src/layouts/Base.astro`).
- One `h1` per page and a clean heading outline; a keyword-bearing `h1` on the home page ("Elora · the private AI companion for your Windows PC").
- JSON-LD `@graph` on every page: `Organization`, `WebSite`, `SoftwareApplication`, `WebPage` + `BreadcrumbList`; `FAQPage` on `/faq/`, `TechArticle` on `/how-it-works/`.
- `sitemap-index.xml` (generated), `robots.txt`, `llms.txt` (a plain summary for AI assistants), web manifest, favicons and a 1200×630 social card.
- Separate pages that each target a search intent: `/` (overview), `/how-it-works/`, `/privacy/`, `/faq/`.

`SoftwareApplication` only qualifies for Google's rich result once it has an `offers` price (or ratings). Add `offers` in `Base.astro` when pricing is announced.

## Project layout

```
src/
  pages/            index, how-it-works, privacy, faq, 404
  components/       Header, Footer, Icon, FaqList, …   home/  Hero, CognitiveLoop, EarlyAccess
  layouts/Base.astro   <head>, SEO tags, structured data
  data/site.ts      site settings, nav, scorecard numbers, feature list
  data/faq.ts       FAQ questions and answers (page + FAQPage schema)
  scripts/motion.ts all GSAP animation
  styles/global.css design tokens and glass/HUD utilities
  assets/           source images (optimized at build)
public/             favicon, icons, og/ social images, robots.txt, llms.txt, CNAME
scripts/build-assets.mjs   regenerates the social card and icons
```

## Develop

Requires **Node 22.12+** (`.nvmrc` pins 24).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + build to dist/
npm run preview    # serve dist/
npm run assets     # after changing the hero image or favicon
```

## Deploy on eloraos.com (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. At the domain registrar:
   - `A` records for `eloraos.com` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `muffrank1122.github.io`
3. In **Settings → Pages**, confirm the custom domain (`public/CNAME` already contains it) and tick **Enforce HTTPS**.

Cloudflare Pages, Netlify or Vercel also work: build command `npm run build`, output directory `dist`.

## Before launch

- **Sign-up form:** set `signupAction` in `src/data/site.ts` to your email-list provider's form URL (the form posts a single `email` field). Until then the form tells visitors sign-ups aren't open yet.
- **Contact:** set `contactEmail` in `src/data/site.ts` to show a Contact link in the footer.
- **Search engines:** verify the domain in Google Search Console and Bing Webmaster Tools and submit `https://eloraos.com/sitemap-index.xml`.
- **Scorecard:** `/how-it-works/#scorecard` shows the 4 Oct 2026 measurement. Update `SCORECARD` in `src/data/site.ts` when you re-run `tools/intelligence_score.py`.
- **Accuracy:** every product claim on the site is taken from Elora's own README and docs. Keep `src/data/faq.ts`, `FEATURES` and `public/llms.txt` in step with the product.

## License

Apache License 2.0.
