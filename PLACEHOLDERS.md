# Placeholders to confirm/replace before launch

The real company identity (name, address, phone, email, CIF, Reg. com.) is
already in place from `company_details.txt`. The items below were **invented in
the design draft** and must be verified with real data before going live.

## Figures / statistics (currently placeholder numbers)
- Home hero strip: `20+` years, `350+` workforce, `4` sectors, `0.0` LTI target.
- "Est." date was **removed** from the hero (company registered 2018, J23/2259/2018)
  — re-add a real founding year if there is one.
- Clients stats (Home + Clients): `40+` clients, `12 yrs` longest, `85%` repeat, `6` sectors.
- "Why Balkos" / projects copy: `99.4%` availability, `40%` downtime cut, "two decades", etc.
- Project references (`projects.html`, 8 entries, codes PRJ-009…PRJ-036) are illustrative.

## Certifications & documents
- Confirm which certificates the company actually holds: ISO 9001, ISO 45001,
  DIN EN 1090, SCC**, DIN 2303, EN ISO 3834, EN ISO 9606, ISO 14001.
  Remove any not held (Home cert grid, `compliance.html`, footer badges).
- Download rows (`#`) need real PDF files + correct sizes.

## Legal / functional (deferred, as agreed)
- **Contact form** and **Careers application form** are placeholders — submit
  shows a confirmation panel only. Wire to a real endpoint/email service +
  server-side validation before relying on them.
- Footer **Imprint / Data Protection / Terms** link to `#` — add real pages
  (GDPR-relevant for the DE/RO audience).
- `jobs@…` / careers routing: decide the real recipient inbox.

## Assets
- `assets/img/logo.png` = white background removed (transparent). Source logo
  files (vector PDFs, hi-res photos) remain in `/draft/assets/` — not yet used.
- Client logos and management portraits are CSS diagonal-stripe placeholders;
  replace with real images when available.

## Translations
- `i18n/de.json` and `i18n/ro.json` were machine-translated in a professional
  B2B tone — have a native speaker proof the industrial terminology before launch.
