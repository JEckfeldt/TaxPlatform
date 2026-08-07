import { Badge } from "@/components/ui/badge";

export function MilestoneStub({
  milestone,
  title,
  summary,
  children,
}: {
  milestone: string;
  title: string;
  summary: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-border space-y-2 rounded-xl border border-dashed px-4 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{milestone}</Badge>
        <p className="font-medium">{title}</p>
      </div>
      <p className="text-muted-foreground text-sm">{summary}</p>
      {children}
    </div>
  );
}
