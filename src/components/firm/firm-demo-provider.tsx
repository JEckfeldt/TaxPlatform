"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { THREADS } from "@/lib/fixtures/seed";
import type { MessageThread } from "@/lib/types";

type FirmDemoContextValue = {
  threads: MessageThread[];
  getThread: (id: string) => MessageThread | undefined;
  replyToThread: (threadId: string, body: string) => boolean;
};

const FirmDemoContext = createContext<FirmDemoContextValue | null>(null);

function cloneThreads(): MessageThread[] {
  return THREADS.map((t) => ({
    ...t,
    messages: t.messages.map((m) => ({ ...m })),
  }));
}

export function FirmDemoProvider({ children }: { children: ReactNode }) {
  const [threads, setThreads] = useState<MessageThread[]>(cloneThreads);

  const getThread = useCallback(
    (id: string) => threads.find((t) => t.id === id),
    [threads],
  );

  const replyToThread = useCallback((threadId: string, body: string) => {
    const trimmed = body.trim();
    if (!trimmed) return false;

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id !== threadId) return thread;
        return {
          ...thread,
          nextActionOwner: "client",
          messages: [
            ...thread.messages,
            {
              id: `msg-${Date.now()}`,
              authorId: "jordan" as const,
              body: trimmed,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      }),
    );
    return true;
  }, []);

  const value = useMemo(
    () => ({
      threads,
      getThread,
      replyToThread,
    }),
    [threads, getThread, replyToThread],
  );

  return (
    <FirmDemoContext.Provider value={value}>{children}</FirmDemoContext.Provider>
  );
}

export function useFirmDemo() {
  const ctx = useContext(FirmDemoContext);
  if (!ctx) {
    throw new Error("useFirmDemo must be used within FirmDemoProvider");
  }
  return ctx;
}
