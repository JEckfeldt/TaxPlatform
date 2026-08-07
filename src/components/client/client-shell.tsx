"use client";

import {
  ClientDemoProvider,
  useClientDemo,
} from "@/components/client/client-demo-provider";
import { usePersona } from "@/components/persona/persona-provider";
import { AppHeader } from "@/components/shell/app-header";

function ClientShellInner({ children }: { children: React.ReactNode }) {
  const { homeMode } = useClientDemo();
  const { persona } = usePersona();
  const settledChrome =
    homeMode === "settled" || persona?.id === "jordan-personal";

  const nav = settledChrome
    ? [
        { href: "/client/home", label: "Home" },
        { href: "/client/messages", label: "Messages" },
      ]
    : [];

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AppHeader eyebrow="Client" nav={nav} />
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6 sm:py-8">
        {children}
      </div>
    </div>
  );
}

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ClientDemoProvider>
      <ClientShellInner>{children}</ClientShellInner>
    </ClientDemoProvider>
  );
}
