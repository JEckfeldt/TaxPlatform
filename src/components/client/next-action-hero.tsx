import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card className="border-primary/15 bg-card/90">
        <CardHeader className="space-y-2">
          <CardDescription>You&apos;re caught up</CardDescription>
          <CardTitle className="text-3xl tracking-tight sm:text-4xl">
            You&apos;re waiting on your preparer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
            Thanks — we have what we need from you for now. Jordan will review
            your return and reach out if anything else is needed.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isUpload = task.id === "task-alex-w2";

  return (
    <Card className="border-primary/25 bg-card/90 shadow-sm">
      <CardHeader className="space-y-3">
        <CardDescription className="text-primary font-medium">
          Do this next
        </CardDescription>
        <CardTitle className="text-3xl tracking-tight sm:text-4xl">
          {isUpload ? "Upload your W-2 to get started" : task.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          {task.description}
        </p>
        <Link
          href={`/client/tasks/${task.id}`}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full min-w-[10rem] sm:w-auto",
          )}
        >
          {isUpload ? "Upload W-2" : "Start this task"}
        </Link>
      </CardContent>
    </Card>
  );
}
