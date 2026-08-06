import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="border-dashed">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{milestone}</Badge>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
    </Card>
  );
}
