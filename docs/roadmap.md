# TaxPlatform — Project Roadmap

Rough delivery roadmap for the case study prototype. Each **challenge is a milestone**. Foundational scaffolding (M0) is done; challenge milestones ship interactive UX on that shell.

**Companion docs:** [project overview.md](./project%20overview.md) · [case study PDF](./AI_Engineer_Case_Study_Updated.pdf)

**Budget:** 36–48 hours total · **Video:** 5–10 min · **Stack:** Next.js + TypeScript + shadcn · **Host:** Vercel

---

## Guiding rules

| Rule | Meaning |
| --- | --- |
| One product spine | Extend the existing client/firm shell; do not spawn parallel demos |
| Fake the guts | Seeded fixtures + `simulateAI()` stubs; no real OCR/auth/LLM |
| Video path first | Prefer depth on screens in the 5–10 min walkthrough |
| Milestone = challenge | Done means acceptance criteria below are clickable, not “designed on paper” |
| Spec later if needed | For heavy milestones, optional `docs/implementations/<milestone>.md` before coding |

---

## Milestone map

| ID | Challenge | Depends on | Est. | Status |
| --- | --- | --- | --- | --- |
| **M0** | Foundation (scaffold) | — | ~4–6h | **Done** |
| **M05** | Role-Aware Experiences | M0 | ~3–4h | Partial (picker + switcher) |
| **M03** | Where to Start | M05 | ~4–5h | Stub |
| **M06** | Return Status & Progress | M03 | ~3–4h | Stub |
| **M02** | Client & CPA Collaboration | M03 | ~4–5h | Stub |
| **M04** | Getting Lost in the App | M02 | ~3–4h | Stub |
| **M07** | An Actionable Dashboard | M05 | ~4–5h | Stub |
| **M08** | Clickable vs. Editable | M07 | ~3–4h | Not started |
| **M01** | Source Document Traceability | M08 | ~5–6h | Stub |
| **M10** | Trustworthy AI | M01, M08 | ~4–5h | Not started |
| **M09** | Complexity Made Navigable | M07, M01 | ~4–5h | Stub |
| **M11** | Ship (README, deploy, video) | All | ~3–4h | Not started |

Suggested order above follows the **client-first demo narrative**, then firm depth. Parallelizable after M05: client track (M03→M06→M02→M04) and firm track (M07→M08→M01→M10), merge for M09/M11.

```mermaid
flowchart LR
  M0[M0 Foundation] --> M05[M05 Roles]
  M05 --> M03[M03 Where to Start]
  M03 --> M06[M06 Status]
  M03 --> M02[M02 Collaboration]
  M02 --> M04[M04 Navigation]
  M05 --> M07[M07 Dashboard]
  M07 --> M08[M08 Affordances]
  M08 --> M01[M01 Traceability]
  M01 --> M10[M10 Trustworthy AI]
  M07 --> M09[M09 Complexity]
  M01 --> M09
  M04 --> M11[M11 Ship]
  M10 --> M11
  M09 --> M11
  M06 --> M11
```

---

## M0 — Foundation (complete)

### Feature summary
Scaffold Next.js App Router app with shadcn, calm-fintech theme, persona picker, client/firm shells, and seed fixtures.

### Goals
- Runnable local app with shared shell and demo personas
- Placeholder routes for the video path
- Types + seed data ready for challenge milestones

### Non-goals
- Real auth, APIs, OCR, tax engine
- Pixel-perfect challenge UX

### Acceptance criteria
- [x] `npm run dev` serves persona picker at `/`
- [x] Client shell: `/client/home`, tasks, documents, messages
- [x] Firm shell: `/firm/dashboard`, `/firm/returns/[id]`
- [x] In-app persona switcher
- [x] Seed returns/tasks/docs/threads for Alex, Sam, Jordan

---

## M05 — Role-Aware Experiences

### Feature summary
One product shell that adapts navigation, permissions copy, and landing routes by persona — including multi-role Jordan (firm vs personal return).

### Goals
- Clear permission / context differences across personas
- Firm employee with personal return feels like context switch, not a second product

### Non-goals
- Real RBAC engine
- Unique full app per all six roles (nav + permission deltas are enough)

### UI / routes
- Refine `/` persona picker
- Role-aware nav items in client/firm headers
- Optional “You are viewing as…” permission banners

### Acceptance criteria
- [ ] Switching personas changes nav and home destination
- [ ] Jordan (preparer) vs Jordan (personal) demonstrates dual context
- [ ] Riley (reviewer) shows reduced edit affordances vs Jordan
- [ ] At least four of six role lenses are represented in picker or switcher

### Edge cases
- Switching mid-return preserves deep link where possible or lands on role home with toast

---

## M03 — Where to Start

### Feature summary
Cold client (Alex) understands the single next action within ~10 seconds; chrome is deferred until relevant.

### Goals
- Ruthless first-run hierarchy
- Progress + urgency without clutter
- Post-onboarding home variant

### Non-goals
- Full questionnaire product
- Marketing onboarding carousel

### UI / routes
- `/client/home` primary CTA + short task list
- Hidden advanced nav until first task complete (toggleable demo state)

### Acceptance criteria
- [ ] New-client home has one dominant next action
- [ ] Secondary tasks visible but visually subordinate
- [ ] Demo control or state for “onboarding done” home
- [ ] Works for Alex; Sam home can reuse pattern with business copy

---

## M06 — Return Status & Progress

### Feature summary
Shared status language so client and firm interpret the same stage the same way, with appropriate detail by audience.

### Goals
- Status model + labels used on both shells
- Show done / next / owner / blockers
- Client view hides unnecessary internal stages

### Non-goals
- Workflow engine / state machine backend

### Acceptance criteria
- [ ] Status strip/timeline on client home and firm return workspace
- [ ] Same underlying status enum; different detail levels
- [ ] Blockers visible when present
- [ ] At least 4 sample returns at different stages

---

## M02 — Client & CPA Collaboration

### Feature summary
Contextual threads on documents/issues; internal vs client-visible; outstanding requests; next-action owner.

### Goals
- Not a generic inbox
- Permissions visibly demonstrated (internal note vs client message)

### Non-goals
- Real-time messaging backend
- Email/SMS integration

### Acceptance criteria
- [ ] Thread UI linked from document/task/return
- [ ] Internal vs client visibility toggle or filter (firm)
- [ ] Outstanding request list with owner
- [ ] Seeded CPA + client conversation clickable end-to-end

---

## M04 — Getting Lost in the App

### Feature summary
Move across messages, documents, questionnaires, and tasks without losing place.

### Goals
- Global vs contextual nav
- Breadcrumbs / orientation
- Deep links + return-to-workflow

### Non-goals
- Full browser-history time travel product

### Acceptance criteria
- [ ] Object graph links: task ↔ document ↔ thread ↔ return
- [ ] Breadcrumbs or equivalent on deep pages
- [ ] “Back to workflow” / resume control when leaving a path
- [ ] Hardcoded relationships drive the demo

---

## M07 — An Actionable Dashboard

### Feature summary
CPA landing answers “what should I work on right now?” with ranking, drill-in, and scale.

### Goals
- Decision-oriented queue, not vanity metrics
- Urgency ranking script over mock data
- Usable with many returns (filters/search entry points)

### Non-goals
- Real reporting warehouse
- Perfect manager analytics suite

### Acceptance criteria
- [ ] Ranked work items with clear next action
- [ ] Click-through into return workspace
- [ ] Filter or segment (e.g. my returns / blocked / awaiting client)
- [ ] Batch of fake returns (≥30; prefer 100+ for M09 synergy)

---

## M08 — Clickable vs. Editable

### Feature summary
Consistent visual language for clickable, editable, AI-generated, verified, needs-approval, and locked fields.

### Goals
- Affordance system used on multiple screens
- Immediate clarity without legend overload

### Non-goals
- Full design-system documentation site

### Acceptance criteria
- [ ] Field state tokens/components for all six states
- [ ] Demonstrated on return review + at least one other surface
- [ ] Locked state explains why (tooltip/copy)
- [ ] AI vs human-verified visually distinct

---

## M01 — Source Document Traceability

### Feature summary
Return review connects field → extracted value → source document → page/section → transformation.

### Goals
- Side-by-side review interaction
- Defensible AI output via provenance

### Non-goals
- Real OCR / PDF parsing

### Acceptance criteria
- [ ] Click a return field to open trace panel
- [ ] Shows source doc, page/region highlight (fake), and transform note
- [ ] Hardcoded handful of sample docs + links
- [ ] Works for at least individual W-2 path; business doc optional bonus

---

## M10 — Trustworthy AI

### Feature summary
AI interaction model: what / why / evidence / uncertainty / suggested action / correction without breaking flow.

### Goals
- Transparency without dumping model internals
- Correction UX that stays in workflow

### Non-goals
- Real model calls
- Showing every technical score by default

### Acceptance criteria
- [ ] `simulateAI()` (or equivalent) powers UI from stub JSON
- [ ] Confidence + evidence shown at appropriate depth
- [ ] User can accept / edit / reject a recommendation
- [ ] Low-confidence and conflict edge cases seeded

---

## M09 — Complexity Made Navigable

### Feature summary
Deep professional workspace stays approachable via progressive disclosure, search/filter, summary↔detail.

### Goals
- Stress UI against large fake volume
- Persistent context while drilling into source detail

### Non-goals
- Reducing real tax complexity itself

### Acceptance criteria
- [ ] Large fixture set (hundreds of items or returns)
- [ ] Search + filters return useful subsets
- [ ] Summary vs detail views
- [ ] Move from high-level review to source-level detail without losing return context

---

## M11 — Ship

### Feature summary
Submission package: hosted prototype, README (real vs simulated), 5–10 min walkthrough video.

### Goals
- Deployed Vercel URL
- Honest simulation notes
- Video hits all 10 challenges via the locked narrative

### Acceptance criteria
- [ ] Production build succeeds; deployed on Vercel
- [ ] README lists real vs simulated + key decisions
- [ ] Video ≤10 min covering client-first then CPA path
- [ ] Quick smoke of persona switch + primary flows on prod URL

---

## Risks

| Risk | Mitigation |
| --- | --- |
| Scope blowup across 10 milestones | Timebox each; stub secondary personas/screens |
| Affordance + AI + trace piled on one screen | Build M08 tokens first, then attach M01/M10 |
| Large dataset slows UX | Generate once, virtualize/filter; don’t render 500 DOM rows raw |
| Video runs long | Cut dual-context Jordan beat first; keep trace + AI + dashboard |

---

## Assumptions

| Decision | Rationale | Alternatives |
| --- | --- | --- |
| Milestones = challenges (+ M0/M11) | Matches case study grading units | Epic-by-surface only |
| Client track before deep firm UX | Locked walkthrough hero | CPA-first |
| Optional per-milestone specs in `docs/implementations/` | Roadmap stays light; heavy work can deepen later | Full specs for all 10 upfront |

---

## How to use this roadmap

1. Pick the next incomplete milestone in the suggested order (or a parallel track).  
2. If the milestone is large, write `docs/implementations/mXX-short-name.md` from the feature-implementation template, then implement.  
3. Check off acceptance criteria in this file as you go.  
4. Keep the [project overview](./project%20overview.md) video script honest as surfaces land.
