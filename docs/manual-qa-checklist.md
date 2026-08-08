# GreenGrowth — Manual QA Checklist

Quick checks against the ten case study challenges. Click the boxes in the markdown editor (or preview, if supported) to mark pass.

**Demo tip:** Alex = client · Jordan (CPA) = firm · **Personal filing** in firm nav = Jordan’s own return (same client home as Alex). Click **GreenGrowth** → Jordan CPA to return to firm work.

> If checkboxes don’t toggle, edit this file directly and enable `markdown.editor.checkbox.enabled` in settings.

### Glossary


| Term       | Meaning                                                                            |
| ---------- | ---------------------------------------------------------------------------------- |
| **QA**     | Quality assurance — manual checks that the product works as intended               |
| **CPA**    | Certified Public Accountant — here, the tax preparer (Jordan on the firm side)     |
| **AI**     | Artificial intelligence — in this prototype, all AI output is simulated / stubbed  |
| **OCR**    | Optical character recognition — reading text from scanned docs; **not** real here  |
| **W-2**    | US wage and tax statement (employee income form used in the Alex demo)             |
| **CTA**    | Call to action — the main button or prompt you want the user to click next         |
| **UI**     | User interface — what you see and click on screen                                  |
| **nav**    | Navigation — menus and links used to move between pages                            |
| **README** | Project readme file (usually `README.md`) with setup and “real vs simulated” notes |
| **npm**    | Node package manager — used to run scripts like `npm run build` / `npm run dev`    |


---

## 01 — Source Document Traceability

**Summary:** A CPA should be able to trust a number by tracing it back to a source document, page/region, and any transform — without real OCR.

**Examples in this app:** Open Alex’s return as Jordan → select wages or withholding → side panel shows fake W-2 highlight + transform note.

- [x] Easy to open source trace from a return field
- [x] Source doc / page or region is clear
- [x] Feels defensible, not a random popup

---

## 02 — Client & CPA Collaboration

**Summary:** Communication should stay attached to the work (docs/tasks/issues), show who acts next, and not feel like a generic inbox.

**Examples in this app:** Client home “Waiting on you” → message thread → reply. Threads link to related task/doc where seeded.

- [x] Messages feel tied to tax work, not a random inbox
- [ ] Easy to find and open what’s waiting on the client
- [ ] Can reply in-context and see the conversation update

---

## 03 — Where to Start

**Summary:** A first-time client should understand their next action within ~10 seconds — clear hierarchy, not a cluttered dashboard.

**Examples in this app:** Alex home → “Do this next” / Upload W-2 hero, to-do list, status stepper under the title.

- [ ] Next action is obvious within ~10 seconds
- [ ] Primary CTA stands out over secondary tasks
- [ ] Home and Messages are always reachable in client nav

---

## 04 — Getting Lost in the App

**Summary:** Moving between tasks, documents, and messages shouldn’t lose context — breadcrumbs, back paths, related links.

**Examples in this app:** Task ↔ document ↔ message related links; breadcrumbs; Back to home on deep pages.

- [ ] Easy to find back / home from deep pages
- [ ] Related objects (task / doc / message) are discoverable
- [ ] Mobile hamburger links navigate correctly (Home, Messages)

---

## 05 — Role-Aware Experiences

**Summary:** One product, different roles — nav and context should change without feeling like separate apps. Multi-role users can switch (e.g. preparer with a personal return).

**Examples in this app:** Picker → Alex (client) vs Jordan CPA (firm). Jordan personal filing via firm nav only (same client home as Alex).

- [ ] Client vs CPA shells clearly differ (nav / landing)
- [ ] From CPA nav, **Personal filing** opens a client home that matches Alex’s (status, W-2 to-dos, messages)
- [ ] From personal filing, **Firm work** returns to the CPA dashboard
- [ ] Jordan personal is not on the landing picker

---

## 06 — Return Status & Progress

**Summary:** Status should mean the same idea to everyone — where you are, what’s next — without jargon that clients and staff read differently.

**Examples in this app:** Client Gather → Prepare → Review → File stepper; completing a task advances the demo story in-session.

- [ ] Client can tell where the return is in the process
- [ ] Completing a task updates progress in the same session
- [ ] Status UI stays readable (not a cluttered status dump)

---

## 07 — An Actionable Dashboard

**Summary:** A CPA landing should answer “what should I work on right now?” with ranked work and clear next actions — not vanity metrics.

**Examples in this app:** Jordan dashboard → preparer-only queue, Alex pinned at top, urgency + next action on each row.

- [ ] Dashboard feels like a work queue, not a metrics board
- [ ] Clear next action per return row
- [ ] Easy to open a return from the queue (Alex path works)

---

## 08 — Clickable vs. Editable

**Summary:** Field interaction states should be consistent and obvious — AI vs verified vs locked shouldn’t look the same.

**Examples in this app:** Alex return review field list + legend (AI-generated, verified, needs approval, editable, locked, clickable).

- [ ] Different field states are visually distinct
- [ ] Locked / explaining “why” is understandable
- [ ] Affordance language stays consistent across the review screen

---

## 09 — Complexity Made Navigable

**Summary:** Lots of work should stay approachable — search, filters, progressive disclosure — without drowning the user.

**Examples in this app:** Large firm queue + client name search + entity/segment filters + “Showing X of Y”.

- [ ] Search / filters make a large list usable
- [ ] Empty or narrow results don’t feel broken
- [ ] Hierarchy stays simple (summary queue → detail return)

---

## 10 — Trustworthy AI

**Summary:** Show enough AI transparency (what / why / confidence / evidence) and let the user correct output without leaving the flow.

**Examples in this app:** Review side panel → confidence, evidence, accept / edit / reject; low-confidence and warning fields seeded.

- [ ] AI explanation is understandable without model jargon overload
- [ ] Can accept, edit, or reject without leaving review
- [ ] Uncertainty / warning cases are visible in the demo

---

## Ship (deliverables)

Not a numbered challenge, but required for submission.

- [ ] Production build works (`npm run build`)
- [ ] Hosted URL works end-to-end
- [ ] README explains real vs simulated
- [ ] Walkthrough video ≤ 10 min (client-first, then CPA)