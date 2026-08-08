"use client";

import Link from "next/link";
import { use } from "react";
import { ClientBreadcrumbs } from "@/components/client/client-breadcrumbs";
import { useClientDemo } from "@/components/client/client-demo-provider";
import { RelatedObjects } from "@/components/client/related-objects";
import { buttonVariants } from "@/components/ui/button";
import {
  documentById,
  threadForDocument,
} from "@/lib/client-navigation";
import { TASKS } from "@/lib/fixtures/seed";
import { cn } from "@/lib/utils";

export default function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { threads } = useClientDemo();
  const doc = documentById(id);
  const thread = threadForDocument(threads, id);
  const relatedTask = TASKS.find((t) => t.documentId === id);

  if (!doc) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Document not found.</p>
        <Link href="/client/home" className={cn(buttonVariants())}>
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ClientBreadcrumbs
        items={[
          { label: "Home", href: "/client/home" },
          { label: doc.name },
        ]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{doc.name}</h1>
          <p className="text-muted-foreground">
            {doc.type} · {doc.pageCount} page(s)
          </p>
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
          relatedTask ? `/client/tasks/${relatedTask.id}` : undefined
        }
        taskLabel={relatedTask?.title}
        threadHref={thread ? `/client/messages/${thread.id}` : undefined}
        threadLabel={thread?.subject}
      />

      <div className="border-border/80 bg-muted/30 flex min-h-48 items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center">
        <div className="space-y-1">
          <p className="text-sm font-medium">Document preview (simulated)</p>
          <p className="text-muted-foreground text-xs">
            No real file — placeholder for the demo walkthrough.
          </p>
        </div>
      </div>
    </div>
  );
}
