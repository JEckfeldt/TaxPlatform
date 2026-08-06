"use client";

import { usePersona } from "@/components/persona/persona-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PersonaId } from "@/lib/types";

export default function PersonaPickerPage() {
  const { personas, selectPersona } = usePersona();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-10 space-y-3">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          Ledgerline
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Continue as a demo persona
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
          Light persona picker for the case study — no real auth. Pick a role to
          enter the client or firm shell.
        </p>
      </div>

      <div className="grid gap-3">
        {personas.map((persona) => (
          <Card
            key={persona.id}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg">{persona.name}</CardTitle>
                <CardDescription>{persona.description}</CardDescription>
              </div>
              <Badge variant="secondary">{persona.title}</Badge>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => selectPersona(persona.id as PersonaId)}
                className="w-full sm:w-auto"
              >
                Continue as {persona.name.split(" ")[0]}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
