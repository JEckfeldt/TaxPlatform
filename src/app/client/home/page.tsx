"use client";

import Link from "next/link";
import { ClientProgress } from "@/components/client/client-progress";
import { useClientDemo } from "@/components/client/client-demo-provider";
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
  getTaskProgress,
} from "@/lib/client-home";
import { outstandingClientRequests } from "@/lib/client-navigation";
import { returnForPersona } from "@/lib/fixtures/seed";
import { buildStatusView } from "@/lib/return-status";

export default function ClientHomePage() {
  const { persona } = usePersona();
  const { tasks, getReturn, threads } = useClientDemo();

  const isJordanPersonal = persona?.id === "jordan-personal";

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
            Open GreenGrowth in the header to pick Jordan (CPA) again.
          </p>
        </div>
      ) : null}

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          {persona?.name ?? "Alex Rivera"} · {taxReturn?.taxYear} return
        </p>
        <PageTitle>Let&apos;s get your return started</PageTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{status}</Badge>
        </div>
      </div>

      {statusView ? <ReturnStatusTimeline view={statusView} /> : null}

      <OutstandingRequests threads={requests} />

      <section className="border-border border-t pt-6">
        <ClientProgress tasks={clientTasks} />
      </section>

      <NextActionHero task={primary} waitingOnPreparer={waitingOnPreparer} />

      <SecondaryTaskList tasks={clientTasks} />
    </div>
  );
}
