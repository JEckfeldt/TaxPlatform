import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

export function NextActionHero({
  task,
  waitingOnPreparer,
}: {
  task?: Task;
  waitingOnPreparer: boolean;
}) {
  if (waitingOnPreparer || !task) {
    return (
      <section className="border-border bg-card rounded-xl border px-5 py-6 sm:px-6 sm:py-7">
        <p className="text-muted-foreground text-sm font-medium">
          You&apos;re caught up
        </p>
        <h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          You&apos;re waiting on your preparer
        </h2>
        <p className="text-muted-foreground mt-3 max-w-3xl text-base leading-relaxed">
          Thanks — we have what we need from you for now. Jordan will review
          your return and reach out if anything else is needed.
        </p>
      </section>
    );
  }

  const isUpload = task.id === "task-alex-w2";

  return (
    <section className="border-primary/30 bg-card rounded-xl border-2 px-5 py-6 sm:px-6 sm:py-7">
      <p className="text-primary text-sm font-medium">Do this next</p>
      <h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {isUpload ? "Upload your W-2 to get started" : task.title}
      </h2>
      <p className="text-muted-foreground mt-3 max-w-3xl text-base leading-relaxed">
        {task.description}
      </p>
      <div className="mt-5">
        <Link
          href={`/client/tasks/${task.id}`}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full min-w-[10rem] sm:w-auto",
          )}
        >
          {isUpload ? "Upload W-2" : "Start this task"}
        </Link>
      </div>
    </section>
  );
}
