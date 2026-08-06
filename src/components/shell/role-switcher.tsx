"use client";

import { ChevronDown } from "lucide-react";
import { usePersona } from "@/components/persona/persona-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PersonaId } from "@/lib/types";

export function RoleSwitcher() {
  const { persona, personas, selectPersona, clearPersona } = usePersona();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-[0.8rem] font-medium outline-none hover:bg-muted"
      >
        <span className="max-w-[140px] truncate">
          {persona?.name ?? "Choose persona"}
        </span>
        <ChevronDown className="size-3.5 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Demo personas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {personas.map((p) => (
          <DropdownMenuItem
            key={p.id}
            onClick={() => selectPersona(p.id as PersonaId)}
            className={persona?.id === p.id ? "bg-accent" : undefined}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">
                {p.pickerLabel ?? p.title} · {p.name}
              </span>
              <span className="text-muted-foreground text-xs">
                {p.description}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={clearPersona}>
          Back to persona picker
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
