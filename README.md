# Balkos Montage — Website

Static marketing website for **BALKOS INDUSTRIE MONTAGE SRL** — an industrial
project-execution contractor (pipeline construction, industrial maintenance,
shutdown/turnaround services) for the chemical, petrochemical, refinery and
foundry sectors.

Built with plain **HTML, CSS and JavaScript** — no build step, no framework.
Deployed via **GitHub Pages** on the custom domain `balkos-montage.com`.

## Local development

`fetch()` of the shared nav/footer partials is blocked on the `file://`
protocol, so preview through a local web server:

```bash
python3 -m http.server 8099
# then open http://localhost:8099/
```

## Structure

```
index.html, services.html, industries.html, projects.html,
clients.html, compliance.html, careers.html, about.html, contact.html
partials/   nav.html, footer.html          ← single-source header/footer
css/        styles.css (+ fonts.css)        ← design tokens as CSS variables
js/         include.js  ← loads partials, active nav, mobile menu, lang UI
            i18n.js     ← translation engine + browser-language detection
            projects.js ← Projects filtering (industry × service)
            forms.js    ← Contact & Careers placeholder forms → confirmation
i18n/       en.json, de.json, ro.json       ← translation dictionaries
assets/     img/ (logo.png, photos, favicons), fonts/ (self-hosted IBM Plex)
CNAME, .nojekyll, robots.txt, sitemap.xml
```

### Shared nav/footer (single source of truth)
Every page includes the header/footer via:
```html
<div data-include="partials/nav.html" data-active="services"></div>
...
<div data-include="partials/footer.html"></div>
```
Edit `partials/nav.html` or `partials/footer.html` once — all pages update.

### Internationalisation (EN / DE / RO)
- Default language **EN**. On first visit the browser language is detected:
  German-speaking locales (de, AT, CH, LI, LU) → **DE**, Romanian (ro, MD) →
  **RO**, everything else → **EN**. The choice is saved in `localStorage`.
- Users override via the language dropdown (top-right of the header).
- Every visible string carries `data-i18n="key"` (or `data-i18n-attr` for
  placeholders); `i18n.js` swaps text from the active `i18n/<lang>.json`.
- To edit copy: change `i18n/en.json` (source of truth) and the matching key in
  `de.json` / `ro.json`. All three files must share the **same keys**.

## Deployment (GitHub Pages)
1. Push to the repo's default branch.
2. Settings → Pages → deploy from branch (root).
3. The `CNAME` file points the site at `balkos-montage.com`; set the DNS
   `A`/`CNAME` records at the registrar to GitHub Pages.

See `PLACEHOLDERS.md` for content that must be confirmed/replaced before launch.
