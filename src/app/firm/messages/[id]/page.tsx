"use client";

import Link from "next/link";
import { use, useState } from "react";
import { ClientBreadcrumbs } from "@/components/client/client-breadcrumbs";
import { useFirmDemo } from "@/components/firm/firm-demo-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { relatedFromThread } from "@/lib/client-navigation";
import { getFirmReturn } from "@/lib/fixtures/seed";
import { getPersona } from "@/lib/personas";
import { cn } from "@/lib/utils";

export default function FirmThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getThread, replyToThread } = useFirmDemo();
  const thread = getThread(id);
  const [draft, setDraft] = useState("");

  if (!thread || thread.visibility !== "client") {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Conversation not found.</p>
        <Link href="/firm/dashboard" className={cn(buttonVariants())}>
          Back to dashboard
        </Link>
      </div>
    );
  }

  const taxReturn = getFirmReturn(thread.returnId);
  const related = relatedFromThread(thread);
  const returnHref = `/firm/returns/${thread.returnId}`;

  function send() {
    if (replyToThread(thread!.id, draft)) {
      setDraft("");
    }
  }

  return (
    <div className="space-y-6">
      <ClientBreadcrumbs
        items={[
          { label: "Dashboard", href: "/firm/dashboard" },
          {
            label: taxReturn?.clientName ?? "Return",
            href: returnHref,
          },
          { label: thread.subject },
        ]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {thread.subject}
          </h1>
          {taxReturn ? (
            <p className="text-muted-foreground text-sm">
              {taxReturn.clientName} · {taxReturn.taxYear}
            </p>
          ) : null}
        </div>
        <Link
          href={returnHref}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Back to return
        </Link>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Related
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link
            href={returnHref}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <span className="text-muted-foreground mr-1.5">Return:</span>
            {taxReturn
              ? `${taxReturn.clientName} · ${taxReturn.taxYear}`
              : "Open return"}
          </Link>
          {related.taskTitle ? (
            <span
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "pointer-events-none opacity-80",
              )}
            >
              <span className="text-muted-foreground mr-1.5">Task:</span>
              {related.taskTitle}
            </span>
          ) : null}
          {related.documentName ? (
            <span
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "pointer-events-none opacity-80",
              )}
            >
              <span className="text-muted-foreground mr-1.5">Document:</span>
              {related.documentName}
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        {thread.messages.map((message) => {
          const author = getPersona(message.authorId);
          const fromPreparer =
            message.authorId === "jordan" || message.authorId === "riley";
          return (
            <div
              key={message.id}
              className={cn(
                "max-w-2xl rounded-xl border px-4 py-3",
                fromPreparer
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
        <label htmlFor="firm-reply" className="text-sm font-medium">
          Reply
        </label>
        <textarea
          id="firm-reply"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Write a reply to the client…"
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
