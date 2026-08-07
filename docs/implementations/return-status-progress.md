# Return Status & Progress (M06 · Client view)

## Feature summary

Add a clear client-facing return status experience on Alex’s home: a simple step timeline (Gather info → Prepare → Review → File) that shows what’s done, what’s next, who owns the next action, and any blockers. Completing client tasks (W-2, questionnaire) advances the timeline. Shared status helpers live in `src/lib` for later CPA reuse, but this milestone ships **client UI only** — no firm multi-return status board.

## Problem being solved

Today the client home only shows a status badge and optional blocker text. Graders (and Alex) can’t see where the return sits in the overall process or how finishing tasks moves it forward. The case study wants a shared mental model of status; we start on the client path so the video’s first half is legible without building a messy CPA multi-client status view yet.

## Goals

- Client home shows a step timeline with current stage highlighted
- Show done / next / owner / blockers in client-friendly language
- Completing seeded client tasks advances the return stage automatically
- One shared status model/helpers in `src/lib` (audience-aware labels)
- Keep scope to Alex’s single return

## Non-goals

- Firm dashboard or firm return-workspace status UI (defer)
- Multi-client status list / 4 simultaneous sample returns on screen
- Real workflow engine or backend state machine
- Demo stage-jump control (user chose task-driven advancement only)
- Full M02 messaging product or M04 navigation graph
- Changing persona picker (still Alex + Jordan)

## Existing architecture context

- Types: `ReturnStatus` on `TaxReturn` in `src/lib/types.ts` (`not_started` … `blocked`) with `nextAction`, `nextActionOwner`, `blockers`
- Seed: Alex return `ret-alex-2025` at `gathering_info`, blocker “Missing W-2”; tasks `task-alex-w2`, `task-alex-questionnaire` in `src/lib/fixtures/seed.ts`
- Client demo state: `ClientDemoProvider` mutates task status in memory (`src/components/client/client-demo-provider.tsx`); does **not** yet mutate return status
- Client home: badge via `clientFriendlyStatus` + progress via `ClientProgress` (`src/app/client/home/page.tsx`, `src/lib/client-home.ts`)
- Firm return page still shows raw `status.replaceAll("_", " ")` — leave unchanged this milestone
- Related: M03 `docs/implementations/client-first-run.md` (done); roadmap M06 criteria originally included firm + 4 returns — **narrowed by user decisions**
- Project status: `docs/project-status.md` should be updated when this ships

## Proposed implementation approach

**Recommended: client timeline + derive/update return stage from tasks**

1. **Client-facing stages** (product language, mapped from `ReturnStatus`):
   - Gather info ← `not_started` | `gathering_info` | `pending_client` (when waiting on client during info gather)
   - Prepare ← `in_preparation`
   - Review ← `in_review`
   - File ← `ready_to_file` | `filed`
   - Treat `blocked` as a flag/banner on the current stage, not a separate main step (or show blocked styling on current step)

2. **Shared module** e.g. `src/lib/return-status.ts`:
   - Stage definitions + order
   - `getClientStage(status)` / `getClientStageLabel`
   - `getStatusView(return, tasks, audience: "client" | "firm")` returning `{ stageId, stages[], nextAction, ownerLabel, blockers[], detailLevel }`
   - Firm labels can exist in the helper now even if unused in UI
   - Move/replace overlapping bits of `clientFriendlyStatus` to avoid two sources of truth

3. **Advance on task completion** inside `ClientDemoProvider` (or helper called from `completeTask`):
   - Clone returns into mutable demo state (same pattern as tasks) — **do not mutate** exported `RETURNS` in place
   - Rules (simple, documented):
     - If any client task incomplete → stay `gathering_info`, nextAction/owner/blockers reflect remaining work (e.g. missing W-2)
     - All client tasks `done` → `in_preparation`, clear client blockers, nextAction like “Your preparer is working on your return”, owner `preparer`
   - Optional stretch (only if cheap): after “caught up”, leave stage at Prepare; do not auto-jump to Review/File without demo data for those stages

4. **UI** — new `ReturnStatusTimeline` on client home above or below existing task progress:
   - Horizontal on `sm+`, stacked/vertical-friendly on mobile
   - Current step emphasized; past steps checked; future muted
   - Subline: next action + owner (“Waiting on you” / “Waiting on your preparer”)
   - Blockers callout when non-empty
   - Keep existing “Do this next” hero; timeline explains process context, hero drives action
   - Existing `ClientProgress` (todo counts) can stay as task micro-progress or be simplified if redundant — prefer keep both briefly (timeline = return process, progress = to-dos) unless visually noisy; if noisy, demote todo progress under secondary list

5. **Docs** — update `docs/roadmap.md` M06 notes/criteria for client-only scope; update `docs/project-status.md` when implemented.

**Alternatives considered**

| Alternate | Why not chosen |
| --- | --- |
| Firm + client UI together | User: CPA multi-return messy for now |
| Demo stage jump control | User chose task-driven only |
| Four seeded returns on client | User: one Alex return path |

## Files to modify

| File | Change |
| --- | --- |
| `src/lib/types.ts` | Optional: export client stage id type if useful |
| `src/lib/return-status.ts` | **New** shared status/stage helpers |
| `src/lib/client-home.ts` | Delegate friendly status to shared helper or thin wrapper |
| `src/lib/fixtures/seed.ts` | Ensure Alex return/tasks align with gather→prepare transition copy |
| `src/components/client/client-demo-provider.tsx` | Mutable returns clone; `completeTask` updates return stage/fields |
| `src/components/client/return-status-timeline.tsx` | **New** timeline UI |
| `src/app/client/home/page.tsx` | Render timeline; use demo return from context |
| `docs/roadmap.md` | Narrow M06 acceptance to client-only / one return |
| `docs/project-status.md` | Mark M06 done + changelog when implemented |

## New files required

| File | Purpose |
| --- | --- |
| `src/lib/return-status.ts` | Shared stage model + audience-aware view model |
| `src/components/client/return-status-timeline.tsx` | Client timeline presentation |

## Database changes

N/A

## API changes

N/A — in-memory demo state only.

## UI changes

### Client home (`/client/home`)

- Add **Return status** section with 4 steps: Gather info → Prepare → Review → File
- Show current step, next action, owner, blockers
- After W-2 + questionnaire complete: timeline on **Prepare**, owner preparer, no client blockers
- Mobile: steps wrap or stack without horizontal overflow; still readable in ~375px width
- Do not add firm status UI

### Firm

- Unchanged this milestone (still stub badges OK)

## Dependencies

N/A — existing Badge/Card/Button sufficient.

## Edge cases

- Refresh resets tasks **and** return stage (same as current task session behavior) — document in status/README if needed
- Firm persona on `/client/home`: keep existing soft empty state
- Blocked state: if blockers present while gathering, show blocker banner; don’t invent a 5th primary step
- Partial completion (W-2 done, questionnaire open): stay on Gather info; update nextAction/blockers to match remaining task
- `ready_to_file` / `filed` not reachable via client tasks in this MVP — timeline can still render those steps as future

## Risks

| Risk | Mitigation |
| --- | --- |
| Timeline + todo progress feels duplicate | Timeline = process; todos = checklist; tighten copy |
| Mutating seed constants | Clone returns into provider state |
| Over-building firm labels unused | Keep firm strings in helper only; no firm UI |

## Step-by-step implementation plan

1. Add `src/lib/return-status.ts` with client stages, mapping from `ReturnStatus`, and `buildStatusView(...)`.
2. Refactor `clientFriendlyStatus` to use the shared helper (or replace call sites).
3. Extend `ClientDemoProvider` with cloned `returns` state + `getReturn(id)` / update helpers; on `completeTask`, recompute Alex return status/nextAction/owner/blockers from remaining client tasks.
4. Build `ReturnStatusTimeline` component (accessible list/ol of steps).
5. Wire timeline into client home using demo return + tasks; verify mobile layout.
6. Manual path: start Gather → complete W-2 → still Gather if questions open → complete questions → Prepare / waiting on preparer.
7. Update roadmap M06 acceptance notes + `docs/project-status.md` changelog/milestone row.
8. `npm run build`.

## Acceptance criteria

- [ ] Client home shows a 4-step timeline (Gather info → Prepare → Review → File)
- [ ] Current step, next action, owner, and blockers are visible in client-friendly copy
- [ ] Completing W-2 and questionnaire advances stage to Prepare (waiting on preparer)
- [ ] Partial completion keeps Gather info and updates next/blocker copy
- [ ] Shared helpers live in `src/lib` (usable later by firm)
- [ ] No new firm multi-return status UI
- [ ] Mobile layout usable (~375px)
- [ ] `docs/project-status.md` updated when shipped

## Test plan

- [ ] Manual: cold Alex home — Gather info current; blocker/next mentions W-2
- [ ] Manual: complete W-2 only — still Gather; next is questionnaire
- [ ] Manual: complete questionnaire — Prepare current; waiting on preparer
- [ ] Manual: refresh — session reset to initial gather state
- [ ] Manual: narrow viewport — timeline readable, no clipped steps
- [ ] `npm run build` succeeds

## Out-of-scope items

- Firm return status strip/timeline
- Four concurrent sample returns for graders
- Demo stage jump dropdown
- Auto-advance into Review/File
- Persisting return/task state across refresh

## Assumptions and decisions made

| Decision | Rationale | Alternatives considered |
| --- | --- | --- |
| Client UI only | User: CPA multi-client messy for now | Firm + client; firm only |
| Step timeline UI | User choice A | Strip only; detailed checklist |
| Task-driven stage advance | User choice A | Demo jump; both |
| One Alex return | User choice A | Stage switcher; 4 seeded returns |
| Shared lib helpers now | User choice A | Client-only module |
| Plan name `return-status-progress` | User confirmed | `m06-client-status` |
| Review/File not auto-reached | Keep MVP simple | Fake jump to filed |
| Roadmap “4 returns” deferred | Conflicts with client-only focus | Keep original criterion |
