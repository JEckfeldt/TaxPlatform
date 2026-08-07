import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { MessageThread } from "@/lib/types";
import { getPersona } from "@/lib/personas";
import { cn } from "@/lib/utils";

export function OutstandingRequests({
  threads,
}: {
  threads: MessageThread[];
}) {
  if (threads.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-tight">
          Waiting on you
        </h2>
        <Badge variant="secondary">{threads.length} request{threads.length === 1 ? "" : "s"}</Badge>
      </div>
      <ul className="divide-border/80 border-border/80 divide-y rounded-xl border">
        {threads.map((thread) => {
          const last = thread.messages[thread.messages.length - 1];
          const author = last ? getPersona(last.authorId) : undefined;
          return (
            <li
              key={thread.id}
              className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <p className="font-medium">{thread.subject}</p>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {author
                    ? `${author.name.split(" ")[0]} asked: `
                    : null}
                  {last?.body}
                </p>
              </div>
              <Link
                href={`/client/messages/${thread.id}`}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "w-full shrink-0 sm:w-auto",
                )}
              >
                View message
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
