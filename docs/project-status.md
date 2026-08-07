# GreenGrowth — Project Status

**Last updated:** 2026-08-06  
**Product name:** GreenGrowth  
**Repo folder:** TaxPlatform  

Living snapshot of what exists in the codebase. Update this file whenever features are added, removed, or materially changed. Detailed plans live in [roadmap.md](./roadmap.md) and [implementations/](./implementations/).

---

## Current focus

| | |
| --- | --- |
| **Done recently** | M02+M04 client collab/navigation; M06 status; M03 first-run; GreenGrowth rebrand |
| **Next up** | CPA path (M07 dashboard → M08/M01/M10) or M05 role polish |
| **Blocked** | None |

---

## Milestone status

| ID | Challenge | Status | Notes |
| --- | --- | --- | --- |
| M0 | Foundation | Done | Next.js + shadcn + shells + seed |
| M05 | Role-Aware Experiences | Partial | 2 picker personas (Alex, Jordan); others seeded but hidden |
| M03 | Where to Start | Done | W-2 hero, demo First-run/Settled toggle, fake upload loop |
| M06 | Return Status & Progress | Done | Client timeline; task-driven Gather→Prepare; firm UI deferred |
| M02 | Client & CPA Collaboration | Done | Client threads + replies + home requests; firm UI deferred |
| M04 | Getting Lost in the App | Done | Breadcrumbs, related links, Back to home |
| M07 | An Actionable Dashboard | Stub | Urgency sort on few returns |
| M08 | Clickable vs. Editable | Not started | — |
| M01 | Source Document Traceability | Stub | Placeholder on return workspace |
| M10 | Trustworthy AI | Not started | No `simulateAI` UI yet |
| M09 | Complexity Made Navigable | Stub | No large fixture set / search |
| M11 | Ship | Not started | Not deployed; no video yet |

---

## What’s shipped (clickable)

- Persona picker (`/`) — Client (Alex) + CPA (Jordan)
- Client home — status timeline, outstanding requests, what’s-next hero, tasks
- Client tasks / documents — related links + breadcrumbs
- Client messages list + thread detail with reply
- Demo home mode toggle — First-run hides Messages nav; Settled shows it (threads still reachable via home requests)
- Firm shell — dashboard queue, sample return workspace stubs
- Brand/theme — GreenGrowth; soft off-white + forest/sage; `max-w-5xl` layouts

---

## What’s fake / simulated

| Area | State |
| --- | --- |
| Auth | Persona cookie + picker (no real login) |
| Task completion | In-memory; resets on refresh |
| Return stage | Derived in-memory from client tasks; resets on refresh |
| Messages / replies | In-memory; resets on refresh |
| Home mode | `localStorage` key `greengrowth_client_home_mode` |
| Documents / OCR | Placeholders only |
| AI / extraction | Not built yet |
| Firm messaging / internal notes | Not built |
| Tax engine | None |

---

## Key routes

| Route | Purpose |
| --- | --- |
| `/` | Persona picker |
| `/client/home` | What’s-next + status + requests |
| `/client/tasks/[id]` | Task + fake upload/answer |
| `/client/documents/[id]` | Document stub + related links |
| `/client/messages` | Thread list |
| `/client/messages/[id]` | Thread detail + reply |
| `/firm/dashboard` | CPA work queue |
| `/firm/returns/[id]` | Return workspace stubs |

---

## Specs & docs

| Doc | Role |
| --- | --- |
| [project overview.md](./project%20overview.md) | Locked decisions, video script |
| [roadmap.md](./roadmap.md) | Milestone plans + acceptance criteria |
| [implementations/client-first-run.md](./implementations/client-first-run.md) | M03 (implemented) |
| [implementations/greengrowth-rebrand-layout.md](./implementations/greengrowth-rebrand-layout.md) | Rebrand/layout (implemented) |
| [implementations/return-status-progress.md](./implementations/return-status-progress.md) | M06 (implemented) |
| [implementations/client-collab-navigation.md](./implementations/client-collab-navigation.md) | M02+M04 (implemented) |
| [AI_Engineer_Case_Study_Updated.pdf](./AI_Engineer_Case_Study_Updated.pdf) | Case study source |

---

## Changelog (newest first)

### 2026-08-06

- Implemented M02+M04: messages list/detail + replies, home requests, breadcrumbs, related object links
- Wrote M02+M04 plan: `docs/implementations/client-collab-navigation.md`
- Updated planning skill: options must include simple meaning + tradeoffs; one question at a time
- Implemented M06: client return status timeline + task-driven stage advance
- Implemented GreenGrowth rebrand, forest/sage theme, wider mobile-friendly layouts, mobile nav menu
- Removed unused public SVGs and unused shadcn UI
- Implemented client first-run (M03)
- Scaffolded Next.js app, client/firm shells, seed fixtures (M0)
