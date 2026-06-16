# New Client Setup — Boilerplate v1

**For AI / developer:** When the user says *“read `docs/NEW-CLIENT.md` — the customer is [NAME]”*, follow this file. Replace every `[CUSTOMER]` placeholder with the real business name and fill in details they provide (or ask once for anything missing).

This repo is **LifeSpring Starter**. Each client gets their own forked repo. Do not treat LifeSpring Design branding as the client brand unless explicitly told otherwise.

---

## Quick intake (ask or infer from user)

| Field | Example | Used in |
|-------|---------|---------|
| Business name | Spartan Restoration | `config/site.ts`, SEO, schema |
| Domain | spartanrestoration.com | `config/site.ts`, canonical URLs |
| Phone | (real) | site config, footer, schema, CTAs |
| Email | (real) | site config, footer, contact |
| Address | (real or service area) | footer, LocalBusiness schema |
| Industry | Water damage / restoration | copy tone, services, keywords |
| Color theme | `spartan` | `lib/color-themes.ts` default |
| Service area | Vancouver WA, Portland OR | hero, SEO, schema |
| Logo files | in `public/` | `config/site.ts` assets |

**Theme IDs available:** `dark` (Dark-Space), `lifespring`, `light`, `stone`, `spartan`, `ocean`

Set `defaultColorThemeId` in `lib/color-themes.ts` to the client theme so `/playground` opens correctly.

---

## Work order (do in this sequence)

Two launch moments:

1. **Soft launch** — client domain live with **Under Construction** on `/` while you theme on `/playground`
2. **Full launch** — replace `/` with the real homepage when the design is approved

---

### Phase 1 — Identity (minimum for soft launch)

**1. `config/site.ts`**

Swap LifeSpring placeholders for `[CUSTOMER]`:

- `name`, `domain`, `url`
- `tagline`, `description` — shown on the under construction page
- `phone`, `email`, `address`
- `nav` — can stay minimal for now; Playground/Preview are dev-only
- `social` — real URLs when ready (optional for soft launch)
- `assets.logo` — client logo on under construction page (`public/logo.png` or path you set)
- `assets.ogImage` — optional for soft launch; add before full launch

**2. `lib/seo-content.ts` — homepage (under construction)**

Update `pageSeo.home` for `[CUSTOMER]`:

- `title` — e.g. `"Coming Soon"` or `"Under Construction"`
- `description` — one sentence about `[CUSTOMER]` and what they do
- `noIndex` — **keep `true` during build** OR set `false` if the client wants the domain indexed with a coming-soon message (ask the user)

**3. `public/`**

- Drop client logo at the path used by `config/site.ts` `assets.logo` (default `/logo.png`)

**4. `package.json`** (optional)

- Change `"name"` to a slug like `spartanrestoration`

---

### Phase 2 — Soft launch (under construction)

**Goal:** Domain goes live. Visitors see a branded holding page. You keep building on `/playground`.

**5. Confirm `/` is under construction**

`app/page.tsx` should render `<UnderConstruction />` (default in starter). **Do not change this yet.**

The page reads from `siteConfig`:

- `assets.logo` — optional logo in the brand card
- `underConstruction.brandTitleLines` — optional split title (e.g. `["Spartan", "Restoration"]`); defaults to `name`
- `underConstruction.headline` / `subheadline` — main messages
- `teamContacts` — contact cards; if empty, falls back to site `phone` / `email`

Override `--uc-*` CSS variables under `.under-construction` in `app/globals.css` for client brand colors (gold/slate for Spartan, etc.).

**6. Set default theme for your workspace**

`lib/color-themes.ts` → set `defaultColorThemeId` to the client theme (e.g. `"spartan"`). This only affects `/playground`, not the public `/` page.

**7. Deploy to Vercel**

- New Vercel project → client repo
- Connect `[CUSTOMER]` domain
- Verify:
  - `https://[domain]/` → under construction + client logo
  - `https://[domain]/playground` → section builder (not in nav for public; noIndex + robots disallow)

**Soft launch checklist**

- [ ] `config/site.ts` has client name, domain, tagline, logo path
- [ ] `lib/seo-content.ts` → `pageSeo.home` updated for client
- [ ] Client logo in `public/`
- [ ] `app/page.tsx` still `<UnderConstruction />`
- [ ] Vercel deployed with client domain
- [ ] `/playground` and `/preview` not linked from public nav (optional: password-protect later)

**You can stop here and theme in `/playground` whenever ready.**

---

### Phase 3 — Content (while soft launch is live)

**8. `lib/demo-content.ts`**

Replace all demo / OSP copy. Key exports:

| Export | Sections using it |
|--------|-------------------|
| `washingHero` | HeroWashing-v1/v2 |
| `washingFlipCards`, `fourFlipCards` | FlipCards |
| `washingServiceSections` | Services-v3 |
| `washingTestimonials` | Testimonials-v3 |
| `associationLogos`, `associationHeading` | Testimonials-v3, LogoBar |
| `washingFooter` | Footer-v4 |
| `heroDemo`, `testimonials`, etc. | Agency-style sections on `/preview` |

Rules:

- Write for `[CUSTOMER]` services and geography
- Every `washingServiceSections[].id` must match a footer link in `washingFooter.serviceLinks` (e.g. `#pressure-washing`)
- One clear primary keyword per service block
- Replace placeholder testimonials with real or approved client copy

**9. `lib/seo-content.ts`** (remaining routes)

- `pageSeo` — unique title + description per route for `[CUSTOMER]`
- `tradeDemoSeo` — headline, description, `areaServed`, `serviceTypes` for JSON-LD

**10. `public/`** (full site assets)

- Client logos (light + dark if using theme headers with BrandLogo)
- Hero banner, service photos
- `og.jpg` (1200×630) → `assets.ogImage`
- Remove or replace unused `public/osp/` demo assets when done

---

### Phase 4 — Theme & layout on `/playground`

**11. Design on `/playground`**

- Run `npm run dev` → open `/playground`
- Creative Bar (bottom): pick client **theme** and **font**
- Section dropdowns: lock header, hero, services, testimonials, footer variants
- Reference stack lives in `components/pages/HomePage.tsx` defaults

Common trade/restoration stack:

- Header-v3 · HeroWashing-v2 · FlipCards · Services-v3 · Testimonials-v3 · Footer-v4

**12. Header logo vs wordmark**

`components/ui/HeaderBrand.tsx` shows a **theme wordmark** in preview for every theme except `lifespring`. For the **live client site**, use the real logo (`BrandLogo`) once assets exist — update HeaderBrand or production homepage wiring so `/` is not stuck on placeholder text.

---

### Phase 5 — Full site (replace under construction)

**13. Real homepage — `app/page.tsx`**

When layout is approved on `/playground`, **replace** `<UnderConstruction />` with the real section stack:

- Import sections **directly** (no `SectionSwitcher`, no `PreviewShell`)
- Mirror chosen stack from registry / `HomePage.tsx`
- Pass props from `demo-content.ts`
- Wrap in `<main id="main-content">`
- Exactly **one `<h1>`** on the page

**14. Scaffold pages**

Update copy and `createMetadata()` in each:

- `app/about/page.tsx`
- `app/services/page.tsx`
- `app/contact/page.tsx`
- `app/blog/page.tsx` (drop from nav if unused)

**15. JSON-LD**

- Playground already adds `LocalBusinessJsonLd` on `/playground`
- Production homepage should include appropriate schema via `components/seo/JsonLd.tsx` when going live

---

### Phase 6 — Full launch

**16. Pre-launch checklist** (details in `docs/SEO.md`)

- [ ] `app/page.tsx` no longer under construction — real homepage live
- [ ] Remove `noIndex` from root `app/layout.tsx` / `pageSeo.home` when ready to index
- [ ] Remove Playground & Preview from `config/site.ts` nav (if added)
- [ ] Confirm `app/sitemap.ts` lists only public routes
- [ ] `/playground` and `/preview` stay noIndex (already configured)
- [ ] Real social URLs in `config/site.ts`
- [ ] Test footer anchor links match service section ids
- [ ] Redeploy Vercel

---

## File map (what to touch per client)

```
config/site.ts              ← business identity (always — soft launch minimum)
lib/seo-content.ts          ← pageSeo.home first, then other routes
public/logo.png             ← under construction logo (soft launch)
app/page.tsx                ← UnderConstruction until Phase 5, then real homepage
lib/color-themes.ts         ← default theme for /playground
lib/demo-content.ts         ← section copy (Phase 3+)
public/                     ← full assets (Phase 3+)
app/*/page.tsx              ← inner pages (Phase 5+)
components/ui/HeaderBrand.tsx  ← logo on live site (Phase 5+)
components/under-construction/UnderConstruction.tsx  ← optional copy tweaks
app/globals.css             ← only if theme tweaks beyond existing palette
package.json                ← project name slug (optional)
```

**Usually do not edit:** `lib/section-registry.tsx` structure, `components/dev/*`, theme system plumbing — unless adding new sections.

---

## Theme quick reference

| Theme ID | Use case |
|----------|----------|
| `spartan` | Restoration / trades — slate, gold, blue water accents |
| `ocean` | Pressure washing / blue-cyan service sites |
| `stone` | Warm neutral local business |
| `lifespring` | LifeSpring agency demos only |
| `dark` | Dark-Space purple aesthetic |
| `light` | Clean generic light UI |

Spartan CSS lives in `app/globals.css` under `.creative-preview[data-color-theme="spartan"]`.

---

## Prompt template for user

Copy, fill in, paste to chat:

```
Read docs/NEW-CLIENT.md and set up this client:

Customer: [BUSINESS NAME]
Domain: [domain.com]
Theme: [spartan | ocean | stone | etc.]
Industry: [e.g. water damage restoration]
Service area: [cities/regions]
Phone: [ ]
Email: [ ]

Phase 1–2 first: config/site.ts, pageSeo.home, client logo, soft launch on Under Construction.
Then theme on /playground. Don't replace app/page.tsx until I say full launch.
```

---

## Version

- **Boilerplate v1.1** — adds soft launch (under construction) before full site
- Pair with `docs/SEO.md` for metadata / schema / go-live detail
