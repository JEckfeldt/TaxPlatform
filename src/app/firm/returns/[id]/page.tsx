import Link from "next/link";
import { MilestoneStub } from "@/components/shell/milestone-stub";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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

  if (!taxReturn) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Return not found.</p>
        <Link
          href="/firm/dashboard"
          className={cn(buttonVariants())}
        >
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
          <h1 className="text-3xl font-semibold tracking-tight">
            {taxReturn.clientName} · {taxReturn.taxYear}
          </h1>
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

      <div className="grid gap-3 md:grid-cols-2">
        <MilestoneStub
          milestone="M01 · Traceability"
          title="Return field ↔ source document"
          summary="Build the side-by-side review and source page/section mapping here."
        />
        <MilestoneStub
          milestone="M08 / M10"
          title="Affordances + trustworthy AI"
          summary="Field states and AI explain/correct panels attach to this workspace."
        />
        <MilestoneStub
          milestone="M06 · Status"
          title="Shared progress language"
          summary="Firm status strip can reuse client stage helpers with more detail."
        />
        <MilestoneStub
          milestone="M09 · Complexity"
          title="Search, filter, hierarchy"
          summary="Large fixture set and progressive disclosure land on this surface."
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Threads on this return</h2>
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
