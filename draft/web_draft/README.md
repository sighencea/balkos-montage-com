# Handoff: Balkos Montage Website Redesign

## Overview
A desktop-first marketing website for **Balkos Montage GmbH**, a German industrial-services and project-execution contractor working in the chemical, petrochemical, refinery, foundry and industrial-manufacturing sectors.

The redesign **repositions the company from a personnel-leasing/staffing firm into an industrial project-execution contractor**. The primary calls-to-action drive industrial decision-makers (plant, maintenance, operations, procurement and project managers) toward a project enquiry. A secondary, deliberately separated track serves skilled-trade job seekers (welders, pipefitters, mechanics, technicians). Personnel leasing is still present but consistently presented as a *secondary* service.

Every design decision answers one buyer question: **"Can I trust this company to safely execute work inside my facility?"** The aesthetic is intentionally sober, technical and structured — it should look like a contractor trusted inside a refinery, not a startup or a marketing agency.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes that demonstrate the intended look, layout, copy and interaction behavior. **They are not production code to copy directly.**

> Note on format: the `.dc.html` files are authored as self-contained "Design Components." Each one is a normal HTML document that happens to use small custom tags (`<dc-import>` to embed the shared nav/footer, `<sc-for>`/`<sc-if>` for loops/conditionals, `<helmet>` for head content) plus inline styles. Treat them as **visual + behavioral specifications**, not as a component architecture to mirror. Read them for exact spacing, color, copy and interaction logic.

The task is to **recreate these designs in the target codebase's environment** using its established patterns and libraries. If no front-end environment exists yet, the recommended choice for a content-driven marketing site like this is **Next.js (React) with a component library and a CMS-backed content layer**, but any modern framework (Astro, Nuxt, SvelteKit, plain server-rendered templates) is appropriate. Use the codebase's existing design system if one exists.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, layout grids, copy and interactions are all specified. Recreate the UI to match. The two genuinely interactive areas (Projects filtering, Contact form) should reproduce the described behavior; everything else is presentational.

---

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| Navy (primary) | `#0F2540` | Headlines, primary surfaces, page headers, buttons (secondary), nav text active |
| Navy deep (footer) | `#0B1E33` | Footer background, hero base |
| Navy hero gradient base | `#08182A` | Hero/CTA image overlay base |
| Navy hairline (on dark) | `#29415F` | 1px dividers on navy surfaces |
| Navy hairline 2 (on dark) | `#16314F` / `#1F3B5A` | Footer dividers, badge borders |
| Orange (accent) | `#C16A33` | Primary CTA buttons, eyebrow rules, active states, accent ticks |
| Orange hover | `#A9582A` | Primary button hover |
| Orange light (on navy) | `#E08A4E` | Eyebrow text / breadcrumb current item on navy |
| Body text | `#3D4A57` | Default paragraph text on light |
| Muted text | `#6B7785` | Secondary paragraph text |
| Faint text / labels | `#9AA6B2` | Mono labels, captions on light |
| Text on navy (body) | `#B7C6D6` | Hero/header sub-paragraphs |
| Text on navy (muted) | `#9FB2C8` | Secondary text on navy |
| Mono label on navy | `#7E93AC` | Eyebrows/breadcrumbs on navy |
| White | `#FFFFFF` | Page background, cards |
| Surface gray | `#F4F5F7` | Alternating section background |
| Surface gray 2 | `#F6F7F9` | Card fill (secondary), hover rows |
| Border (light) | `#DCE0E5` | Primary 1px borders/dividers on light |
| Border (card) | `#DDE2E7` | Card borders |
| Border (faint) | `#ECEEF1` | Inner row dividers, lightest |
| Gray (secondary marker) | `#8A96A3` | Personnel-leasing "04" marker, secondary chips |

There are **no gradients** except the hero/CTA image-overlay scrim (navy, left-weighted). No rounded corners anywhere — all corners are square (`border-radius: 0`).

### Typography
- **Font families:** `'IBM Plex Sans', sans-serif` for all UI/body; `'IBM Plex Mono', monospace` for eyebrows, labels, codes, stats units, breadcrumbs, spec tables, and small captions. Load from Google Fonts: `IBM+Plex+Sans:wght@400;500;600;700` and `IBM+Plex+Mono:wght@400;500;600`.
- **Type scale (px / weight / notes):**
  - Hero H1: `56 / 700`, line-height `1.08`, letter-spacing `-0.02em`
  - Page-header H1 (interior pages): `46 / 700`, lh `1.1`, ls `-0.02em`
  - Section H2: `40 / 600`, lh `1.1`, ls `-0.015em`
  - Sub-section H2: `26–34 / 600`, ls `-0.01em`
  - Card title H3: `17–24 / 600`
  - Body large (hero/header sub): `17–18.5 / 400`, lh `1.6`
  - Body: `14–15.5 / 400`, lh `1.65–1.7`
  - Small body: `12.5–13.5 / 400`
  - Eyebrow (mono): `11 / 400–500`, uppercase, letter-spacing `0.16–0.20em`, color orange `#C16A33` (or `#7E93AC` on navy). Often preceded by a 24×1px orange rule, or numbered `01 / Services`.
  - Mono labels/codes: `10.5–13`, uppercase, letter-spacing `0.06–0.14em`
  - Big stat numbers: `30–34 / 700`, ls `-0.01em`, with the unit/`+`/`%` in orange.

### Spacing & layout
- **Content container:** `max-width: 1280px`, centered, `padding: 0 32px`.
- **Section vertical rhythm:** major sections `~88–90px` top/bottom; compact sections `64px`; sub-blocks `72–80px`.
- **Section dividers:** `1px solid #DCE0E5` top/bottom borders between alternating white / `#F4F5F7` sections.
- **Grid gutters:** card grids use `gap: 24px`; hairline-separated grids use `gap: 1px` over a `#DCE0E5` background with a `1px` outer border (creates crisp single-pixel rules between cells).
- **Buttons:** square, no radius. Primary = orange `#C16A33` bg, white text, `padding: 15–16px 26–28px`, `font-size 14.5`, weight 600, ls `0.03em`, trailing mono `→`. Secondary (on navy) = transparent with `1px solid #41597A`, white text, hover border `#FFF`. Tertiary (on light) = navy `#0F2540` bg.
- **Cards:** `background:#fff; border:1px solid #DDE2E7; border-radius:0`. Many use a `3px` top border in navy or orange as an accent. Hover on link-cards: border → `#0F2540`.
- **Images:** always `object-fit: cover`, square corners, usually inside a `1px` border or with a `1px` bottom border separating image from card body.

### Shadows
Effectively none on the page surfaces (flat, bordered, industrial). The only shadow in the broader system is the optional frame style used when laying out side-by-side option boards (not used on these production pages).

---

## Global Components

### SiteNav (`SiteNav.dc.html`)
Two-tier sticky-feeling header (not actually sticky except the Projects filter bar).
- **Utility strip** (top): navy `#0F2540`, height `40px`, bottom border `#18324F`. Left: mono caption `INDUSTRIAL PROJECT EXECUTION · REFINERIES · CHEMICAL · PETROCHEMICAL · FOUNDRIES` (11.5px, ls 0.14em, `#7E93AC`). Right (nowrap, flex none): phone `+49 (0) 000 000 00` (mono, with orange `T`), `1px` vertical dividers `#2C466A`, email `info@balkos-montage.de`, language toggle `DE / EN` (active `DE` white).
- **Main bar:** white, `82px` tall, bottom border `#DCE0E5`. Left: logo (`assets/logo.jpg`, height `38px`, links to Home). Center/right: nav links. Right: primary orange CTA **"Request a Quote"** → Contact.
- **Nav links** (order is fixed): Home, Services, Industries, Projects, **Our Clients**, Compliance *(label for "Certificates & Compliance")*, Careers, About, Contact. Each link: `14px`, padding `0 13px`, full-height, `3px` bottom border (transparent; orange `#C16A33` when active). Inactive `#51606E` weight 500; active navy `#0F2540` weight 700.
- **"Our Clients" prominence:** always rendered with navy `#0F2540` color, weight 600, and a small `5×5px` orange square marker before the label — slightly heavier than its neighbors even when inactive, because it is the key trust signal.
- **`active` prop** drives which link is highlighted. Accepts: `home | services | industries | projects | clients | compliance | careers | about | contact`.

### SiteFooter (`SiteFooter.dc.html`)
Navy `#0B1E33`. Three bands:
1. **CTA preface:** orange `5×44px` tick + heading "Discuss your scope with our project team" + sub-line, right-aligned orange "Request a Quote" button. Bottom border `#16314F`.
2. **Columns** (`grid 1.6fr 1fr 1fr 1fr`, gap 48): (a) logo on white chip + description + cert badges (`ISO 9001`, `ISO 45001`, `DIN EN 1090`, `SCC` as bordered mono pills); (b) Services links; (c) Company links; (d) Head Office address + phone/email (mono).
3. **Legal bar:** `© 2026 Balkos Montage GmbH.` + Imprint / Data Protection / Terms. Top border `#16314F`.

---

## Screens / Views

> All interior pages share a common **page-header band**: navy `#0F2540`, padding `64px 0 60px`, containing a mono breadcrumb (`Home / <Current>` where the current item is orange `#E08A4E`), an H1 (`46px`), and a sub-paragraph (`17px`, `#B7C6D6`, max-width ~660–680px).

### 1. Home (`Home.dc.html`) — `active="home"`
Section order (matches the brief exactly):
1. **Hero** — full-bleed navy with `assets/maintenance-crane.jpg` at `opacity 0.42` under a left-weighted navy gradient scrim. Left-aligned content (max-width 720): mono eyebrow `Industrial Contractor · Est. 2004`, H1 **"Industrial Projects Executed by Qualified Specialists"** (56px white), sub-paragraph, two buttons: **Request a Quote** (orange → Contact) + **View Services** (outlined → Services). Below: a 4-cell **hero data strip** (top border `#29415F`, cell dividers `#29415F`): `20+` Years in operation · `350+` Own qualified workforce · `4` Core industrial sectors · `0.0` LTI target on every site. Numbers white `30px`, unit in orange, mono caption `#7E93AC`.
2. **Trust strip** — white bordered row. A mono "Core Capabilities" label cell (right border) then a 5-column grid (cell dividers `#ECEEF1`): Pipeline Construction & Fabrication · Industrial Maintenance · Shutdown Services · Qualified Workforce · Compliance & Safety (each 14px weight 600 navy).
3. **Services Overview** — eyebrow `01 / Services`, H2 "What we execute" + right intro paragraph. **3 dominant cards** (`grid repeat(3,1fr)`, gap 24): Pipeline Construction & Fabrication (`pipeline-install.jpg`), Industrial Maintenance (`refinery-workers.jpg`), Shutdown & Turnaround Services (`shutdown-columns.jpg`). Each: 200px image with orange numbered tag (`01/02/03`) top-left, title, description, mono "Capabilities →". Below, a **secondary** full-width bar for **Personnel Leasing**: `#F6F7F9` fill, gray `04` marker, a bordered mono `Secondary service` chip next to the title, smaller treatment, "Learn more →". Links → Services.
4. **Industries** — `#F4F5F7` section, eyebrow `02 / Industries`, H2 "Sectors we operate in". 6 hairline-grid cards (`repeat(3,1fr)`, `gap 1px`), each with a `3px` navy top border, mono code `IND-01…06`, title, one-line description: Chemical, Petrochemical, Refineries, Foundries, Industrial Manufacturing, Energy Facilities.
5. **Projects** — eyebrow `03 / Projects`, H2 "Selected execution references", right "All projects →" link → Projects. 3 cards (`repeat(3,1fr)`): 190px image with navy code tag, mono industry kicker (orange), title, then a 3-row spec grid (`72–84px` mono label column): **Scope / Services / Outcome** (Outcome in bold navy). Cards 1–3 = Crude Unit Turnaround Support (Refinery), Process Pipeline Installation (Petrochemical), Plant Maintenance Framework (Chemical).
6. **Our Clients** — **deliberately prominent** navy `#0F2540` section. Eyebrow `04 / Our Clients` (orange), H2 "Trusted on operating sites" (white), explanatory paragraph, right "Client overview →" → Clients. A 4-cell stats row (border `#29415F`): `40+` Industrial clients · `12 yrs` Longest cooperation · `85%` Repeat engagements · `6` Sectors served. Then a 6-cell **client-logo placeholder** grid (diagonal-striped navy fills, mono "Client logo").
7. **Certificates & Compliance** — white, `grid 1fr 1.15fr`. Left: eyebrow `05`, H2 "Audited, certified, accountable", paragraph, 2×2 hairline grid of cert tiles (ISO 9001 / ISO 45001 / DIN EN 1090 / SCC** · DIN 2303). Right: **Downloads** list (bordered rows, each: orange `PDF` chip + filename + mono `↓ size`), then "All certificates & documents →" → Compliance.
8. **Why Balkos** — `#F4F5F7`, eyebrow `06`, H2 "Built to execute inside your facility". 5-cell hairline grid: Qualified Workforce · Reliable Execution · Industrial Experience · Safety Focus · Project Delivery (each: orange mono number, title, one line).
9. **Careers** — compact bordered band: left text block (mono `07 / Careers`, H2 "Skilled trades — join our site teams", sub) + right full-height navy CTA **"View Open Positions"** → Careers.
10. **Final CTA** — navy with `refinery-overview.jpg` at `opacity 0.22`. H2 **"Need Reliable Industrial Support?"**, sub "Tell us about your project and we will respond with a realistic proposal.", buttons **Request a Quote** (orange) + **Contact Us** (outlined), both → Contact.
11. Footer.

### 2. Services (`Services.dc.html`) — `active="services"`
Page header "Industrial services delivered with our own workforce". A 4-cell **service index** bar (anchors `#s01…#s04`; the 4th, Personnel Leasing, rendered muted gray). Then four alternating sections:
- **01 Pipeline Construction & Fabrication** — text left / image right (`pipeline-install.jpg`, 420px). Has **Overview** paragraph, **Capabilities** (2×2 hairline grid: Spool prefabrication, On-site pipe installation, Carbon & stainless welding, Pressure testing & NDT), **Process** (4-step hairline grid with navy top border: Engineering review → Prefabrication → Installation → Test & handover), and a navy **Request a Quote** button.
- **02 Industrial Maintenance** — `#F4F5F7`, image left (`refinery-workers.jpg`) / text right. Same Overview/Capabilities/Process/CTA structure (Capabilities: Preventive maintenance, Corrective repairs, Equipment overhaul, On-call standby crews; Process: Condition survey → Work planning → Execution → Reporting).
- **03 Shutdown & Turnaround** — white, text left / image right (`shutdown-columns.jpg`). (Capabilities: Turnaround planning, Crew mobilisation, Mechanical & piping works, Schedule & interface mgmt; Process: Pre-turnaround → Mobilisation → Execution → Handback).
- **04 Personnel Leasing (secondary)** — navy `#0F2540` band, mono `Secondary service` chip. Description + a bordered list of trades (Welders `EN ISO 9606`, Pipefitters, Industrial mechanics) and an "Enquire about leasing →" link → Contact.

### 3. Industries (`Industries.dc.html`) — `active="industries"`
Page header "Sectors we operate in". An intro split (`1fr 1fr`): copy left ("One operating standard across every facility type") + `refinery-stacks.jpg` right. Then **6 industry rows** (`grid 120px 1fr 1.1fr`, bottom-bordered): mono code (`IND-01…06`) · name + description · a flex-wrap row of bordered mono capability chips. Sectors: Chemical, Petrochemical, Refineries, Foundries, Industrial Manufacturing, Energy Facilities. Closes with a `#F4F5F7` CTA strip "Operating in your sector?" + Request a Quote.

### 4. Projects (`Projects.dc.html`) — `active="projects"` — **INTERACTIVE**
Page header "Execution references". A **sticky filter bar** (`position:sticky; top:0; z-index:5`, white, bottom border) with two rows of chips:
- **Industry:** All, Refinery, Petrochemical, Chemical, Foundry, Manufacturing, Energy
- **Service:** All, Pipeline, Maintenance, Shutdown, Fabrication

Chips are mono, square, `1px` bordered; the active chip is orange `#C16A33` fill / white / weight 600, inactive `#DDE2E7` border / `#51606E` text. Below, a `#F4F5F7` results area: a mono count line (`N projects shown` / `1 project shown`) and a `repeat(3,1fr)` card grid. Each card: 180px image with navy code tag, orange mono industry kicker, title, and Scope/Services/Outcome spec rows (mono labels). **8 projects** in the dataset (see `c_dc_js` in the file for the full data — codes PRJ-009…PRJ-036, each tagged with one industry and 1–2 services). Filtering ANDs the two selected facets (an "All" facet matches everything; service match = the project's services array contains the selected service).

### 5. Our Clients (`Clients.dc.html`) — `active="clients"`
Page header "Trusted to work inside operating facilities". A white **stats row** (4 cells, same figures as Home's clients section). A **client-logo** section: eyebrow + 8-cell hairline grid of diagonal-striped (`#fff`/`#F4F5F7`) "Client logo" placeholders + a mono confidentiality note. A `#F4F5F7` **testimonials** section: two cards (`1fr 1fr`) with `3px` orange top border, a 17px quote, and an avatar block (navy square with mono initials `MM`/`PM`, role + sector). A **partnerships + industries-served** split: left = bordered list of agreement types with orange mono tags (Multi-year / Annual / On demand); right = flex-wrap mono sector chips + note.

### 6. Certificates & Compliance (`Compliance.dc.html`) — `active="compliance"`
Page header "Certificates & Compliance". **Certifications** — eyebrow + 8-cell hairline grid (first row gets `3px` navy top border): ISO 9001, ISO 45001, DIN EN 1090, SCC**, DIN 2303, EN ISO 3834, EN ISO 9606, ISO 14001 (each: mono code 16px + descriptor). `#F4F5F7` **Safety standards** + **Quality systems** split: two bordered lists with orange `6×6px` tick markers. White **Documentation** section: bordered download rows (orange `PDF` chip + title + mono `↓ size`) — ISO 9001, ISO 45001, DIN EN 1090 certs, Welding Procedure Qualifications, Company Safety Statement & Policy — plus a mono note about full pre-qualification packages.

### 7. Careers (`Careers.dc.html`) — `active="careers"`
Page header "Join our site teams" (copy explicitly notes this is the careers track, **separate from project enquiries**). **Open positions** — bordered list of 4 roles (`JOB-01…04`): Welder (MAG/TIG), Pipefitter, Industrial Mechanic, Maintenance Technician; each row has a mono code, title, sub-line, a bordered location chip, and an orange "Apply →" (anchors to `#apply`). `#F4F5F7` split: left **Typical roles** (mono chips: Welders, Pipefitters, Industrial mechanics, Maintenance technicians, Site supervisors, QA/NDT coordinators); right **Application process** (`#apply`) — bordered 4-step list (Submit application → Qualification review → Interview & trade test → Onboarding) + orange "Send your application →" (`mailto:jobs@balkos-montage.de`).

### 8. About (`About.dc.html`) — `active="about"`
Page header "An industrial contractor built on execution". **Company overview** split: copy left ("From staffing to project execution" — explicitly narrates the repositioning, with personnel leasing now secondary) + `refinery-workers.jpg` right. `#F4F5F7` **Mission / Vision** two-card split (`3px` top border navy / orange respectively, 18px statement). White **Operational approach** — 6-cell hairline grid (Own workforce, Safety first, Single accountability, Documented quality, Schedule certainty, Sector experience). `#F4F5F7` **Management** — 3 cards with diagonal-striped "Portrait" placeholders (Managing Director, Head of Operations, HSE & Quality Manager).

### 9. Contact (`Contact.dc.html`) — `active="contact"` — **INTERACTIVE**
Page header "Request a quote". Split `1.4fr 1fr`:
- **Left — Project enquiry form.** Fields: Full name*, Company*, Email*, Phone (2×2 grid); Service required (select: the four services + "Other / not sure"); Industry (select: Chemical, Petrochemical, Refinery, Foundry, Manufacturing, Energy); Project description* (textarea, 5 rows). Inputs: `1px #DDE2E7` border, square, `13px 14px` padding, focus border → `#0F2540`. Submit = orange **"Submit enquiry →"**. On submit the form swaps to a **confirmation panel** (`3px` orange top border, "Enquiry received" / "Thank you — we'll be in touch", and a "Submit another enquiry" button that resets). Mono labels above each field.
- **Right — contact info.** A bordered card with a navy "Direct contact" header and Phone / Email / Head office rows; a `#F6F7F9` "Company details" block (Legal form GmbH, Commercial register HRB 00000, VAT ID DE000000000, Opening hours Mon–Fri 07:00–17:00); and a row linking job-seekers to **Careers →** (keeps recruitment separate from enquiries).

---

## Interactions & Behavior
- **Navigation:** plain `<a href>` between pages. Active page indicated via the nav `active` prop (orange underline + navy bold). CTAs route to Contact; logo → Home.
- **Hover states:** link-cards → border darkens to `#0F2540`; primary buttons orange → `#A9582A`; outlined buttons → border `#FFF`; download/list rows → `#F6F7F9` fill; nav CTA navy → `#0A1830`. Transition `0.15s` on color/background/border.
- **Projects filtering (stateful):** two independent selected facets (`industry`, `service`), both default `"All"`. Selecting a chip sets that facet; the visible list = projects matching BOTH facets; the count label updates and pluralizes. No animation required (instant re-render is fine; a subtle fade is optional).
- **Contact form (stateful):** a single `submitted` boolean. Submit → show confirmation; "Submit another enquiry" → reset to the form. No real validation/network in the prototype — implement real validation (required: name, company, email, description; email format) and a real submission endpoint in production.
- **Anchor jumps:** Services index links and Careers "Apply" links are in-page anchors (`#s01`, `#apply`, etc.).
- **Responsive:** prototype is **desktop-first at 1280px content width**. Mobile/tablet breakpoints are NOT designed — define them in implementation (collapse multi-column grids to 1–2 columns, move the 9-item nav into a hamburger/drawer below ~1024px, stack hero data strip and footer columns).

## State Management
- **Projects:** `{ industry: 'All', service: 'All' }`. Derived: filtered project array + count label. Source data is an 8-item array (title, code, industry, services[], scope, outcome, image) — see `Projects.dc.html` logic block; move this to a CMS/`projects.json` in production.
- **Contact:** `{ submitted: boolean }`. In production add field state + validation errors and async submission status (idle/submitting/success/error).
- All other pages are stateless/presentational.

## Assets
All in `assets/` (client-provided photography unless noted). Recreate with these or the client's final imagery:
| File | Used as | Notes |
|---|---|---|
| `logo.jpg` | Brand logo (nav + footer) | 1000×198, on white. Footer places it on a white chip since footer is navy. **Recommend obtaining a transparent PNG / SVG and a white/knockout variant.** |
| `maintenance-crane.jpg` | Home hero | Workers on lifts doing pipe maintenance (landscape) |
| `pipeline-install.jpg` | Services 01, Home service card, Projects | Workers laying pipe with crane |
| `refinery-workers.jpg` | Services 02, About overview, Projects | Workers walking in refinery |
| `shutdown-columns.jpg` | Services 03, Home service card, Projects | Scaffolded insulated columns |
| `fabrication-bundle.jpg` | Projects (fabrication) | Heat-exchanger tube bundle in fab shop |
| `refinery-stacks.jpg` | Industries intro, Home/Projects | Refinery with stacks + scaffolding |
| `plant-piperack.jpg` | Home/Projects (chemical) | Plant building with pipe racks |
| `refinery-overview.jpg` | Home final-CTA, Projects (energy) | Refinery overview with chimney |

Placeholder graphics (no asset needed — reproduce with CSS): **client logos** and **management portraits** use diagonal-striped fills with mono captions; replace with real logos/photos when available.

**Fonts:** IBM Plex Sans + IBM Plex Mono (Google Fonts, open-source — SIL OFL). Self-host in production for performance/GDPR.

**Icons:** none drawn — the design intentionally avoids decorative icons/illustrations. The only graphic primitives are small squares/rules/ticks and the `→`/`↓` glyphs (set in IBM Plex Mono).

## Content / Copy Note
All numeric figures (20+ years, 350+ workforce, 40+ clients, 12 yrs, 85%, 99.4%, etc.), the address (Industriestraße 14, 45478 Mülheim an der Ruhr), phone/email, and register/VAT numbers are **realistic placeholders** — confirm and replace with real values before launch. The certification list should be validated against the company's actual certificates.

## Files
- `Home.dc.html` — homepage (11 sections)
- `Services.dc.html` — 4 service deep-dives
- `Industries.dc.html` — 6 sector rows
- `Projects.dc.html` — filterable project listing *(interactive)*
- `Clients.dc.html` — trust / clients page
- `Compliance.dc.html` — certificates & compliance + downloads
- `Careers.dc.html` — open positions + application process
- `About.dc.html` — overview, mission/vision, approach, management
- `Contact.dc.html` — enquiry form + contact info *(interactive)*
- `SiteNav.dc.html` — shared header (utility strip + main nav, `active` prop)
- `SiteFooter.dc.html` — shared footer (CTA band + columns + legal)
- `assets/` — logo + 8 industrial photographs

To preview a page, open any `.dc.html` file in a browser (they self-load the runtime and Google Fonts). Read the inline styles for exact values and the `<script>`/logic blocks in `Projects` and `Contact` for the interaction logic.
