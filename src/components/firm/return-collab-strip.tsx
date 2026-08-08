"use client";

import Link from "next/link";
import { useFirmDemo } from "@/components/firm/firm-demo-provider";
import { clientThreadsForReturn } from "@/lib/navigation";
import { getPersona } from "@/lib/personas";
import type { MessageThread } from "@/lib/types";

function latestClientThread(
  threads: MessageThread[],
): MessageThread | undefined {
  return [...threads].sort((a, b) => {
    const aLast = a.messages[a.messages.length - 1]?.createdAt ?? "";
    const bLast = b.messages[b.messages.length - 1]?.createdAt ?? "";
    return bLast.localeCompare(aLast);
  })[0];
}

function turnLabel(owner: MessageThread["nextActionOwner"]): string {
  if (owner === "preparer") return "Your turn";
  if (owner === "client") return "Client's turn";
  return "Waiting on review";
}

export function ReturnCollabStrip({ returnId }: { returnId: string }) {
  const { threads } = useFirmDemo();
  const clientThreads = clientThreadsForReturn(threads, returnId);
  const thread = latestClientThread(clientThreads);

  if (!thread) {
    return (
      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-tight">Messages</h2>
        <p className="text-muted-foreground text-sm">
          No client conversations on this return.
        </p>
      </section>
    );
  }

  const last = thread.messages[thread.messages.length - 1];
  const author = last ? getPersona(last.authorId) : undefined;

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold tracking-tight">Messages</h2>
      <Link
        href={`/firm/messages/${thread.id}`}
        className="border-border/80 hover:bg-muted/40 flex flex-col gap-3 rounded-xl border px-4 py-3 transition-colors sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{thread.subject}</p>
            <span className="text-muted-foreground text-xs font-medium">
              {turnLabel(thread.nextActionOwner)}
            </span>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {author ? `${author.name.split(" ")[0]}: ` : null}
            {last?.body}
          </p>
        </div>
        <span className="text-primary text-sm font-medium sm:shrink-0">
          View message
        </span>
      </Link>
    </section>
  );
}
