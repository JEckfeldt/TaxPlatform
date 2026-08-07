# CPA Actionable Dashboard (M07)

## Feature summary

Build Jordan’s preparer work queue on `/firm/dashboard`: a decision-oriented list of ~40–60 returns ranked by urgency, with simple segment filters (All / My returns / Waiting on client / Blocked / Needs prep), clear next actions, and click-through into existing return workspace stubs. No manager dashboard and no deep return-review UI in this milestone.

## Problem being solved

The firm dashboard is a stub: three seeded returns sorted by a static `urgencyScore`, plus a MilestoneStub. That doesn’t prove “what should I work on right now?” at realistic volume, or that a preparer can segment the queue. The case study grades an actionable CPA landing, not vanity metrics.

## Goals

- Ranked work queue answering “what should I work on now?”
- ~40–60 returns via a generator (preserve named Alex/Sam/Jordan-personal seeds)
- Simple ranking script (not just a hardcoded score field alone — compute or enrich scores)
- Segment chips: All · My returns · Waiting on client · Blocked · Needs prep
- Click-through to `/firm/returns/[id]`
- Preparer lens for Jordan only
- Remove dashboard MilestoneStub
- Mobile-friendly list

## Non-goals

- Separate manager dashboard or team analytics
- Deep return review (fields, AI, source trace) — M08 / M01 / M10
- Real backend / DB
- Virtualized infinite scroll (nice-to-have only if list feels slow)
- Perfect tax-ops prioritization science
- Firm messaging UI

## Existing architecture context

- Dashboard: `src/app/firm/dashboard/page.tsx` — sorts `RETURNS` by `urgencyScore`
- Seed: 3 returns in `src/lib/fixtures/seed.ts` (Alex, Sam, Jordan-personal)
- Types: `TaxReturn` with `status`, `preparerId`, `urgencyScore`, `nextAction`, `nextActionOwner`, `blockers`
- Firm layout nav: Dashboard + Sample return
- Shared status helpers: `src/lib/return-status.ts` (firm labels available)
- Personas: Jordan is preparer (`id: "jordan"`)
- Client path largely done; project status points next at CPA path
- Related roadmap M07 acceptance: ranked items, click-through, filters, ≥30 returns

## Proposed implementation approach

**Recommended: fixture generator + pure rank/filter helpers + client dashboard UI**

1. **Data**
   - Add `src/lib/fixtures/generate-returns.ts` (or similar) that produces N synthetic returns with varied:
     - `entityType`, `status`, `nextActionOwner`, `blockers`, `preparerId` (mostly Jordan, some Riley)
     - plausible `nextAction` strings
     - names/ids unique (`ret-gen-001` …)
   - Export `getFirmReturns()` = named seeds + generated (dedupe by id), target **~50** total (range 40–60)
   - Keep Alex/Sam at top relevance for demo narration (high urgency or pinned section optional — prefer natural high scores)

2. **Ranking**
   - `src/lib/firm-queue.ts`: `computeUrgency(return)` combining signals e.g.:
     - blocked / has blockers → boost
     - waiting on preparer → boost
     - waiting on client → lower for “my work now” but still visible in segment
     - status weights (in_review / gathering / etc.)
     - seed `urgencyScore` as a base noise factor for generated rows
   - `rankReturns(returns)` → sorted descending
   - Document the formula in a short code comment (enough for README “simulated” honesty)

3. **Segments**
   - `All` — full ranked list
   - `My returns` — `preparerId === "jordan"` (or current firm persona when available)
   - `Waiting on client` — `nextActionOwner === "client"`
   - `Blocked` — blockers length > 0 or status `blocked`
   - `Needs prep` — owner preparer and status in preparation/gathering/review as appropriate
   - UI: chip/button group; show count per segment

4. **Dashboard UI**
   - Client component for segment state
   - Row: client name, year, entity badge, next action, owner label, blocker hint, urgency
   - Empty segment state
   - Remove MilestoneStub
   - Optional: small search-by-name later — **out of scope** unless cheap; user chose chips not search

5. **Click-through**
   - Links to `/firm/returns/[id]`
   - Generated returns must render on return page (today looks up `RETURNS` only — **must** resolve from `getFirmReturns()` or shared catalog so gen ids don’t 404/empty)

6. **Return page minimal fix (required for click-through, not a redesign)**
   - Update `src/app/firm/returns/[id]/page.tsx` to load from the same firm returns catalog
   - Keep stub milestone cards; show name/status/nextAction from catalog
   - This is plumbing, not “thin return header” feature scope

**Alternatives considered**

| Alternate | Why not chosen |
| --- | --- |
| 100+ returns now | User chose 40–60 |
| Search + dropdowns | User chose simple segments |
| Manager toggle / full manager UI | User chose preparer-only |
| Dashboard + return review fields | User chose dashboard-only depth |

## Files to modify

| File | Change |
| --- | --- |
| `src/lib/fixtures/seed.ts` | Optionally re-export combined catalog; keep named seeds |
| `src/lib/fixtures/generate-returns.ts` | **New** generator |
| `src/lib/firm-queue.ts` | **New** urgency + segment + rank helpers |
| `src/app/firm/dashboard/page.tsx` | Real queue UI; segments; remove stub |
| `src/app/firm/returns/[id]/page.tsx` | Resolve return from full catalog |
| `src/app/firm/layout.tsx` | Optional: drop “Sample return” or point to Alex dynamically |
| `docs/roadmap.md` | M07 status when done |
| `docs/project-status.md` | Update when implemented |
| `README.md` | Note generated firm returns are simulated |

## New files required

| File | Purpose |
| --- | --- |
| `src/lib/fixtures/generate-returns.ts` | Synthetic returns batch |
| `src/lib/firm-queue.ts` | Rank + filter logic |
| `src/components/firm/queue-segments.tsx` | Segment chip control (optional extract) |
| `src/components/firm/work-queue.tsx` | Queue list UI (optional extract) |

## Database changes

N/A

## API changes

N/A

## UI changes

### `/firm/dashboard`
- Title: What to work on now
- Segment chips with counts
- Ranked actionable rows (not charts/KPIs)
- Click → return workspace
- GreenGrowth firm styling; mobile stacks meta under title

### `/firm/returns/[id]`
- Works for generated ids (data lookup fix only)
- Otherwise remains stub for later milestones

## Dependencies

N/A

## Edge cases

- Unknown return id → not found + link back to dashboard
- Empty segment → friendly empty copy
- Riley-owned generated returns appear in All but not My returns
- Alex row remains findable and high in “Needs prep” / relevant segments for demo
- Generator deterministic (seeded RNG or fixed tables) so demos don’t shuffle every refresh — **prefer deterministic**

## Risks

| Risk | Mitigation |
| --- | --- |
| Gen returns break return page | Shared `getFirmReturns()` catalog |
| Urgency feels arbitrary | Document simple transparent formula |
| List too long on mobile | Compact rows; segments cut volume |

## Step-by-step implementation plan

1. Add deterministic generator + `getFirmReturns()`.
2. Implement `computeUrgency`, `rankReturns`, `filterBySegment` in `firm-queue.ts`.
3. Rebuild dashboard with segments + ranked list; remove MilestoneStub.
4. Fix return `[id]` page to use catalog lookup.
5. Manual: Jordan → dashboard → each segment → open Alex + a generated return.
6. Update roadmap/project-status/README; `npm run build`.

## Acceptance criteria

- [ ] Dashboard shows ~40–60 returns (named seeds included)
- [ ] Returns ranked by a documented urgency function
- [ ] Segments: All, My returns, Waiting on client, Blocked, Needs prep
- [ ] Each row shows clear next action and drills into return page
- [ ] Generated return ids resolve on `/firm/returns/[id]`
- [ ] Preparer-only (no manager dashboard)
- [ ] MilestoneStub removed from dashboard
- [ ] Mobile-usable
- [ ] `docs/project-status.md` updated when shipped

## Test plan

- [ ] Manual: counts change per segment; My returns ⊆ All
- [ ] Manual: Blocked only shows blocker/blocked rows
- [ ] Manual: click Alex + one gen return both load
- [ ] Manual: refresh keeps same order (deterministic)
- [ ] `npm run build` succeeds

## Out-of-scope items

- Manager/team view
- Return field review / AI / trace
- Search box
- Assigning preparers in UI
- Persistence

## Assumptions and decisions made

| Decision | Rationale | Alternatives considered |
| --- | --- | --- |
| ~40–60 returns | User choice A | 100+; 8–12 handcrafted |
| Simple segment chips | User choice A | Search+filters; no filters |
| Preparer-only | User choice A | Manager toggle; full manager UI |
| Dashboard-only depth | User choice A | Thin return header; start review fields |
| Plan name `cpa-actionable-dashboard` | User confirmed | Other names |
| Deterministic generator | Stable demos/video | Random each load |
| Minimal return-page lookup fix | Required for click-through | Leave gen ids broken |
