# GreenGrowth — Project Status

**Last updated:** 2026-08-06  
**Product name:** GreenGrowth  
**Repo folder:** TaxPlatform  

Living snapshot of what exists in the codebase. Update this file whenever features are added, removed, or materially changed. Detailed plans live in [roadmap.md](./roadmap.md) and [implementations/](./implementations/).

---

## Current focus

| | |
| --- | --- |
| **Done recently** | M07 CPA dashboard; M02+M04 client loop; M06 status; M03 first-run |
| **Next up** | Return review core (M08 affordances → M01 trace → M10 AI trust) |
| **Blocked** | None |

---

## Milestone status

| ID | Challenge | Status | Notes |
| --- | --- | --- | --- |
| M0 | Foundation | Done | Next.js + shadcn + shells + seed |
| M05 | Role-Aware Experiences | Partial | 2 picker personas (Alex, Jordan); others seeded but hidden |
| M03 | Where to Start | Done | W-2 hero, demo First-run/Settled toggle, fake upload loop |
| M06 | Return Status & Progress | Done | Client timeline; firm strip still light |
| M02 | Client & CPA Collaboration | Done | Client threads + replies + home requests; firm UI deferred |
| M04 | Getting Lost in the App | Done | Breadcrumbs, related links, Back to home |
| M07 | An Actionable Dashboard | Done | ~50 returns, urgency rank, segment chips |
| M08 | Clickable vs. Editable | Not started | — |
| M01 | Source Document Traceability | Stub | Placeholder on return workspace |
| M10 | Trustworthy AI | Not started | No `simulateAI` UI yet |
| M09 | Complexity Made Navigable | Stub | Dashboard scale started; deep search later |
| M11 | Ship | Not started | Not deployed; no video yet |

---

## What’s shipped (clickable)

- Persona picker — Client (Alex) + CPA (Jordan)
- Full client loop — home, status, requests, tasks, docs, messages/replies
- CPA dashboard — ranked queue, segments, ~50 simulated returns, click-through
- Firm return workspace — stub review milestones (lookup works for generated ids)
- Brand/theme — GreenGrowth; soft off-white + forest/sage

---

## What’s fake / simulated

| Area | State |
| --- | --- |
| Auth | Persona cookie + picker |
| Client tasks / messages / return stage | In-memory session |
| Firm return catalog | 3 named + 47 deterministic generated |
| Urgency ranking | Heuristic score in `firm-queue.ts` |
| Documents / OCR / AI / tax engine | Not real |

---

## Key routes

| Route | Purpose |
| --- | --- |
| `/` | Persona picker |
| `/client/home` | Client what’s-next + status + requests |
| `/client/tasks/[id]` | Task flow |
| `/client/documents/[id]` | Document stub |
| `/client/messages` | Thread list |
| `/client/messages/[id]` | Thread + reply |
| `/firm/dashboard` | CPA work queue |
| `/firm/returns/[id]` | Return workspace stubs |

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
| [AI_Engineer_Case_Study_Updated.pdf](./AI_Engineer_Case_Study_Updated.pdf) | Case study |

---

## Changelog (newest first)

### 2026-08-06

- Implemented M07: firm work queue with ~50 returns, urgency ranking, segment filters
- Wrote M07 plan: `docs/implementations/cpa-actionable-dashboard.md`
- Implemented M02+M04 client collab/navigation
- Implemented M06 client return status timeline
- GreenGrowth rebrand/layout; M03 client first-run; initial scaffold
