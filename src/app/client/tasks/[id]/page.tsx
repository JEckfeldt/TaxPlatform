import Link from "next/link";
import { MilestoneStub } from "@/components/shell/milestone-stub";
import { buttonVariants } from "@/components/ui/button";
import { TASKS } from "@/lib/fixtures/seed";
import { cn } from "@/lib/utils";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = TASKS.find((t) => t.id === id);

  return (
    <div className="space-y-6">
      <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
        <Link href="/client/home" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">{task?.title ?? "Task"}</span>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight">
        {task?.title ?? "Unknown task"}
      </h1>
      <p className="text-muted-foreground max-w-2xl">{task?.description}</p>

      {task?.documentId ? (
        <Link
          href={`/client/documents/${task.documentId}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Open related document
        </Link>
      ) : null}

      <MilestoneStub
        milestone="M02 / M04"
        title="Task tied to document + messages"
        summary="Wire contextual collaboration and context-preserving navigation in milestones 02 and 04."
      />
    </div>
  );
}
