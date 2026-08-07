# CPA Return Review (M08 + M01 + M10)

## Feature summary

Build the deep CPA return-review experience on Alex Rivera’s individual return: a field list with consistent interaction affordances (M08), a side panel for source-document traceability to a fake W-2 (M01), and trustworthy AI explain/correct actions — accept, edit, reject — powered by simulated AI stubs (M10). Reuse light affordance chips on the firm dashboard. Other returns stay lighter stubs.

## Problem being solved

The firm return workspace is still milestone placeholders. Graders cannot see how AI-extracted values look different from verified/locked fields, cannot trace a number to a source page, and cannot correct AI output in-flow. Those three challenges share one screen; building them together avoids reworking the same panel three times.

## Goals

- Field affordance system for all six states: clickable, editable, AI-generated, verified, needs_approval, locked
- Legend/key on the return page (not overloaded)
- Click field → side panel with:
  - AI: what / why / confidence / evidence / suggested action
  - Trace: source doc, page/region highlight (fake), transformation note
  - Actions: accept / edit value / reject (in-memory)
- Seeded edge cases: low confidence + at least one conflict/warning
- `simulateAI()` (or equivalent) returns stub JSON for panel content
- Light matching chips on CPA dashboard rows (second surface)
- Rich experience on `ret-alex-2025`; other return ids keep stub/milestone or minimal empty fields
- Remove Alex-path MilestoneStubs once real review UI ships

## Non-goals

- Real OCR / PDF parsing / LLM calls
- Full rich review for Sam + all generated returns
- Permanent always-on dual document pane (user chose side panel)
- Firm messaging / internal notes
- Perfect tax calculation engine
- Persisting field edits across refresh (session-only OK)

## Existing architecture context

- Return page: `src/app/firm/returns/[id]/page.tsx` — header + MilestoneStubs; uses `getFirmReturn`
- Dashboard: `src/components/firm/work-queue.tsx` — ranked cards; good place for light chips
- Types: `FieldState` already in `src/lib/types.ts`
- Docs: `doc-alex-w2` in seed; client document stub exists
- No field model, simulateAI, or review components yet
- GreenGrowth theme / firm shell in place
- Related roadmap: M08, M01, M10 acceptance criteria

## Proposed implementation approach

**Recommended: seeded review model + client review workspace + panel**

1. **Data model** (`src/lib/types.ts` + fixtures)
   - `ReturnField`: id, returnId, label, value, state: FieldState, source?, ai?
   - `FieldSource`: documentId, documentName, page, regionLabel (e.g. “Box 1 — Wages”), transformNote
   - `FieldAI`: confidence (0–1), summary, rationale, evidence[], recommendation?, warning?
   - Seed 6–10 fields on Alex covering all six states (some fields may share states; ensure each state appears at least once)
   - Include one low-confidence AI field and one with a warning/conflict

2. **simulateAI**
   - `src/lib/simulate-ai.ts`: given field id (or field object), return plausible explanation payload (can mostly read from seed; function keeps the “stub AI” seam honest for README)

3. **Review UI** (client component under `/firm/returns/[id]` when `id === ret-alex-2025`)
   - Layout: main field list + side panel (stack panel below on mobile)
   - `ReturnFieldRow`: visual tokens per state (border/bg/badge/icon); locked shows why
   - Selected field opens `ReviewSidePanel`: tabs or stacked sections for Trace | AI | Actions
   - Fake W-2 preview: card with highlighted region box (CSS), not a real PDF
   - Accept → set state `verified` (keep value)
   - Edit → inline input → state `editable` or `verified` after save
   - Reject → clear/mark needs_approval or revert to prior; show toast/copy
   - State held in React state on the review page (or small firm demo context) — clone seed fields, don’t mutate exports

4. **Dashboard second surface**
   - For rows that are Alex (or optionally any return with blockers): show small chips e.g. “AI review”, “Blocked” using same color tokens as field states where it maps cleanly
   - Keep subtle — not a full field list

5. **Other returns**
   - If not Alex: keep current stub milestones OR a short “Detailed review demo is on Alex Rivera’s return” callout + link to Alex — prefer callout to avoid empty fake fields looking broken

**Alternatives considered**

| Alternate | Why not chosen |
| --- | --- |
| Separate M08/M01/M10 plans | User chose combined |
| Alex + Sam rich review | User chose Alex-only depth |
| Permanent side-by-side doc | User chose fields + panel |
| Return-only affordances | User chose dashboard chips too |
| Read-only AI | User chose accept/edit/reject |

## Files to modify

| File | Change |
| --- | --- |
| `src/lib/types.ts` | ReturnField, FieldSource, FieldAI types |
| `src/lib/fixtures/return-fields.ts` | **New** Alex field seeds |
| `src/lib/simulate-ai.ts` | **New** stub AI helper |
| `src/lib/field-affordances.ts` | **New** labels/classes per FieldState |
| `src/app/firm/returns/[id]/page.tsx` | Branch Alex → ReviewWorkspace; others stub/callout |
| `src/components/firm/review-workspace.tsx` | **New** main client review shell |
| `src/components/firm/return-field-row.tsx` | **New** |
| `src/components/firm/review-side-panel.tsx` | **New** trace + AI + actions |
| `src/components/firm/source-preview.tsx` | **New** fake W-2 highlight |
| `src/components/firm/field-state-legend.tsx` | **New** |
| `src/components/firm/work-queue.tsx` | Light chips for Alex/blocked |
| `docs/roadmap.md` | Mark M08/M01/M10 when done |
| `docs/project-status.md` | Update when implemented |
| `README.md` | Note simulateAI / fake trace |

## New files required

| File | Purpose |
| --- | --- |
| `src/lib/fixtures/return-fields.ts` | Seeded fields for Alex |
| `src/lib/simulate-ai.ts` | Stub AI responses |
| `src/lib/field-affordances.ts` | Shared visual/label tokens |
| `src/components/firm/review-workspace.tsx` | Review layout + selection state |
| `src/components/firm/return-field-row.tsx` | Field affordance row |
| `src/components/firm/review-side-panel.tsx` | Trace + AI + correct |
| `src/components/firm/source-preview.tsx` | Fake document region |
| `src/components/firm/field-state-legend.tsx` | Compact legend |

## Database changes

N/A

## API changes

N/A — local fixtures + `simulateAI` stub only.

## UI changes

### `/firm/returns/ret-alex-2025`
- Replace milestone grid with review workspace
- Field list with state badges
- Legend
- Side panel: source trace + AI explain + accept/edit/reject
- Mobile: panel below list

### `/firm/dashboard`
- Subtle chips on relevant rows (Alex / blocked)

### Other `/firm/returns/[id]`
- Header stays; callout pointing to Alex demo review (or keep stubs)

## Dependencies

N/A — native input/textarea fine; shadcn Input optional if re-added

## Edge cases

- No field selected → panel empty state “Select a field to review”
- Locked field → actions disabled; show reason
- Reject on AI field → needs_approval or similar visible state
- Low confidence → warning styling in panel
- Generated return ids → no crash; callout to Alex
- Refresh resets field edits

## Risks

| Risk | Mitigation |
| --- | --- |
| Six states look noisy | Shared tokens + small legend; restrain color |
| Panel overcrowded | Stack Trace / AI / Actions clearly |
| Scope creep to all returns | Alex-only rich seed |

## Step-by-step implementation plan

1. Add types + Alex field fixtures covering all FieldStates + low-confidence/warning cases.
2. Add `field-affordances` tokens + `simulateAI`.
3. Build `ReviewWorkspace` with list, legend, side panel, source preview, actions.
4. Wire Alex return page to workspace; other ids get callout.
5. Add light dashboard chips.
6. Manual path: dashboard → Alex → click wages → see trace + AI → edit/accept/reject.
7. Update roadmap/project-status/README; `npm run build`.

## Acceptance criteria

- [ ] All six field states visible and distinct on Alex review
- [ ] Legend present; locked state explains why
- [ ] Clicking a field opens side panel with source page/region + transform note
- [ ] AI panel shows what/why/confidence/evidence via stub helper
- [ ] Accept / edit / reject works in-session
- [ ] Low-confidence and warning/conflict cases seeded
- [ ] Dashboard shows light reused affordance/status chips
- [ ] Non-Alex returns don’t break
- [ ] Mobile usable (stacked panel)
- [ ] `docs/project-status.md` updated when shipped

## Test plan

- [ ] Manual: each FieldState appears at least once
- [ ] Manual: W-2 box highlight matches selected wage/withholding field
- [ ] Manual: accept/edit/reject update badges without refresh
- [ ] Manual: open a generated return → safe callout
- [ ] Manual: ~375px width review
- [ ] `npm run build` succeeds

## Out-of-scope items

- Real PDF rendering
- Sam Schedule C deep review
- Hundreds of line items (M09)
- Persisted corrections
- Reviewer-only permission matrix (light disabled actions on locked is enough)

## Assumptions and decisions made

| Decision | Rationale | Alternatives considered |
| --- | --- | --- |
| Combined M08+M01+M10 | User choice A | Separate plans; M08+M01 only |
| Alex W-2 only for depth | User choice A | Alex+Sam; all returns |
| Fields + side panel | User choice A | Permanent split; expand-in-place |
| Legend + dashboard chips | User choice A | Client doc badges; return only |
| Accept/edit/reject in-memory | User choice A | Edit only; read-only |
| Plan name `cpa-return-review` | User confirmed | Other names |
| Session-only field state | Match existing demo patterns | localStorage |
