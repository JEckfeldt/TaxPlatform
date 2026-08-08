# GreenGrowth (TaxPlatform)

A clickable **client and tax-preparer** tax product demo for an AI Engineer case study. The screens and flows are real to click through. Login, document scanning, tax math, and live AI are faked.

**Product name in the app:** GreenGrowth · **Folder name:** TaxPlatform  
**Look:** off-white background with forest green accents · Sora for titles · Manrope for body text

## Live demo

[https://tax-platform-seven.vercel.app/](https://tax-platform-seven.vercel.app/)

Pushes to the `main` branch update that site (see [docs/deploy-vercel.md](./docs/deploy-vercel.md)).

## 30-second walkthrough

1. **Alex (client)** — home → upload W-2 → Messages / “Waiting on you”
2. Click **GreenGrowth** → **Jordan (preparer)** — work list → open Alex’s return → review fields, fake W-2 highlight, fake AI explain → Messages card
3. Firm menu **Personal filing** — Jordan’s own return (same client home as Alex) → **Firm work** back to the preparer list

## What’s real vs fake

| Wired up (works in the demo) | Fake / behind the scenes |
| --- | --- |
| Clickable screens, pages, and navigation | Real login or permissions system |
| Sample returns, tasks, documents, and messages | Reading real tax documents from uploads |
| Firm work list with ranking, search, and filters | A real tax calculation engine |
| About 150 sample firm returns (Jordan only sees his) | A real firm database |
| Field review for the preparer + fake W-2 highlight on screen | A real document scanner or AI model |
| Client and preparer message threads | Messages synced across users or devices |

Session note: finishing a task, changing return progress, or sending a reply lasts for that browser session only. Refreshing the page resets those demo changes.

## Key decisions

- **Frontend is the product.** We built a clickable experience graders can walk through. Data and “AI” are stubs on purpose.
- **No real login.** You pick Alex or Jordan on the home screen. The choice is stored in a browser cookie so the right screens stay selected.
- **Client story first, then preparer.** Alex shows “what should I do next.” Jordan shows the work list and a deep review of Alex’s return.
- **Jordan has two hats.** As preparer he uses the firm dashboard. **Personal filing** opens his own return with the same client home as Alex. **Firm work** takes him back.
- **The firm list is Jordan’s book only.** Not every return in a whole firm — just enough to show ranking, search, and filters at scale.
- **“AI” is a stub.** Buttons explain, accept, edit, or reject a field. The text comes from sample data and a small fake function, not a live model.

## Built with

Next.js · TypeScript · Tailwind · shadcn/ui · Vercel

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and pick a demo person.

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint
```

## Docs

| Doc | Use |
| --- | --- |
| [docs/project-status.md](./docs/project-status.md) | What’s shipped right now |
| [docs/manual-qa-checklist.md](./docs/manual-qa-checklist.md) | Manual checks for the case study |
| [docs/deploy-vercel.md](./docs/deploy-vercel.md) | How hosting and redeploys work |
| [docs/project overview.md](./docs/project%20overview.md) | Product story and video outline |
| [docs/roadmap.md](./docs/roadmap.md) | Milestone history |
| [docs/implementations/](./docs/implementations/) | Older feature plans (some outdated — see banners) |
| [docs/AI_Engineer_Case_Study_Updated.pdf](./docs/AI_Engineer_Case_Study_Updated.pdf) | Case study PDF |

## Demo people

| Person | How to enter | Where you land |
| --- | --- | --- |
| Alex Rivera — client | Home screen picker | Client home |
| Jordan Lee — preparer | Home screen picker | Firm dashboard |
| Jordan — personal filing | Firm menu **Personal filing** | Same client home as Alex |
