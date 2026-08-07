import type { PersonaId, ReturnStatus, TaxReturn } from "@/lib/types";

const FIRST = [
  "Morgan",
  "Casey",
  "Riley",
  "Avery",
  "Quinn",
  "Jamie",
  "Taylor",
  "Drew",
  "Cameron",
  "Parker",
  "Reese",
  "Skyler",
  "Hayden",
  "Rowan",
  "Elliot",
  "Finley",
  "Sawyer",
  "Emerson",
  "Kai",
  "Noah",
  "Maya",
  "Priya",
  "Diego",
  "Amara",
];

const LAST = [
  "Chen",
  "Patel",
  "Nguyen",
  "Garcia",
  "Brooks",
  "Kim",
  "Hassan",
  "Wright",
  "Lopez",
  "Singh",
  "Murphy",
  "Costa",
  "Anders",
  "Blake",
  "Diaz",
  "Foster",
];

const STATUSES: ReturnStatus[] = [
  "gathering_info",
  "in_preparation",
  "pending_client",
  "in_review",
  "ready_to_file",
  "blocked",
];

const NEXT_BY_STATUS: Record<
  ReturnStatus,
  { action: string; owner: TaxReturn["nextActionOwner"]; blockers: string[] }
> = {
  not_started: {
    action: "Start organizer intake",
    owner: "preparer",
    blockers: [],
  },
  gathering_info: {
    action: "Follow up on missing documents",
    owner: "client",
    blockers: ["Missing documents"],
  },
  in_preparation: {
    action: "Continue return preparation",
    owner: "preparer",
    blockers: [],
  },
  pending_client: {
    action: "Waiting on client questionnaire",
    owner: "client",
    blockers: [],
  },
  in_review: {
    action: "Complete reviewer checklist",
    owner: "reviewer",
    blockers: [],
  },
  ready_to_file: {
    action: "Confirm e-file authorization",
    owner: "preparer",
    blockers: [],
  },
  filed: {
    action: "Archive workpapers",
    owner: "preparer",
    blockers: [],
  },
  blocked: {
    action: "Resolve K-1 mismatch before continuing",
    owner: "preparer",
    blockers: ["K-1 mismatch"],
  },
};

/** Tiny deterministic PRNG (mulberry32). */
function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, items: T[]): T {
  return items[Math.floor(rand() * items.length)]!;
}

/**
 * Deterministic synthetic returns for the firm work queue.
 * Count chosen so named seeds + generated ≈ 150 total.
 */
export function generateFirmReturns(count = 147): TaxReturn[] {
  const rand = mulberry32(20260312);
  const out: TaxReturn[] = [];

  for (let i = 1; i <= count; i++) {
    const status = pick(rand, STATUSES);
    const template = NEXT_BY_STATUS[status];
    const entityType = rand() > 0.65 ? "business" : "individual";
    const preparerId: PersonaId = rand() > 0.78 ? "riley" : "jordan";
    const first = pick(rand, FIRST);
    const last = pick(rand, LAST);
    const idNum = String(i).padStart(3, "0");

    // Vary copy slightly so rows don't look identical.
    let nextAction = template.action;
    let blockers = [...template.blockers];
    let nextActionOwner = template.owner;

    if (status === "gathering_info" && rand() > 0.5) {
      nextAction = "Request prior-year return PDF";
      blockers = ["Missing prior-year return"];
      nextActionOwner = "client";
    } else if (status === "in_preparation" && rand() > 0.55) {
      nextAction = "Review AI-extracted income entries";
      nextActionOwner = "preparer";
    } else if (status === "pending_client" && rand() > 0.5) {
      nextAction = "Client must confirm bank account for refund";
    }

    out.push({
      id: `ret-gen-${idNum}`,
      clientName:
        entityType === "business"
          ? `${last} ${pick(rand, ["LLC", "Studio", "Partners", "Group"])}`
          : `${first} ${last}`,
      entityType,
      taxYear: 2025,
      status,
      preparerId,
      urgencyScore: Math.round(25 + rand() * 70),
      nextAction,
      nextActionOwner,
      blockers,
    });
  }

  return out;
}
