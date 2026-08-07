import type { ReturnStatus, Task, TaxReturn } from "@/lib/types";

export type ClientStageId = "gather" | "prepare" | "review" | "file";

export type StatusAudience = "client" | "firm";

export interface ClientStage {
  id: ClientStageId;
  label: string;
  shortLabel: string;
}

export const CLIENT_STAGES: ClientStage[] = [
  { id: "gather", label: "Gather info", shortLabel: "Gather" },
  { id: "prepare", label: "Prepare", shortLabel: "Prepare" },
  { id: "review", label: "Review", shortLabel: "Review" },
  { id: "file", label: "File", shortLabel: "File" },
];

const STAGE_INDEX: Record<ClientStageId, number> = {
  gather: 0,
  prepare: 1,
  review: 2,
  file: 3,
};

export function getClientStageId(status: ReturnStatus): ClientStageId {
  switch (status) {
    case "in_preparation":
      return "prepare";
    case "in_review":
      return "review";
    case "ready_to_file":
    case "filed":
      return "file";
    case "not_started":
    case "gathering_info":
    case "pending_client":
    case "blocked":
    default:
      return "gather";
  }
}

export function ownerLabel(
  owner: TaxReturn["nextActionOwner"],
  audience: StatusAudience,
): string {
  if (audience === "client") {
    if (owner === "client") return "Waiting on you";
    if (owner === "preparer") return "Waiting on your preparer";
    return "Waiting on review";
  }
  if (owner === "client") return "Waiting on client";
  if (owner === "preparer") return "Waiting on preparer";
  return "Waiting on reviewer";
}

export function firmStatusLabel(status: ReturnStatus): string {
  switch (status) {
    case "not_started":
      return "Not started";
    case "gathering_info":
      return "Gathering info";
    case "in_preparation":
      return "In preparation";
    case "pending_client":
      return "Pending client";
    case "in_review":
      return "In review";
    case "ready_to_file":
      return "Ready to file";
    case "filed":
      return "Filed";
    case "blocked":
      return "Blocked";
    default:
      return status;
  }
}

export interface StatusView {
  stageId: ClientStageId;
  stageIndex: number;
  stages: ClientStage[];
  nextAction: string;
  owner: TaxReturn["nextActionOwner"];
  ownerLabel: string;
  blockers: string[];
  headline: string;
  isBlocked: boolean;
}

export function buildStatusView(
  taxReturn: TaxReturn | undefined,
  audience: StatusAudience = "client",
): StatusView | null {
  if (!taxReturn) return null;

  const stageId = getClientStageId(taxReturn.status);
  const isBlocked =
    taxReturn.status === "blocked" || taxReturn.blockers.length > 0;

  const headline =
    audience === "client"
      ? ownerLabel(taxReturn.nextActionOwner, "client")
      : firmStatusLabel(taxReturn.status);

  return {
    stageId,
    stageIndex: STAGE_INDEX[stageId],
    stages: CLIENT_STAGES,
    nextAction: taxReturn.nextAction,
    owner: taxReturn.nextActionOwner,
    ownerLabel: ownerLabel(taxReturn.nextActionOwner, audience),
    blockers: taxReturn.blockers,
    headline,
    isBlocked,
  };
}

/**
 * Derive return fields from client task completion for the demo session.
 * Does not invent Review/File transitions — only Gather ↔ Prepare.
 */
export function deriveReturnFromClientTasks(
  base: TaxReturn,
  allTasks: Task[],
): TaxReturn {
  const clientTasks = allTasks
    .filter((t) => t.returnId === base.id && t.owner === "client")
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));

  // Returns without client tasks in the demo (e.g. firm-only seeds) stay as seeded.
  if (clientTasks.length === 0) {
    return base;
  }

  const incomplete = clientTasks.filter((t) => t.status !== "done");
  const primary = incomplete[0];

  if (incomplete.length === 0) {
    return {
      ...base,
      status: "in_preparation",
      nextAction: "Your preparer is working on your return",
      nextActionOwner: "preparer",
      blockers: [],
    };
  }

  const blockers: string[] = [];
  if (incomplete.some((t) => t.id === "task-alex-w2")) {
    blockers.push("Missing W-2");
  }
  if (incomplete.some((t) => t.id === "task-alex-questionnaire")) {
    blockers.push("Onboarding questions incomplete");
  }

  let nextAction = base.nextAction;
  if (primary?.id === "task-alex-w2") {
    nextAction = "Upload your W-2 from Acme Corp";
  } else if (primary) {
    nextAction = primary.title;
  }

  return {
    ...base,
    status: "gathering_info",
    nextAction,
    nextActionOwner: "client",
    blockers,
  };
}
