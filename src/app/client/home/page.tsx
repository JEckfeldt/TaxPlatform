"use client";

import Link from "next/link";
import { usePersona } from "@/components/persona/persona-provider";
import { MilestoneStub } from "@/components/shell/milestone-stub";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { returnForPersona, TASKS } from "@/lib/fixtures/seed";
import { cn } from "@/lib/utils";

export default function ClientHomePage() {
  const { persona } = usePersona();
  const taxReturn = returnForPersona(persona?.id ?? "alex");
  const tasks = TASKS.filter((t) => t.returnId === taxReturn?.id);
  const primary = tasks.find((t) => t.status !== "done") ?? tasks[0];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          {persona?.name ?? "Client"} · {taxReturn?.taxYear} return
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Here&apos;s what to do next
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{taxReturn?.status.replaceAll("_", " ")}</Badge>
          <span className="text-muted-foreground text-sm">
            Next owner: {taxReturn?.nextActionOwner}
          </span>
        </div>
      </div>

      {primary ? (
        <Card className="border-primary/20 bg-card/80">
          <CardHeader>
            <CardDescription>Primary action</CardDescription>
            <CardTitle className="text-2xl">{primary.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{primary.description}</p>
            <Link
              href={`/client/tasks/${primary.id}`}
              className={cn(buttonVariants())}
            >
              Start this task
            </Link>
          </CardContent>
        </Card>
      ) : null}

      <MilestoneStub
        milestone="M03 · Where to Start"
        title="First-run clarity scaffold"
        summary="This home is the skeleton for challenge 03. Refine hierarchy, deferred chrome, and post-onboarding state in that milestone."
      />
    </div>
  );
}
