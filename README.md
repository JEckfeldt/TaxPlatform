# GreenGrowth (TaxPlatform)

Greenfield AI-powered client & CPA tax platform prototype for an AI Engineer case study. Frontend UX is the product; data and AI are simulated.

Product name in the UI: **GreenGrowth**. Visual tone: sharper off-white + forest/sage; Sora for titles, Manrope for UI.

## Docs

- [Project status](./docs/project-status.md) — living snapshot (kept current as features change)
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
| Firm work queue ranking + search / segment / entity filters | Tax calculation engine |
| ~150 firm returns; CPA queue shows only Jordan’s book | Real practice management data |
| CPA field review UI + fake W-2 highlight | Real OCR / LLM (`simulateAI` stub) |

## Demo personas

Landing picker options (more roles stay in seed):

| Persona | Path |
| --- | --- |
| Alex Rivera — Client | Client home (what’s next) |
| Jordan Lee — CPA | Firm dashboard (+ **Personal filing** nav → same client home as Alex) |

Client nav always includes Home and Messages. As Jordan CPA, use **Personal filing** in the firm nav for his own return (identical client UX to Alex); use **Firm work** in the client nav to return to the CPA queue. Click **GreenGrowth** in the header to return to the picker. Task completions, return stage, and message replies are in-memory for the session and reset on refresh.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```
