"use client";

import Link from "next/link";
import { useClientDemo } from "@/components/client/client-demo-provider";
import { NextActionHero } from "@/components/client/next-action-hero";
import { OutstandingRequests } from "@/components/client/outstanding-requests";
import { ReturnStatusTimeline } from "@/components/client/return-status-timeline";
import { SecondaryTaskList } from "@/components/client/secondary-task-list";
import { usePersona } from "@/components/persona/persona-provider";
import { PageTitle } from "@/components/shell/page-title";
import {
  clientTasksForReturn,
  getPrimaryTask,
  getTaskProgress,
} from "@/lib/client-home";
import { outstandingClientRequests } from "@/lib/navigation";
import { returnForPersona } from "@/lib/fixtures/seed";
import { buildStatusView } from "@/lib/return-status";

export default function ClientHomePage() {
  const { persona } = usePersona();
  const { tasks, getReturn, threads } = useClientDemo();

  if (persona && persona.shell !== "client") {
    return (
      <div className="space-y-3 py-12">
        <PageTitle className="text-2xl sm:text-3xl">Client home</PageTitle>
        <p className="text-muted-foreground">
          Choose a client persona on the{" "}
          <Link
            href="/"
            className="text-foreground underline underline-offset-2"
          >
            GreenGrowth
          </Link>{" "}
          picker to view this screen.
        </p>
      </div>
    );
  }

  const seedReturn = returnForPersona(persona?.id ?? "alex");
  const taxReturn =
    (seedReturn ? getReturn(seedReturn.id) : undefined) ?? seedReturn;
  const clientTasks = clientTasksForReturn(tasks, taxReturn?.id);
  const primary = getPrimaryTask(clientTasks);
  const { done, total } = getTaskProgress(clientTasks);
  const waitingOnPreparer = total > 0 && done === total;
  const statusView = buildStatusView(taxReturn, "client");
  const requests = outstandingClientRequests(threads, taxReturn?.id);

  return (
    <div className="space-y-8 sm:space-y-10">
      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">
            {persona?.name ?? "Alex Rivera"} · {taxReturn?.taxYear} return
          </p>
          <PageTitle>Your {taxReturn?.taxYear ?? 2025} tax return</PageTitle>
        </div>
        {statusView ? <ReturnStatusTimeline view={statusView} /> : null}
      </header>

      <OutstandingRequests threads={requests} />

      <section className="border-border border-t pt-6">
        <SecondaryTaskList tasks={clientTasks} />
      </section>

      <NextActionHero task={primary} waitingOnPreparer={waitingOnPreparer} />
    </div>
  );
}
