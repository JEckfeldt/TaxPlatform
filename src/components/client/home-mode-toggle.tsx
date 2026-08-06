"use client";

import { useClientDemo } from "@/components/client/client-demo-provider";
import { Button } from "@/components/ui/button";
import type { ClientHomeMode } from "@/lib/types";
import { cn } from "@/lib/utils";

const OPTIONS: { mode: ClientHomeMode; label: string }[] = [
  { mode: "first_run", label: "First-run" },
  { mode: "settled", label: "Settled" },
];

export function HomeModeToggle({ className }: { className?: string }) {
  const { homeMode, setHomeMode } = useClientDemo();

  return (
    <div
      className={cn(
        "border-border/80 bg-muted/40 flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2",
        className,
      )}
    >
      <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Demo: home mode
      </span>
      <div className="flex gap-1">
        {OPTIONS.map((opt) => (
          <Button
            key={opt.mode}
            size="xs"
            variant={homeMode === opt.mode ? "default" : "ghost"}
            onClick={() => setHomeMode(opt.mode)}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
