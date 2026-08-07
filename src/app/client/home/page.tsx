"use client";

import { ClientProgress } from "@/components/client/client-progress";
import { useClientDemo } from "@/components/client/client-demo-provider";
import { HomeModeToggle } from "@/components/client/home-mode-toggle";
import { NextActionHero } from "@/components/client/next-action-hero";
import { OutstandingRequests } from "@/components/client/outstanding-requests";
import { ReturnStatusTimeline } from "@/components/client/return-status-timeline";
import { SecondaryTaskList } from "@/components/client/secondary-task-list";
import { usePersona } from "@/components/persona/persona-provider";
import { PageTitle } from "@/components/shell/page-title";
import { Badge } from "@/components/ui/badge";
import {
  clientFriendlyStatus,
  clientTasksForReturn,
  getPrimaryTask,
  getSecondaryTasks,
  getTaskProgress,
} from "@/lib/client-home";
import { outstandingClientRequests } from "@/lib/client-navigation";
import { returnForPersona } from "@/lib/fixtures/seed";
import { buildStatusView } from "@/lib/return-status";

export default function ClientHomePage() {
  const { persona } = usePersona();
  const { tasks, homeMode, getReturn, threads } = useClientDemo();

  const isJordanPersonal = persona?.id === "jordan-personal";
  const effectiveHomeMode = isJordanPersonal ? "settled" : homeMode;

  if (persona && persona.shell !== "client") {
    return (
      <div className="space-y-3 py-12">
        <PageTitle className="text-2xl sm:text-3xl">Client home</PageTitle>
        <p className="text-muted-foreground">
          Switch to a client persona (Alex, or Jordan · Personal filing) in the
          persona menu to view this screen.
        </p>
      </div>
    );
  }

  const seedReturn = returnForPersona(persona?.id ?? "alex");
  const taxReturn =
    (seedReturn ? getReturn(seedReturn.id) : undefined) ?? seedReturn;
  const clientTasks = clientTasksForReturn(tasks, taxReturn?.id);
  const primary = getPrimaryTask(clientTasks);
  const secondary = getSecondaryTasks(clientTasks, primary);
  const { done, total } = getTaskProgress(clientTasks);
  const waitingOnPreparer = total > 0 && done === total;
  const status = clientFriendlyStatus(taxReturn);
  const statusView = buildStatusView(taxReturn, "client");
  const requests = outstandingClientRequests(threads, taxReturn?.id);

  return (
    <div className="space-y-8 sm:space-y-10">
      {isJordanPersonal ? (
        <div className="border-border border-l-primary border-l-2 py-1 pl-4 text-sm">
          <p className="font-medium">Personal filing context</p>
          <p className="text-muted-foreground mt-1">
            You&apos;re viewing your personal return — not the firm work queue.
            Use the persona menu to switch back to Jordan (CPA).
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-muted-foreground text-sm">
            {persona?.name ?? "Alex Rivera"} · {taxReturn?.taxYear} return
          </p>
          <PageTitle>
            {effectiveHomeMode === "first_run"
              ? "Let's get your return started"
              : "Your return"}
          </PageTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{status}</Badge>
          </div>
        </div>
        {!isJordanPersonal ? (
          <HomeModeToggle className="w-full sm:w-auto" />
        ) : null}
      </div>

      {statusView ? <ReturnStatusTimeline view={statusView} /> : null}

      <OutstandingRequests threads={requests} />

      <section className="border-border border-t pt-6">
        <ClientProgress tasks={clientTasks} />
      </section>

      <NextActionHero task={primary} waitingOnPreparer={waitingOnPreparer} />

      <SecondaryTaskList
        tasks={
          effectiveHomeMode === "settled"
            ? clientTasks
            : secondary.filter((t) => t.status !== "done")
        }
      />
    </div>
  );
}
