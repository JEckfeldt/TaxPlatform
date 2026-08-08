import type { PersonaId } from "@/lib/types";

export type NavItem = {
  label: string;
  /** Normal in-shell route. */
  href?: string;
  /** Switch demo persona (e.g. CPA ↔ personal filing). */
  switchToPersona?: PersonaId;
};
