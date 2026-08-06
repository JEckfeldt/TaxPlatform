import Link from "next/link";
import { MilestoneStub } from "@/components/shell/milestone-stub";
import { buttonVariants } from "@/components/ui/button";
import { DOCUMENTS, THREADS } from "@/lib/fixtures/seed";
import { cn } from "@/lib/utils";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = DOCUMENTS.find((d) => d.id === id);
  const thread = THREADS.find((t) => t.documentId === id);

  return (
    <div className="space-y-6">
      <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
        <Link href="/client/home" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">{doc?.name ?? "Document"}</span>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight">
        {doc?.name ?? "Document"}
      </h1>
      <p className="text-muted-foreground">
        {doc?.type} · {doc?.pageCount ?? 0} page(s) · placeholder preview
      </p>

      {thread ? (
        <Link
          href="/client/messages"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          View related messages
        </Link>
      ) : null}

      <MilestoneStub
        milestone="M01 / M04"
        title="Document as a connected object"
        summary="Source regions and deep links land here in later milestones. Preview is intentionally fake."
      />
    </div>
  );
}
