import { WorkQueue } from "@/components/firm/work-queue";
import { PageTitle } from "@/components/shell/page-title";
import { getFirmReturns } from "@/lib/fixtures/seed";

export default function FirmDashboardPage() {
  const returns = getFirmReturns();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <PageTitle>What to work on now</PageTitle>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed sm:text-base">
          Preparer work queue for Jordan — ranked by urgency, filtered by what
          needs attention. {returns.length} returns in the demo catalog
          (simulated).
        </p>
      </div>

      <WorkQueue returns={returns} />
    </div>
  );
}
