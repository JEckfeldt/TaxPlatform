# Jordan Dual Context (M05 polish)

> **Superseded.** Shipped entry is firm nav **Personal filing** / client nav **Firm work** (no role switcher). Personal home matches Alex’s W-2 path. Historical planning only — see [project-status.md](../project-status.md).

## Feature summary

Finish the light M05 dual-context beat: keep the landing picker at Alex + Jordan CPA, expose **Jordan · Personal filing** in the in-app role switcher, and land that persona on a settled-style client home for Jordan’s own return with a clear “personal filing, not firm queue” banner. Sam, Riley, and other role lenses stay out of scope.

## Problem being solved

M05 is only partial: Alex and Jordan CPA work, but graders cannot see one person switch between preparer firm work and their own taxpayer return. `jordan-personal` already exists in seed (`shell: "client"`, `ret-jordan-personal-2025`) but is hidden from picker and switcher (`showInPicker: false`), and client home soft-empty / Alex-centric copy does not treat Jordan personal as a first-class path. There is also no client task seeded for Jordan’s personal return.

## Goals

- Role switcher lists Alex, Jordan CPA, and Jordan · Personal filing
- Landing `/` stays two cards (Alex + Jordan CPA only)
- Selecting Jordan personal → `/client/home` with `ret-jordan-personal-2025`
- Settled-style chrome for Jordan personal (Messages visible; not cold-start W-2 hero)
- Banner: viewing personal return / not the firm queue; easy path back to Jordan CPA via switcher
- Seed at least one open client task aligned with return next action (“Confirm dependents”)
- Update client-home empty/wrong-shell copy so it doesn’t say “Switch to Alex” when Jordan personal is valid
- Mark M05 dual-context acceptance done; document remaining M05 items (Riley, ≥4 lenses) as deferred

## Non-goals

- Enabling Sam, Riley, firm admin, or seasonal staff in picker/switcher
- Riley reduced-edit affordances on return review
- Third card on the landing picker
- Firm-header “My personal return” button (user chose switcher-only)
- Full unique apps per role / real RBAC
- Firm messaging / M11 deploy-video

## Existing architecture context

- Personas: `src/lib/personas.ts` — `jordan` (firm), `jordan-personal` (client, `showInPicker: false`, `secondaryLabel: "Personal filing"`)
- Picker list: `getPickerPersonas()` → `PersonaProvider.personas` → landing + **current** role switcher (both use picker list only)
- Switcher: `src/components/shell/role-switcher.tsx` — maps `personas` from context
- Select flow: `selectPersona` writes cookie + `router.push(homePathForPersona)`
- Client home: `src/app/client/home/page.tsx` — `returnForPersona`, `ClientDemoProvider` tasks/returns; soft empty if `shell !== "client"` with Alex-only copy
- Seed: `ret-jordan-personal-2025` exists; **no** TASKS/THREADS for that return yet
- Client demo: clones all `RETURNS`/`TASKS`; home mode in `localStorage` (`greengrowth_client_home_mode`) shared across client personas
- Related: M05 roadmap acceptance; `client-first-run.md` deferred re-enabling hidden personas; video script optional Jordan personal beat
- User decisions: scope B (minimal dual-context); switcher entry A; settled home A; landing two-card A

## Proposed implementation approach

**Recommended: switcher persona list + Jordan-personal home polish + seed task**

1. **Switcher vs picker lists**
   - Add `showInSwitcher?: boolean` on `Persona` (or derive: picker personas ∪ jordan-personal)
   - Prefer explicit flags: Alex/Jordan `showInPicker: true` and `showInSwitcher: true`; `jordan-personal` `showInPicker: false`, `showInSwitcher: true`
   - Export `getSwitcherPersonas()`; keep `getPickerPersonas()` unchanged
   - `PersonaProvider`: expose `switcherPersonas` (or rename carefully); landing still uses picker list; `RoleSwitcher` uses switcher list
   - Switcher row label: use `secondaryLabel` / title so it reads **Personal filing · Jordan Lee** (not a second “CPA” card)

2. **Jordan personal client home**
   - When `persona.id === "jordan-personal"`:
     - Force or default **settled** presentation for this session view (recommended: treat as settled in UI regardless of Alex’s `localStorage` first_run — e.g. `effectiveHomeMode = persona.id === "jordan-personal" ? "settled" : homeMode`) so Alex first-run toggle doesn’t poison Jordan’s demo
     - Hide or de-emphasize `HomeModeToggle` for Jordan personal (demo toggle is Alex-oriented)
     - Show a compact banner: e.g. “You’re viewing your personal return — not the firm work queue.”
   - Fix wrong-shell / guidance copy to mention Client personas generically, or only show when shell is firm
   - Ensure `returnForPersona("jordan-personal")` drives tasks/status (already wired if tasks exist)

3. **Seed**
   - Add `task-jordan-dependents` (or similar) on `ret-jordan-personal-2025`, owner client, todo, title matching next action
   - Optional light client-visible thread — nice-to-have, not required

4. **Docs**
   - Roadmap M05: check dual-context + nav/home switch; note Riley / four-lenses deferred
   - Project status: M05 still Partial or “Partial → dual-context done”
   - README: mention Jordan personal via switcher if helpful

**Alternatives considered**

| Alternate | Why not chosen |
| --- | --- |
| Four lenses (Sam + Riley) | User chose minimal B |
| Landing third card | User chose switcher-only |
| Firm “My personal return” button | User chose switcher entry |
| Alex-style first-run for Jordan | User chose settled-style |

## Files to modify

| File | Change |
| --- | --- |
| `src/lib/types.ts` | Optional `showInSwitcher` on `Persona` |
| `src/lib/personas.ts` | Flags + `getSwitcherPersonas()`; Jordan personal labels |
| `src/components/persona/persona-provider.tsx` | Expose switcher personas separately from picker |
| `src/components/shell/role-switcher.tsx` | Render switcher list; clearer labels for personal |
| `src/app/client/home/page.tsx` | Banner, settled effective mode, hide Alex-only toggle, copy fixes |
| `src/lib/fixtures/seed.ts` | Jordan personal client task (+ optional thread) |
| `docs/roadmap.md` | M05 dual-context criteria when done |
| `docs/project-status.md` | Update when implemented |
| `README.md` | Brief note on switcher personal context when implemented |

## New files required

None required. Optional tiny `src/components/client/personal-context-banner.tsx` if home page stays cleaner.

## Database changes

N/A

## API changes

N/A

## UI changes

### `/` (landing)
- Unchanged: two cards (Alex, Jordan CPA)

### Role switcher (client + firm headers)
- Three demo entries: Client · Alex; CPA · Jordan; Personal filing · Jordan
- Selecting personal navigates to client home; selecting CPA navigates to firm dashboard

### `/client/home` as Jordan personal
- Settled-style “Your return” layout
- Personal-context banner
- Primary next action from seeded dependents task
- No Alex first-run demo toggle (or hidden)

## Dependencies

N/A

## Edge cases

- Cookie already `jordan-personal` on load → client shell + personal home, not firm
- Alex `localStorage` first_run must not force W-2 cold start on Jordan personal
- Firm persona on `/client/home` → keep soft empty; update copy (“Switch to a client persona…”)
- Switching personal → CPA mid-flow → firm dashboard (existing `selectPersona` behavior)
- Deep link `/firm/...` while Jordan personal → existing layout guards if any; otherwise user can switch back via switcher
- Empty tasks before seed fix → home looks blank; seed task required

## Risks

| Risk | Mitigation |
| --- | --- |
| Shared homeMode confuses demos | Effective settled mode for `jordan-personal` |
| Graders miss personal entry (not on `/`) | Clear switcher labels; optional one-line under Jordan CPA card “Use the role menu for personal filing” — optional, keep light |
| M05 “four lenses” still unmet | Explicit deferred note in roadmap/status |
| Switcher shows three Jordans confusingly | Distinct “Personal filing” label; same name OK |

## Step-by-step implementation plan

1. Add `showInSwitcher` (or equivalent) + `getSwitcherPersonas()`; set flags for alex, jordan, jordan-personal.
2. Update `PersonaProvider` + `RoleSwitcher` to use switcher list; verify landing still uses picker-only.
3. Seed Jordan personal client task (confirm dependents); ensure `ClientDemoProvider` clones it.
4. Polish `/client/home` for `jordan-personal`: banner, settled effective mode, hide HomeModeToggle, fix firm-on-client copy.
5. Manual: Alex path unchanged → Jordan CPA dashboard → switcher → Personal filing → client home + task → switcher back to CPA.
6. Update roadmap/project-status/README; `npm run build`.

## Acceptance criteria

- [ ] Landing still shows only Alex + Jordan CPA
- [ ] Role switcher includes Jordan · Personal filing (and Alex + Jordan CPA)
- [ ] Selecting personal lands on client home for Jordan’s return
- [ ] Personal home is settled-style with context banner
- [ ] At least one seeded open task for `ret-jordan-personal-2025`
- [ ] Switching back to Jordan CPA returns to firm dashboard
- [ ] Alex first-run path still works independently
- [ ] Roadmap/status note dual-context done; Riley/extra lenses deferred
- [ ] `npm run build` succeeds

## Test plan

- [ ] Manual: `/` → two cards only
- [ ] Manual: Jordan CPA → switcher → Personal filing → see banner + dependents task
- [ ] Manual: complete or view task; status timeline still renders
- [ ] Manual: switcher → CPA → firm dashboard
- [ ] Manual: Alex first_run toggle still affects Alex only
- [ ] `npm run build`

## Out-of-scope items

- Sam / Riley / admin / seasonal picker entries
- Reviewer edit restrictions
- Firm messaging
- M11 Vercel + video

## Assumptions and decisions made

| Decision | Rationale | Alternatives considered |
| --- | --- | --- |
| Minimal dual-context only | User choice B | Four lenses; full six roles |
| Switcher entry for personal | User choice A | Firm button; both |
| Settled-style personal home + banner | User choice A | Alex first-run clone; stub page |
| Personal not on landing picker | User choice A | Third card |
| Filename `jordan-dual-context` | User choice | `role-aware-polish-m05` |
| Effective settled mode for Jordan personal | Avoid shared localStorage clash with Alex | Separate storage key per persona |
| Defer Riley / ≥4 lenses | Matches chosen scope | Expand polish later |
