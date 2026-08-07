import { WorkQueue } from "@/components/firm/work-queue";
import { getFirmReturns } from "@/lib/fixtures/seed";

export default function FirmDashboardPage() {
  const returns = getFirmReturns();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          What to work on now
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Preparer work queue for Jordan — ranked by urgency, filtered by what
          needs attention. {returns.length} returns in the demo catalog
          (simulated).
        </p>
      </div>

      <WorkQueue returns={returns} />
    </div>
  );
}
