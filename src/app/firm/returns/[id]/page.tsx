import Link from "next/link";
import { ReviewWorkspace } from "@/components/firm/review-workspace";
import { MilestoneStub } from "@/components/shell/milestone-stub";
import { PageTitle } from "@/components/shell/page-title";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ALEX_RETURN_ID } from "@/lib/fixtures/return-fields";
import { getFirmReturn, THREADS } from "@/lib/fixtures/seed";
import { firmStatusLabel } from "@/lib/return-status";
import { cn } from "@/lib/utils";

export default async function ReturnWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const taxReturn = getFirmReturn(id);
  const threads = THREADS.filter((t) => t.returnId === id);
  const isAlexReview = id === ALEX_RETURN_ID;

  if (!taxReturn) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Return not found.</p>
        <Link href="/firm/dashboard" className={cn(buttonVariants())}>
          Back to dashboard
        </Link>
      </div>
    );
  }

  // Demo CPA (Jordan) only opens returns they prepare.
  if (taxReturn.preparerId !== "jordan") {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          This return is assigned to another preparer. It is not in your queue.
        </p>
        <Link href="/firm/dashboard" className={cn(buttonVariants())}>
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
        <Link href="/firm/dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-foreground">{taxReturn.clientName}</span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <PageTitle>
            {taxReturn.clientName} · {taxReturn.taxYear}
          </PageTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{firmStatusLabel(taxReturn.status)}</Badge>
            <Badge variant="secondary" className="capitalize">
              {taxReturn.entityType}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Next: {taxReturn.nextAction}
          </p>
          {taxReturn.blockers[0] ? (
            <p className="text-destructive text-sm">
              Blocked: {taxReturn.blockers.join(" · ")}
            </p>
          ) : null}
        </div>
        <Link
          href="/firm/dashboard"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Back to dashboard
        </Link>
      </div>

      {isAlexReview ? (
        <ReviewWorkspace />
      ) : (
        <div className="space-y-4">
          <div className="border-border border-l-primary border-l-2 py-1 pl-4 text-sm">
            <p className="font-medium">Detailed review demo</p>
            <p className="text-muted-foreground mt-1">
              Field affordances, W-2 source trace, and AI correct flow are wired
              on{" "}
              <Link
                href={`/firm/returns/${ALEX_RETURN_ID}`}
                className="text-foreground underline underline-offset-2"
              >
                Alex Rivera&apos;s return
              </Link>
              .
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <MilestoneStub
              milestone="M09 · Complexity"
              title="Search, filter, hierarchy"
              summary="Scale and progressive disclosure can expand beyond the Alex demo path."
            />
          </div>
        </div>
      )}

      <div className="border-border space-y-2 border-t pt-6">
        <h2 className="text-sm font-semibold tracking-tight">
          Threads on this return
        </h2>
        <ul className="text-muted-foreground list-inside list-disc text-sm">
          {threads.map((t) => (
            <li key={t.id}>
              {t.subject}{" "}
              <span className="text-foreground">({t.visibility})</span>
            </li>
          ))}
          {threads.length === 0 ? (
            <li>No threads seeded for this return.</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
