# Client First-Run (M03 · Where to Start)

> **Partially outdated.** M03 shipped; First-run/Settled toggle and hidden Messages chrome were removed. Historical planning only — see [project-status.md](../project-status.md).

## Feature summary

Polish the cold-client experience so Alex Rivera lands on a home screen where the single next action (“Upload W-2 — Acme Corp”) is obvious within ~10 seconds. Include a demo toggle for first-run vs settled chrome, a light fake upload completion on the task page, and simplify the persona picker to two options for now (one client, one CPA).

## Problem being solved

A brand-new client has no muscle memory. The scaffold home already shows a primary CTA, but it still feels like a stub: Messages nav always visible, no progress/urgency hierarchy, no post-onboarding contrast, and the persona picker exposes five roles before the video even starts. Graders need a believable first-run path, not a dashboard dump.

## Goals

- One dominant next action on client home for Alex (Upload W-2)
- Secondary tasks visible but visually subordinate
- First-run chrome: brand + persona switch only; hide Messages until settled
- Demo toggle: First-run / Settled (for walkthrough contrast)
- Light task page loop: fake “I’ve uploaded this” marks primary task done and returns to home
- Persona picker shows exactly two options for now: one client (Alex), one CPA (Jordan preparer)

## Non-goals

- Real file upload, OCR, or storage
- Full multi-step questionnaire product
- Marketing carousel / tutorial overlays
- Completing M05 for all six roles (Sam, Riley, Jordan-personal stay in seed data but off the picker for now)
- Firm dashboard or return-review UX (later milestones)
- Real auth

## Existing architecture context

- App: Next.js App Router, TypeScript, shadcn/ui, calm-fintech theme (`src/app/globals.css`)
- Persona state: `PersonaProvider` + cookie `taxplatform_persona` (`src/components/persona/persona-provider.tsx`, `src/lib/persona-cookie.ts`)
- Personas list: `PERSONAS` in `src/lib/personas.ts` (currently five entries)
- Picker UI: `src/app/page.tsx` maps all `personas` from context
- Client shell: `src/app/client/layout.tsx` → `AppHeader` with fixed nav Home + Messages
- Client home: `src/app/client/home/page.tsx` — client component using `returnForPersona` + `TASKS`; still shows `MilestoneStub`
- Task page: `src/app/client/tasks/[id]/page.tsx` — server component, read-only stub
- Seed: `src/lib/fixtures/seed.ts` — Alex return + W-2 task + questionnaire task; `Task.status` is `"todo" | "in_progress" | "done"` but nothing mutates it yet
- Types: `src/lib/types.ts`
- Role switcher: `src/components/shell/role-switcher.tsx` lists all personas from context
- Roadmap acceptance for M03 lives in `docs/roadmap.md`

## Proposed implementation approach

**Recommended: client-local demo state + filtered picker list**

1. **Picker:** Export a `DEMO_PERSONAS` (or `pickerPersonas`) with only Alex + Jordan (preparer). Picker and role switcher use that list for now. Keep full `PERSONAS` in code for later M05, or filter by a `showInPicker: boolean` flag — prefer a `showInPicker` flag on each persona so one source of truth remains.
2. **Home hierarchy:** Replace scaffold + `MilestoneStub` with a composed layout:
   - Greeting + tax year
   - Compact progress (e.g. “1 of 3 to-dos” or simple steps: Upload → Answer questions → Firm prepares)
   - Hero primary action card (W-2) — largest type, single CTA
   - Secondary task list (questionnaire) — quieter rows, not competing cards
   - Soft urgency/status chip (client-friendly copy; avoid internal jargon)
3. **Chrome:** Client layout/header accepts or derives `nav` from first-run vs settled. First-run: no Messages link (Home optional or implied). Settled: restore Messages.
4. **Demo toggle:** Small control on client home (and optionally header) persisted in `localStorage` key e.g. `ledgerline_client_home_mode` = `first_run` | `settled`. Default `first_run` for Alex. Does not require backend.
5. **Task completion loop:** Make task page a client component (or small client island) that can set task `task-alex-w2` to `done` in React state. Because seed is a module constant, introduce a thin client store or context (`DemoDataProvider` / Zustand) that clones seed into mutable state for tasks — **or** a minimal `useDemoTasks()` hook with `useState` lifted via context under client layout. Prefer **React context under `/client` layout** to avoid new dependency unless Zustand is already desired later.
6. After mark-uploaded: navigate to `/client/home`; hero should advance to next incomplete task (questionnaire) or a “You’re all caught up / waiting on your preparer” settled empty-primary state.

**Alternatives considered**

| Alternate | Why not default |
| --- | --- |
| Completing task flips first-run→settled automatically | Less controllable in a 5–10 min video; toggle is explicit for graders |
| Keep all five picker personas | User requested two for now; reduces cold-start confusion |
| Home-only, no task mutation | Weaker end-to-end proof of “next action” |

## Files to modify

| File | Change |
| --- | --- |
| `src/lib/personas.ts` | Add `showInPicker` (Alex + Jordan `true`; others `false`); export helper `getPickerPersonas()` |
| `src/app/page.tsx` | Render picker personas only (two cards); copy may say “Client” / “CPA” |
| `src/components/shell/role-switcher.tsx` | List picker personas only (same two), so switcher matches landing |
| `src/app/client/layout.tsx` | Wire header nav from first-run vs settled (client wrapper or context) |
| `src/components/shell/app-header.tsx` | Support empty/minimal nav; ensure brand + role switcher remain |
| `src/app/client/home/page.tsx` | Full first-run UI; demo toggle; remove `MilestoneStub`; progress + hero + secondary list |
| `src/app/client/tasks/[id]/page.tsx` | Fake upload completion CTA; use mutable demo task state |
| `src/lib/fixtures/seed.ts` | Ensure Alex tasks ordered for next-action logic; optional `sortOrder` / clear primary flag |
| `src/lib/types.ts` | Optional: `showInPicker` on `Persona`; optional client home mode type |
| `docs/roadmap.md` | Check off M03 criteria when implemented (implementer may update) |

## New files required

| File | Purpose |
| --- | --- |
| `src/components/client/client-demo-provider.tsx` | Client-layout context: home mode (`first_run` \| `settled`) + mutable tasks clone from seed |
| `src/components/client/home-mode-toggle.tsx` | Demo control UI for First-run / Settled |
| `src/components/client/next-action-hero.tsx` | Primary action card |
| `src/components/client/secondary-task-list.tsx` | Quieter list of non-primary tasks |
| `src/components/client/client-progress.tsx` | Compact progress / step indicator |
| `src/lib/client-home.ts` | Pure helpers: `getPrimaryTask`, `getSecondaryTasks`, progress counts, client-friendly status label |

(Implementer may collapse small components into `home/page.tsx` if faster, but helpers should stay testable/pure.)

## Database changes

N/A

## API changes

N/A — no network APIs. LocalStorage for home mode; in-memory context for task status.

## UI changes

### Persona picker (`/`)

- Exactly two cards:
  1. **Alex Rivera — Client** (individual, first-time)
  2. **Jordan Lee — CPA** (tax preparer → `/firm/dashboard`)
- Remove Sam, Riley, Jordan-personal from picker (data may remain in codebase for later)
- Keep calm-fintech look; title Ledgerline; short subtitle that this is a demo picker

### Client home (`/client/home`) — first-run

- Dominant headline: e.g. “Upload your W-2 to get started”
- One primary button → `/client/tasks/task-alex-w2`
- Progress indicator (not a metrics dashboard)
- Secondary: “Answer 3 onboarding questions” as a quiet row
- Status: client-friendly (“Waiting on you”) not raw enum dump
- Demo toggle visible but visually secondary (footer or subtle top-right)

### Client home — settled (toggle)

- Messages returns in header nav
- Home can show slightly richer layout: task list + “waiting on preparer” if client tasks done
- Still not a CPA dashboard

### Header (first-run)

- Ledgerline brand + persona switcher
- No Messages link

### Task page (W-2)

- Short explanation + fake dropzone or “Simulate upload” button
- CTA: “I’ve uploaded this” → marks task done → redirect home
- Link to related document optional/stub OK
- Questionnaire task page: simple “Mark answered” fake completion is enough if time; at minimum W-2 path must work

## Dependencies

- No new packages required (prefer React context over adding Zustand for this milestone)
- Uses existing shadcn: Button, Card, Badge; may add Switch or Tabs for the demo toggle if already available — otherwise two-button toggle is fine

## Edge cases

- No persona / wrong shell: if firm persona hits `/client/home`, still render safely or redirect to firm home (recommend: soft empty state “Switch to Alex for client demo”)
- All client tasks `done`: hero becomes “You’re waiting on your preparer” with status copy; no dead “Start this task” on a completed W-2
- Settled + first-run toggle mid-session: nav Messages appears/disappears immediately
- Sam/Riley not in picker: deep links and seed remain; role switcher should not re-expose them until M05
- localStorage unavailable: default to `first_run`

## Risks

| Risk | Mitigation |
| --- | --- |
| Mutable seed shared across imports | Clone tasks into context state; never mutate exported `TASKS` array in place |
| Header is server component today | Introduce small client `ClientShell` wrapper for nav reactivity |
| Two-persona picker conflicts with later M05 | `showInPicker` flag makes re-enabling trivial |
| Toggle looks like product UI | Label clearly “Demo: home mode” |

## Step-by-step implementation plan

1. Add `showInPicker` to persona type and set Alex + Jordan `true`; others `false`. Export `getPickerPersonas()`.
2. Update `/` picker and role switcher to use `getPickerPersonas()` only; adjust card copy to emphasize Client vs CPA.
3. Add `ClientDemoProvider` in `src/app/client/layout.tsx` wrapping children: initialize tasks from seed clone; home mode from localStorage default `first_run`.
4. Update `AppHeader` usage so nav is `[]` or Home-only when `first_run`, and includes Messages when `settled`.
5. Extract pure helpers in `src/lib/client-home.ts` for primary/secondary task selection (primary = first incomplete client-owned task by urgency/order; Alex W-2 before questionnaire).
6. Rebuild `/client/home`: hero, progress, secondary list, status chip, `HomeModeToggle`; remove `MilestoneStub`.
7. Upgrade W-2 task page with simulate-upload + mark done using context; redirect to home; verify hero advances.
8. Optional: questionnaire task “Mark answered” for full catch-up state.
9. Manual pass: cold load as Alex → only W-2 screams next → toggle settled → Messages appears → complete W-2 → home updates.
10. Smoke as Jordan → still lands on firm dashboard; picker shows two options only.
11. Update `docs/roadmap.md` M03 checkboxes when criteria met.

## Acceptance criteria

- [ ] Persona picker shows exactly two options: Client (Alex) and CPA (Jordan)
- [ ] Role switcher matches those two options
- [ ] Alex home shows one dominant next action: Upload W-2
- [ ] Secondary tasks are visible but clearly subordinate
- [ ] First-run mode hides Messages from header; settled mode shows Messages
- [ ] Demo toggle switches First-run / Settled and persists for the session (localStorage)
- [ ] Fake upload completion on W-2 task updates home next action
- [ ] When client tasks are complete, home shows waiting-on-preparer (or equivalent) instead of a dead CTA
- [ ] No real file upload or backend
- [ ] Calm fintech visual language preserved; no purple-generic AI look

## Test plan

- [ ] Manual: `/` shows 2 cards only; Client → `/client/home`; CPA → `/firm/dashboard`
- [ ] Manual: first-run Alex — Messages link absent; primary CTA is W-2
- [ ] Manual: toggle Settled — Messages appears without full reload
- [ ] Manual: complete W-2 simulate upload — home primary becomes questionnaire or waiting state
- [ ] Manual: refresh page — home mode restored from localStorage; task completion may reset unless also persisted (acceptable to reset tasks on refresh for MVP; document in README if so)
- [ ] `npm run build` succeeds
- [ ] No new lint errors on touched files

## Out-of-scope items

- Sam / Riley / Jordan-personal picker entries (re-enable in M05)
- Shared status model polish across firm (M06)
- Contextual messaging product (M02)
- Source trace / AI trust (M01 / M10)
- Persisting task completion across refreshes (nice-to-have; not required)

## Assumptions and decisions made

| Decision | Rationale | Alternatives considered |
| --- | --- | --- |
| Feature name `client-first-run` | Matches M03 client cold start | `m03-where-to-start` |
| Primary action = Upload W-2 | Clearest next action; matches seed | Questionnaire-first; message-first |
| Demo toggle for first-run vs settled | Controllable in video | Auto-flip on task complete only |
| Hide Messages in first-run | Defer chrome until relevant | Always show Messages |
| Home + light task loop | Proves next-action end-to-end | Home-only stub |
| Two picker personas for now | User request; reduce confusion | Keep five; three personas |
| `showInPicker` flag | Easy to restore M05 personas later | Separate `DEMO_PERSONAS` array only |
| React context for mutable tasks | No new deps; scoped to `/client` | Zustand; mutate module seed |
| Task completion not persisted | Faster MVP; mode toggle is enough for video | localStorage tasks too |
