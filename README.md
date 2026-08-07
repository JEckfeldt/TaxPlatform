# GreenGrowth (TaxPlatform)

Greenfield AI-powered client & CPA tax platform prototype for an AI Engineer case study. Frontend UX is the product; data and AI are simulated.

Product name in the UI: **GreenGrowth**. Visual tone: soft off-white + forest/sage greens.

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
| ~150 firm returns (3 named + generated) | Real practice management data |
| CPA field review UI + fake W-2 highlight | Real OCR / LLM (`simulateAI` stub) |

## Demo personas

Picker currently shows **two** options (more roles stay in seed for later milestones):

| Persona | Path |
| --- | --- |
| Alex Rivera — Client | Client home (first-run / what’s next) |
| Jordan Lee — CPA | Firm dashboard |

On client home, use **Demo: home mode** to toggle First-run vs Settled (Messages nav). Task completions, return stage, and message replies are in-memory for the session and reset on refresh. Home-mode preference uses `localStorage` key `greengrowth_client_home_mode`.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```
