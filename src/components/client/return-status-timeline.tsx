import type { StatusView } from "@/lib/return-status";
import { cn } from "@/lib/utils";

export function ReturnStatusTimeline({ view }: { view: StatusView }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold tracking-tight">Return status</h2>

      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {view.stages.map((stage, index) => {
          const state =
            index < view.stageIndex
              ? "done"
              : index === view.stageIndex
                ? "current"
                : "upcoming";

          return (
            <li
              key={stage.id}
              className={cn(
                "rounded-lg border px-3 py-2.5 text-sm",
                state === "done" && "border-primary/25 bg-accent/40",
                state === "current" &&
                  "border-primary bg-primary/5 ring-primary/25 ring-1",
                state === "upcoming" &&
                  "border-border/80 bg-transparent opacity-65",
              )}
            >
              <p className="text-muted-foreground text-[0.65rem] font-medium tracking-wide uppercase">
                Step {index + 1}
                {state === "done" ? " · Done" : null}
                {state === "current" ? " · Now" : null}
              </p>
              <p className="font-medium">{stage.label}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
