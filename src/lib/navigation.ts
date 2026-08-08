/**
 * Shared thread/document helpers used by client and firm shells.
 */
import { DOCUMENTS, TASKS } from "@/lib/fixtures/seed";
import type { MessageThread } from "@/lib/types";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function threadForTask(
  threads: MessageThread[],
  taskId: string,
): MessageThread | undefined {
  return threads.find(
    (t) => t.visibility === "client" && t.taskId === taskId,
  );
}

export function threadForDocument(
  threads: MessageThread[],
  documentId: string,
): MessageThread | undefined {
  return threads.find(
    (t) => t.visibility === "client" && t.documentId === documentId,
  );
}

export function clientThreadsForReturn(
  threads: MessageThread[],
  returnId: string | undefined,
): MessageThread[] {
  return threads.filter(
    (t) =>
      t.visibility === "client" &&
      (!returnId || t.returnId === returnId),
  );
}

export function outstandingClientRequests(
  threads: MessageThread[],
  returnId: string | undefined,
): MessageThread[] {
  return clientThreadsForReturn(threads, returnId).filter(
    (t) => t.nextActionOwner === "client",
  );
}

export function relatedFromThread(thread: MessageThread): {
  taskId?: string;
  documentId?: string;
  taskTitle?: string;
  documentName?: string;
} {
  const task = thread.taskId
    ? TASKS.find((t) => t.id === thread.taskId)
    : undefined;
  const doc = thread.documentId
    ? DOCUMENTS.find((d) => d.id === thread.documentId)
    : undefined;
  return {
    taskId: thread.taskId,
    documentId: thread.documentId,
    taskTitle: task?.title,
    documentName: doc?.name,
  };
}

export function documentById(id: string) {
  return DOCUMENTS.find((d) => d.id === id);
}
