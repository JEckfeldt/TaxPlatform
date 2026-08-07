import { generateFirmReturns } from "@/lib/fixtures/generate-returns";
import type { Document, MessageThread, Task, TaxReturn } from "@/lib/types";

/** Named demo returns (also included in the firm catalog). */
export const RETURNS: TaxReturn[] = [
  {
    id: "ret-alex-2025",
    clientName: "Alex Rivera",
    entityType: "individual",
    taxYear: 2025,
    status: "gathering_info",
    preparerId: "jordan",
    urgencyScore: 82,
    nextAction: "Upload your W-2 from Acme Corp",
    nextActionOwner: "client",
    blockers: ["Missing W-2"],
  },
  {
    id: "ret-sam-2025",
    clientName: "Sam Okonkwo",
    entityType: "business",
    taxYear: 2025,
    status: "in_preparation",
    preparerId: "jordan",
    urgencyScore: 64,
    nextAction: "Review AI-extracted Schedule C expenses",
    nextActionOwner: "preparer",
    blockers: [],
  },
  {
    id: "ret-jordan-personal-2025",
    clientName: "Jordan Lee",
    entityType: "individual",
    taxYear: 2025,
    status: "pending_client",
    preparerId: "riley",
    urgencyScore: 40,
    nextAction: "Confirm dependents",
    nextActionOwner: "client",
    blockers: [],
  },
];

export const TASKS: Task[] = [
  {
    id: "task-alex-w2",
    returnId: "ret-alex-2025",
    title: "Upload W-2 — Acme Corp",
    description:
      "We need your 2025 W-2 to start preparing your return. Photo or PDF is fine.",
    status: "todo",
    owner: "client",
    documentId: "doc-alex-w2",
    urgency: "high",
    sortOrder: 1,
  },
  {
    id: "task-alex-questionnaire",
    returnId: "ret-alex-2025",
    title: "Answer 3 onboarding questions",
    description: "Quick facts so we can set up your return correctly.",
    status: "todo",
    owner: "client",
    urgency: "medium",
    sortOrder: 2,
  },
];

export const DOCUMENTS: Document[] = [
  {
    id: "doc-alex-w2",
    returnId: "ret-alex-2025",
    name: "W-2 · Acme Corp (placeholder)",
    type: "W-2",
    pageCount: 1,
  },
  {
    id: "doc-sam-pl",
    returnId: "ret-sam-2025",
    name: "P&L · Okonkwo Design LLC",
    type: "Financials",
    pageCount: 4,
  },
];

export const THREADS: MessageThread[] = [
  {
    id: "thread-alex-w2",
    returnId: "ret-alex-2025",
    documentId: "doc-alex-w2",
    taskId: "task-alex-w2",
    subject: "W-2 from Acme Corp",
    visibility: "client",
    nextActionOwner: "client",
    messages: [
      {
        id: "msg-1",
        authorId: "jordan",
        body: "Hi Alex — please upload your Acme Corp W-2 when you have a minute. That unblocks the rest of your return.",
        createdAt: "2026-03-12T14:00:00Z",
      },
    ],
  },
  {
    id: "thread-sam-internal",
    returnId: "ret-sam-2025",
    subject: "Schedule C expense review notes",
    visibility: "internal",
    nextActionOwner: "preparer",
    messages: [
      {
        id: "msg-2",
        authorId: "riley",
        body: "Flagging low-confidence meal expenses — confirm before client sees draft.",
        createdAt: "2026-03-13T09:30:00Z",
      },
    ],
  },
];

export function returnForPersona(personaId: string): TaxReturn | undefined {
  if (personaId === "alex") return RETURNS.find((r) => r.id === "ret-alex-2025");
  if (personaId === "sam") return RETURNS.find((r) => r.id === "ret-sam-2025");
  if (personaId === "jordan-personal")
    return RETURNS.find((r) => r.id === "ret-jordan-personal-2025");
  return undefined;
}

/** Named seeds + deterministic generated returns (~50 total). */
export function getFirmReturns(): TaxReturn[] {
  const generated = generateFirmReturns(47);
  const byId = new Map<string, TaxReturn>();
  for (const item of [...RETURNS, ...generated]) {
    byId.set(item.id, item);
  }
  return [...byId.values()];
}

export function getFirmReturn(id: string): TaxReturn | undefined {
  return getFirmReturns().find((r) => r.id === id);
}
