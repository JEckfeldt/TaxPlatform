# GreenGrowth Rebrand, Layout & Cleanup

## Feature summary

Rename the product from Ledgerline to **GreenGrowth**, restyle the UI to soft off-white backgrounds with medium forest/sage greens, widen layouts so screens feel mobile-friendly and less cramped, add a small-screen header nav overflow menu, and delete unused create-next-app assets plus unused shadcn UI components.

## Problem being solved

The scaffold still carries the temporary Ledgerline name, a cool ink/teal theme, narrow content columns (`max-w-2xl` / `max-w-3xl`), desktop-only header nav (`hidden md:flex`), and leftover unused files from `create-next-app` / early shadcn adds. That undercuts the calm “growth” brand direction and wastes space on phones.

## Goals

- Product display name is **GreenGrowth** in UI, metadata, and README/overview
- Theme tokens: soft off-white + medium forest/sage primary (calm, not neon)
- Main shells use a wider readable column (`max-w-5xl`); near-full width on small screens with modest padding
- Mobile header: brand + persona switcher visible; nav links in a simple overflow menu when present
- Delete unused `public/*.svg` defaults and unused UI primitives listed below
- Keep `milestone-stub` (still referenced by stub firm/client pages)

## Non-goals

- Renaming the git repo / OneDrive folder `TaxPlatform`
- Redesigning firm dashboard or return-review UX beyond shared shell/theme
- New logo illustration or custom icon set
- Editing the case-study PDF
- Rewriting all historical docs/implementations narrative to GreenGrowth (optional light touch only where branding is user-facing)
- Adding real auth or new product features

## Existing architecture context

- Brand strings today: `Ledgerline` in `src/app/page.tsx`, `src/components/shell/app-header.tsx`, `src/app/layout.tsx` metadata; README title; localStorage key `ledgerline_client_home_mode` in `src/lib/client-home.ts`
- Package name: `tax-platform` in `package.json`
- Theme: `src/app/globals.css` — ink/teal oklch tokens + soft radial gradients
- Layout widths:
  - Persona picker: `max-w-2xl` (`src/app/page.tsx`)
  - Client shell: `max-w-3xl` (`src/components/client/client-shell.tsx`)
  - Firm layout: `max-w-6xl` (`src/app/firm/layout.tsx`)
  - Header inner: `max-w-6xl` (`src/components/shell/app-header.tsx`)
- Header nav is desktop-only (`hidden md:flex`); no mobile menu
- Fonts: Manrope + IBM Plex Mono in `src/app/layout.tsx`
- Unused public assets: `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` (no imports)
- Unused shadcn UI (no app imports): `separator.tsx`, `scroll-area.tsx`, `sheet.tsx`, `tabs.tsx`, `input.tsx`, `label.tsx`
- Still used: `button`, `card`, `badge`, `dropdown-menu`; `milestone-stub.tsx` on firm/messages/documents stubs
- Related plan: `docs/implementations/client-first-run.md` (references Ledgerline / ledgerline_ key)

## Proposed implementation approach

**Recommended: token + shell pass, then delete dead files**

1. **Theme** — Replace `:root` CSS variables in `globals.css` with soft off-white backgrounds and forest/sage primaries (oklch hue ~140–160). Soften body gradients to pale green washes. Avoid purple and the warm cream + terracotta cliché; off-white may be slightly green-tinted, not `#F4F1EA` newspaper cream.
2. **Brand** — Replace user-visible `Ledgerline` with `GreenGrowth`. Update metadata title/description. Rename localStorage key to `greengrowth_client_home_mode` (accept reset of demo home mode on existing browsers). Update `package.json` `"name"` to `greengrowth` (or `green-growth`).
3. **Layout width** — Standardize content containers to `max-w-5xl` for client + firm + header alignment; picker can use `max-w-5xl` with a 1-col mobile / 2-col desktop grid that stretches. Reduce mobile vertical padding (`py-8` → `py-5` on small screens). Ensure buttons/CTAs are full-width on narrow viewports where it helps the first-run hero.
4. **Mobile nav** — Extend `AppHeader` with a client-side overflow control (reuse `DropdownMenu` already in the project — preferred over re-adding Sheet after deleting it). Show menu trigger below `md` when `nav.length > 0`; keep desktop inline links from `md` up.
5. **Cleanup** — Delete unused public SVGs and unused UI components listed in Goals. Do not delete `milestone-stub`.
6. **Docs** — Update README + `docs/project overview.md` brand mentions. Leave PDF alone. Optionally one-line note in roadmap that product name is GreenGrowth.

**Alternatives considered**

| Alternate | Why not chosen |
| --- | --- |
| Full-bleed all breakpoints | User chose wider readable column (A), not B |
| Keep unused shadcn for later | User chose delete now (A) |
| Rename every markdown doc | User chose README + overview only (A) |

## Files to modify

| File | Change |
| --- | --- |
| `src/app/globals.css` | GreenGrowth soft off-white + forest/sage tokens; update gradient atmosphere |
| `src/app/layout.tsx` | Metadata title/description → GreenGrowth |
| `src/app/page.tsx` | Brand copy; wider layout; mobile-friendly spacing/grid |
| `src/components/shell/app-header.tsx` | Brand text; `max-w-5xl`; mobile nav overflow menu |
| `src/components/client/client-shell.tsx` | `max-w-5xl`; responsive padding |
| `src/app/firm/layout.tsx` | Align to `max-w-5xl` (or keep slightly wider only if header matches — prefer one shared width) |
| `src/components/client/next-action-hero.tsx` | Full-width CTA on mobile if needed; remove overly tight `max-w` on copy if it fights “more screen” |
| `src/components/client/home-mode-toggle.tsx` | Ensure wraps cleanly on narrow screens |
| `src/app/client/home/page.tsx` | Spacing tweaks for mobile; header row stacks cleanly |
| `src/lib/client-home.ts` | Rename `CLIENT_HOME_MODE_KEY` to `greengrowth_client_home_mode` |
| `package.json` | `"name": "greengrowth"` |
| `README.md` | Brand rename + theme note |
| `docs/project overview.md` | Brand / visual tone line updates |
| `docs/roadmap.md` | Optional one-line product name note |

## New files required

| File | Purpose |
| --- | --- |
| None required | Mobile nav can live inside `app-header.tsx` as a small client child component file only if `AppHeader` must stay a server component |

If `AppHeader` stays a server component, add:

| File | Purpose |
| --- | --- |
| `src/components/shell/mobile-nav-menu.tsx` | Client dropdown of nav links for `< md` |

## Database changes

N/A

## API changes

N/A

## UI changes

### Brand
- Header wordmark: **GreenGrowth**
- Persona picker eyebrow/title uses GreenGrowth
- Browser tab title: e.g. `GreenGrowth — Tax platform prototype`

### Theme
- Background: soft off-white (slightly green-tinted OK)
- Primary / accents: medium forest or sage green
- Text/foreground: deep green-gray ink (readable)
- Cards: white or near-white on off-white ground
- No purple gradients; no dark-mode requirement for this pass

### Layout
- Shared content width ≈ `max-w-5xl`
- Mobile: smaller horizontal padding (`px-4`), less top/bottom chrome
- Persona picker: two options stack on mobile, sit side-by-side from `sm` up, using available width
- Client home hero and CTAs use more horizontal space; primary button full-width on xs

### Mobile nav
- When `nav` is non-empty and viewport `< md`: menu button opens dropdown with the same links
- When `nav` is empty (client first-run): no menu control
- Desktop (`md+`): existing inline nav

### Cleanup (delete)
- `public/next.svg`
- `public/vercel.svg`
- `public/file.svg`
- `public/globe.svg`
- `public/window.svg`
- `src/components/ui/separator.tsx`
- `src/components/ui/scroll-area.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`

## Dependencies

- No new packages
- Do **not** re-add `sheet` for mobile nav; use existing `dropdown-menu`

## Edge cases

- First-run client mode: no nav items → no empty hamburger
- localStorage key rename resets home mode to default `first_run` for returning demo users — acceptable; document briefly in README if useful
- After deleting UI files, ensure no stale imports (grep before delete)
- Firm pages with `MilestoneStub` still compile after theme/layout changes

## Risks

| Risk | Mitigation |
| --- | --- |
| Green theme drifts into generic “eco SaaS” | Keep typography (Manrope), restrained chroma, professional ink text |
| Deleting UI components someone expected | Listed unused via import audit; re-add with shadcn later |
| Header becomes crowded on small phones | Truncate persona name; icon-only menu trigger; keep switcher |

## Step-by-step implementation plan

1. Grep for `Ledgerline`, `ledgerline`, and imports of UI files to delete; confirm no hidden references to public SVGs.
2. Update `globals.css` tokens + body gradients to soft off-white / forest-sage.
3. Replace brand strings in header, picker, layout metadata; rename localStorage key constant.
4. Update `package.json` name to `greengrowth`.
5. Widen client shell, firm layout, header, and picker to `max-w-5xl`; tune mobile padding and full-width CTAs.
6. Add `MobileNavMenu` (or inline client header section) for `< md` when nav exists.
7. Delete unused public SVGs and unused UI components.
8. Update README + project overview brand/theme lines.
9. `npm run build` and quick mobile-width check (picker, client home first-run, settled with Messages menu, firm dashboard).

## Acceptance criteria

- [ ] UI shows **GreenGrowth** (not Ledgerline) in header and picker
- [ ] Document title/metadata uses GreenGrowth
- [ ] Theme is soft off-white + forest/sage greens (no purple primary)
- [ ] Client and firm content use wider `max-w-5xl` (or equivalent shared width)
- [ ] On a narrow viewport, layout uses most of the screen with comfortable padding
- [ ] Settled client mode: Messages reachable via mobile overflow menu
- [ ] First-run client mode: no spurious empty nav menu
- [ ] Unused public SVGs deleted
- [ ] Unused UI components listed above deleted; build still passes
- [ ] `milestone-stub` retained
- [ ] README + project overview updated; case-study PDF untouched

## Test plan

- [ ] Manual desktop: picker, client home, firm dashboard look on-brand and wider
- [ ] Manual ~375px width: picker stacked, home readable, CTA tappable, settled nav menu works
- [ ] Toggle First-run / Settled: menu appears/disappears correctly
- [ ] Grep confirms no imports of deleted UI files; no `Ledgerline` in `src/`
- [ ] `npm run build` succeeds
- [ ] `npm run lint` clean on touched files

## Out-of-scope items

- Custom logo SVG / favicon design pass (optional later)
- Dark mode palette
- Re-enabling hidden personas (M05)
- Firm IA redesign

## Assumptions and decisions made

| Decision | Rationale | Alternatives considered |
| --- | --- | --- |
| Display name GreenGrowth | User choice B | Greengrowth; Green Growth |
| Soft off-white + medium forest/sage | User choice A | Deeper emerald; very light sage-everything |
| Delete unused UI now | User choice A | Keep for later milestones |
| Docs: README + overview only | User choice A | Rename brand in all markdown |
| Width `max-w-5xl` | User choice A | Full-bleed; keep narrow desktop column |
| Mobile nav = dropdown overflow | User choice A | Always-visible links; bottom tabs |
| Plan file `greengrowth-rebrand-layout` | User confirmed | Other kebab names |
| Repo folder stays TaxPlatform | Avoid disruptive path renames | Rename folder/repo |
| localStorage key rename without migration | Demo prototype; reset OK | Read old key as fallback |
