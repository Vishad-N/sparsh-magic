# Sparsh Magic website

Next.js 14 (App Router) + TypeScript. Plain CSS, system font stacks, no UI or animation libraries.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and JSON-LD. Defaults to `https://www.sparshmagic.com`. |
| `LEAD_WEBHOOK_URL` | Where AURA Scan, contact and career submissions are forwarded as JSON (Zapier, Make, Google Apps Script, CRM…). If unset, leads are written to the server log. |

## Where things live

```
app/                 routes (one folder per page)
  api/lead/route.ts  form endpoint: validation, honeypot, webhook forwarding
components/          shared UI: Nav, Footer, Button (liquid), Divider, HeroPanel,
                     PillarExplorer, AuraScan, IndustryExplorer, Blocks …
lib/data.ts          all company content: contacts, stats, pillars, industries, cases
lib/blog.ts          blog posts as typed content blocks
lib/aura.ts          AURA Scan questions and scoring
styles/              base.css (tokens, buttons, dividers, forms),
                     components.css, pages.css
```

## Editing content

- **Contacts, offices, stats, testimonials:** `lib/data.ts` → `site`, `stats`, `caseStudies`, `testimonials`.
- **Social links:** `site.social` (taken from the original sparshmagic.com footer).
- **WhatsApp number:** `site.whatsapp` (digits only).
- **New industry page:** add an entry to `industries` in `lib/data.ts`; the route `/industries/<slug>` is generated automatically.
- **New blog post:** add an entry to `posts` in `lib/blog.ts`.

## Section dividers

`<Divider variant="grid | cells | trail | scan" tone="light | dark" />` draws
low-contrast MAP49 matrix fragments between sections. Use `className="dv-top"`
to straddle the top edge of a coloured section.
