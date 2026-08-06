import { getTaskProgress } from "@/lib/client-home";
import type { Task } from "@/lib/types";

const STEPS = ["Upload docs", "Answer questions", "Firm prepares"] as const;

export function ClientProgress({ tasks }: { tasks: Task[] }) {
  const { done, total } = getTaskProgress(tasks);
  const ratio = total === 0 ? 0 : done / total;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
        <p className="text-sm font-medium">
          {done} of {total} to-dos done
        </p>
        <p className="text-muted-foreground text-xs">
          {STEPS.map((step, i) => (
            <span key={step}>
              {i > 0 ? " → " : null}
              <span className={i < done ? "text-foreground font-medium" : undefined}>
                {step}
              </span>
            </span>
          ))}
        </p>
      </div>
      <div className="bg-muted h-1.5 overflow-hidden rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.max(ratio * 100, ratio > 0 ? 8 : 0)}%` }}
        />
      </div>
    </div>
  );
}
