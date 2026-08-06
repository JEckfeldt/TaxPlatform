# Ledgerline (TaxPlatform)

Greenfield AI-powered client & CPA tax platform prototype for an AI Engineer case study. Frontend UX is the product; data and AI are simulated.

## Docs

- [Project overview](./docs/project%20overview.md) — locked decisions, product spine, video script
- [Roadmap](./docs/roadmap.md) — challenge milestones (M0–M11)
- [Case study PDF](./docs/AI_Engineer_Case_Study_Updated.pdf)

## Stack

Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), pick a demo persona, and explore the client or firm shell.

## What’s real vs simulated

| Real | Simulated |
| --- | --- |
| Clickable Next.js UI, routing, persona cookie | Auth / RBAC |
| Seeded returns, tasks, documents, threads | OCR / document parsing |
| Simple urgency sort on the firm dashboard | Tax calculation engine |
| — | LLM / extraction / confidence (stubs come in later milestones) |

## Demo personas

| Persona | Path |
| --- | --- |
| Alex Rivera — individual client | Client home (cold start) |
| Sam Okonkwo — business owner | Client shell, business return |
| Jordan Lee — tax preparer | Firm dashboard |
| Jordan Lee — personal return | Client context for dual-role |
| Riley Chen — reviewer | Firm shell, review lens |

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```
