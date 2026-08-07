# Client Collaboration & Navigation (M02 + M04)

## Feature summary

Build the client-side collaboration and orientation loop for Alex: contextual message threads tied to the W-2 task/document, a messages list + thread detail with replies, outstanding CPA requests on home, and navigation that keeps place via breadcrumbs, cross-links, and Back to home. Firm/internal-note UI is deferred.

## Problem being solved

M03/M06 make “what’s next” and return stage clear, but Messages is a dead stub, documents barely connect, and moving between task ↔ doc ↔ message feels disconnected. Graders need to see that conversation lives on the work item (not a generic inbox) and that clients don’t get lost hopping between related screens.

## Goals

- Client-visible threads linked to task and/or document (and return)
- Messages list + thread detail route with full conversation + reply
- Outstanding requests (“waiting on you”) on client home with link into the thread
- Breadcrumbs on deep client pages
- Cross-links: task ↔ document ↔ thread
- Clear Back to home / workflow control
- In-memory mutable threads (same session model as tasks/returns)
- Remove Messages `MilestoneStub` once real UI ships

## Non-goals

- Firm CPA messaging UI / internal vs client-visible toggle (defer)
- Real messaging backend, websockets, email/SMS
- Resume-last-page memory (user chose breadcrumbs only)
- Multi-client inboxes or Sam’s threads in the picker path
- Full document OCR preview product
- Changing First-run vs Settled chrome rules (Settled still reveals Messages nav)

## Existing architecture context

- Seed thread: `thread-alex-w2` linked to `task-alex-w2` + `doc-alex-w2` in `src/lib/fixtures/seed.ts`; internal Sam thread exists but client UI filters `visibility === "client"`
- Types: `MessageThread` in `src/lib/types.ts`
- Routes: `/client/messages` (list stub), `/client/tasks/[id]`, `/client/documents/[id]`, `/client/home`
- Demo state: `ClientDemoProvider` already clones tasks + returns; no threads yet
- Nav: Settled mode shows Messages in header (`client-shell.tsx`); first-run hides it
- Thin links already: task → document; document → messages list (not specific thread)
- Related done: M03 first-run, M06 status timeline
- Status doc: `docs/project-status.md`

## Proposed implementation approach

**Recommended: extend ClientDemoProvider + shared breadcrumb + thread detail route**

1. **Mutable threads in `ClientDemoProvider`**
   - Clone `THREADS` into state
   - `getThread(id)`, `listClientThreads(returnId?)`, `replyToThread(id, body)` appends a message as Alex (`authorId: "alex"`), updates `nextActionOwner` toward preparer when client replies
   - Do not mutate exported seed arrays

2. **Routes**
   - Polish `/client/messages` — list client-visible threads for Alex’s return; each row links to detail; show subject, latest preview, next owner, related object chips
   - Add `/client/messages/[id]` — message bubbles, reply composer (textarea + Send), links to related task/document, breadcrumbs, Back to home
   - Deep link support: task/document pages link to `/client/messages/thread-alex-w2` when related

3. **Outstanding requests on home**
   - Derive from client-visible threads where `nextActionOwner === "client"` (and optionally open client tasks framed as requests)
   - Compact list/cards under status timeline or near secondary tasks: subject, “Jordan asked…”, CTA → thread detail
   - Keep hero primary task as the main action; requests reinforce collaboration without replacing the hero

4. **Navigation (M04)**
   - Shared `ClientBreadcrumbs` component: e.g. Home / Messages / W-2 from Acme Corp
   - Use on task, document, messages list, thread detail
   - Object graph links in a consistent “Related” row: Task · Document · Conversation
   - Persistent **Back to home** button or breadcrumb root on deep pages

5. **Document page**
   - Remove MilestoneStub; show related task + open conversation; slightly richer placeholder preview copy (still fake file)

6. **First-run note**
   - Requests on home can show even in first-run (helps “CPA asked you”) even if Messages nav is hidden — user can still reach thread via request/task links. Keep that so collaboration is reachable without forcing Settled mode.

**Alternatives considered**

| Alternate | Why not chosen |
| --- | --- |
| Separate M02 then M04 plans | User chose combined plan |
| Firm internal/client visibility UI | User deferred firm messaging |
| Single-page messages without detail route | Weaker deep links |
| Resume-last-page | User chose breadcrumbs + Back to home only |

## Files to modify

| File | Change |
| --- | --- |
| `src/lib/types.ts` | Optional: `status?: "open" \| "resolved"` on thread; ensure message shape OK |
| `src/lib/fixtures/seed.ts` | Ensure Alex thread copy/links solid; optional second client-visible request if useful |
| `src/components/client/client-demo-provider.tsx` | Clone threads; reply + getters |
| `src/app/client/messages/page.tsx` | Real list UI; remove MilestoneStub |
| `src/app/client/messages/[id]/page.tsx` | **New** thread detail + reply |
| `src/app/client/tasks/[id]/page.tsx` | Breadcrumbs, related links to doc + thread |
| `src/app/client/documents/[id]/page.tsx` | Breadcrumbs, related links; remove MilestoneStub |
| `src/app/client/home/page.tsx` | Outstanding requests section |
| `src/components/client/outstanding-requests.tsx` | **New** home requests list |
| `src/components/client/client-breadcrumbs.tsx` | **New** breadcrumb trail |
| `src/components/client/related-objects.tsx` | **New** related task/doc/thread links |
| `docs/roadmap.md` | Mark M02/M04 client-scope progress when done |
| `docs/project-status.md` | Update when implemented |

## New files required

| File | Purpose |
| --- | --- |
| `src/app/client/messages/[id]/page.tsx` | Thread detail + reply |
| `src/components/client/client-breadcrumbs.tsx` | Shared breadcrumbs |
| `src/components/client/related-objects.tsx` | Task / document / conversation links |
| `src/components/client/outstanding-requests.tsx` | Home “waiting on you” requests |
| `src/lib/client-navigation.ts` | Optional helpers to resolve related ids / breadcrumb items |

## Database changes

N/A

## API changes

N/A — in-memory demo replies only.

## UI changes

### Home (`/client/home`)
- New **Requests** section: items waiting on the client, linking to thread detail
- Does not replace status timeline or primary hero CTA

### Messages list (`/client/messages`)
- Cards/rows for client-visible threads (Alex’s return)
- Show next owner, latest snippet, related labels
- Empty state if none

### Thread detail (`/client/messages/[id]`)
- Subject, ownership chip, message list (CPA vs client visually distinct)
- Reply box → appends client message, flips next owner to preparer
- Related: open task, open document
- Breadcrumbs + Back to home

### Task & document
- Breadcrumbs
- Related objects row including Conversation
- Document no longer a milestone stub wall

### Mobile
- Reply composer usable on narrow screens
- Breadcrumbs wrap; related links stack

## Dependencies

N/A — may re-add shadcn `textarea` via CLI if needed for reply box; otherwise native `<textarea>` styled to match is fine.

## Edge cases

- Unknown thread id → friendly not-found + link home
- Internal threads never listed for client
- Reply with empty/whitespace → disable Send or no-op
- First-run: Messages nav hidden but thread reachable via home request / task related link
- After client replies: list preview updates; next owner shows preparer
- Refresh resets replies (session-only) — note in project-status/README
- Firm persona on client routes: keep soft empty / switch guidance where already present

## Risks

| Risk | Mitigation |
| --- | --- |
| Home becomes crowded | Keep requests compact; one seeded request initially |
| Reply state fights seed imports | Clone threads in provider |
| Deep links without detail route | Dedicated `/messages/[id]` |

## Step-by-step implementation plan

1. Extend types/seed if needed; add thread helpers.
2. Add threads to `ClientDemoProvider` with `replyToThread`.
3. Build `ClientBreadcrumbs` + `RelatedObjects`.
4. Implement messages list + thread detail with reply UI.
5. Wire task/document pages to breadcrumbs + related conversation link; clean document stub.
6. Add `OutstandingRequests` to client home from threads awaiting client.
7. Manual walkthrough: home request → thread → related task → document → back home; reply updates owner.
8. Update roadmap M02/M04 notes + `docs/project-status.md`; `npm run build`.

## Acceptance criteria

- [ ] Client can open a thread tied to the W-2 task/document
- [ ] Messages list and thread detail both work; detail supports reply
- [ ] Home shows outstanding request(s) linking into the thread
- [ ] Task, document, and message pages have breadcrumbs
- [ ] Related links connect task ↔ document ↔ thread
- [ ] Back to home is always available on deep client pages
- [ ] No firm internal-notes UI required for this milestone
- [ ] Milestone stubs removed from messages/document client pages
- [ ] `docs/project-status.md` updated when shipped
- [ ] Mobile-usable layout

## Test plan

- [ ] Manual: Settled mode → Messages list → open W-2 thread → reply → owner becomes preparer
- [ ] Manual: First-run → home request → thread (without Messages nav)
- [ ] Manual: Task → Document → Conversation → Home breadcrumbs path
- [ ] Manual: Refresh clears reply (expected)
- [ ] Manual: ~375px width reply + breadcrumbs
- [ ] `npm run build` succeeds

## Out-of-scope items

- CPA firm messaging / internal visibility demo
- Email notifications
- File attachments in replies
- Unread badges / push
- Persist threads in localStorage

## Assumptions and decisions made

| Decision | Rationale | Alternatives considered |
| --- | --- | --- |
| Combined M02+M04 plan | User choice A | Separate plans; M02 only |
| Client threads + replies; no firm UI | User choice A | Firm internal/client toggle; read-only |
| Breadcrumbs + links + Back to home | User choice A | Resume memory; links only |
| List + detail routes | User choice A | Single page; panel on task only |
| Outstanding requests on home | User choice A | Messages only; single banner |
| Plan name `client-collab-navigation` | User confirmed | Other names |
| In-memory replies | Match existing demo provider pattern | localStorage persistence |
| Requests visible in first-run via home | Collaboration reachable without Settled | Force Settled for messages |
