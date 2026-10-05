# EloraOS.com

The landing page for **Elora** — a private, local-first AI companion for Windows that runs entirely on your PC.

It is a single static page with no build step: plain HTML and CSS, Google Fonts, and one image.

```
index.html                    the whole page
favicon.svg                   the hexagon mark
assets/elora-workspace.webp   the workspace image used on the page
assets/elora-workspace.jpg    the same image, used as the social preview (og:image)
CNAME                         custom domain for GitHub Pages
```

## Preview locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Publish on eloraos.com with GitHub Pages

1. **Settings → Pages →** Source: *Deploy from a branch*, Branch: `main`, folder `/ (root)`.
2. At your domain registrar, point the domain at GitHub Pages:
   - `A` records for `eloraos.com` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `muffrank1122.github.io`
3. Back in **Settings → Pages**, confirm the custom domain and tick **Enforce HTTPS** once the certificate is issued.

Any other static host (Netlify, Cloudflare Pages, Vercel) works too: upload the folder as-is.

## Before launch

- **Sign-up form:** the "Notify me" form is not connected to anything yet. Point its `action` at your email-list provider (or a form service) — search `TODO` in `index.html`.
- **Contact link:** replace `[YOUR CONTACT EMAIL]` in the footer.
- **Scorecard:** the numbers are Elora's measured intelligence scores from 4 October 2026. Update them when you re-run `tools/intelligence_score.py`, or remove the `#scorecard` section.

## License

Apache License 2.0.
