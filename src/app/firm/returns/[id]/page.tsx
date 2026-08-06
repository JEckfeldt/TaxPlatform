import Link from "next/link";
import { MilestoneStub } from "@/components/shell/milestone-stub";
import { Badge } from "@/components/ui/badge";
import { RETURNS, THREADS } from "@/lib/fixtures/seed";

export default async function ReturnWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const taxReturn = RETURNS.find((r) => r.id === id);
  const threads = THREADS.filter((t) => t.returnId === id);

  return (
    <div className="space-y-8">
      <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
        <Link href="/firm/dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-foreground">
          {taxReturn?.clientName ?? "Return"}
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          {taxReturn?.clientName} · {taxReturn?.taxYear}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{taxReturn?.status.replaceAll("_", " ")}</Badge>
          <Badge variant="secondary">{taxReturn?.entityType}</Badge>
          <span className="text-muted-foreground text-sm">
            Next: {taxReturn?.nextAction}
          </span>
        </div>
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
          summary="Status strip should match client-facing meaning with appropriate detail."
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
          {threads.length === 0 ? <li>No threads seeded yet.</li> : null}
        </ul>
      </div>
    </div>
  );
}
