import { WorkQueue } from "@/components/firm/work-queue";
import { PageTitle } from "@/components/shell/page-title";
import { getFirmReturns } from "@/lib/fixtures/seed";
import { returnsForPreparer } from "@/lib/firm-queue";

export default function FirmDashboardPage() {
  const returns = getFirmReturns();
  const myCount = returnsForPreparer(returns, "jordan").length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <PageTitle>What to work on now</PageTitle>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed sm:text-base">
          Your preparer queue — only returns assigned to you, ranked by urgency.
          {myCount} returns in this demo book (simulated).
        </p>
      </div>

      <WorkQueue returns={returns} />
    </div>
  );
}
