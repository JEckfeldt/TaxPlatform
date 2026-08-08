# UI Refresh — GreenGrowth (theme + structure)

> **Implemented** (theme/fonts/de-card). Dual-context entry is nav links, not a role switcher. See [project-status.md](../project-status.md).

## Feature summary

Scoped visual and structure pass across the demo: sharpen the existing GreenGrowth forest/sage theme, add a display font for major titles (keep Manrope for UI), and de-card surfaces so cards appear only for real interactions — while preserving all primary routes and components (persona picker, client home loop, firm queue/search, Alex return review, Jordan dual-context).

## Problem being solved

The product works functionally, but the UI feels soft and samey: pale green wash, repeated elevated cards (especially the firm queue), and uniform Manrope hierarchy make screens read as a generic scaffold rather than a calm fintech product. A full redesign is unnecessary before M11; a coherent refresh across picker / client / firm / review should raise polish without changing demo behavior.

## Goals

- Sharper GreenGrowth tokens: higher contrast foreground/muted, clearer primary, less diffuse body wash
- Display font on picker + major page titles; Manrope remains UI/body; IBM Plex Mono for values where already used
- Stronger de-card: flat sections, borders/dividers; `Card` only for interactive containers (persona continue CTAs, next-action hero, review side panel, task action blocks)
- Firm queue: compact bordered rows (not stacked cards)
- Even light polish across: `/`, client home, firm dashboard, Alex review chrome
- Keep all primary components and flows working (search, segments, field states, AI panel, Jordan personal)
- Mobile still usable; top header shell retained (no sidebar rewrite)
- Update project-status when done

## Non-goals

- New product features or routes
- Renaming GreenGrowth / repo folder
- Dark mode
- Purple / glow / terracotta+cream+serif cliché look
- Firm messaging, Riley lenses, M11 deploy/video
- Rewriting all historical implementation docs
- Pixel-perfect design system documentation site

## Existing architecture context

- Theme: `src/app/globals.css` — soft off-white + sage oklch; body radial gradients
- Fonts: Manrope + IBM Plex Mono in `src/app/layout.tsx` (`--font-sans`, `--font-geist-mono`); `--font-heading` currently aliases sans
- Shells: `AppHeader` + `max-w-5xl` client/firm content; sticky top nav
- Heavy `Card` usage: persona picker, work queue rows, various client/firm blocks
- Primary demo surfaces:
  - `/` — `src/app/page.tsx`
  - Client home — `src/app/client/home/page.tsx` + `src/components/client/*`
  - Firm queue — `src/components/firm/work-queue.tsx`
  - Review — `src/components/firm/review-workspace.tsx` + field rows + side panel
- Prior brand pass: `docs/implementations/greengrowth-rebrand-layout.md` (already shipped)
- User decisions: theme+structure (C); sharper GreenGrowth (A); even split (C); strong de-card (C); display titles + Manrope UI (C)

## Proposed implementation approach

**Recommended: tokens → type → shell → surface pass per screen (behavior unchanged)**

1. **Theme tokens (`globals.css`)**
   - Darken `--foreground` slightly; raise contrast on `--muted-foreground`
   - Make `--primary` a clearer forest (still not neon); tighten borders
   - Soften/reduce body radial gradients (or make them subtler) so UI doesn’t feel foggy
   - Optional: slightly lower `--radius` for a more “tool” feel (keep rounded, not sharp newspaper)
   - Define CSS variable for display font: `--font-heading` → new family

2. **Typography**
   - Add a display font via `next/font/google` — **recommended: `Sora`** (expressive sans; avoids cream+serif+terracotta bias)
     - Alternate if preferred later: `Outfit` (similar role)
   - Wire `variable: "--font-heading"`; apply `font-[family-name:var(--font-heading)]` (or utility class) on:
     - Picker `h1`
     - Client home main `h1`
     - Firm dashboard page title
     - Return workspace `h1` / review section title
   - Keep Manrope on body, nav, buttons, field labels
   - Tighten title tracking / weight hierarchy (display semibold/bold; body regular)

3. **Shell polish**
   - Header: clearer brand weight; slightly stronger bottom border; keep sticky blur but less washed
   - Align spacing rhythm (`gap`/`py`) across client + firm shells — no IA change

4. **De-card surfaces**
   - **Firm queue:** Replace per-row `Card` with a bordered list (`divide-y` or row `border` + hover bg). Keep badges, urgency, chips, links, filters/search UI.
   - **Persona picker:** Keep interactive choice surfaces (can stay Card or become bordered panels with clear CTA — Card OK here as interaction container). Make brand/title display-font hero; less “dashboard of cards” energy.
   - **Client home:** Flatten status/progress/lists into sections with spacing + optional hairline borders; **keep** `NextActionHero` / task CTA as a distinct interactive surface (Card or strong bordered block).
   - **Review:** Field rows already custom — polish borders/selected state; **keep** `ReviewSidePanel` as the interactive panel surface. Legend as flat chips row.
   - Remove hover `shadow-md` stacks where they create “floating card pile” feel; prefer border + subtle bg hover

5. **Pass order (even split)**
   - Tokens + fonts first (global win)
   - Picker → client home → work queue → review chrome
   - Spot-check Jordan personal banner + breadcrumbs still read cleanly

**Alternatives considered**

| Alternate | Why not chosen |
| --- | --- |
| Theme-only / structure-only | User chose both (C) |
| Cool slate+teal rebrand | User chose sharper GreenGrowth (A) |
| Firm-first only | User chose even split (C) |
| Soften cards / keep cards | User chose strong de-card (C) |
| Keep Manrope-only / full font swap | User chose display titles + Manrope UI (C) |

## Files to modify

| File | Change |
| --- | --- |
| `src/app/globals.css` | Sharper tokens; subtler atmosphere; heading font token |
| `src/app/layout.tsx` | Load display font; expose CSS variable |
| `src/app/page.tsx` | Display title; de-card/structure polish for picker |
| `src/components/shell/app-header.tsx` | Shell polish |
| `src/components/client/client-shell.tsx` | Spacing rhythm if needed |
| `src/app/firm/layout.tsx` | Match shell spacing if needed |
| `src/app/firm/dashboard/page.tsx` | Display title if present |
| `src/app/client/home/page.tsx` | Display title; section structure; banner flat |
| `src/components/client/next-action-hero.tsx` | Keep as interactive surface; polish |
| `src/components/client/return-status-timeline.tsx` | Flatten if card-wrapped |
| `src/components/client/outstanding-requests.tsx` | Flatten if card-wrapped |
| `src/components/client/client-progress.tsx` | Flatten if card-wrapped |
| `src/components/client/secondary-task-list.tsx` | Row/list polish |
| `src/components/firm/work-queue.tsx` | Compact bordered rows (no Card stack) |
| `src/components/firm/review-workspace.tsx` | Title/type + layout polish |
| `src/components/firm/return-field-row.tsx` | Border/selected polish |
| `src/components/firm/review-side-panel.tsx` | Keep panel; sharpen surface |
| `src/components/firm/field-state-legend.tsx` | Flat legend |
| `src/app/firm/returns/[id]/page.tsx` | Display title polish |
| `docs/project-status.md` | Note UI refresh when done |
| `README.md` | One-line theme/type note if useful |

## New files required

None required. Optional: `src/components/shell/page-title.tsx` shared display-title helper — only if it reduces duplication.

## Database changes

N/A

## API changes

N/A

## UI changes

### Global
- Sharper GreenGrowth palette + subtler background
- Display font on major titles; Manrope elsewhere

### `/` Persona picker
- Stronger brand + display headline
- Choice panels remain interactive; less generic card-grid vibe

### Client home
- Sectioned flat layout; hero CTA remains the focal interactive block
- Jordan personal banner stays flat callout (not a heavy card)

### Firm dashboard
- Compact return rows in a list/table-like stack
- Filters/search unchanged in behavior

### Return review (Alex)
- Field list + side panel chrome cleaned up; affordances/AI/trace behavior unchanged

## Dependencies

- Google font via `next/font` only (no new npm packages) — **Sora** recommended for `--font-heading`

## Edge cases

- Mobile: queue rows wrap meta under title; CTAs remain full-width where already true
- Long client names in dense rows — truncate with title attribute or keep wrap
- Selected field row + side panel contrast must remain obvious after de-card
- Display font fallback if load fails — system sans ok
- Do not break persona cookie / demo state / search filters
- Milestone stubs / empty states still readable

## Risks

| Risk | Mitigation |
| --- | --- |
| Scope creep into feature rewrites | Visual/structure only; no logic changes |
| De-card hurts affordance clarity | Keep review panel + hero as distinct surfaces; preserve field state colors |
| Display serif temptation → cliché | Use Sora (sans display), not warm editorial serif |
| Uneven polish across surfaces | Follow fixed pass order; smoke all four surfaces |
| Queue of ~150 denser rows feels long | Already have search/filters; density is intentional |

## Step-by-step implementation plan

1. Update `globals.css` tokens + atmosphere; add `--font-heading`.
2. Load Sora in `layout.tsx`; map heading variable.
3. Apply display titles on picker, client home, firm dashboard, return page/review.
4. Restructure firm `work-queue` to bordered rows (behavior identical).
5. Flatten client home secondary sections; keep next-action hero interactive.
6. Polish review field rows + side panel chrome; leave `simulateAI` / accept-edit-reject logic untouched.
7. Header/shell spacing pass.
8. Manual smoke: Alex first-run → messages; Jordan dashboard search → Alex review; Jordan personal switcher.
9. Update `docs/project-status.md` (+ light README note); `npm run build`.

## Acceptance criteria

- [ ] GreenGrowth theme reads sharper (contrast/primary) without new brand name
- [ ] Major titles use display font; UI/body remain Manrope
- [ ] Firm queue is not a stack of elevated cards
- [ ] Cards/elevated surfaces limited to interactive containers
- [ ] Picker, client home, firm dashboard, Alex review all visibly refreshed
- [ ] No demo regressions: search/segments, field review AI/trace, Jordan personal, Alex tasks
- [ ] Mobile usable on primary flows
- [ ] Project status updated; `npm run build` succeeds

## Test plan

- [ ] Visual: `/`, `/client/home` (Alex first-run + settled), Jordan personal home
- [ ] Visual: `/firm/dashboard` dense rows + search “Alex”
- [ ] Visual: `/firm/returns/ret-alex-2025` panel + field states
- [ ] Interaction: accept/edit/reject still works; queue click-through works
- [ ] Mobile width smoke on picker + queue + review
- [ ] `npm run build`

## Out-of-scope items

- Sidebar navigation
- New personas / Riley permissions
- Virtualized queue
- Deploy + video (M11)

## Assumptions and decisions made

| Decision | Rationale | Alternatives considered |
| --- | --- | --- |
| Theme + structure scoped pass | User choice C | Theme-only; structure-only |
| Sharper GreenGrowth (keep brand) | User choice A | Slate+teal; warm paper |
| Even polish across four surfaces | User choice C | Firm-first; client-first |
| Strong de-card | User choice C | Soften cards; keep cards |
| Display titles + Manrope UI | User choice C | Manrope-only; full font swap |
| Display font = Sora | Expressive sans; avoids serif cliché | Outfit; editorial serif |
| Filename `ui-refresh-greengrowth` | User choice A | `visual-structure-pass` |
| Keep top header shell | Enough structure win without IA rewrite | Sidebar app shell |
