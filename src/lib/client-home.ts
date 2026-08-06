import type { ReturnStatus, Task, TaxReturn } from "@/lib/types";

const URGENCY_RANK: Record<Task["urgency"], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function clientTasksForReturn(
  tasks: Task[],
  returnId: string | undefined,
): Task[] {
  if (!returnId) return [];
  return tasks
    .filter((t) => t.returnId === returnId && t.owner === "client")
    .sort((a, b) => {
      const orderA = a.sortOrder ?? 99;
      const orderB = b.sortOrder ?? 99;
      if (orderA !== orderB) return orderA - orderB;
      return URGENCY_RANK[a.urgency] - URGENCY_RANK[b.urgency];
    });
}

export function getPrimaryTask(tasks: Task[]): Task | undefined {
  return tasks.find((t) => t.status !== "done");
}

export function getSecondaryTasks(tasks: Task[], primary?: Task): Task[] {
  return tasks.filter((t) => t.id !== primary?.id);
}

export function getTaskProgress(tasks: Task[]): {
  done: number;
  total: number;
} {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  return { done, total };
}

export function clientFriendlyStatus(
  taxReturn: TaxReturn | undefined,
  tasks: Task[],
): string {
  if (!taxReturn) return "Getting started";
  const { done, total } = getTaskProgress(tasks);
  if (total > 0 && done === total) return "Waiting on your preparer";
  if (taxReturn.nextActionOwner === "client") return "Waiting on you";
  return statusLabel(taxReturn.status);
}

function statusLabel(status: ReturnStatus): string {
  switch (status) {
    case "gathering_info":
      return "Gathering your info";
    case "in_preparation":
      return "In preparation";
    case "pending_client":
      return "Waiting on you";
    case "in_review":
      return "In review";
    case "ready_to_file":
      return "Ready to file";
    case "filed":
      return "Filed";
    case "blocked":
      return "Blocked";
    default:
      return "Getting started";
  }
}

export const CLIENT_HOME_MODE_KEY = "greengrowth_client_home_mode";
