"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CLIENT_HOME_MODE_KEY } from "@/lib/client-home";
import { TASKS } from "@/lib/fixtures/seed";
import type { ClientHomeMode, Task } from "@/lib/types";

type ClientDemoContextValue = {
  homeMode: ClientHomeMode;
  setHomeMode: (mode: ClientHomeMode) => void;
  tasks: Task[];
  getTask: (id: string) => Task | undefined;
  completeTask: (id: string) => void;
  resetTasks: () => void;
};

const ClientDemoContext = createContext<ClientDemoContextValue | null>(null);

function cloneTasks(): Task[] {
  return TASKS.map((t) => ({ ...t }));
}

export function ClientDemoProvider({ children }: { children: ReactNode }) {
  const [homeMode, setHomeModeState] = useState<ClientHomeMode>("first_run");
  const [tasks, setTasks] = useState<Task[]>(cloneTasks);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CLIENT_HOME_MODE_KEY);
      if (stored === "first_run" || stored === "settled") {
        setHomeModeState(stored);
      }
    } catch {
      // default first_run
    }
    setHydrated(true);
  }, []);

  const setHomeMode = useCallback((mode: ClientHomeMode) => {
    setHomeModeState(mode);
    try {
      localStorage.setItem(CLIENT_HOME_MODE_KEY, mode);
    } catch {
      // ignore
    }
  }, []);

  const getTask = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks],
  );

  const completeTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "done" as const } : t)),
    );
  }, []);

  const resetTasks = useCallback(() => {
    setTasks(cloneTasks());
  }, []);

  const value = useMemo(
    () => ({
      homeMode,
      setHomeMode,
      tasks,
      getTask,
      completeTask,
      resetTasks,
    }),
    [homeMode, setHomeMode, tasks, getTask, completeTask, resetTasks],
  );

  // Avoid flashing wrong nav before localStorage read.
  if (!hydrated) {
    return (
      <ClientDemoContext.Provider value={value}>
        {children}
      </ClientDemoContext.Provider>
    );
  }

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
