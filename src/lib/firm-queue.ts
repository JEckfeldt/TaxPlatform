import type { PersonaId, TaxReturn } from "@/lib/types";

/**
 * Urgency formula (simulated prioritization for the demo):
 * base urgencyScore
 * + 35 if blocked / has blockers
 * + 25 if next action is on preparer
 * + 15 if in_review
 * + 10 if in_preparation
 * + 5 if gathering_info
 * - 20 if waiting on client (still visible, but lower for "work now")
 */
export function computeUrgency(item: TaxReturn): number {
  let score = item.urgencyScore;

  if (item.status === "blocked" || item.blockers.length > 0) score += 35;
  if (item.nextActionOwner === "preparer") score += 25;
  if (item.nextActionOwner === "reviewer") score += 18;
  if (item.nextActionOwner === "client") score -= 20;

  switch (item.status) {
    case "in_review":
      score += 15;
      break;
    case "in_preparation":
      score += 10;
      break;
    case "gathering_info":
      score += 5;
      break;
    case "ready_to_file":
      score += 12;
      break;
    default:
      break;
  }

  return score;
}

export function rankReturns(returns: TaxReturn[]): TaxReturn[] {
  return [...returns].sort((a, b) => {
    const diff = computeUrgency(b) - computeUrgency(a);
    if (diff !== 0) return diff;
    return a.clientName.localeCompare(b.clientName);
  });
}

export type QueueSegment =
  | "all"
  | "mine"
  | "waiting_client"
  | "blocked"
  | "needs_prep";

export const QUEUE_SEGMENTS: {
  id: QueueSegment;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "mine", label: "My returns" },
  { id: "waiting_client", label: "Waiting on client" },
  { id: "blocked", label: "Blocked" },
  { id: "needs_prep", label: "Needs prep" },
];

export function filterBySegment(
  returns: TaxReturn[],
  segment: QueueSegment,
  preparerId: PersonaId = "jordan",
): TaxReturn[] {
  switch (segment) {
    case "mine":
      return returns.filter((r) => r.preparerId === preparerId);
    case "waiting_client":
      return returns.filter((r) => r.nextActionOwner === "client");
    case "blocked":
      return returns.filter(
        (r) => r.status === "blocked" || r.blockers.length > 0,
      );
    case "needs_prep":
      return returns.filter(
        (r) =>
          r.nextActionOwner === "preparer" &&
          (r.status === "in_preparation" ||
            r.status === "gathering_info" ||
            r.status === "ready_to_file" ||
            r.status === "in_review"),
      );
    case "all":
    default:
      return returns;
  }
}

export function segmentCounts(
  returns: TaxReturn[],
  preparerId: PersonaId = "jordan",
): Record<QueueSegment, number> {
  return {
    all: returns.length,
    mine: filterBySegment(returns, "mine", preparerId).length,
    waiting_client: filterBySegment(returns, "waiting_client", preparerId)
      .length,
    blocked: filterBySegment(returns, "blocked", preparerId).length,
    needs_prep: filterBySegment(returns, "needs_prep", preparerId).length,
  };
}

export function ownerLabel(owner: TaxReturn["nextActionOwner"]): string {
  if (owner === "client") return "Client";
  if (owner === "preparer") return "Preparer";
  return "Reviewer";
}
