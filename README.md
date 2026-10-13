# EloraOS.com

The static website for Elora, a local-first AI companion for Windows. Built with Astro, Tailwind CSS, self-hosted fonts and progressive GSAP motion.

## Develop and build

Requires Node 22.12+; Node 24 is pinned in .nvmrc.

    npm ci
    npm run dev
    npm run build
    npm run preview

Build output is dist/. No Node or Python runtime is needed on the web host. Run npm run assets after changing the social-card text, source illustration or favicon.

## Manual deployment to cPanel / Apache

1. In cPanel, point eloraos.com and www.eloraos.com at the domain's document root. Enable AutoSSL or install a valid certificate covering both names before upload.
2. Run npm run build locally. Upload the CONTENTS of dist/ to that document root (often public_html, but check the domain settings), not the dist folder itself.
3. Include the hidden .htaccess file. In cPanel File Manager, enable Settings → Show Hidden Files. Back up the existing site before replacing files.
4. Remove or rename an old index.php if it belongs to the previous site; the included DirectoryIndex prioritizes index.html. Preserve unrelated applications and files.
5. Visit https://eloraos.com/ and each page. Check http://eloraos.com/faq/?from=check redirects to https://eloraos.com/faq/?from=check, and https://www.eloraos.com/ redirects to the apex domain.
6. Check a missing URL returns the custom 404 page with HTTP status 404.

The included .htaccess uses Apache mod_rewrite to force HTTPS and the apex domain, preserving paths and query strings. Certificate-validation paths are exempt so AutoSSL can renew. It is designed for direct Apache TLS, not a proxy that terminates TLS upstream. If using a CDN, configure HTTPS to the origin (for example Full/strict), not an HTTP-only origin that causes redirect loops. AllowOverride must permit these directives; cPanel normally provides this.

Every page also has a hostname-scoped browser redirect as a fallback. Local development stays on HTTP. This fallback requires JavaScript and is not a replacement for the server redirect. HSTS is deliberately not enabled before the production TLS setup has been verified.

Apache's reference: https://httpd.apache.org/docs/2.4/rewrite/remapping.html#https

There is no GitHub Pages workflow or CNAME artifact. Deployment is manual.

## Content map

- src/data/site.ts — brand, canonical domain, navigation, content date and historical scorecard
- src/data/faq.ts — visible FAQ and matching structured data
- src/pages/ — overview, capabilities, architecture, privacy, FAQ, setup and 404
- src/layouts/Base.astro — metadata, structured data, HTTPS fallback and shared layout
- public/.htaccess — Apache HTTPS/canonical redirects and custom 404
- public/llms.txt — product summary for search and assistants
- scripts/build-assets.mjs — social preview and icons

The hero artwork is an illustrated concept, not a product screenshot. No active signup endpoint or installer is configured, so the website does not present a fake download or collect emails.

## Product sources and accuracy

Reviewed against the local Elora source documentation on 13 October 2026:

- D:/Elora/README.md — current overview, requirements, local defaults, optional cloud, and known gaps
- docs/elora/desktop-control.md — owner-directed desktop control and approval boundaries
- docs/elora/google-workspace.md — OAuth, Google reads/writes and cloud data handling
- docs/elora/groq-cloud-stt.md — per-feature cloud speech/chat/voice and local fallback
- docs/elora/hermes-hands.md — experimental status, 64K model-context gate and Docker requirement
- docs/elora/03-configuration.md — feature configuration

Treat machine-specific enabled settings in product docs as an example, not a universal default. Do not publish credentials or user data. The 4 October intelligence scorecard is explicitly historical: no scorer or live product database was run or changed for this update. Refresh its numbers and date only with a newly verified measurement.

When features change, update the homepage, capability page, privacy copy, FAQ, structured feature list and llms.txt together.

## License

Apache License 2.0.
