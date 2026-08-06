import { MilestoneStub } from "@/components/shell/milestone-stub";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { THREADS } from "@/lib/fixtures/seed";

export default function ClientMessagesPage() {
  const clientThreads = THREADS.filter((t) => t.visibility === "client");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Threads stay attached to documents and tasks — not a generic inbox.
        </p>
      </div>

      <div className="grid gap-3">
        {clientThreads.map((thread) => (
          <Card key={thread.id}>
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-base">{thread.subject}</CardTitle>
                <Badge variant="secondary">
                  Next: {thread.nextActionOwner}
                </Badge>
              </div>
              <CardDescription>
                {thread.messages[thread.messages.length - 1]?.body}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <MilestoneStub
        milestone="M02 · Collaboration"
        title="Contextual communication scaffold"
        summary="Add internal vs client visibility, request tracking, and ownership polish in milestone 02."
      />
    </div>
  );
}
