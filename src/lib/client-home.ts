import type { Task } from "@/lib/types";

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

export function getTaskProgress(tasks: Task[]): {
  done: number;
  total: number;
} {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  return { done, total };
}
