# TaxPlatform — Project Overview

Greenfield AI-powered client & CPA tax platform for the AI Engineer case study. Graded on frontend UX (visual design, interaction design, information architecture), not production backend or real AI.

**Living status:** [project-status.md](./project-status.md) (prefer that file for “what’s shipped now”).  
**Live demo:** [https://tax-platform-seven.vercel.app/](https://tax-platform-seven.vercel.app/)  
**Source:** [AI_Engineer_Case_Study_Updated.pdf](./AI_Engineer_Case_Study_Updated.pdf)

> Some locked decisions below are historical (e.g. in-app role switcher, soft visual tone). Current product: landing picker + firm **Personal filing** / client **Firm work**; sharper GreenGrowth theme.

---

## Case study constraints (non-negotiable)

| Principle | What it means for us |
| --- | --- |
| Greenfield | No legacy app, design system, or data model to inherit |
| Frontend is the grade | Working, clickable prototype > static mockups or long writeups |
| Backend stays fake | Hardcoded data, mocked APIs, stub “AI” JSON — ideal, not a shortcut |
| Simulate AI | Fabricate extraction, confidence, recommendations, warnings |
| Prove the concept | Enough edge cases that the idea is testable, not one happy path |
| Document the fake | Short README note: what’s real vs simulated |

### Deliverables

1. **Hosted working prototype** (Vercel) covering all 10 challenges  
2. **Walkthrough video** — screen recording + narration, **5–10 min max**  
3. **Short README** — real vs simulated + key decisions  

---

## Locked decisions

| Decision | Choice |
| --- | --- |
| Scope | All 10 challenges |
| Contradictions? | No — they compose via one shell + role-aware progressive disclosure |
| Time budget | 36–48 hours (prototype + video) |
| Walkthrough hero | Client-first, then switch into CPA |
| Sample data | Mixed — individual 1040 + small-business return(s) |
| Product name | GreenGrowth |
| Visual tone | Sharper off-white + forest/sage; document-review density on CPA surfaces |
| Stack | Next.js (App Router) + TypeScript |
| Demo auth | Landing persona picker; Jordan dual-context via Personal filing / Firm work nav |
| UI | shadcn/ui + custom GreenGrowth theme |
| Hosting | Vercel Hobby (free) |
| Video | 5–10 minutes max |

**Build rule for 36–48h / all 10:** one shared shell, one demo narrative, depth where the video clicks, stubs elsewhere.

---

## The ten challenges

| # | Challenge | One-liner | Where it lives in the product |
| --- | --- | --- | --- |
| 01 | Source Document Traceability | Trace every number back to its source | CPA return review: field ↔ value ↔ doc ↔ page ↔ transform |
| 02 | Client & CPA Collaboration | Unify communication around docs/issues | Contextual threads; internal vs client-visible; next-action owner |
| 03 | Where to Start | Next action clear in ~10s | Client first-run home |
| 04 | Getting Lost in the App | Navigation that preserves context | Breadcrumbs, deep links, “return to workflow,” object graph |
| 05 | Role-Aware Experiences | One product, six roles | Persona picker + shell that adapts; multi-role demo user |
| 06 | Return Status & Progress | Shared status language | Status strip / timeline on client + firm views |
| 07 | An Actionable Dashboard | “What should I work on right now?” | CPA landing work queue |
| 08 | Clickable vs. Editable | Consistent interaction affordances | Field state system across review screens |
| 09 | Complexity Made Navigable | Deep work without overwhelm | Search/filter/hierarchy on return workspace + large fixture set |
| 10 | Trustworthy AI | Transparency without overload | AI explain / confidence / evidence / correct flow |

**Roles (#05):** individual taxpayer, business owner, tax preparer, reviewer, firm admin, seasonal staff — demonstrate via personas; full six need not each get unique screens if nav/permissions clearly change.

---

## Product spine

```
/                          light persona picker
├── Client shell
│   ├── /home              “What’s next” (#03) + status (#06)
│   ├── /tasks/[id]        questionnaire / doc request
│   ├── /documents/[id]    view + tied messages (#02, #04)
│   └── /messages          contextual, not a generic inbox (#02)
└── Firm shell
    ├── /dashboard         actionable queue (#07, #09 scale)
    ├── /returns/[id]      status (#06) + field review (#01, #08, #10)
    └── /returns/[id]/…    docs, threads, filters (#02, #04, #09)
```

### Demo personas (seed)

| Persona | Role lens | Purpose |
| --- | --- | --- |
| Alex Rivera | Individual client (new) | Cold start (#03); personal 1040 |
| Sam Okonkwo | Business owner client | Second client flavor; mixed data |
| Jordan Lee | Tax preparer | Default CPA path (#07, #01) |
| Jordan Lee (personal) | Preparer + own return | Multi-role switch (#05) |
| Riley Chen | Reviewer | Permission / nav contrast (#05) |
| Optional stub | Firm admin / seasonal | Nav differences only if time |

---

## 5–10 min video script (challenge map)

Keep narration tight; every beat proves a challenge.

| Time | Beat | Challenges |
| --- | --- | --- |
| 0:00–0:30 | Persona picker → continue as Alex (client) | #05 |
| 0:30–1:30 | Client home: one next action, progress, urgency | #03, #06 |
| 1:30–3:00 | Open task → document → message without losing place; show ownership | #02, #04 |
| 3:00–3:30 | Switch to Jordan (preparer); shell adapts | #05 |
| 3:30–5:00 | Dashboard: urgency ranking, drill into return; mention scale/filters | #07, #09 |
| 5:00–7:30 | Return review: field states, AI trust panel, W-2 source highlight, correct a value | #01, #08, #10 |
| 7:30–9:00 | Return Messages card → firm thread reply; note client “Waiting on you” ownership | #02, #06 |
| 9:00–10:00 | Firm nav **Personal filing** ↔ **Firm work**; wrap real vs simulated | #05 |

If short on time in the video, cut the multi-role personal-return beat first — keep traceability + AI trust + dashboard.

---

## Screen-by-screen build list (36–48h)

### Must-ship (video path)

1. **Persona picker** — Alex + Jordan CPA  
2. **Client home** — primary CTA, to-dos, status stepper, Home + Messages nav  
3. **Task / document / message triad** — related links, breadcrumbs  
4. **CPA dashboard** — ranked queue; open a return  
5. **Return workspace** — field affordances, AI + source side panel  
6. **Collaboration** — client requests + firm return Messages card / thread reply  
7. **Jordan dual-context** — Personal filing / Firm work nav  

### Should-ship / deferred

8. Business-owner persona landing (Sam — seed only)  
9. Large fixture set (100+ returns) + search/filter — **done** (~150)  
10. Reviewer persona (Riley — seed only)  
11. Internal vs client-visible firm thread toggle — deferred  
12. Demo video (M11 remainder)  

### Explicitly fake / stub

- OCR, tax calc, real auth, messaging backend, LLM  
- Seeded JSON + `simulateAI()` returning confidence / evidence / recommendations  

---

## Technical approach

| Layer | Choice |
| --- | --- |
| App | Next.js App Router + TypeScript |
| UI | shadcn/ui + Tailwind; custom CSS variables (calm fintech) |
| State / data | TS fixtures + light client state (React context or Zustand) |
| AI | Stub functions → plausible JSON |
| Hosting | Vercel |
| Docs | This overview + root README “real vs simulated” |

### Fake data to seed first

- Personas above  
- One individual return + one small-business return in the video path  
- W-2 (and optionally 1099 / K-1) with page-region → field maps  
- Fields in mixed states: AI-generated, verified, needs approval, locked  
- Batch of returns/tasks with urgency variance for dashboard ranking  
- Hundreds of mock items for #09 filtering demo  

---

## Phased build plan

### Phase 0 — Done (scope lock)
Decisions in this doc are locked.

### Phase 1 — Shell & data (~6–8h)
Scaffold Next.js + shadcn, theme tokens, persona picker, client/firm shells, fixture model (`Return`, `Document`, `Field`, `Task`, `Message`, `Status`).

### Phase 2 — Client path (~8–10h)
Home (#03), status (#06), task/doc/message navigation (#02, #04).

### Phase 3 — Firm path (~10–14h)
Dashboard (#07), return review + trace (#01), affordances (#08), AI trust (#10), collab pane (#02), progressive disclosure / search (#09).

### Phase 4 — Roles, edges, ship (~6–10h)
Multi-role Jordan, reviewer contrast, edge states (blocked, low confidence), README, deploy, record 5–10 min video.

---

## Next step

Scaffold is in place (see [roadmap.md](./roadmap.md) M0). Execute challenge milestones starting with **M05** (finish role-aware polish) or **M03** (client first-run).
