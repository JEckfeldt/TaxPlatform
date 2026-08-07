"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { ClientBreadcrumbs } from "@/components/client/client-breadcrumbs";
import { useClientDemo } from "@/components/client/client-demo-provider";
import { RelatedObjects } from "@/components/client/related-objects";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { threadForTask } from "@/lib/client-navigation";
import { DOCUMENTS } from "@/lib/fixtures/seed";
import { cn } from "@/lib/utils";

export default function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getTask, completeTask, threads } = useClientDemo();
  const task = getTask(id);
  const [simulated, setSimulated] = useState(false);
  const thread = task ? threadForTask(threads, task.id) : undefined;
  const doc = task?.documentId
    ? DOCUMENTS.find((d) => d.id === task.documentId)
    : undefined;

  if (!task) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Task not found.</p>
        <Link href="/client/home" className={cn(buttonVariants())}>
          Back to home
        </Link>
      </div>
    );
  }

  const isUpload = task.id === "task-alex-w2";
  const isQuestionnaire = task.id === "task-alex-questionnaire";
  const done = task.status === "done";

  function finish() {
    completeTask(task!.id);
    router.push("/client/home");
  }

  return (
    <div className="space-y-6">
      <ClientBreadcrumbs
        items={[
          { label: "Home", href: "/client/home" },
          { label: task.title },
        ]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{task.title}</h1>
          <p className="text-muted-foreground max-w-2xl">{task.description}</p>
        </div>
        <Link
          href="/client/home"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Back to home
        </Link>
      </div>

      <RelatedObjects
        documentHref={
          task.documentId ? `/client/documents/${task.documentId}` : undefined
        }
        documentLabel={doc?.name}
        threadHref={thread ? `/client/messages/${thread.id}` : undefined}
        threadLabel={thread?.subject}
      />

      {done ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Already done</CardTitle>
            <CardDescription>
              This task is marked complete for this demo session.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/client/home" className={cn(buttonVariants())}>
              Back to home
            </Link>
          </CardContent>
        </Card>
      ) : null}

      {!done && isUpload ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">Upload your W-2</CardTitle>
            <CardDescription>
              Simulated upload — no file is stored. Use this to advance the
              demo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <button
              type="button"
              onClick={() => setSimulated(true)}
              className={cn(
                "border-border bg-muted/30 hover:bg-muted/50 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-12 text-center transition-colors",
                simulated && "border-primary/40 bg-accent/40",
              )}
            >
              <span className="text-sm font-medium">
                {simulated
                  ? "W-2 · Acme Corp.pdf (simulated)"
                  : "Drop a file here, or click to simulate"}
              </span>
              <span className="text-muted-foreground text-xs">
                PDF or photo · fake only
              </span>
            </button>
            <Button
              disabled={!simulated}
              onClick={finish}
              size="lg"
              className="w-full sm:w-auto"
            >
              I&apos;ve uploaded this
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {!done && isQuestionnaire ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick onboarding questions</CardTitle>
            <CardDescription>
              Stub questionnaire — mark answered to clear this to-do.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="text-muted-foreground list-inside list-disc text-sm">
              <li>Filing status</li>
              <li>Any dependents?</li>
              <li>Did you move states in 2025?</li>
            </ul>
            <Button onClick={finish} size="lg" className="w-full sm:w-auto">
              Mark answered
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {!done && !isUpload && !isQuestionnaire ? (
        <Button onClick={finish}>Mark complete</Button>
      ) : null}
    </div>
  );
}
