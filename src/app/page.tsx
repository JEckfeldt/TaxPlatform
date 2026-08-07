"use client";

import { usePersona } from "@/components/persona/persona-provider";
import { PageTitle } from "@/components/shell/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PersonaId } from "@/lib/types";

export default function PersonaPickerPage() {
  const { personas, selectPersona } = usePersona();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-10 space-y-3 sm:mb-12">
        <p className="font-heading text-primary text-sm font-semibold tracking-[0.14em] uppercase">
          GreenGrowth
        </p>
        <PageTitle className="text-4xl sm:text-5xl">Continue as…</PageTitle>
        <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg">
          Demo picker — no real login. Choose a client or CPA path.
        </p>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        {personas.map((persona) => (
          <div
            key={persona.id}
            className="border-border bg-card flex flex-col rounded-xl border p-5 sm:p-6"
          >
            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit">
                {persona.pickerLabel ?? persona.title}
              </Badge>
              <h2 className="font-heading text-xl font-semibold tracking-tight">
                {persona.name}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {persona.description}
              </p>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => selectPersona(persona.id as PersonaId)}
                className="w-full"
                size="lg"
              >
                Continue as {persona.pickerLabel ?? persona.name.split(" ")[0]}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
