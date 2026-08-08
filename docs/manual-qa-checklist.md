# GreenGrowth — Manual QA Checklist

Manual verification guide for the clickable prototype. Derived from [AI_Engineer_Case_Study_Updated.pdf](./AI_Engineer_Case_Study_Updated.pdf), [project overview.md](./project%20overview.md), and current app behavior ([project-status.md](./project-status.md)).

**How to use**

1. Run locally (`npm run dev`) or use the hosted URL once deployed.
2. Work top-to-bottom through **Must pass now**.
3. Click the checkboxes below to mark pass (GitHub-style task lists — works in the markdown editor and most previews).
4. Treat **Deferred / stretch** as optional — do not block ship on those unless you build them.
5. Finish with **Ship package** before submission.

> **Tip (Cursor / VS Code):** Prefer editing this file in the markdown editor (not only preview) so checkbox clicks persist to disk. If clicks do nothing, enable `markdown.editor.checkbox.enabled` in settings.

**Personas on the picker today:** Alex (Client) · Jordan (CPA) · Jordan · Personal filing  
**Switch personas:** click **GreenGrowth** in the header → landing picker (no navbar role dropdown).

---



## Must pass now



### Global / shell

- [x] Landing `/` shows GreenGrowth branding and persona choices
- [x] Choosing **Alex** lands in the **client** shell on `/client/home`
- [x] Choosing **Jordan (CPA)** lands in the **firm** shell on `/firm/dashboard`
- [x] Choosing **Jordan · Personal filing** lands on **client** home for Jordan’s return
- [x] Clicking **GreenGrowth** in the header returns to the persona picker
- [x] Client and firm shells feel like one product (same brand/theme), not two apps
- [x] Mobile-width (~375px): header, nav, and primary CTAs remain usable

---



### US-01 — Cold client knows what to do (#03 Where to Start)

**As** Alex (new client), **I want** an obvious next action, **so that** I can start my return without training.

- [x] Within ~10 seconds on `/client/home`, the primary action is obvious (W-2 / “Do this next”)
- [ ] Headline communicates getting the return started
- [ ] To-do checklist is visible (with strikethrough for completed items)
- [ ] Secondary items don’t overpower the primary CTA
- [ ] Client nav always shows **Home** and **Messages**

---



### US-02 — Client sees return progress (#06 Status)

**As** Alex, **I want** to see where my return is, **so that** I know what’s done and what’s ahead.

- [ ] Return status timeline/stages appear on client home
- [ ] Completing the W-2 task advances the story (home updates; next task or waiting state)
- [ ] Progress feels consistent after refresh only for what’s persisted (task state is session-only — note if reset)

---



### US-03 — Collaboration stays on the work (#02 Collaboration)

**As** Alex, **I want** messages tied to my tax work, **so that** I’m not dumped into a generic inbox.

- [ ] Home shows a **Waiting on you** request when a client-visible thread needs me
- [ ] Opening the request goes to a message thread (not a blank inbox dump)
- [ ] I can reply in the thread; reply appears in the conversation
- [ ] Thread relates to a document/task (related links or seed linkage visible)

---



### US-04 — Don’t lose my place (#04 Navigation)

**As** Alex, **I want** to move between task ↔ document ↔ message without getting lost, **so that** I can finish the request.

- [ ] From home → open primary task → page has breadcrumbs / back to home
- [ ] From task → related document (if linked) → can return toward home/task
- [ ] From task or document → related message → can return without dead ends
- [ ] From a message thread → easy path back to **Messages** list and/or **Home**
- [ ] Deep links feel intentional (object relationships, not random pages)

---



### US-05 — Jordan prepares assigned work (#07 Dashboard, #09 Complexity)

**As** Jordan (CPA), **I want** a ranked queue of *my* returns, **so that** I know what to work on now.

- [ ] Dashboard answers “what should I work on right now?” without vanity KPIs
- [ ] Queue only shows returns where Jordan is the preparer (no other preparer’s book)
- [ ] **Alex Rivera** appears at the **top** of the list when visible
- [ ] Search by client name narrows the list (e.g. `Alex` / `Rivera`)
- [ ] Entity chips (All entities / Individual / Business) change the subset
- [ ] Segments (All / Waiting on client / Blocked / Needs prep) change the subset
- [ ] “Showing X of Y” updates with filters
- [ ] Empty search/filter state is friendly (no crash)
- [ ] Clicking a row opens that return workspace
- [ ] Firm nav does **not** have a separate “Alex return” shortcut (use the queue)

---



### US-06 — Review fields with clear affordances (#08 Clickable vs Editable)

**As** Jordan, **I want** field states to look different, **so that** I know what I can trust or edit.

- [ ] Open **Alex Rivera** return → return review UI loads
- [ ] Field list shows multiple states (AI-generated, verified, needs approval, editable, locked, clickable)
- [ ] Legend or labels make states understandable
- [ ] Locked field explains why (copy on the row/panel)
- [ ] AI-generated vs verified are visually distinct

---



### US-07 — Trace a number to the W-2 (#01 Traceability)

**As** Jordan, **I want** to see where a value came from, **so that** I can defend the return.

- [ ] Selecting a field opens a side panel with source trace
- [ ] Source shows document name, page/region, and transform note
- [ ] Fake W-2 preview highlights a region (not a real PDF parse)
- [ ] At least the individual W-2 path works end-to-end on Alex

---



### US-08 — Trust and correct AI (#10 Trustworthy AI)

**As** Jordan, **I want** AI explanations and a way to correct them, **so that** I stay in control.

- [ ] Panel shows AI summary / rationale / evidence (via stub, not a real model)
- [ ] Confidence is visible at an appropriate depth
- [ ] Low-confidence example is seeded and noticeable
- [ ] Warning/conflict example is seeded and noticeable
- [ ] **Accept** updates the field state (e.g. toward verified)
- [ ] **Edit** lets me change the value and save
- [ ] **Reject** marks the field as needing attention
- [ ] Correction stays in the review flow (no dead-end page)

---



### US-09 — Multi-role Jordan (#05 Role-Aware — dual context)

**As** Jordan, **I want** to use the product as preparer and as a taxpayer for my own return, **so that** one product covers both contexts.

- [ ] From picker, **CPA** → firm dashboard (preparer world)
- [ ] From picker, **Personal filing** → client home for Jordan’s return
- [ ] Personal home shows a clear “personal filing / not firm queue” banner
- [ ] Personal home has a next action / to-do (e.g. confirm dependents)
- [ ] Easy to switch back: GreenGrowth → pick **Jordan (CPA)** again
- [ ] Client vs firm nav/chrome make the context change obvious

---



### US-10 — Honesty about the fake (#constraints / README)

**As** a grader, **I want** to know what’s simulated, **so that** I’m not misled.

- [ ] README states product is a UX prototype with simulated data/AI
- [ ] README lists real vs simulated (auth, OCR, LLM, tax engine, etc.)
- [ ] UI does not pretend live OCR/LLM is running (stubs/copy stay honest)

---



### Cross-path smoke (video-shaped)

Walk this once without stopping for polish notes.

- [ ] Picker → Alex → home primary CTA clear
- [ ] Alex → task → message loop → back to Home/Messages
- [ ] GreenGrowth → Jordan CPA → dashboard → Alex at top → open review
- [ ] Trace + AI accept/edit/reject on Alex return
- [ ] GreenGrowth → Jordan personal → banner + client nav → back to CPA

---



## Deferred / stretch

These appear in the case study or overview but are **not fully built** (or were intentionally cut). Verify only if you implement them later.

### Collaboration (#02) — firm side

- [ ] Firm UI shows internal vs client-visible threads — *Deferred*
- [ ] CPA can leave an internal note that client cannot see — *Deferred*
- [ ] Outstanding requests / next-action owner on firm return workspace — *Deferred / light*



### Roles (#05) — full six lenses

- [ ] Business owner (Sam) distinct client landing — *Deferred (seeded, off picker)*
- [ ] Reviewer (Riley) with reduced edit affordances vs preparer — *Deferred*
- [ ] Firm admin persona / nav differences — *Deferred*
- [ ] Seasonal staff persona / nav differences — *Deferred*
- [ ] Always-visible in-app role switcher in the shell — *Removed — use picker via GreenGrowth*



### Status (#06) — firm + shared language polish

- [ ] Firm return workspace has a clear status strip matching client language — *Deferred / light*
- [ ] Client and firm show the same stage meaning side-by-side in one demo beat — *Partial (client strong; firm light)*



### Where to start (#03) — post-onboarding variant

- [ ] Distinct “onboarding done” home chrome vs first-run — *Removed (unified home; Messages always on)*



### Complexity (#09) — return-workspace hierarchy

- [ ] Hundreds of line items inside a return with in-return search — *Out of scope (scale is on firm queue)*



### Navigation / IA extras

- [ ] Firm deep links for docs/threads matching client richness — *Deferred*
- [ ] Mid-switch deep-link preserve with toast when changing persona — *Not emphasized*

---



## Ship package (M11)

Required by the case study deliverables — not optional for submission.

- [ ] `npm run build` succeeds
- [ ] Deployed on Vercel (or equivalent); public URL works
- [ ] Smoke on **prod URL**: picker → Alex path → Jordan dashboard → Alex review
- [ ] Walkthrough video ≤ 10 minutes
- [ ] Video hits client-first then CPA path (see overview script)
- [ ] Video (or README) calls out real vs simulated
- [ ] Optional video beat: Jordan personal context (cut first if short on time)

---



## Challenge coverage map (quick)


| #   | Challenge                    | Must-pass coverage         | Deferred gap                   |
| --- | ---------------------------- | -------------------------- | ------------------------------ |
| 01  | Source Document Traceability | US-07                      | —                              |
| 02  | Client & CPA Collaboration   | US-03 (client)             | Firm internal/client split     |
| 03  | Where to Start               | US-01                      | Post-onboarding variant        |
| 04  | Getting Lost in the App      | US-04                      | Firm-side depth                |
| 05  | Role-Aware Experiences       | US-09 + global picker      | Riley / Sam / admin / seasonal |
| 06  | Return Status & Progress     | US-02                      | Firm status strip              |
| 07  | An Actionable Dashboard      | US-05                      | —                              |
| 08  | Clickable vs. Editable       | US-06                      | —                              |
| 09  | Complexity Made Navigable    | US-05 (queue scale/search) | In-return line-item catalog    |
| 10  | Trustworthy AI               | US-08                      | —                              |


---



## Session log (optional)


| Date | Tester | Environment  | Result summary |
| ---- | ------ | ------------ | -------------- |
|      |        | local / prod |                |
|      |        |              |                |


