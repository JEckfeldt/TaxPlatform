export type Role =
  | "individual_client"
  | "business_owner"
  | "preparer"
  | "reviewer"
  | "firm_admin"
  | "seasonal_staff";

export type Shell = "client" | "firm";

export type FieldState =
  | "ai_generated"
  | "verified"
  | "needs_approval"
  | "editable"
  | "locked"
  | "clickable";

export type ReturnStatus =
  | "not_started"
  | "gathering_info"
  | "in_preparation"
  | "pending_client"
  | "in_review"
  | "ready_to_file"
  | "filed"
  | "blocked";

export type PersonaId =
  | "alex"
  | "sam"
  | "jordan"
  | "jordan-personal"
  | "riley";

export interface Persona {
  id: PersonaId;
  name: string;
  title: string;
  role: Role;
  shell: Shell;
  description: string;
  /** When set, switching here also activates a secondary context (e.g. personal return). */
  secondaryLabel?: string;
}

export interface TaxReturn {
  id: string;
  clientName: string;
  entityType: "individual" | "business";
  taxYear: number;
  status: ReturnStatus;
  preparerId: PersonaId;
  urgencyScore: number;
  nextAction: string;
  nextActionOwner: "client" | "preparer" | "reviewer";
  blockers: string[];
}

export interface Task {
  id: string;
  returnId: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  owner: "client" | "preparer";
  documentId?: string;
  urgency: "low" | "medium" | "high";
}

export interface Document {
  id: string;
  returnId: string;
  name: string;
  type: string;
  pageCount: number;
}

export interface MessageThread {
  id: string;
  returnId: string;
  documentId?: string;
  taskId?: string;
  subject: string;
  visibility: "client" | "internal";
  nextActionOwner: "client" | "preparer" | "reviewer";
  messages: {
    id: string;
    authorId: PersonaId;
    body: string;
    createdAt: string;
  }[];
}
