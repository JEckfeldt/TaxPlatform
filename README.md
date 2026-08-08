# GreenGrowth (TaxPlatform)

AI-powered **client & CPA tax UX** prototype for an AI Engineer case study. The product is the clickable frontend; auth, OCR, tax calc, and LLM calls are simulated.

**UI name:** GreenGrowth · **Repo folder:** TaxPlatform  
**Look:** sharper off-white + forest/sage · Sora titles · Manrope UI

## Live demo

[https://tax-platform-seven.vercel.app/](https://tax-platform-seven.vercel.app/)

Pushes to `main` redeploy that production URL (see [docs/deploy-vercel.md](./docs/deploy-vercel.md)).

## 30-second walkthrough

1. **Alex (Client)** — home → Upload W-2 → Messages / “Waiting on you”
2. Click **GreenGrowth** → **Jordan (CPA)** — queue → open Alex’s return → field review / fake W-2 highlight / AI stub → Messages card
3. Firm nav **Personal filing** — Jordan’s own return (same client home as Alex) → **Firm work** back to the CPA queue

## Real vs simulated

| Real | Simulated |
| --- | --- |
| Clickable Next.js UI, routing, persona cookie | Auth / RBAC |
| Seeded returns, tasks, documents, threads | OCR / document parsing |
| Firm queue ranking + search / segment / entity filters | Tax calculation engine |
| ~150 firm returns; queue shows Jordan’s book only | Real practice-management data |
| CPA field review UI + fake W-2 highlight | Real OCR / LLM (`simulateAI` stub) |
| Client + firm message threads (session replies) | Synced multi-user messaging |

## Stack

Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · Vercel

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), pick a demo persona.

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint
```

## Docs

| Doc | Use |
| --- | --- |
| [docs/project-status.md](./docs/project-status.md) | **Source of truth** — what’s shipped now |
| [docs/manual-qa-checklist.md](./docs/manual-qa-checklist.md) | Case-study challenge checks |
| [docs/deploy-vercel.md](./docs/deploy-vercel.md) | Hosting / redeploy notes |
| [docs/project overview.md](./docs/project%20overview.md) | Product spine + video script |
| [docs/roadmap.md](./docs/roadmap.md) | Milestone history |
| [docs/implementations/](./docs/implementations/) | Feature specs (some historical — see banners) |
| [docs/AI_Engineer_Case_Study_Updated.pdf](./docs/AI_Engineer_Case_Study_Updated.pdf) | Case study PDF |

## Demo personas

| Persona | How to enter | Path |
| --- | --- | --- |
| Alex Rivera — Client | Landing picker | Client home |
| Jordan Lee — CPA | Landing picker | Firm dashboard |
| Jordan — Personal filing | Firm nav **Personal filing** | Same client UX as Alex |
