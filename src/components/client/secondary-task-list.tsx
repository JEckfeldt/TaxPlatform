import Link from "next/link";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SecondaryTaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Your to-dos
      </h2>
      <ul className="divide-border/80 border-border/80 divide-y rounded-lg border">
        {tasks.map((task) => {
          const done = task.status === "done";
          return (
            <li key={task.id}>
              <Link
                href={`/client/tasks/${task.id}`}
                className={cn(
                  "hover:bg-muted/50 flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors",
                  done && "opacity-60",
                )}
              >
                <span className={cn(done && "line-through")}>{task.title}</span>
                <span className="text-muted-foreground text-xs capitalize">
                  {done ? "Done" : task.urgency}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
