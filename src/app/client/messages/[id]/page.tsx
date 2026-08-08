"use client";

import Link from "next/link";
import { use, useState } from "react";
import { AppBreadcrumbs } from "@/components/shell/app-breadcrumbs";
import { useClientDemo } from "@/components/client/client-demo-provider";
import { RelatedObjects } from "@/components/shell/related-objects";
import { Button, buttonVariants } from "@/components/ui/button";
import { relatedFromThread } from "@/lib/navigation";
import { getPersona } from "@/lib/personas";
import { cn } from "@/lib/utils";

export default function ThreadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getThread, replyToThread } = useClientDemo();
  const thread = getThread(id);
  const [draft, setDraft] = useState("");

  if (!thread || thread.visibility !== "client") {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Conversation not found.</p>
        <Link href="/client/home" className={cn(buttonVariants())}>
          Back to home
        </Link>
      </div>
    );
  }

  const related = relatedFromThread(thread);

  function send() {
    if (replyToThread(thread!.id, draft)) {
      setDraft("");
    }
  }

  return (
    <div className="space-y-6">
      <AppBreadcrumbs
        items={[
          { label: "Home", href: "/client/home" },
          { label: "Messages", href: "/client/messages" },
          { label: thread.subject },
        ]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {thread.subject}
          </h1>
        </div>
        <Link
          href="/client/home"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Back to home
        </Link>
      </div>

      <RelatedObjects
        taskHref={
          related.taskId ? `/client/tasks/${related.taskId}` : undefined
        }
        taskLabel={related.taskTitle}
        documentHref={
          related.documentId
            ? `/client/documents/${related.documentId}`
            : undefined
        }
        documentLabel={related.documentName}
      />

      <div className="space-y-3">
        {thread.messages.map((message) => {
          const author = getPersona(message.authorId);
          const fromClient = author?.shell === "client";
          return (
            <div
              key={message.id}
              className={cn(
                "max-w-2xl rounded-xl border px-4 py-3",
                fromClient
                  ? "border-primary/20 bg-primary/5 ml-auto"
                  : "border-border/80 bg-card mr-auto",
              )}
            >
              <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-medium">
                  {author?.name ?? message.authorId}
                </span>
                <span className="text-muted-foreground">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{message.body}</p>
            </div>
          );
        })}
      </div>

      <div className="border-border/80 space-y-3 rounded-xl border p-4">
        <label htmlFor="reply" className="text-sm font-medium">
          Reply
        </label>
        <textarea
          id="reply"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Write a reply to your preparer…"
          className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-3"
        />
        <Button
          onClick={send}
          disabled={!draft.trim()}
          className="w-full sm:w-auto"
        >
          Send reply
        </Button>
      </div>
    </div>
  );
}
