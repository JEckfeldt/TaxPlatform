"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { RETURNS, TASKS, THREADS } from "@/lib/fixtures/seed";
import { deriveReturnFromClientTasks } from "@/lib/return-status";
import type { MessageThread, Task, TaxReturn } from "@/lib/types";

type ClientDemoContextValue = {
  tasks: Task[];
  returns: TaxReturn[];
  threads: MessageThread[];
  getTask: (id: string) => Task | undefined;
  getReturn: (id: string) => TaxReturn | undefined;
  getThread: (id: string) => MessageThread | undefined;
  completeTask: (id: string) => void;
  replyToThread: (threadId: string, body: string) => boolean;
  resetDemoData: () => void;
};

const ClientDemoContext = createContext<ClientDemoContextValue | null>(null);

function cloneTasks(): Task[] {
  return TASKS.map((t) => ({ ...t }));
}

function cloneReturns(): TaxReturn[] {
  return RETURNS.map((r) => ({ ...r, blockers: [...r.blockers] }));
}

function cloneThreads(): MessageThread[] {
  return THREADS.map((t) => ({
    ...t,
    messages: t.messages.map((m) => ({ ...m })),
  }));
}

function syncReturnsToTasks(returns: TaxReturn[], tasks: Task[]): TaxReturn[] {
  return returns.map((r) => deriveReturnFromClientTasks(r, tasks));
}

export function ClientDemoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(cloneTasks);
  const [returns, setReturns] = useState<TaxReturn[]>(() =>
    syncReturnsToTasks(cloneReturns(), cloneTasks()),
  );
  const [threads, setThreads] = useState<MessageThread[]>(cloneThreads);

  const getTask = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks],
  );

  const getReturn = useCallback(
    (id: string) => returns.find((r) => r.id === id),
    [returns],
  );

  const getThread = useCallback(
    (id: string) => threads.find((t) => t.id === id),
    [threads],
  );

  const completeTask = useCallback((id: string) => {
    setTasks((prevTasks) => {
      const nextTasks = prevTasks.map((t) =>
        t.id === id ? { ...t, status: "done" as const } : t,
      );
      setReturns(syncReturnsToTasks(cloneReturns(), nextTasks));
      return nextTasks;
    });
  }, []);

  const replyToThread = useCallback((threadId: string, body: string) => {
    const trimmed = body.trim();
    if (!trimmed) return false;

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id !== threadId) return thread;
        return {
          ...thread,
          nextActionOwner: "preparer",
          messages: [
            ...thread.messages,
            {
              id: `msg-${Date.now()}`,
              authorId: "alex" as const,
              body: trimmed,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      }),
    );
    return true;
  }, []);

  const resetDemoData = useCallback(() => {
    const nextTasks = cloneTasks();
    setTasks(nextTasks);
    setReturns(syncReturnsToTasks(cloneReturns(), nextTasks));
    setThreads(cloneThreads());
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      returns,
      threads,
      getTask,
      getReturn,
      getThread,
      completeTask,
      replyToThread,
      resetDemoData,
    }),
    [
      tasks,
      returns,
      threads,
      getTask,
      getReturn,
      getThread,
      completeTask,
      replyToThread,
      resetDemoData,
    ],
  );

  return (
    <ClientDemoContext.Provider value={value}>
      {children}
    </ClientDemoContext.Provider>
  );
}

export function useClientDemo() {
  const ctx = useContext(ClientDemoContext);
  if (!ctx) {
    throw new Error("useClientDemo must be used within ClientDemoProvider");
  }
  return ctx;
}
