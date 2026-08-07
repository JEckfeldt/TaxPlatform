import type { FieldAI, ReturnField } from "@/lib/types";

/**
 * Stub AI seam for the case study — returns seeded explanation payloads.
 * No network / model calls.
 */
export function simulateAI(field: ReturnField): FieldAI | null {
  if (!field.ai) {
    return {
      confidence: 0,
      summary: "No AI extraction for this field.",
      rationale: "Value was entered or imported without model assistance.",
      evidence: [],
      recommendation: "Edit manually if needed.",
    };
  }

  return {
    ...field.ai,
    evidence: [...field.ai.evidence],
  };
}
