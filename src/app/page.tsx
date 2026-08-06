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
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8 space-y-3 sm:mb-10">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          GreenGrowth
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Continue as…
        </h1>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg">
          Demo picker — no real login. Choose a client or CPA path.
        </p>
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-2">
        {personas.map((persona) => (
          <Card
            key={persona.id}
            className="flex flex-col transition-shadow hover:shadow-md"
          >
            <CardHeader className="space-y-2">
              <Badge variant="secondary" className="w-fit">
                {persona.pickerLabel ?? persona.title}
              </Badge>
              <CardTitle className="text-xl">{persona.name}</CardTitle>
              <CardDescription>{persona.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button
                onClick={() => selectPersona(persona.id as PersonaId)}
                className="w-full"
                size="lg"
              >
                Continue as {persona.pickerLabel ?? persona.name.split(" ")[0]}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
