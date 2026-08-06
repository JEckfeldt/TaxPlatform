import type { Persona } from "@/lib/types";

export const PERSONAS: Persona[] = [
  {
    id: "alex",
    name: "Alex Rivera",
    title: "Individual client",
    role: "individual_client",
    shell: "client",
    description: "First-time filer with a personal 1040. Cold start demo.",
  },
  {
    id: "sam",
    name: "Sam Okonkwo",
    title: "Business owner",
    role: "business_owner",
    shell: "client",
    description: "Small-business return in progress. Mixed-entity demo.",
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    title: "Tax preparer",
    role: "preparer",
    shell: "firm",
    description: "Default CPA path — dashboard, review, collaboration.",
  },
  {
    id: "jordan-personal",
    name: "Jordan Lee",
    title: "Preparer · personal return",
    role: "preparer",
    shell: "client",
    description: "Same person in client context for their own return.",
    secondaryLabel: "Personal filing",
  },
  {
    id: "riley",
    name: "Riley Chen",
    title: "Reviewer",
    role: "reviewer",
    shell: "firm",
    description: "Review-focused nav and reduced edit permissions.",
  },
];

export function getPersona(id: string | null | undefined): Persona | undefined {
  return PERSONAS.find((p) => p.id === id);
}

export function homePathForPersona(persona: Persona): string {
  return persona.shell === "client" ? "/client/home" : "/firm/dashboard";
}
