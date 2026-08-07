# CPA Queue Scale & Search (M09)

## Feature summary

Scale Jordan’s firm work queue to ~150 returns and add progressive disclosure via client-name search, entity-type chips (All / Individual / Business), and a clear “Showing X of Y” result count — while keeping Alex Rivera’s existing return-review workspace as the deep detail drill-in. No dense in-return line-item catalog and no list virtualization.

## Problem being solved

M07 shipped ~50 ranked returns with segment chips only. Case-study M09 asks for a larger fixture set plus search/filters so a busy preparer can find useful subsets and move from high-level queue summary into return detail without overwhelm. Search was explicitly deferred from M07; volume above ~50 was deferred to M09.

## Goals

- Named seeds + generated returns ≈ **150** total (deterministic generator)
- Client-name search (case-insensitive substring) on `/firm/dashboard`
- Entity filter chips: All · Individual · Business
- Search + entity + existing segment chips combine (AND)
- Result count (“Showing X of Y”) and clear-search control
- Keep urgency ranking after filters
- Summary ↔ detail = queue row → `/firm/returns/[id]` (breadcrumb already present; light polish only)
- Alex deep review (`ret-alex-2025`) unchanged as the source/AI detail path
- Update roadmap M09 + project-status when done

## Non-goals

- Virtualized / infinite-scroll list
- Pagination
- Searching next-action text, status dropdowns, or owner filters beyond current segments
- Hundreds of line items inside a return workspace
- Collapsible field sections on Alex review
- Sticky return summary strip (user chose light polish only)
- Manager analytics, real backend, new packages
- M05 role expansion / M11 deploy-video

## Existing architecture context

- Dashboard: `src/app/firm/dashboard/page.tsx` → `WorkQueue` + `getFirmReturns()`
- Queue UI: `src/components/firm/work-queue.tsx` — segment chips, ranked cards, AI/Blocked chips
- Rank/filter: `src/lib/firm-queue.ts` — `computeUrgency`, `rankReturns`, `filterBySegment`, `segmentCounts`
- Generator: `src/lib/fixtures/generate-returns.ts` — `generateFirmReturns(count = 47)`, mulberry32 seed `20260312`
- Catalog: `src/lib/fixtures/seed.ts` — `getFirmReturns()` merges `RETURNS` + generated (dedupe by id)
- Return detail: `src/app/firm/returns/[id]/page.tsx` — Alex → `ReviewWorkspace`; others callout + link
- Related specs: `cpa-actionable-dashboard.md` (M07 done), `cpa-return-review.md` (M08/M01/M10 done)
- Roadmap M09 acceptance: large fixture set, search+filters, summary vs detail, high-level → source detail without losing context
- Project overview: dashboard scale for #09; return workspace hierarchy optional — user chose dashboard-primary (A)

## Proposed implementation approach

**Recommended: raise generator count + pure filter helpers + WorkQueue search/entity UI**

1. **Scale data**
   - Change default `generateFirmReturns` count so `RETURNS.length + generated ≈ 150` (today 3 named → generate **147**, or compute `150 - RETURNS.length` in `getFirmReturns`)
   - Keep deterministic RNG seed; ids continue `ret-gen-001` … (pad width may need 3→3 still fine for 147)
   - Update comments in `seed.ts` / generator from “~50” to “~150”

2. **Filter helpers** (`firm-queue.ts`)
   - `filterByQuery(returns, query)` — trim, lowercase, match `clientName`
   - `filterByEntity(returns, entity)` — `"all" | "individual" | "business"`
   - Optional `applyQueueFilters({ returns, segment, query, entity, preparerId })` that applies segment → entity → query then caller ranks — keep pure and testable
   - Extend `segmentCounts` or add a small helper so chip counts reflect **current search + entity** (recommended: counts update with search/entity so chips stay honest) — **prefer counts scoped to search+entity, then segment breakdown**

3. **WorkQueue UI**
   - Search input above or beside segment chips (placeholder e.g. “Search clients”)
   - Entity chips: All / Individual / Business (reuse Button outline/default pattern from segments)
   - Pipeline: start from props `returns` → entity → query → segment → `rankReturns`
   - Show muted copy: `Showing {ranked.length} of {returns.length}` (or of post-entity/query pre-segment — prefer **of full catalog** for Y, X = visible ranked list)
   - Clear control when query non-empty (button or input clear)
   - Empty state when no matches: “No returns match your search/filters.”
   - No new card redesign; keep existing urgency/chips

4. **Return path**
   - No structural change required for Alex; verify breadcrumb “Dashboard / Client” still works at scale
   - Optional one-line dashboard empty/not-found already exists

**Alternatives considered**

| Alternate | Why not chosen |
| --- | --- |
| Dense return line items | User chose dashboard-primary (A) |
| ~100 or ~250–300 volume | User chose ~150 |
| Richer status/owner filter bar | User chose name + entity only |
| Sticky summary strip / field sections | User chose light queue→detail polish |

## Files to modify

| File | Change |
| --- | --- |
| `src/lib/fixtures/generate-returns.ts` | Default count ≈ 147; comments |
| `src/lib/fixtures/seed.ts` | Pass new count / comment ~150 |
| `src/lib/firm-queue.ts` | Query + entity filter helpers; count helpers as needed |
| `src/components/firm/work-queue.tsx` | Search input, entity chips, showing X of Y, clear, empty copy |
| `docs/roadmap.md` | Mark M09 done + check acceptance when implemented |
| `docs/project-status.md` | Update focus / shipped notes when implemented |
| `README.md` | Note ~150 firm returns + search (simulated) when implemented |

## New files required

None required. Optional extract only if `work-queue.tsx` gets unwieldy (e.g. `queue-search.tsx`) — prefer keep in `work-queue.tsx`.

## Database changes

N/A

## API changes

N/A

## UI changes

### `/firm/dashboard`
- Search field for client name
- Entity chips: All / Individual / Business
- Existing segment chips unchanged in meaning
- “Showing X of Y” + clear search when active
- Empty match state
- List still ranked; still click-through to return

### `/firm/returns/[id]`
- No new M09 UI required; remains summary→detail target
- Alex review unchanged

## Dependencies

N/A

## Edge cases

- Empty query → no name filter (show all after entity/segment)
- Whitespace-only query → treat as empty
- No matches → friendly empty copy; don’t crash
- Entity Business + segment My returns → can be empty; OK
- Generated ids beyond 099 still resolve via `getFirmReturn`
- Riley-owned rows: All yes, My returns no (unchanged)
- Alex still findable by searching “Alex” / “Rivera”
- Mobile: search full width; chips wrap like segments today

## Risks

| Risk | Mitigation |
| --- | --- |
| 150 cards feel heavy | Search + entity + segments cut list; skip virtualization unless build feels laggy |
| Chip counts confusing with search | Document: segment counts reflect current search+entity filter |
| Demo can’t find Alex in long All list | Search “Alex”; urgency still ranks blocked/prep high |
| Pad/id collisions | Keep `ret-gen-XXX` unique; named seeds win in Map merge |

## Step-by-step implementation plan

1. Update `generateFirmReturns` default (or `getFirmReturns` argument) so catalog length ≈ 150; refresh comments.
2. Add `filterByQuery`, `filterByEntity` (and optionally composed helper) in `firm-queue.ts`.
3. Update `WorkQueue`: local state for `query` + `entity`; apply filters before rank; wire search + entity chips + clear + showing count + empty state.
4. Adjust `segmentCounts` (or parallel count fn) so segment chip numbers respect active search/entity.
5. Manual check: Jordan → dashboard → All shows ~150 → search “Alex” → open Alex review → breadcrumb back; try Individual/Business + Blocked; empty nonsense query.
6. Update `docs/roadmap.md` M09 checkboxes/status, `docs/project-status.md`, `README.md` scale note; run `npm run build`.

## Acceptance criteria

- [ ] Firm catalog ≈ 150 returns (named + generated)
- [ ] Client-name search narrows the list (case-insensitive)
- [ ] Entity chips All / Individual / Business work and combine with segments + search
- [ ] “Showing X of Y” (or equivalent) visible
- [ ] Clear search when query active
- [ ] Empty match state is friendly
- [ ] Ranking still applies to the filtered subset
- [ ] Click-through to return detail still works (Alex deep review intact)
- [ ] No new heavy return line-item UI
- [ ] Roadmap M09 + project-status updated; production build succeeds

## Test plan

- [ ] Manual: default All ≈ 150 rows (or count badge)
- [ ] Manual: search `rivera` → Alex visible; open review panel still works
- [ ] Manual: Business + Waiting on client → subset only businesses waiting on client
- [ ] Manual: garbage query → empty state; clear restores list
- [ ] Manual: mobile width — search + chips usable
- [ ] `npm run build`

## Out-of-scope items

- Virtualization / pagination
- In-return field search or hundreds of fields
- Firm messaging / M05 personas / Vercel video (M11)
- Searching by next action or free-text status

## Assumptions and decisions made

| Decision | Rationale | Alternatives considered |
| --- | --- | --- |
| Dashboard-primary M09 | User choice; matches video dashboard beat | Dense return items; both equally deep |
| ~150 returns | Clear scale without virtualization | ~100; ~250–300 |
| Name search + entity chips | Enough for “search + filters”; low scope | Search only; rich filter bar |
| Queue = summary, return = detail | User light-polish choice | Sticky summary strip; field sections |
| Filename `cpa-queue-scale-search` | Consistent with prior `cpa-*` specs | `complexity-navigable-m09` |
| Segment counts respect search+entity | Avoid lying chip totals | Counts always on full catalog |
| No new npm deps | Keep prototype simple | Add virtualizer library |
