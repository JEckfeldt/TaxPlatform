import { Badge } from "@/components/ui/badge";
import type { StatusView } from "@/lib/return-status";
import { cn } from "@/lib/utils";

export function ReturnStatusTimeline({ view }: { view: StatusView }) {
  return (
    <section className="border-border/80 bg-card/80 space-y-4 rounded-xl border p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-tight">Return status</h2>
        <Badge variant="secondary">{view.ownerLabel}</Badge>
      </div>

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
                state === "done" && "border-primary/25 bg-accent/50",
                state === "current" &&
                  "border-primary bg-primary/5 ring-primary/20 ring-1",
                state === "upcoming" && "border-border/70 bg-muted/30 opacity-70",
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

      <div className="space-y-1">
        <p className="text-sm">
          <span className="text-muted-foreground">Next: </span>
          <span className="font-medium">{view.nextAction}</span>
        </p>
        {view.blockers.length > 0 ? (
          <p className="text-destructive text-sm">
            Blocked: {view.blockers.join(" · ")}
          </p>
        ) : null}
      </div>
    </section>
  );
}
