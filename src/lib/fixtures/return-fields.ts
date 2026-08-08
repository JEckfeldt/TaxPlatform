import type { ReturnField } from "@/lib/types";

export const ALEX_RETURN_ID = "ret-alex-2025";

/** Seeded review fields for Alex — covers all FieldStates + low-confidence/warning. */
export const ALEX_RETURN_FIELDS: ReturnField[] = [
  {
    id: "field-wages",
    returnId: ALEX_RETURN_ID,
    label: "Wages, tips, other compensation",
    value: "72,450.00",
    state: "ai_generated",
    source: {
      documentId: "doc-alex-w2",
      documentName: "W-2 · Acme Corp",
      page: 1,
      regionLabel: "Box 1 — Wages",
      highlight: { top: 28, left: 8, width: 42, height: 10 },
    },
    ai: {
      confidence: 0.93,
      summary: "Extracted Box 1 wages from the Acme Corp W-2.",
      rationale:
        "High-contrast print region matched the W-2 Box 1 template with strong digit confidence.",
      evidence: [
        "Document type classified as W-2",
        "Box 1 anchor text detected",
        "Checksum of digits passed basic validation",
      ],
      recommendation: "Accept if this matches the employee copy.",
    },
  },
  {
    id: "field-federal-withheld",
    returnId: ALEX_RETURN_ID,
    label: "Federal income tax withheld",
    value: "8,120.00",
    state: "ai_generated",
    source: {
      documentId: "doc-alex-w2",
      documentName: "W-2 · Acme Corp",
      page: 1,
      regionLabel: "Box 2 — Federal income tax withheld",
      highlight: { top: 28, left: 54, width: 38, height: 10 },
    },
    ai: {
      confidence: 0.61,
      summary: "Low-confidence extraction for federal withholding.",
      rationale:
        "Smudge near the last digit reduced model confidence; value may be 8,120 or 8,128.",
      evidence: [
        "Box 2 region located",
        "Ambiguous final digit in raster crop",
      ],
      recommendation: "Verify against the paper/PDF before accepting.",
      warning: "Possible digit conflict on the last character.",
    },
  },
  {
    id: "field-ssn-last4",
    returnId: ALEX_RETURN_ID,
    label: "Employee SSN (last 4)",
    value: "•••• 4821",
    state: "verified",
    source: {
      documentId: "doc-alex-w2",
      documentName: "W-2 · Acme Corp",
      page: 1,
      regionLabel: "Employee’s social security number",
      highlight: { top: 12, left: 55, width: 36, height: 8 },
    },
    ai: {
      confidence: 0.98,
      summary: "SSN last four matched client profile on file.",
      rationale: "Exact match to organizer answers after masking.",
      evidence: ["Profile last-four match", "W-2 SSN region OCR"],
    },
  },
  {
    id: "field-ein",
    returnId: ALEX_RETURN_ID,
    label: "Employer identification number (EIN)",
    value: "12-3456789",
    state: "needs_approval",
    source: {
      documentId: "doc-alex-w2",
      documentName: "W-2 · Acme Corp",
      page: 1,
      regionLabel: "Employer identification number",
      highlight: { top: 18, left: 8, width: 40, height: 8 },
    },
    ai: {
      confidence: 0.88,
      summary: "EIN extracted; flagged because it is new for this client.",
      rationale: "No prior-year EIN on file for Acme Corp under this client.",
      evidence: ["EIN pattern valid", "No prior-year match"],
      recommendation: "Approve after confirming employer name.",
      warning: "New employer EIN for this client — confirm before filing.",
    },
  },
  {
    id: "field-employer-name",
    returnId: ALEX_RETURN_ID,
    label: "Employer’s name",
    value: "Acme Corp",
    state: "editable",
    source: {
      documentId: "doc-alex-w2",
      documentName: "W-2 · Acme Corp",
      page: 1,
      regionLabel: "Employer’s name, address, and ZIP code",
      highlight: { top: 40, left: 8, width: 55, height: 14 },
    },
  },
  {
    id: "field-control-number",
    returnId: ALEX_RETURN_ID,
    label: "Control number",
    value: "A1B2C3",
    state: "locked",
    lockedReason: "Imported from payroll feed — edit requires admin unlock.",
    source: {
      documentId: "doc-alex-w2",
      documentName: "W-2 · Acme Corp",
      page: 1,
      regionLabel: "Control number",
      highlight: { top: 12, left: 8, width: 28, height: 8 },
    },
  },
  {
    id: "field-state-wages",
    returnId: ALEX_RETURN_ID,
    label: "State wages",
    value: "72,450.00",
    state: "clickable",
    source: {
      documentId: "doc-alex-w2",
      documentName: "W-2 · Acme Corp",
      page: 1,
      regionLabel: "Box 16 — State wages",
      highlight: { top: 72, left: 8, width: 30, height: 9 },
    },
    ai: {
      confidence: 0.9,
      summary: "State wages align with federal wages for a single-state filer.",
      rationale: "Box 16 equals Box 1; no multi-state allocation detected.",
      evidence: ["Box 16 OCR", "Single state code on W-2"],
      recommendation: "Open to inspect source; no change expected.",
    },
  },
];

export function getAlexReturnFields(): ReturnField[] {
  return ALEX_RETURN_FIELDS.map((f) => ({
    ...f,
    source: f.source ? { ...f.source, highlight: { ...f.source.highlight } } : undefined,
    ai: f.ai
      ? { ...f.ai, evidence: [...f.ai.evidence] }
      : undefined,
  }));
}
