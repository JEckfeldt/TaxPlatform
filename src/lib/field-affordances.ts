import type { FieldState } from "@/lib/types";

export const FIELD_STATES: FieldState[] = [
  "ai_generated",
  "verified",
  "needs_approval",
  "editable",
  "locked",
  "clickable",
];

export function fieldStateLabel(state: FieldState): string {
  switch (state) {
    case "ai_generated":
      return "AI-generated";
    case "verified":
      return "Verified";
    case "needs_approval":
      return "Needs approval";
    case "editable":
      return "Editable";
    case "locked":
      return "Locked";
    case "clickable":
      return "Clickable";
    default:
      return state;
  }
}

/** Row background tint for each affordance state (used in divided lists). */
export function fieldStateClasses(state: FieldState): string {
  switch (state) {
    case "ai_generated":
      return "bg-teal-700/5";
    case "verified":
      return "bg-emerald-700/5";
    case "needs_approval":
      return "bg-amber-700/5";
    case "editable":
      return "bg-transparent";
    case "locked":
      return "bg-muted/40";
    case "clickable":
      return "bg-sky-800/5";
    default:
      return "bg-transparent";
  }
}

export function fieldStateBadgeClasses(state: FieldState): string {
  switch (state) {
    case "ai_generated":
      return "bg-teal-800/10 text-teal-900";
    case "verified":
      return "bg-emerald-800/10 text-emerald-900";
    case "needs_approval":
      return "bg-amber-800/10 text-amber-950";
    case "editable":
      return "bg-primary/10 text-primary";
    case "locked":
      return "bg-muted text-muted-foreground";
    case "clickable":
      return "bg-sky-900/10 text-sky-950";
    default:
      return "";
  }
}
