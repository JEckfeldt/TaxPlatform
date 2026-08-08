# GreenGrowth — Project Status

**Last updated:** 2026-08-08  
**Product name:** GreenGrowth  
**Repo folder:** TaxPlatform  

Living snapshot of what exists in the codebase. Update this file whenever features are added, removed, or materially changed. Detailed plans live in [roadmap.md](./roadmap.md) and [implementations/](./implementations/).

---

## Current focus

| | |
| --- | --- |
| **Done recently** | README: plain-language real-vs-fake + key decisions; live Vercel URL |
| **Next up** | M11 demo video |
| **Blocked** | None |

---

## Milestone status

| ID | Challenge | Status | Notes |
| --- | --- | --- | --- |
| M0 | Foundation | Done | Next.js + shadcn + shells + seed |
| M05 | Role-Aware Experiences | Partial | Dual-context done; Riley / ≥4 lenses deferred |
| M03 | Where to Start | Done | W-2 what’s-next home; Home + Messages always in nav |
| M06 | Return Status & Progress | Done | Client timeline; firm strip still light |
| M02 | Client & CPA Collaboration | Done | Client + firm return threads/replies; firm-wide inbox deferred |
| M04 | Getting Lost in the App | Done | Breadcrumbs, related links, Back to home |
| M07 | An Actionable Dashboard | Done | Urgency rank, segment chips |
| M08 | Clickable vs. Editable | Done | Six field states on Alex review + dashboard chips |
| M01 | Source Document Traceability | Done | Fake W-2 highlight in side panel |
| M10 | Trustworthy AI | Done | `simulateAI` stub; accept / edit / reject |
| M09 | Complexity Made Navigable | Done | ~150 returns; name search + entity chips |
| M11 | Ship | Partial | Live at https://tax-platform-seven.vercel.app/ ; demo video still open |

---

## What’s shipped (clickable)

- Persona picker — Alex + Jordan CPA (header brand links back to `/`)
- Full client loop — home, status, requests, tasks, docs, messages/replies (Home + Messages always in nav)
- Jordan dual-context — Firm nav **Personal filing** ↔ client nav **Firm work**; personal home matches Alex (W-2 path)
- CPA dashboard — preparer-scoped queue, search, entity + status segments (no firm-wide All/My)
- CPA return review (Alex) — field affordances, W-2 source trace, AI explain/correct
- CPA return collab — one Messages card (Your turn / Client’s turn + latest); `/firm/messages/[id]` read/reply
- Other firm returns — callout linking to Alex demo path
- Brand/theme — GreenGrowth; sharper forest/sage; Sora titles + Manrope UI; de-carded surfaces

---

## What’s fake / simulated

| Area | State |
| --- | --- |
| Auth | Persona cookie + picker |
| Client tasks / messages / return stage | In-memory session |
| Firm return catalog | 3 named + 147 deterministic generated (~150) |
| Urgency ranking / queue filters | Heuristics in `firm-queue.ts` |
| Field review / AI / W-2 highlight | Seeded fields + `simulateAI`; session-only edits |
| Documents / OCR / tax engine | Not real |

---

## Key routes

| Route | Purpose |
| --- | --- |
| `/` | Persona picker (Alex + Jordan CPA) |
| `/client/home` | Client what’s-next + status + requests (Alex or Jordan personal) |
| `/client/tasks/[id]` | Task flow |
| `/client/documents/[id]` | Document stub |
| `/client/messages` | Thread list |
| `/client/messages/[id]` | Thread + reply |
| `/firm/dashboard` | CPA work queue (search + filters) |
| `/firm/returns/ret-alex-2025` | Deep return review (M08/M01/M10) + collab strip |
| `/firm/returns/[id]` | Other returns — header + collab + link to Alex demo |
| `/firm/messages/[id]` | CPA client-thread read/reply (firm shell) |

---

## Specs & docs

| Doc | Role |
| --- | --- |
| [project overview.md](./project%20overview.md) | Locked decisions, video script |
| [roadmap.md](./roadmap.md) | Milestone plans |
| [implementations/client-first-run.md](./implementations/client-first-run.md) | M03 |
| [implementations/greengrowth-rebrand-layout.md](./implementations/greengrowth-rebrand-layout.md) | Rebrand |
| [implementations/return-status-progress.md](./implementations/return-status-progress.md) | M06 |
| [implementations/client-collab-navigation.md](./implementations/client-collab-navigation.md) | M02+M04 |
| [implementations/cpa-actionable-dashboard.md](./implementations/cpa-actionable-dashboard.md) | M07 (implemented) |
| [implementations/cpa-return-review.md](./implementations/cpa-return-review.md) | M08+M01+M10 (implemented) |
| [implementations/cpa-queue-scale-search.md](./implementations/cpa-queue-scale-search.md) | M09 (implemented) |
| [implementations/jordan-dual-context.md](./implementations/jordan-dual-context.md) | M05 polish (implemented) |
| [implementations/ui-refresh-greengrowth.md](./implementations/ui-refresh-greengrowth.md) | UI theme/structure refresh (implemented) |
| [manual-qa-checklist.md](./manual-qa-checklist.md) | User stories + manual verification checklists |
| [deploy-vercel.md](./deploy-vercel.md) | Hosting / redeploy notes (live URL) |
| [AI_Engineer_Case_Study_Updated.pdf](./AI_Engineer_Case_Study_Updated.pdf) | Case study |

---

## Changelog (newest first)

### 2026-08-08

- Docs/repo cleanup: README walkthrough, shared `AppBreadcrumbs`/`navigation.ts`, stale implementation banners
- Deployed to Vercel: https://tax-platform-seven.vercel.app/
- M11 prep: `npm run build` verified; [deploy-vercel.md](./deploy-vercel.md)
- Firm return single Messages card (whose turn + latest message); `/firm/messages/[id]` replies
- Jordan personal filing matches Alex client home; **Firm work** nav back to CPA; removed from picker

### 2026-08-07

- Firm queue: preparer-only book (removed All/My returns); Alex pinned to top; removed “Alex return” nav
- Removed navbar role-switcher dropdown; Jordan personal moved onto landing picker
- Unified client home: removed First-run/Settled demo toggle; Home + Messages always visible; full to-do list
- UI refresh: sharper GreenGrowth tokens, Sora display titles, de-carded firm queue and client sections

### 2026-08-06

- Implemented Jordan dual-context: switcher personal filing, settled home banner, dependents task
- Implemented M09: ~150 firm returns, client-name search, entity chips, Showing X of Y
- Wrote M09 plan: `docs/implementations/cpa-queue-scale-search.md`
- Implemented M08+M01+M10: Alex return review workspace, fake W-2 trace, `simulateAI`, dashboard chips
- Wrote return-review plan: `docs/implementations/cpa-return-review.md`
- Implemented M07: firm work queue with urgency ranking, segment filters
- Wrote M07 plan: `docs/implementations/cpa-actionable-dashboard.md`
- Implemented M02+M04 client collab/navigation
- Implemented M06 client return status timeline
- GreenGrowth rebrand/layout; M03 client first-run; initial scaffold
