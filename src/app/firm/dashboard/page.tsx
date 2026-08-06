import Link from "next/link";
import { MilestoneStub } from "@/components/shell/milestone-stub";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RETURNS } from "@/lib/fixtures/seed";

export default function FirmDashboardPage() {
  const ranked = [...RETURNS].sort((a, b) => b.urgencyScore - a.urgencyScore);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          What to work on now
        </h1>
        <p className="text-muted-foreground">
          Action queue ranked by urgency score (simple mock sort for now).
        </p>
      </div>

      <div className="grid gap-3">
        {ranked.map((item) => (
          <Link key={item.id} href={`/firm/returns/${item.id}`}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-lg">
                    {item.clientName} · {item.taxYear}
                  </CardTitle>
                  <CardDescription>{item.nextAction}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge>Urgency {item.urgencyScore}</Badge>
                  <span className="text-muted-foreground text-xs capitalize">
                    {item.status.replaceAll("_", " ")}
                  </span>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <MilestoneStub
        milestone="M07 · Actionable Dashboard"
        title="Prioritization scaffold"
        summary="Replace this sort with richer ranking, manager vs preparer views, and scale fixtures in milestone 07."
      />
    </div>
  );
}
