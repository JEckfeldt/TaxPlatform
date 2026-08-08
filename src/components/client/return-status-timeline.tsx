import type { StatusView } from "@/lib/return-status";
import { cn } from "@/lib/utils";

export function ReturnStatusTimeline({ view }: { view: StatusView }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-2 sm:gap-x-0">
      {view.stages.map((stage, index) => {
        const state =
          index < view.stageIndex
            ? "done"
            : index === view.stageIndex
              ? "current"
              : "upcoming";
        const isLast = index === view.stages.length - 1;

        return (
          <li key={stage.id} className="flex items-center">
            <div
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                state === "current" && "bg-primary/8 text-foreground",
                state === "done" && "text-foreground",
                state === "upcoming" && "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  state === "current" &&
                    "bg-primary text-primary-foreground",
                  state === "done" && "bg-primary/15 text-primary",
                  state === "upcoming" && "bg-muted text-muted-foreground",
                )}
              >
                {state === "done" ? "✓" : index + 1}
              </span>
              <span
                className={cn(
                  "font-medium",
                  state === "current" && "text-foreground",
                )}
              >
                {stage.shortLabel ?? stage.label}
              </span>
            </div>
            {!isLast ? (
              <span
                aria-hidden
                className={cn(
                  "mx-1 hidden h-px w-4 sm:mx-2 sm:block sm:w-8",
                  index < view.stageIndex ? "bg-primary/40" : "bg-border",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
