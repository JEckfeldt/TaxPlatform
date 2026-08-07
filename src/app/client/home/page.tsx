"use client";

import { ClientProgress } from "@/components/client/client-progress";
import { useClientDemo } from "@/components/client/client-demo-provider";
import { HomeModeToggle } from "@/components/client/home-mode-toggle";
import { NextActionHero } from "@/components/client/next-action-hero";
import { OutstandingRequests } from "@/components/client/outstanding-requests";
import { ReturnStatusTimeline } from "@/components/client/return-status-timeline";
import { SecondaryTaskList } from "@/components/client/secondary-task-list";
import { usePersona } from "@/components/persona/persona-provider";
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

  if (persona && persona.shell !== "client") {
    return (
      <div className="space-y-3 py-12">
        <h1 className="text-2xl font-semibold tracking-tight">Client home</h1>
        <p className="text-muted-foreground">
          Switch to Alex (Client) in the persona menu to walk the first-run
          demo.
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
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-muted-foreground text-sm">
            {persona?.name ?? "Alex Rivera"} · {taxReturn?.taxYear} return
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {homeMode === "first_run"
              ? "Let's get your return started"
              : "Your return"}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{status}</Badge>
          </div>
        </div>
        <HomeModeToggle className="w-full sm:w-auto" />
      </div>

      {statusView ? <ReturnStatusTimeline view={statusView} /> : null}

      <OutstandingRequests threads={requests} />

      <ClientProgress tasks={clientTasks} />

      <NextActionHero task={primary} waitingOnPreparer={waitingOnPreparer} />

      <SecondaryTaskList
        tasks={
          homeMode === "settled"
            ? clientTasks
            : secondary.filter((t) => t.status !== "done")
        }
      />
    </div>
  );
}
