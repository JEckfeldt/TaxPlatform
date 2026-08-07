"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  getPersona,
  getPickerPersonas,
  getSwitcherPersonas,
  homePathForPersona,
} from "@/lib/personas";
import { PERSONA_COOKIE } from "@/lib/persona-cookie";
import type { Persona, PersonaId } from "@/lib/types";

type PersonaContextValue = {
  persona: Persona | null;
  /** Personas on the landing picker (Alex + Jordan CPA). */
  personas: Persona[];
  /** Personas in the in-app role switcher (includes Jordan personal). */
  switcherPersonas: Persona[];
  selectPersona: (id: PersonaId) => void;
  clearPersona: () => void;
};

const PersonaContext = createContext<PersonaContextValue | null>(null);

function writeCookie(id: PersonaId | null) {
  if (typeof document === "undefined") return;
  if (id === null) {
    document.cookie = `${PERSONA_COOKIE}=; path=/; max-age=0`;
    return;
  }
  document.cookie = `${PERSONA_COOKIE}=${id}; path=/; max-age=31536000; samesite=lax`;
}

export function PersonaProvider({
  initialPersonaId,
  children,
}: {
  initialPersonaId?: string | null;
  children: ReactNode;
}) {
  const router = useRouter();
  const [personaId, setPersonaId] = useState<PersonaId | null>(
    () => getPersona(initialPersonaId ?? undefined)?.id ?? null,
  );

  const persona = useMemo(
    () => (personaId ? (getPersona(personaId) ?? null) : null),
    [personaId],
  );

  const selectPersona = useCallback(
    (id: PersonaId) => {
      const next = getPersona(id);
      if (!next) return;
      writeCookie(id);
      setPersonaId(id);
      router.push(homePathForPersona(next));
    },
    [router],
  );

  const clearPersona = useCallback(() => {
    writeCookie(null);
    setPersonaId(null);
    router.push("/");
  }, [router]);

  const value = useMemo(
    () => ({
      persona,
      personas: getPickerPersonas(),
      switcherPersonas: getSwitcherPersonas(),
      selectPersona,
      clearPersona,
    }),
    [persona, selectPersona, clearPersona],
  );

  return (
    <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) {
    throw new Error("usePersona must be used within PersonaProvider");
  }
  return ctx;
}
